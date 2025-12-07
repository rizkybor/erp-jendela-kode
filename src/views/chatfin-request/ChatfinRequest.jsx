// ChatfinRequestPage.jsx
'use client';

// material-ui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// project-imports
import RequestForm from 'sections/extra-pages/contact/OrderChatFinRequest';

// optional: path to the image used on left side
const heroImage = '/assets/images/landing/chatDark.png'; // ganti sesuai asset Anda

export default function ChatfinRequestPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        {/* Left: image (md+) / top on small screens */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 560,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: { xs: 'none', md: '0 24px 80px rgba(14,30,55,0.06)' },
            }}
          >
            {/* Use CardMedia so image scales and keeps aspect ratio */}
            <CardMedia
              component="img"
              src={heroImage}
              alt="BangLaporin ChatFin Preview"
              loading="lazy"
              sx={{
                width: '100%',
                height: { xs: 220, sm: 320, md: 420 },
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Optional overlay caption on image (small) */}
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                BangLaporin — Chatbot Financial Tracker
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor spending, manage your budget, and receive financial insights — all via chat.
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Right: form */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 560 }}>
            {/* The RequestForm is expected to render the form card itself.
                It will inherit the container width and remain centered. */}
            <RequestForm />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
