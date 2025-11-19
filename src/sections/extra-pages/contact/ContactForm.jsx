'use client';

import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

// select company-size
const sizes = [
  { value: '1', label: '1 - 5' },
  { value: '2', label: '5 - 10' },
  { value: '3', label: '10+' }
];

// ==============================|| CONTACT US - FORM ||============================== //

export default function ContactForm() {
  const [size, setSize] = useState(1);
  const handleCompanySize = (event) => {
    setSize(Number(event.target?.value));
  };
  return (
    <Box
      sx={{
        p: {
          xs: 2.5,
          sm: 2,
          md: 5,
          borderRadius: 24,
          boxShadow: '0 20px 55px rgba(15, 23, 42, 0.06)'
        },
        maxWidth: {
          sm: '90%',
          md: '70%'
        },
        mx: 'auto'
      }}
    >
      <Grid container spacing={5} sx={{ justifyContent: 'center'}}>
        <Grid size={12}>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: 'center',
              textAlign: 'center'
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
                    Start Your Project
                  </Typography>{' '}
                  With Us
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
                <Typography>What makes us the preferred choice for digital transformation</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, sm: 10, lg: 8 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  First Name
                </Typography>
                <TextField fullWidth type="text" placeholder="First name" />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  Last Name
                </Typography>
                <TextField fullWidth type="text" placeholder="Last name" />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  Email Address
                </Typography>
                <TextField fullWidth type="email" placeholder="Email Address" />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  Phone Number
                </Typography>
                <TextField fullWidth type="number" placeholder="Phone Number" />
              </Stack>
            </Grid>
            <Grid size={12}>
              <TextField select fullWidth placeholder="Company Size" value={size} onChange={handleCompanySize}>
                {sizes.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <Stack direction="row" sx={{ alignItems: 'center', ml: -1 }}>
                <Checkbox sx={{ '& .css-1vjb4cj': { borderRadius: '2px' } }} defaultChecked />
                <Typography>
                  I agree to all the{' '}
                  <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                    Terms & Condition
                  </Typography>
                </Typography>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Button variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
