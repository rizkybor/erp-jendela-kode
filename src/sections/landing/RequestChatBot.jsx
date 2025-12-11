'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project import
import { ThemeMode } from 'config';

// icons
import { Box2 } from '@wandersonalwes/iconsax-react';

// assets
const figmaLight = '/assets/images/landing/dark-chatbot.png';
const figmaDark = '/assets/images/landing/light-chatbot.png';

// =============================|| LANDING - CHATBOT FINANCIAL TRACKER (Clean) ||============================= //

export default function FigmaBlock() {
  const theme = useTheme();
  const FigmaImg = theme.palette.mode === ThemeMode.DARK ? figmaDark : figmaLight;

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 10 }, mb: { md: 10, xs: 3 } }}>
        {/* header */}
        <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 3, xs: 2.5 } }}>
          <Grid container justifyContent="center" sx={{ textAlign: 'center', mb: 2 }}>
            <Grid item xs={12} sm={10} md={6}>
              <Typography variant="h2" sx={{ fontWeight: 800 }}>
                BangLaporin — Chatbot Financial Tracker
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
               Monitor expenses, manage budgets, and gain insights conversationally. Easy to use, secure, and suitable for individuals and small teams. <br/>Powered by GPT-4.0 for smarter analysis and n8n automation integration to accelerate workflows and automate data processing.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  component={Link}
                  href="https://n8n-tkkitjs8kddj.ceri.sumopod.my.id/form/request"
                  target="_blank"
                  variant="contained"
                  size="large"
                  startIcon={<Box2 />}
                >
                  Request BangLaporin
                </Button>

                {/* <Button component={Link} href="#features" variant="outlined" size="large">
                  Pelajari fitur
                </Button> */}
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* main two-column area */}
        <Grid size={{ xs: 12, sm: 9 }}>
          <Box sx={{ position: 'relative', mb: 1 }}>
            <CardMedia component="img" src={FigmaImg} sx={{ width: 1, m: '0 auto', borderRadius: 6 }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
