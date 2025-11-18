'use client';

import { useState, useEffect } from 'react';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion, AnimatePresence } from 'framer-motion';

const portfolioData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce platform with advanced features and smooth user experience',
    image: '/assets/images/landing/portfolio-1.jpg',
    category: 'Web Development'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with real-time transactions and analytics',
    image: '/assets/images/landing/portfolio-2.jpg',
    category: 'Mobile App'
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    description: 'Comprehensive dashboard for data visualization and business analytics',
    image: '/assets/images/landing/portfolio-3.jpg',
    category: 'Web Development'
  },
  {
    id: 4,
    title: 'Fitness Tracking App',
    description: 'Cross-platform fitness app with wearable integration and AI coaching',
    image: '/assets/images/landing/portfolio-4.jpg',
    category: 'Mobile App'
  },
  {
    id: 5,
    title: 'Travel Booking Platform',
    description: 'Full-featured travel booking system with payment gateway integration',
    image: '/assets/images/landing/portfolio-5.jpg',
    category: 'Web Development'
  },
  {
    id: 6,
    title: 'Social Media App',
    description: 'Interactive social platform with real-time messaging and notifications',
    image: '/assets/images/landing/portfolio-6.jpg',
    category: 'Mobile App'
  }
];

// ==============================|| LANDING - PORTFOLIO PAGE ||============================== //

export default function PortfolioPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + portfolioData.length) % portfolioData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const portfolio = portfolioData[current];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 5, md: 8 } }}>
        {/* Section Header */}
        <Grid container spacing={2} sx={{ justifyContent: 'center', textAlign: 'center', mb: { xs: 6, md: 6 } }}>
          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 550 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
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
                    '@keyframes move-bg': { '100%': { backgroundPosition: '400% 0' } }
                  }}
                >
                  Portfolio
                </Typography>
              </Typography>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400, lineHeight: 1.8 }}>
                Explore our latest projects showcasing innovative solutions and successful partnerships across industries
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        {/* Carousel */}
        <Box sx={{ position: 'relative', height: { xs: '500px', sm: '600px', md: '550px' } }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.5 } }}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${portfolio.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: { xs: 2.5, sm: 3.5, md: 4 },
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.85) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64B5F6',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        display: 'inline-block',
                        mb: 1.5,
                        px: 1.5,
                        py: 0.6,
                        borderRadius: '6px',
                        background: 'rgba(100, 181, 246, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(100, 181, 246, 0.3)'
                      }}
                    >
                      {portfolio.category}
                    </Typography>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#fff', mb: 1.5, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }}>
                      {portfolio.title}
                    </Typography>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.8, fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' }, maxWidth: '600px' }}>
                      {portfolio.description}
                    </Typography>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Indicators */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: { xs: 12, sm: 12, md: 12 } }}>
          {portfolioData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              style={{
                width: index === current ? 32 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: index === current ? '#1976d2' : '#ccc',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}