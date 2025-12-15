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
      <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 3, xs: 2.5 } }}>
        <Grid container justifyContent="center" sx={{ textAlign: 'center', mb: 4 }}>
          <Grid size={{ sm: 10, md: 6 }}>
            <Grid container spacing={1} justifyContent="center">
              <Grid size={12}>
                <Typography variant="h2" sx={{ fontWeight: 800 }}>
                  BangLaporin — Chatbot Financial Tracker
                </Typography>
              </Grid>

              <Grid container spacing={3} alignItems="stretch" sx={{ mb: 3 }}>
                {/* LEFT: Description */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Monitor expenses, manage budgets, and gain insights conversationally. Easy to use, secure, and suitable for individuals
                    and small teams. Powered by GPT-4.0 for smarter analysis and n8n automation integration to accelerate workflows and
                    automate data processing.
                  </Typography>
                </Grid>

                {/* RIGHT: Trial Features */}
                <Grid size={{ xs: 12, md: 7 }}>
                  <Box
                    sx={{
                      height: '100%',
                      textAlign: 'left',
                      backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      borderRadius: 3,
                      px: 3,
                      py: 2
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      Free 7-Day Trial Includes
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                      • Dedicated VPS Server (isolated environment) <br />
                      • AI Agent for expense recording & spending analysis <br />
                      • 📸 Upload shopping receipts (automatic OCR) <br />
                      • ✍️ Manual purchase input via chat <br />
                      • 📊 Real-time expense reports <br />• 🗑️ Manage & delete expense records
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid size={12}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* main two-column area */}
        <Grid size={{ xs: 12, sm: 9 }}>
          <Box sx={{ position: 'relative', mb: 3 }}>
            <CardMedia component="img" src={FigmaImg} sx={{ width: 1, m: '0 auto', borderRadius: 4 }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
