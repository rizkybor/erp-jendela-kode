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
  { value: 'Company Profile', label: 'Company Profile' },
  { value: 'ERP (Enterprise Resource Planning)', label: 'ERP (Enterprise Resource Planning)' },
  { value: 'CRM (Customer Relationship Management)', label: 'CRM (Customer Relationship Management)' },
  { value: 'E-Commerce Platform', label: 'E-Commerce Platform' },
  { value: 'Custom Web Application', label: 'Custom Web Application' },
  { value: 'Mobile Application', label: 'Mobile Application' },
  { value: 'CMS (Content Management System)', label: 'CMS (Content Management System)' },
  { value: 'Other Services', label: 'Other Services' }
];

// utility: sanitize & format Indonesian phone numbers to +62 format with simple grouping
function formatPhoneInput(raw) {
  if (!raw) return '';
  // keep digits and plus
  const only = raw.replace(/[^\d+]/g, '');

  // if starts with + then keep, otherwise remove leading zeros and handle '62'
  let digits = only;
  if (digits.startsWith('+')) {
    digits = digits.replace(/^\+/, '');
  }

  // if starts with 0 => replace with 62
  if (/^0/.test(digits)) {
    digits = digits.replace(/^0+/, '62');
  }

  // if already starts with 62 and not prefixed with +, keep as is
  if (!/^62/.test(digits)) {
    // if user typed e.g. 812..., assume local -> prefix 62
    if (/^[89]\d+/.test(digits)) {
      digits = '62' + digits;
    }
  }

  // ensure no leading zeros remain
  digits = digits.replace(/^0+/, '');

  // now add leading +
  let out = '+' + digits;

  // simple grouping: +62 AAA-BBBB-CCCC (after country code 2 digits)
  // remove '+' and country code to group remainder
  const cc = out.slice(0, 3); // '+62'
  const rest = out.slice(3).replace(/\D/g, '');
  const groups = [];

  // grouping strategy: first group 3, then 4, then 4...
  let idx = 0;
  if (rest.length > 0) {
    const first = rest.slice(0, 3);
    if (first) groups.push(first);
    idx = 3;
    while (idx < rest.length) {
      groups.push(rest.slice(idx, idx + 4));
      idx += 4;
    }
  }

  return cc + (groups.length ? ' ' + groups.join('-') : '');
}

// ==============================|| CONTACT US - FORM ||============================== //

export default function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneRaw, setPhoneRaw] = useState(''); // raw input stored for editing
  const [brief, setBrief] = useState('');
  const [type, setType] = useState(sizes[0].value);
  const [termsChecked, setTermsChecked] = useState(true);

  // formatted phone for display
  const formattedPhone = formatPhoneInput(phoneRaw);

  const handlePhoneChange = (e) => {
    // keep raw input but sanitize modestly
    const val = e.target.value;
    setPhoneRaw(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsChecked) {
      window.alert('Please accept the Terms & Condition before submitting.');
      return;
    }

    // Basic validation
    if (!firstName && !lastName) {
      window.alert('Please enter your name.');
      return;
    }
    if (!email) {
      window.alert('Please enter your email address.');
      return;
    }

    // build mailto
    const to = 'jeko.idn@gmail.com';
    const subject = `New Contact Form Submission: ${firstName || ''} ${lastName || ''}`.trim();
    const bodyLines = [
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Email: ${email}`,
      `Phone: ${formattedPhone}`,
      `Type Website / Service: ${type}`,
      `Brief: ${brief}`,
      `Agreed Terms: ${termsChecked ? 'Yes' : 'No'}`,
      '',
      `-- Sent from Contact Form`
    ];
    const body = bodyLines.join('\n');

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // open user's email client
    window.location.href = mailto;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
      <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
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
                <TextField fullWidth type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  Last Name
                </Typography>
                <TextField fullWidth type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  Email Address
                </Typography>
                <TextField fullWidth type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  type="tel"
                  placeholder="+62 812-3456-7890"
                  value={phoneRaw}
                  onChange={handlePhoneChange}
                  helperText={formattedPhone ? `Formatted: ${formattedPhone}` : 'Masukkan nomor, akan otomatis terformat ke +62'}
                />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle1" color="secondary">
                  Brief
                </Typography>
                <TextField fullWidth placeholder="Brief" value={brief} onChange={(e) => setBrief(e.target.value)} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle1" color="secondary">
                Type Website / Service
              </Typography>
              <TextField select fullWidth value={type} onChange={(e) => setType(e.target.value)}>
                {sizes.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <Stack direction="row" sx={{ alignItems: 'center', ml: -1 }}>
                <Checkbox sx={{ '& .css-1vjb4cj': { borderRadius: '2px' } }} checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />
                <Typography>
                  I agree to all the{' '}
                  <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                    Terms & Condition
                  </Typography>
                </Typography>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}