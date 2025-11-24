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
import { Box2, ArrowDown } from '@wandersonalwes/iconsax-react';

// assets
const figmaLight = '/assets/images/landing/jekoai-light.png';
const figmaDark = '/assets/images/landing/jekoai-dark.png';

// =============================|| LANDING - FIGMA PAGE ||============================= //

export default function FigmaBlock() {
  const theme = useTheme();

  const FigmaImg = theme.palette.mode === ThemeMode.DARK ? figmaLight : figmaDark;

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid size={12}>
          <Grid container spacing={1} justifyContent="center" sx={{ mb: 4, textAlign: 'center' }}>
            <Grid size={{ sm: 10, md: 6 }}>
              <Grid container spacing={1} justifyContent="center">
                <Grid size={12}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    Jeko AI Assistance: Smart Solutions to Optimize Your Productivity!
                  </Typography>
                </Grid>
                <Grid size={12} sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    Improve operational efficiency with AI technology designed for automation, rapid analysis, and everyday work assistance.
                    Jeko AI Assistance delivers intuitive interactions, accurate responses, and seamless integration with your business
                    processes—delivering a faster, more precise, and more productive work experience.
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Button
                    component={Link}
                    target="_blank"
                    href="https://ai.jendelakode.com"
                    size="large"
                    color="primary"
                    variant="contained"
                    startIcon={<Box2 />}
                  >
                    Go to Jeko AI Assistance
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 9 }}>
          <Box sx={{ position: 'relative', mb: 3 }}>
            <CardMedia component="img" src={FigmaImg} sx={{ width: 1, m: '0 auto', borderRadius: 4 }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
