'use client';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

const servicesData = [
  {
    icon: '🌐',
    title: 'Professional',
    description: 'Custom, responsive websites built with modern frameworks and best practices'
  },
  {
    icon: '📱',
    title: 'Fast Delivery',
    description: 'Native and cross-platform mobile applications for iOS and Android'
  },
  {
    icon: '🎨',
    title: 'User Centric',
    description: 'Beautiful, intuitive interfaces designed for optimal user experience'
  },
  {
    icon: '💻',
    title: 'Secure',
    description: 'Tailored software solutions to meet your unique business needs'
  }
];

// ==============================|| LANDING - SERVICE PAGE ||============================== //

export default function CorePage() {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          mt: { md: 15, xs: 2.5 },
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
              paddingTop: 3
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
                      background:
                        'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                      color: 'transparent',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      animation: 'move-bg 24s infinite linear',
                      '@keyframes move-bg': {
                        '100%': { backgroundPosition: '400% 0' }
                      }
                    }}
                  >
                    Core
                  </Typography>{' '}
                  Strengths
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
                <Typography>
                  What makes us the preferred choice for digital transformation
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
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

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ flexGrow: 1 }}
                      >
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
  );
}