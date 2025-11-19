'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// motion wrappers
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// sample data (ganti dengan data/ikon Anda jika perlu)
const features = [
  { icon: '🏅', title: 'Proven Expertise', description: 'Years of experience delivering successful projects across various industries' },
  { icon: '👥', title: 'Dedicated Team', description: 'Skilled professionals committed to your project success' },
  { icon: '💡', title: 'Innovative Solutions', description: 'Cutting-edge technology and creative problem-solving approach' },
  { icon: '🛡️', title: 'Quality Assurance', description: 'Rigorous testing and quality control for flawless delivery' },
  { icon: '⏱️', title: 'Timely Delivery', description: 'Agile methodology ensuring on-time project completion' },
  { icon: '📈', title: 'Scalable Architecture', description: 'Future-proof solutions that grow with your business' }
];

// fixed heights (tweak values if you want taller/shorter)
const CARD_HEIGHT_DESKTOP = 200;
const CARD_HEIGHT_MD = 180;
const CARD_HEIGHT_SM = 160;

/* ---------- Styled components ---------- */
const FeatureCard = styled((props) => <Paper elevation={0} {...props} />)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(5, 4, 4, 4),
  height: CARD_HEIGHT_DESKTOP,
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(16,24,40,0.035)'}`,
  boxShadow: theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.5)' : '0 18px 40px rgba(16,24,40,0.04)',
  overflow: 'hidden',
  transition: 'transform .22s ease, box-shadow .22s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 28px 60px rgba(16,24,40,0.08)'
  },
  boxSizing: 'border-box',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    height: CARD_HEIGHT_MD
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    height: CARD_HEIGHT_SM
  }
}));

const IconBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  left: theme.spacing(3),
  width: 52,
  height: 52,
  borderRadius: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.mode === 'dark' ? '#7c3aed' : '#6c4bd1'})`,
  boxShadow: '0 8px 20px rgba(16,24,40,0.08)',
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(2),
    left: theme.spacing(2),
    width: 44,
    height: 44
  }
}));

const Content = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(8), // reserve space for icon badge
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0, // CRITICAL: allow flex children to shrink
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(6)
  },
  // description clamp + break rules to avoid width expansion
  '& .desc': {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word'
  }
}));

/* Motion variants */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } } };

export default function ChooseUsPage() {
  const theme = useTheme();

  // split to left/right columns (left: first 3, right: next 3)
  const left = features.slice(0, 3);
  const right = features.slice(3, 6);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      {/* Header */}
      <Box textAlign="center" sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: '1.6rem', md: '2.25rem' } }}>
          Why{' '}
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
            Choose Us
          </Typography>
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.25, maxWidth: 780, mx: 'auto', fontSize: { xs: 13.5, md: 15 } }}>
          Discover what sets us apart and makes us the right partner for your digital journey
        </Typography>
      </Box>

      <MotionBox initial="hidden" whileInView="show" viewport={{ once: true }} variants={container} role="list" sx={{ width: '100%' }}>
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            mx: 'auto',
            maxWidth: '80%',
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          {/* LEFT column (exact 50% on md+) */}
          <Grid
            item
            xs={12}
            md={6}
            role="region"
            aria-label="left-column"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2.5, md: 3 },
              // Force exact 50% width on md+
              [theme.breakpoints.up('md')]: {
                flexBasis: '50%',
                maxWidth: '50%'
              },
              boxSizing: 'border-box',
              minWidth: 0 // allow shrinking
            }}
          >
            {left.map((f) => (
              <MotionPaper
                key={f.title}
                variants={item}
                component={FeatureCard}
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <IconBadge aria-hidden>{f.icon}</IconBadge>
                <Content>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.2 }}>
                    {f.title}
                  </Typography>
                  <Typography
                    className="desc"
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.9, fontSize: { xs: 13, md: 14 } }}
                  >
                    {f.description}
                  </Typography>
                </Content>
              </MotionPaper>
            ))}
          </Grid>

          {/* RIGHT column (exact 50% on md+) */}
          <Grid
            item
            xs={12}
            md={6}
            role="region"
            aria-label="right-column"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2.5, md: 3 },
              [theme.breakpoints.up('md')]: {
                flexBasis: '50%',
                maxWidth: '50%'
              },
              boxSizing: 'border-box',
              minWidth: 0
            }}
          >
            {right.map((f) => (
              <MotionPaper
                key={f.title}
                variants={item}
                component={FeatureCard}
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <IconBadge aria-hidden>{f.icon}</IconBadge>
                <Content>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.2 }}>
                    {f.title}
                  </Typography>
                  <Typography
                    className="desc"
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.9, fontSize: { xs: 13, md: 14 } }}
                  >
                    {f.description}
                  </Typography>
                </Content>
              </MotionPaper>
            ))}
          </Grid>
        </Grid>
      </MotionBox>
    </Container>
  );
}
