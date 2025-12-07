// pages/api/submit.js

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
const API_KEY = process.env.API_KEY;
const DEBUG = String(process.env.DEBUG || 'false').toLowerCase() === 'true';

// Simple rate limiter (optional)
const RATE_MAP = new Map();
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const arr = RATE_MAP.get(ip) || [];
  const kept = arr.filter((t) => now - t < WINDOW_MS);
  kept.push(now);
  RATE_MAP.set(ip, kept);
  return kept.length > MAX_REQUESTS;
}

function genRequestId() {
  return `r-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

async function safeText(res) {
  try {
    return await res.text();
  } catch (err) {
    if (DEBUG) console.warn('safeText error:', err);
    return '';
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!N8N_WEBHOOK_URL || !API_KEY) {
    console.error('Missing env vars N8N_WEBHOOK_URL or API_KEY');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '')
    .split(',')[0]
    .trim();

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  const requestId = genRequestId();
  const startAt = new Date().toISOString();

  const body = req.body;

  // VALIDATION — ensure correct request shape
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid body' });
  }

  const order = body.order_form;

  if (!order) {
    return res.status(400).json({ error: 'Missing order_form object' });
  }

  const required = ['name', 'domicile', 'demand', 'phone', 'mail', 'createdDate'];
  for (const f of required) {
    if (!order[f] || String(order[f]).trim() === '') {
      return res.status(400).json({ error: `Missing field: ${f}` });
    }
  }

  // SPAM honeypot
  if (body.website || body.__honeypot) {
    return res.status(400).json({ error: 'Spam detected' });
  }

  // Minimal request logging (use DEBUG=true for more)
  console.info(`[${requestId}] submit received`, { ts: startAt, ip, keys: Object.keys(body) });
  if (DEBUG) console.info(`[${requestId}] full body:`, JSON.stringify(body).slice(0, 2000));

  // Prepare headers for forward (include api-key in both common header names)
  const forwardHeaders = {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    'x-api-key': API_KEY,
    'x-request-id': requestId,
    'x-forwarded-for': ip
  };

  // Helper to perform fetch with timeout and return object with details
  async function doForward(url, headers) {
    // Node's global fetch supports AbortController in modern environments (Next.js 12+).
    const controller = new AbortController();
    const FORWARD_TIMEOUT_MS = 15000; // plain number for compatibility
    const timeoutId = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);

    try {
      const fRes = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      });

      const respText = await safeText(fRes);
      const respPreview = respText ? respText.slice(0, 4000) : '';
      const respHeaders = {};
      try {
        fRes.headers.forEach((v, k) => (respHeaders[k] = v));
      } catch (err) {
        if (DEBUG) console.debug('headers.forEach error:', err);
      }

      return {
        ok: fRes.ok,
        status: fRes.status,
        statusText: fRes.statusText,
        bodyText: respText,
        bodyPreview: respPreview,
        headers: respHeaders
      };
    } catch (err) {
      if (DEBUG) console.warn('doForward fetch error:', err);
      return { error: String(err) };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // PRIMARY forward (header-based)
  const primaryUrl = N8N_WEBHOOK_URL;
  if (DEBUG) console.info(`[${requestId}] forwarding to primary URL: ${primaryUrl}`);

  const primaryResult = await doForward(primaryUrl, forwardHeaders);

  if (primaryResult.error) {
    console.warn(`[${requestId}] primary forward error:`, primaryResult.error);
  } else {
    console.info(
      `[${requestId}] primary forward result: status=${primaryResult.status} ok=${primaryResult.ok}`
    );
    if (DEBUG) {
      console.info(`[${requestId}] primary response headers:`, primaryResult.headers);
      console.info(`[${requestId}] primary response body preview:`, primaryResult.bodyPreview);
    }
  }

  // If primary succeeded (2xx), return that response body (try parse JSON)
  if (!primaryResult.error && primaryResult.ok) {
    let parsed = primaryResult.bodyText;
    try {
      parsed = JSON.parse(primaryResult.bodyText);
    } catch (err) {
      if (DEBUG) console.debug('primary JSON parse failed:', err);
      // keep raw text
    }
    return res.status(200).json({
      message: 'OK - forwarded to n8n (primary)',
      request_id: requestId,
      webhook_status: primaryResult.status,
      webhook_response: parsed
    });
  }

  // Else try fallback: append api-key in query param
  const fallbackUrl =
    `${N8N_WEBHOOK_URL}${N8N_WEBHOOK_URL.includes('?') ? '&' : '?'}api-key=${encodeURIComponent(API_KEY)}`;
  console.info(`[${requestId}] attempting fallback to URL-with-query: ${fallbackUrl}`);

  const fallbackResult = await doForward(fallbackUrl, {
    'Content-Type': 'application/json',
    'x-request-id': requestId,
    'x-forwarded-for': ip
  });

  if (fallbackResult.error) {
    console.error(`[${requestId}] fallback forward error:`, fallbackResult.error);
    return res.status(502).json({
      error: 'Failed to forward to webhook (primary and fallback)',
      request_id: requestId,
      primary: primaryResult,
      fallback: fallbackResult
    });
  }

  if (!fallbackResult.ok) {
    console.error(
      `[${requestId}] fallback responded non-ok status=${fallbackResult.status}`,
      fallbackResult.bodyPreview || ''
    );
    return res.status(502).json({
      error: 'Failed to forward to webhook (primary and fallback non-ok)',
      request_id: requestId,
      primary: primaryResult,
      fallback: fallbackResult
    });
  }

  // fallback ok
  let fbParsed = fallbackResult.bodyText;
  try {
    fbParsed = JSON.parse(fallbackResult.bodyText);
  } catch (err) {
    if (DEBUG) console.debug('fallback JSON parse failed:', err);
    // keep raw text
  }

  console.info(`[${requestId}] forwarded (fallback) status=${fallbackResult.status}`);
  if (DEBUG) console.info(`[${requestId}] fallback response body:`, fallbackResult.bodyPreview);

  return res.status(200).json({
    message: 'OK - forwarded to n8n (fallback)',
    request_id: requestId,
    webhook_status: fallbackResult.status,
    webhook_response: fbParsed
  });
}
