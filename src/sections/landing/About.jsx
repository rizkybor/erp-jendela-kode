'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme, styled } from '@mui/material/styles';

import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const StatsWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2.25), // 18px
  padding: theme.spacing(4.5), // sedikit lebih tebal padding
  background: `linear-gradient(180deg, ${theme.palette.mode === 'dark' ? '#121018' : '#f8fbff'} 0%, ${theme.palette.mode === 'dark' ? '#161423' : '#f3eefb'} 100%)`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 10px 36px rgba(0,0,0,0.6)'
    : // lebih lembut namun sedikit tebal untuk desktop
      '0 18px 42px rgba(83, 89, 255, 0.04)',
  // responsive padding
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5)
  },
  // keep content centered on very large screens; diperlebar
  maxWidth: 1400,
  margin: '0 auto'
}));

const StatCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1.5), // 12px
  padding: theme.spacing(3.25), // 26px
  minHeight: 120,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 10px 28px rgba(0,0,0,0.6)'
    : // gunakan multi-layer shadow yang lembut & tebal
      '0 6px 12px rgba(16,24,40,0.04), 0 20px 48px rgba(16,24,40,0.06), 0 32px 72px rgba(16,24,40,0.04)',
  transition: 'transform .18s ease, box-shadow .18s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 24px 56px rgba(16,24,40,0.10)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

export default function AboutPage() {
  const theme = useTheme();

  const stats = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '50+', label: 'Happy Clients' },
    { value: '25+', label: 'Team Members' },
    { value: '5+', label: 'Years Experience' }
  ];

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={{ xs: 3, md: 6 }}
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          mt: { md: 12, xs: 4 },
          mb: { md: 10, xs: 4 }
        }}
      >
        {/* Header / Intro */}
        <Grid item xs={12}>
          <MotionBox initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariant}>
            <MotionBox variants={fadeUp}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  lineHeight: 1.05,
                  mb: 2
                }}
              >
                About{' '}
                <Typography
                  component="span"
                  sx={{
                    fontSize: 'inherit',
                    background: 'linear-gradient(90deg,#1f9bf0,#f91fa9,#1f9bf0) 0 0 / 300% 100%',
                    color: 'transparent',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    animation: 'move-bg 24s linear infinite',
                    '@keyframes move-bg': { '100%': { backgroundPosition: '300% 0' } }
                  }}
                >
                  Jendela Kode
                </Typography>
              </Typography>
            </MotionBox>

            <MotionBox variants={fadeUp}>
              <Box sx={{ maxWidth: 920, mx: 'auto' }}>
                <Typography variant="body1" color="text.primary" sx={{ mb: 2, fontSize: { xs: 14.5, md: 16 }, lineHeight: 1.85 }}>
                  We are a passionate team of developers, designers, and innovators dedicated to transforming businesses through cutting-edge technology solutions.
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 2, fontSize: { xs: 14.5, md: 16 }, lineHeight: 1.85 }}>
                  Founded in 2019, Jendela Kode has grown from a small startup to a trusted technology partner for businesses across various industries. We believe in creating digital solutions that not only meet today's needs but are built to scale for tomorrow's challenges.
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: 14.5, md: 16 }, lineHeight: 1.85 }}>
                  Our team combines technical expertise with creative thinking to deliver exceptional results. We work closely with our clients to understand their unique needs and create tailored solutions that drive real business value.
                </Typography>
              </Box>
            </MotionBox>
          </MotionBox>
        </Grid>

        {/* Stats area — LEBIH LEBAR & 4 KARTU SATU BARIS PADA DESKTOP */}
        <Grid item xs={12}>
          <MotionBox initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariant}>
            <MotionBox variants={fadeUp}>
              <StatsWrapper role="region" aria-label="Company statistics">
                <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch" justifyContent="center">
                  {stats.map((s) => (
                    <Grid
                      key={s.label}
                      item
                      xs={12}   
                      sm={6}    
                      md={3}    
                      sx={{ display: 'flex' }}
                    >
                      <MotionPaper
                        variants={fadeUp}
                        whileHover={{ y: -6, boxShadow: `0 22px 48px rgba(16,24,40,0.08)` }}
                        elevation={0}
                        component={StatCard}
                        aria-labelledby={`stat-${s.label}`}
                        sx={{ width: '100%' }}
                      >
                        <Stack spacing={0.5}>
                          <Typography id={`stat-${s.label}`} variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                            {s.value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 13, md: 14 } }}>
                            {s.label}
                          </Typography>
                        </Stack>
                      </MotionPaper>
                    </Grid>
                  ))}
                </Grid>
              </StatsWrapper>
            </MotionBox>
          </MotionBox>
        </Grid>
      </Grid>
    </Container>
  );
}