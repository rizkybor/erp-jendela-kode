'use client';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from '../../landing/Animation';
import MainCard from 'components/MainCard';

const servicesData = [
  {
    icon: '🌐',
    title: 'Email',
    description: 'info@jendelakode.com | jeko.idn@gmail.com'
  },
  {
    icon: '📱',
    title: 'Whatsapp',
    description: '(+62) 851 2111 0794 - Rizky'
  },
  {
    icon: '🎨',
    title: 'Office Address',
    description: 'Jl. Pd. Cabe Raya, Pd. Cabe Udik, Kec. Pamulang, Kota Tangerang Selatan, Banten 15418'
  },
  {
    icon: '💻',
    title: 'Working Hours',
    description: 'Mon - Fri: 9:00 AM - 6:00 PM | Sat - Sun: Closed | Public Holidays: Closed'
  }
];

// ==============================|| LANDING - SERVICE PAGE ||============================== //

export default function GetInTouchPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        width: '100%',
        background: isDark
          ? 'none'
          : 'linear-gradient(to bottom, #e0e0e0, transparent)'
      }}
    >
      <Container>
        <Grid
          container
          spacing={3}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            mt: { md: 25, xs: 2.5 },
            mb: { md: 10, xs: 2.5 }
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
                    Get In{' '}
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
                      Touch
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
                  <Typography>We're here to help and answer any question you might have</Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={12}>
            <Grid container justifyContent="center" spacing={3} sx={{ alignItems: 'stretch', maxWidth: '80%', mx: 'auto' }}>
              {servicesData.map((service, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <FadeInWhenVisible>
                    <MainCard
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
                        }
                      }}
                    >
                      <Stack spacing={2} sx={{ height: '100%' }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                          }}
                        >
                          {service.icon}
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {service.title}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
                          {service.description}
                        </Typography>
                      </Stack>
                    </MainCard>
                  </FadeInWhenVisible>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
