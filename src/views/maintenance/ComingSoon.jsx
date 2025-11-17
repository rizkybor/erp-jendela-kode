'use client';

import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// project-imports
import IconButton from 'components/@extended/IconButton';

// assets
import { Notification } from '@wandersonalwes/iconsax-react';
import SvgIcon from '@mui/material/SvgIcon';
import AuthBackground from '../../../public/assets/images/auth/AuthBackground';
const coming1 = '/assets/images/maintenance/img-soon-1-1.png';
const coming2 = '/assets/images/maintenance/img-soon-1-2.png';

// ==============================|| COMING SOON ||============================== //

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleNotifyMe = async () => {
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Silakan masukkan email yang valid' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/mbjzpbla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          to: 'jeko.idn@gmail.com',
          message: `Subscriber baru: ${email}`
        })
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Terima kasih! Anda akan menerima notifikasi.' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: 'Terjadi kesalahan, silakan coba lagi.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan, silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthBackground />
      <Container fixed>
        <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Grid size={{ md: 6 }}>
            <Box sx={{ width: { xs: 300, md: 'auto' }, margin: '0 auto' }}>
              <Grid container spacing={3} direction="column">
                <Grid size={12}>
                  <Stack sx={{ gap: 3 }}>
                    <Typography variant="h4">Coming Soon</Typography>
                    <Typography variant="h2">
                      <Box sx={{ color: 'primary.main', display: 'inline-block' }}>Jendela Kode</Box> - Journey to Digital Transformation
                      Services.
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      The ERP platform and integrated management system we've developed is currently in the final stages of development.
                    </Typography>
                     <Typography sx={{ color: 'text.secondary' }}>
                     We build solutions that are stable, fast, and fully tailored to your company's operational needs.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid sx={{ width: { xs: 320, md: 380 } }} size={12}>
                  <Stack sx={{ gap: 3, mt: 2 }}>
                    {message.text && (
                      <Alert severity={message.type} sx={{ mb: 1 }}>
                        {message.text}
                      </Alert>
                    )}
                    <Stack direction="row" sx={{ gap: 1 }}>
                      <TextField
                        fullWidth
                        placeholder="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                      <Button
                        variant="contained"
                        sx={{ width: '50%' }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Notification variant="Bold" />}
                        onClick={handleNotifyMe}
                        disabled={loading}
                      >
                        {loading ? 'Mengirim...' : 'Notify Me'}
                      </Button>
                    </Stack>
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                      <IconButton
                        component="a"
                        href="https://www.instagram.com/jendelakode/"
                        target="_blank"
                        rel="noopener noreferrer"
                        shape="rounded"
                        color="secondary"
                      >
                        <SvgIcon fontSize="small" sx={{ width: 20, height: 20 }}>
                          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm5 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm4.75-.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
                        </SvgIcon>
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid size={{ md: 6 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'start', width: { xs: 360, sm: 'auto' }, height: '100vh', overflow: 'hidden' }}
            >
              <Box sx={{ position: 'relative', width: '280px' }}>
                <Box
                  sx={{
                    lineHeight: 0,
                    position: 'absolute',
                    animation: 'img-l1 50s infinite linear',
                    '@keyframes img-l1': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(0%)' } }
                  }}
                >
                  <CardMedia component="img" src={coming1} alt="coming soon 1" />
                </Box>
                <Box
                  sx={{
                    lineHeight: 0,
                    position: 'absolute',
                    animation: 'img-l2 50s infinite linear',
                    '@keyframes img-l2': { '0%': { transform: 'translateY(0%)' }, '100%': { transform: 'translateY(100%)' } }
                  }}
                >
                  <CardMedia component="img" src={coming1} alt="coming soon 2" />
                </Box>
              </Box>
              <Box sx={{ position: 'relative', width: '280px' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    animation: 'img-r1 50s infinite linear',
                    '@keyframes img-r1': { '0%': { transform: 'translateY(0%)' }, '100%': { transform: 'translateY(-100%)' } }
                  }}
                >
                  <CardMedia component="img" src={coming2} alt="coming soon 1" />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    animation: 'img-r2 50s infinite linear',
                    '@keyframes img-r2': { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0%)' } }
                  }}
                >
                  <CardMedia component="img" src={coming2} alt="coming soon 1" />
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
