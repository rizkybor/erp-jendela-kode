'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

/* ---------- Config (tweak jika perlu) ---------- */
const CARD_HEIGHT_DESKTOP = 180;
const CARD_HEIGHT_MD = 170;
const CARD_HEIGHT_SM = 150;
const ICON_SIZE_LG = 84;
const ICON_SIZE_MD = 72;
const ICON_SIZE_SM = 52;
const TRUNCATE_LINES = 3;

/* ---------- Styled components ---------- */
const IconCircle = styled(Box)(({ theme }) => ({
  width: ICON_SIZE_MD,
  height: ICON_SIZE_MD,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.mode === 'dark' ? '#7c3aed' : '#6c4bd1'})`,
  boxShadow: '0 22px 48px rgba(16,24,40,0.16)',
  margin: '0 auto',
  transform: 'translateY(28px)',
  zIndex: 3,
  [theme.breakpoints.down('sm')]: {
    width: ICON_SIZE_SM,
    height: ICON_SIZE_SM,
    transform: 'translateY(20px)'
  },
  [theme.breakpoints.up('lg')]: {
    width: ICON_SIZE_LG,
    height: ICON_SIZE_LG,
    transform: 'translateY(34px)'
  }
}));

const Card = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1),
  height: CARD_HEIGHT_DESKTOP,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  boxShadow: '0 14px 30px rgba(16,24,40,0.06)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(16,24,40,0.03)'}`,
  boxSizing: 'border-box',
  overflow: 'hidden',
  transition: 'transform .18s ease, box-shadow .18s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 28px 60px rgba(16,24,40,0.08)'
  },
  [theme.breakpoints.down('md')]: {
    height: CARD_HEIGHT_MD
  },
  [theme.breakpoints.down('sm')]: {
    height: CARD_HEIGHT_SM,
    padding: theme.spacing(2)
  }
}));

const CardInner = styled(Box)({
  width: '100%',
  boxSizing: 'border-box'
});

/* clamp multiline (works in modern browsers) */
const Desc = styled(Typography)({
  display: '-webkit-box',
  WebkitLineClamp: TRUNCATE_LINES,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word'
});

/* ---------- Motion variants ---------- */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } };

/* ---------- Sample data (ganti icon/teks sesuai kebutuhan) ---------- */
const steps = [
  { step: 'Step 1', title: 'Discovery', desc: 'Understanding your business needs, goals, and target audience', icon: '🔍' },
  { step: 'Step 2', title: 'Design', desc: 'Creating beautiful, intuitive interfaces and user experiences', icon: '🎨' },
  { step: 'Step 3', title: 'Development', desc: 'Building robust, scalable solutions with modern technologies', icon: '💻' },
  { step: 'Step 4', title: 'Testing', desc: 'Rigorous quality assurance to ensure flawless performance', icon: '🧪' },
  { step: 'Step 5', title: 'Launch', desc: 'Deploying your solution and providing ongoing support', icon: '🚀' }
];

/* utility to split into top-row (3 first) and bottom-row (2 next) */
// const topRow = steps.slice(0, 3);
// const bottomRow = steps.slice(3, 5);

/* ---------- Component ---------- */
export default function ProcessPageResponsive() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* header */}
      <Box textAlign="center" sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: '1.45rem', md: '2.25rem' } }}>
          Our{' '}
          <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              background: 'linear-gradient(90deg,#1f9bf0,#f91fa9,#1f9bf0)',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}
          >
            Process
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          A proven 5-step methodology that ensures successful project delivery
        </Typography>
      </Box>

      <MotionBox initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={container}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          justifyContent="center"
          alignItems="flex-start"
          rowGap={{ xs: 6, md: 10 }}
          sx={{
            mx: 'auto',
            maxWidth: '80%',
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          {steps.map((s) => (
            <Grid
              key={s.title}
              item
              xs={12}
              sm={6}
              md={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                [theme.breakpoints.up('md')]: {
                  flexBasis: '30%',
                  maxWidth: '30%'
                }
              }}
            >
              <MotionBox variants={fadeUp} sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconCircle>{s.icon}</IconCircle>
                </Box>
                <Box sx={{ mt: { xs: '2px', md: '45px' } }}>
                  <Card role="article" aria-labelledby={`proc-${s.title}`}>
                    <CardInner>
                      <Stack spacing={1}>
                        <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                          {s.step}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {s.title}
                        </Typography>
                        <Desc variant="body2" color="text.secondary">
                          {s.desc}
                        </Desc>
                      </Stack>
                    </CardInner>
                  </Card>
                </Box>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </MotionBox>
    </Container>
  );
}
