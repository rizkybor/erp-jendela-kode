'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

// project import
import { ThemeMode } from 'config';

// icons
import { Box2, Wallet, Graph, Clock } from '@wandersonalwes/iconsax-react';

// assets
const figmaLight = '/assets/images/landing/chatDark.png';
const figmaDark = '/assets/images/landing/chatLight.png';

// =============================|| LANDING - CHATBOT FINANCIAL TRACKER (Clean) ||============================= //

export default function FigmaBlock() {
  const theme = useTheme();
  const FigmaImg = theme.palette.mode === ThemeMode.DARK ? figmaDark : figmaLight;

  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: { md: 15, xs: 3 }, mb: { md: 10, xs: 3 } }}
      >
        {/* header */}
        <Grid item xs={12}>
          <Grid container justifyContent="center" sx={{ textAlign: 'center', mb: 4 }}>
            <Grid item xs={12} sm={10} md={6}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 1.5 }}>
                BangLaporin — Chatbot Financial Tracker
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                Pantau pengeluaran, atur anggaran, dan dapatkan insight secara percakapan. Mudah dipakai, aman, dan
                cocok untuk individu maupun tim kecil.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  component={Link}
                  href="/chatfin-request"
                  variant="contained"
                  size="large"
                  startIcon={<Box2 />}
                >
                  Request BangLaporin
                </Button>

                {/* <Button component={Link} href="#features" variant="outlined" size="large">
                  Pelajari fitur
                </Button> */}
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* main two-column area */}
        <Grid item xs={12}>
          <Grid container spacing={4} alignItems="stretch">
            {/* left column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Fitur utama
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Automasi pencatatan transaksi, kategori & analisis, pengingat tagihan, dan ekspor laporan.
                  </Typography>

                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Chip icon={<Wallet />} label="Screen & View" sx={{ height: 44, fontWeight: 600 }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip icon={<Graph />} label="Analisis" sx={{ height: 44, fontWeight: 600 }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip icon={<Clock />} label="Pengingat" sx={{ height: 44, fontWeight: 600 }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip label="Ekspor CSV" sx={{ height: 44, fontWeight: 600 }} />
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'common.white', boxShadow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Integrasi</Typography>
                      <Typography variant="caption" color="text.secondary">Sinkron bank & e-wallet</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'common.white', boxShadow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Keamanan</Typography>
                      <Typography variant="caption" color="text.secondary">Data terenkripsi</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'common.white', boxShadow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Skalabilitas</Typography>
                      <Typography variant="caption" color="text.secondary">Untuk individu & tim kecil</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 'auto' }}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Privasi diutamakan — data tersimpan terenkripsi, kontrol penuh ada di tangan Anda.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* right column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                {/* medium image */}
                <Card
                  sx={{
                    width: { xs: '86%', sm: 380, md: 360 },
                    borderRadius: 3,
                    boxShadow: 6,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`
                  }}
                >
                  <CardMedia component="img" src={FigmaImg} alt="BangLaporin preview" sx={{ width: '100%', display: 'block' }} />
                </Card>

                {/* two preview cards */}
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Ringkasan hari ini</Typography>
                      <Typography variant="caption" color="text.secondary">Pengeluaran: Rp 120.000</Typography>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Langganan</Typography>
                      <Typography variant="caption" color="text.secondary">Spotify · Rp 49.000</Typography>
                    </Card>
                  </Grid>
                </Grid>

                <Typography variant="caption" color="text.secondary">
                  Gambar ukuran medium agar proporsional terhadap konten.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
