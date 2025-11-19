// src/sections/extra-pages/contact/Map.jsx
'use client';

import { useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// NOTE: use the icons package present in your package.json
import { Location, Maximize, Global } from '@wandersonalwes/iconsax-react';

export default function MapOnly({
  src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.548563445958!2d106.7482853!3d-6.3228422999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebd8b4f4a8a3%3A0xbbe3bc7a71ecdc63!2sPondok%20Cabe%20Raya%2C%20Pamulang%2C%20South%20Tangerang!5e0!3m2!1sen!2sid!4v1700000000000',
  title = 'Office location',
  defaultHeight = { xs: 300, sm: 420, md: 520, lg: 640 },
  allowFullScreen = true
}) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const height = isMd ? defaultHeight.md : isSm ? defaultHeight.sm : defaultHeight.xs;
  const [loaded, setLoaded] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const containerRef = useRef(null);

  // Convert embed URL to a Google Maps view URL suitable for opening in a new tab.
  // Examples:
  // - embed: https://www.google.com/maps/embed?pb=...
  // - view (works in browser): https://www.google.com/maps/?pb=...
  // If possible, extract lat/lng using pattern !2d<lng>!3d<lat> to create q=lat,lng link.
  const embedToMapsLink = (embedUrl) => {
    try {
      // try extracting lat/lng from common embed pattern
      const coordMatch = embedUrl.match(/!2d([-\d.]+)!3d([-\d.]+)/);
      if (coordMatch && coordMatch.length >= 3) {
        const lng = coordMatch[1];
        const lat = coordMatch[2];
        return `https://www.google.com/maps?q=${lat},${lng}`;
      }

      // Fallback: transform /embed? -> /?
      if (embedUrl.includes('/embed?')) {
        return embedUrl.replace('/embed?', '/?');
      }

      // last resort: return original (browser will handle or show message)
      return embedUrl;
    } catch {
      return embedUrl;
    }
  };

  // Toggle fullscreen using Fullscreen API
  const toggleFullScreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFull(true);
      } else {
        await document.exitFullscreen();
        setIsFull(false);
      }
    } catch (err) {
      // Keep state consistent and record debug info
      /* eslint-disable-next-line no-console */
      console.debug('Fullscreen toggle error:', err);
      setIsFull(Boolean(document.fullscreenElement));
    }
  };

  const handleCenter = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      containerRef.current.style.boxShadow = `0 6px 30px rgba(14,30,80,0.12)`;
      setTimeout(() => {
        if (containerRef.current) containerRef.current.style.boxShadow = '';
      }, 700);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        width: {
          xs: '80%',
          md: '90%',
          lg: '100%'
        },
        mx: 'auto'
      }}
    >
      <Grid size={12}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: 3,
            paddingTop: 10
          }}
        >
          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 550 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.2
              }}
            >
              <Typography variant="h2">
                Our{' '}
                <Typography
                  variant="h1"
                  component="span"
                  sx={{
                    fontSize: 'inherit',
                    background: 'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                    color: 'transparent',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    animation: 'move-bg 24s infinite linear',
                    '@keyframes move-bg': {
                      '100%': { backgroundPosition: '400% 0' }
                    }
                  }}
                >
                  Location
                </Typography>
              </Typography>
            </motion.div>
          </Grid>

          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 550 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.4
              }}
            >
              <Typography>Visit our office for a firsthand look at our operations and the solutions we deliver.</Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Grid>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, ease: 'easeOut' }}>
        <Paper
          ref={containerRef}
          elevation={3}
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            height,
            minHeight: 200,
            bgcolor: 'background.paper',
            border: (theme) => `1px solid ${theme.palette.divider}`
          }}
        >
          {!loaded && (
            <Skeleton variant="rectangular" width="100%" height={height} animation="wave" sx={{ position: 'absolute', inset: 0 }} />
          )}

          <Box
            component="iframe"
            title={title}
            src={src}
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; geolocation"
            allowFullScreen={allowFullScreen}
            sandbox="allow-same-origin allow-scripts allow-popups allow-pointer-lock allow-presentation allow-forms"
            onLoad={() => setLoaded(true)}
            style={{ border: 0, width: '100%', height: '100%' }}
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating controls */}
          <Box
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              display: 'flex',
              gap: 1,
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10
            }}
          >
            <Tooltip title="Center & emphasize" placement="left">
              <IconButton
                size="small"
                onClick={handleCenter}
                aria-label="center-map"
                sx={{ bgcolor: 'rgba(255,255,255,0.86)', boxShadow: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' } }}
              >
                <Location size="16" variant="Bulk" />
              </IconButton>
            </Tooltip>

            <Tooltip title={isFull ? 'Exit fullscreen' : 'Fullscreen'} placement="left">
              <IconButton
                size="small"
                onClick={toggleFullScreen}
                aria-label="toggle-fullscreen"
                sx={{ bgcolor: 'rgba(255,255,255,0.86)', boxShadow: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' } }}
              >
                <Maximize
                  size="16"
                  variant="Bulk"
                  style={{
                    transform: isFull ? 'rotate(180deg) scaleX(-1)' : 'none',
                    transition: 'transform 160ms ease'
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Open provider in new tab" placement="left">
              <IconButton
                size="small"
                component="a"
                href={embedToMapsLink(src)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="open-map"
                sx={{ bgcolor: 'rgba(255,255,255,0.86)', boxShadow: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' } }}
              >
                <Global size="16" variant="Bulk" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Bottom label */}
          <Box
            sx={{
              position: 'absolute',
              left: 12,
              bottom: 12,
              bgcolor: 'rgba(255,255,255,0.78)',
              px: 1.5,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: 12,
              boxShadow: 1,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <Box component="span" sx={{ mr: 0.75, display: 'inline-flex', alignItems: 'center' }}>
              <Location size="14" variant="Bulk" />
            </Box>
            <Box component="span">Interactive map — drag to explore</Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
