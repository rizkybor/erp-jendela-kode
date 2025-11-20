import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import Logo from 'components/logo';

// assets - gunakan iconsax yang sudah ada di package.json
import { Message, Call, Location } from '@wandersonalwes/iconsax-react';
// import GithubIcon from '../../../public/assets/third-party/github';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover, &:active': {
    color: theme.palette.primary.main
  }
}));

// ==============================|| LANDING - FOOTER PAGE ||============================== //

export default function FooterBlock({ isFull }) {
  // const linkSX = {
  //   color: 'text.secondary',
  //   fontWeight: 400,
  //   opacity: 0.6,
  //   cursor: 'pointer',
  //   '&:hover': { opacity: 1 }
  // };

  // --- DATA UNTUK KOLONG FOOTER YANG DIINGINKAN ---
  const quickLinks = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about' },
    { label: 'Contact', link: '/contact' }
  ];

  const services = [
    { label: 'Website Development', link: '/' },
    { label: 'Mobile App Development', link: '/' },
    { label: 'UI/UX Design', link: '/' },
    { label: 'Custom Software', link: '/' }
  ];

  const contactInfo = [
    { IconComponent: Message, label: 'info@jendelakode.com', href: 'mailto:info@jendelakode.com' },
    { IconComponent: Call, label: '(+62) 851 2111 0794 - Rizky', href: 'tel:+6285121110794' },
    { IconComponent: Location, label: 'Jl. Pd. Cabe Raya, Pd. Cabe Udik, Kec. Pamulang, Kota Tangerang Selatan, Banten 15418', href: 'https://www.google.com/maps' }
  ];
  // ------------------------------------------------

  return (
    <>
      <Box sx={{ pt: isFull ? 5 : 10, pb: 10, bgcolor: 'secondary.200', borderColor: 'divider' }}>
        <Container>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 550 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Logo width={150} to="/" />
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400, maxWidth: 320 }}>
                      Opening digital opportunities through smart technology solutions.
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>

            {/* --------- BAGIAN YANG DIGANTI: Quick Links | Services | Contact Us --------- */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={{ xs: 12, md: 2 }}>
                {/* Quick Links */}
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Stack sx={{ gap: 3 }}>
                    <Typography variant="h5">Quick Links</Typography>
                    <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                      {quickLinks.map((item, idx) => (
                        <FooterLink
                          key={idx}
                          href={item.link}
                          underline="none"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 400,
                            opacity: 0.6,
                            '&:hover': { opacity: 1 }
                          }}
                        >
                          {item.label}
                        </FooterLink>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>

                {/* Services */}
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Stack sx={{ gap: 3 }}>
                    <Typography variant="h5">Services</Typography>
                    <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                      {services.map((item, idx) => (
                        <FooterLink
                          key={idx}
                          href={item.link}
                          underline="none"
                          sx={
                            item.label === 'Mobile App'
                              ? {
                                  color: 'text.secondary',
                                  fontWeight: 400,
                                  opacity: 0.6,
                                  cursor: 'pointer',
                                  '&:hover': { opacity: 1 },
                                  border: '1px dashed',
                                  px: 1,
                                  borderRadius: 0,
                                  display: 'inline-block'
                                }
                              : {
                                  color: 'text.secondary',
                                  fontWeight: 400,
                                  opacity: 0.6,
                                  cursor: 'pointer',
                                  '&:hover': { opacity: 1 }
                                }
                          }
                        >
                          {item.label}
                        </FooterLink>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>

                {/* Contact Us */}
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Stack sx={{ gap: 3 }}>
                    <Typography variant="h5">Contact Us</Typography>
                    <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                      {contactInfo.map((c, i) => {
                        const Icon = c.IconComponent;
                        return (
                          <Stack key={i} direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: 28 }}>
                              <Icon variant="Bold" size={18} />
                            </Box>
                            <FooterLink
                              href={c.href}
                              underline="none"
                              sx={{
                                color: 'text.secondary',
                                fontWeight: 400,
                                opacity: 0.6,
                                '&:hover': { opacity: 1 }
                              }}
                            >
                              {c.label}
                            </FooterLink>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            {/* --------------------------------------------------------------------------- */}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 2.4, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'secondary.200' }}>
        <Container>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Typography>
                © {new Date().getFullYear()}{' '}
                <Link href="https://jendelakode.com/about" target="_blank" underline="none">
                  Jendela Kode Indonesia
                </Link>
                {' '} v4.1.0. All Rights Reserved.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                {/* <Grid>
                  <Tooltip title="Github">
                    <Link
                      href="https://github.com/phoenixcoded"
                      underline="none"
                      target="_blank"
                      sx={linkSX}
                    >
                      <GithubIcon size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid>
                  <Tooltip title="Dribbble">
                    <Link
                      href="https://dribbble.com/Phoenixcoded"
                      underline="none"
                      target="_blank"
                      sx={linkSX}
                    >
                      <Dribbble variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid>
                  <Tooltip title="Youtube">
                    <Link
                      href="https://www.youtube.com/@phoenixcoded"
                      underline="none"
                      target="_blank"
                      sx={linkSX}
                    >
                      <Youtube variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

FooterBlock.propTypes = {
  isFull: PropTypes.bool
};