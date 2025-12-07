'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';

// ------------------ Provinces List ------------------
const provinces = [
  'Aceh',
  'Bali',
  'Bangka Belitung',
  'Banten',
  'Bengkulu',
  'DI Yogyakarta',
  'DKI Jakarta',
  'Gorontalo',
  'Jambi',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Kalimantan Barat',
  'Kalimantan Selatan',
  'Kalimantan Tengah',
  'Kalimantan Timur',
  'Kalimantan Utara',
  'Kepulauan Riau',
  'Lampung',
  'Maluku',
  'Maluku Utara',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Papua',
  'Papua Barat',
  'Riau',
  'Sulawesi Barat',
  'Sulawesi Selatan',
  'Sulawesi Tengah',
  'Sulawesi Tenggara',
  'Sulawesi Utara',
  'Sumatera Barat',
  'Sumatera Selatan',
  'Sumatera Utara'
];

// ------------------ Helpers ------------------
function toLocalPhone(raw) {
  if (!raw) return '';
  const d = raw.replace(/[^\d]/g, '');
  if (!d) return '';
  if (d.startsWith('62')) return '0' + d.slice(2);
  if (d.startsWith('0')) return d;
  if (/^[89]/.test(d)) return '0' + d;
  return d;
}

function todayDDMMYYYY() {
  const t = new Date();
  const dd = String(t.getDate()).padStart(2, '0');
  const mm = String(t.getMonth() + 1).padStart(2, '0');
  const yy = t.getFullYear();
  return `${dd}-${mm}-${yy}`;
}

// ================= Contact Form (sends to /api/submit) =================
export default function ContactForm() {
  // form fields
  const [name, setName] = useState('');
  const [domicile, setDomicile] = useState('');
  const [phoneRaw, setPhoneRaw] = useState('');
  const [mail, setMail] = useState('');
  const [demand, setDemand] = useState('');
  const [termsChecked, setTermsChecked] = useState(true);

  // honeypot (hidden) — intentionally visible in state but not in UI
  const [honeypot, setHoneypot] = useState('');

  // UI states
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { severity: 'success'|'error', text }

  const apiEndpoint = '/api/submit'; // Next.js API route

  const validate = () => {
    if (!name.trim()) return { ok: false, msg: 'Nama harus diisi.' };
    if (!domicile.trim()) return { ok: false, msg: 'Pilih domisili.' };
    if (!phoneRaw.trim()) return { ok: false, msg: 'Nomor telepon harus diisi.' };
    if (!mail.trim()) return { ok: false, msg: 'Email harus diisi.' };
    if (!/\S+@\S+\.\S+/.test(mail)) return { ok: false, msg: 'Format email tidak valid.' };
    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    if (!termsChecked) {
      setResult({ severity: 'error', text: 'Silakan setujui Terms & Condition.' });
      return;
    }

    const check = validate();
    if (!check.ok) {
      setResult({ severity: 'error', text: check.msg });
      return;
    }

    // build payload according to requested JSON structure
    const payload = {
      order_form: {
        name: name.trim(),
        domicile: domicile.trim(),
        demand: demand.trim(),
        phone: toLocalPhone(phoneRaw).trim(),
        mail: mail.trim(),
        createdDate: todayDDMMYYYY()
      },
      __honeypot: honeypot // include honeypot so server can check
    };

    try {
      setLoading(true);

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // show server-provided message if available
        const text = data?.error || data?.message || `Submit failed (${res.status})`;
        setResult({ severity: 'error', text });
      } else {
        // success: server may return forwarded result in `forwarded`
        const msg = data?.message || 'Form berhasil dikirim.';
        setResult({ severity: 'success', text: msg + (data?.forwarded ? ' (forwarded)' : '') });

        // optional: clear form after success (comment/uncomment as desired)
        setName('');
        setDomicile('');
        setPhoneRaw('');
        setMail('');
        setDemand('');
        setTermsChecked(true);
      }
    } catch (err) {
      console.error('submit error', err);
      setResult({ severity: 'error', text: 'Gagal mengirim form. Periksa koneksi Anda.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 520,
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          boxShadow: '0 24px 80px rgba(14,30,55,0.06)'
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Request BangLaporin Chat Bot
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Pendaftaran dalam waiting list sampai 20 Desember 2025 — isi formulir untuk bergabung.
            </Typography>
          </motion.div>
        </Box>

        {/* result alert */}
        {result && (
          <Alert severity={result.severity} sx={{ mb: 2 }}>
            {result.text}
          </Alert>
        )}

        {/* form fields (vertical order) */}
        <Stack spacing={2}>
          <TextField label="Name" size="small" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

          <TextField
            label="Domicile (Province)"
            select
            size="small"
            fullWidth
            value={domicile}
            onChange={(e) => setDomicile(e.target.value)}
          >
            <MenuItem value="">Pilih provinsi</MenuItem>
            {provinces.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Phone Number"
            size="small"
            fullWidth
            value={phoneRaw}
            onChange={(e) => setPhoneRaw(e.target.value)}
            helperText="Contoh: 0812xxxxxxx (akan dikirim sebagai local 0-prefixed)"
          />

          <TextField label="Email Address" size="small" fullWidth type="email" value={mail} onChange={(e) => setMail(e.target.value)} />

          <TextField
            label="Demand (kebutuhan singkat)"
            size="small"
            fullWidth
            multiline
            rows={4}
            value={demand}
            onChange={(e) => setDemand(e.target.value)}
          />

          {/* hidden honeypot input (not visible) */}
          <input
            name="__honeypot"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
            style={{ display: 'none' }}
          />

          <FormControlLabel
            control={<Checkbox checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />}
            label={<Typography variant="body2">I agree to the Terms & Condition</Typography>}
          />

          <Button type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? <CircularProgress size={18} /> : 'Submit'}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
