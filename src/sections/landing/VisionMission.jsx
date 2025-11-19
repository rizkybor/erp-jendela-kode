'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';

import { motion } from 'framer-motion';

const MotionBox = motion(Box);

/* ---------- Configuration ---------- */
const CARD_HEIGHT = 220; // tinggi tetap kartu (px). Sesuaikan bila perlu.
const TRUNCATE_LENGTH = 100; // karakter maksimum sebelum dipotong

/* ---------- Styled components (sejajar) ---------- */

const StatCard = styled((props) => <Paper elevation={0} {...props} />)(({ theme }) => ({
  borderRadius: theme.spacing(2.25),
  padding: theme.spacing(4),
  height: CARD_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(16,24,40,0.03)'}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 30px rgba(0,0,0,0.45)'
    : '0 12px 28px rgba(16,24,40,0.06)',
  transition: 'transform .18s ease, box-shadow .18s ease',
  overflow: 'hidden', // sembunyikan overflow untuk kerapian
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 28px 60px rgba(16,24,40,0.08)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    height: Math.max(CARD_HEIGHT * 0.85, 160)
  }
}));

const IconBadge = styled(Box)(({ theme }) => ({
  width: 52,
  height: 52,
  borderRadius: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.mode === 'dark' ? '#7c3aed' : '#6c4bd1'})`,
  boxShadow: '0 8px 18px rgba(16,24,40,0.06)',
  flexShrink: 0
}));

const CardTopRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
  alignItems: 'flex-start'
}));

/* motion variants */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

/* data (emoji placeholders; Anda bisa ganti dengan ikon komponen) */
const data = [
  {
    icon: '🎯',
    title: 'Our Mission',
    desc:
      'To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation in an ever-evolving digital landscape.'
  },
  {
    icon: '👁️',
    title: 'Our Vision',
    desc:
      'To be the leading technology partner in Southeast Asia, recognized for excellence, innovation, and creating lasting impact for our clients.'
  },
  {
    icon: '💙',
    title: 'Our Values',
    desc:
      'Integrity, innovation, and client success are at the heart of everything we do. We believe in building long-term partnerships based on trust and excellence.'
  }
];

function truncateText(text, maxLen) {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

export default function VisionMissionPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Box textAlign="center" sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.4rem', md: '1.9rem', lg: '2.1rem' },
            lineHeight: 1.05
          }}
        >
          Our{' '}
          <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              background: 'linear-gradient(90deg,#1f9bf0,#6b46c1,#1f9bf0) 0 0 / 300% 100%',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animation: 'move-bg 24s linear infinite',
              '@keyframes move-bg': { '100%': { backgroundPosition: '300% 0' } }
            }}
          >
            Mission & Vision
          </Typography>
        </Typography>
      </Box>

      {/* Cards */}
      <MotionBox initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="stretch"
          justifyContent="center"
          wrap="wrap"
          sx={{
            mx: 'auto',
            maxWidth: '80%',
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          {data.map((item) => (
            <Grid
              key={item.title}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'stretch',
               
              }}
            >
              <MotionBox component="div" variants={fadeUp} sx={{ width: '100%' }}>
                <StatCard
                  role="article"
                  aria-labelledby={`vm-${item.title}`}
                  sx={{
                    width: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    // fix height and prevent content stretching card beyond height
                    height: { xs: Math.max(CARD_HEIGHT * 0.85, 160), md: CARD_HEIGHT },
                    overflow: 'hidden'
                  }}
                >
                  <CardTopRow>
                    <IconBadge aria-hidden>{item.icon}</IconBadge>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        id={`vm-${item.title}`}
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1.25, fontSize: { xs: 18, md: 20 } }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </CardTopRow>

                  <Box sx={{ mt: 1.25, flex: 1, minHeight: 0 }}>
                    {/* truncated text so height stays uniform */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.85,
                        fontSize: { xs: 14, md: 14 },
                        // ensure text does not overflow visually
                        overflow: 'hidden'
                      }}
                    >
                      {truncateText(item.desc, TRUNCATE_LENGTH)}
                    </Typography>
                  </Box>
                </StatCard>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </MotionBox>
    </Container>
  );
}