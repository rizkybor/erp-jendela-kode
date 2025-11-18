'use client';
import PropTypes from 'prop-types';

import { useState, cloneElement } from 'react';
// next
import Link from 'next/link';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Links from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
// import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import Logo from 'components/logo';
import { ThemeDirection } from 'config';
// import { techData } from 'data/tech-data';
import { useBuyNowLink } from 'hooks/getBuyNowLink';

// assets
import { ExportSquare, HambergerMenu, Minus } from '@wandersonalwes/iconsax-react';

// elevation scroll
function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window() : undefined
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger ? alpha(theme.palette.background.default, 0.8) : alpha(theme.palette.background.default, 0.1)
    }
  });
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header({ layout = 'landing', ...others }) {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);

  const { menuMaster } = useGetMenuMaster();

  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };
  const { buyNowLink, getQueryParams } = useBuyNowLink();

  // const MobileMenuListItem = techData.map((item, index) => {
  //   const finalUrl = item.url !== '#!' ? item.url + getQueryParams : '#!';
  //   return (
  //     <ListItemButton key={index} component="a" href={finalUrl} sx={{ p: 0 }}>
  //       <ListItemIcon>
  //         <Dot size={4} color="secondary" />
  //       </ListItemIcon>
  //       <ListItemText primary={item.label} slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
  //     </ListItemButton>
  //   );
  // });

  return (
    <ElevationScroll layout={layout} {...others}>
      <AppBar
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.default, 0.1),
          backdropFilter: 'blur(8px)',
          color: 'text.primary',
          boxShadow: 'none'
        })}
      >
        <Container maxWidth="xl" disableGutters={downMD}>
          <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
            <Stack direction="row" sx={{ alignItems: 'center', flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ display: 'inline-block' }}>
                <Logo to="/" />
              </Box>
              <Chip
                label={process.env.NEXT_PUBLIC_VERSION}
                variant="outlined"
                size="small"
                color="secondary"
                sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
              />
            </Stack>

            {/* Desktop links (open in same tab) */}
            <Stack
              direction="row"
              sx={{
                gap: 3,
                alignItems: 'center',
                display: { xs: 'none', md: 'flex' },
                '& .header-link': { fontWeight: 500, '&:hover': { color: 'primary.main' } }
              }}
            >
              <Links
                className="header-link"
                sx={(theme) => ({ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`/${getQueryParams}`}
                underline="none"
              >
                Home
              </Links>

              <Links
                className="header-link"
                sx={(theme) => ({ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`/about${getQueryParams}`}
                underline="none"
              >
                About
              </Links>

              <Links
                className="header-link"
                sx={(theme) => ({ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`/contact-us${getQueryParams}`}
                underline="none"
              >
                Contact
              </Links>

              <Box sx={{ display: 'inline-block' }}>
                <AnimateButton>
                  <Button
                    component={Links}
                    href={buyNowLink}
                    target="_blank"
                    disableElevation
                    startIcon={<ExportSquare />}
                    color="primary"
                    size="large"
                    variant="contained"
                  >
                    Get in Touch
                  </Button>
                </AnimateButton>
              </Box>
            </Stack>

            {/* Mobile */}
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              <Box sx={{ display: 'inline-block' }}>
                <Logo to="/" />
              </Box>
              <Stack direction="row" sx={{ gap: 2 }}>
                {/* {layout !== 'component' && (
                  <Button
                    variant="outlined"
                    color="warning"
                    component={Link}
                    href={`/components-overview/buttons${getQueryParams}`}
                    sx={{ mt: 0.25 }}
                  >
                    All Components
                  </Button>
                )} */}

                <IconButton
                  size="large"
                  color="secondary"
                  {...(layout === 'component'
                    ? { onClick: () => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened) }
                    : { onClick: drawerToggler(true) })}
                  sx={{ p: 1 }}
                >
                  <HambergerMenu />
                </IconButton>
              </Stack>

              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                slotProps={{ paper: { sx: { backgroundImage: 'none' } } }}
              >
                <Box
                  sx={{
                    width: 'auto',
                    '& .MuiListItemIcon-root': {
                      fontSize: '1rem',
                      minWidth: 32
                    }
                  }}
                  role="presentation"
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Links style={{ textDecoration: 'none' }} component={Link} href={`/${getQueryParams}`}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Home" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>

                    <Links style={{ textDecoration: 'none' }} component={Link} href={`/about${getQueryParams}`}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="About" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>

                    <Links style={{ textDecoration: 'none' }} component={Link} href={`/contact-us${getQueryParams}`}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Contact" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>

                    <Links style={{ textDecoration: 'none' }} component={Link} href={`/login${getQueryParams}`}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>

                    {/* <Links style={{ textDecoration: 'none' }} component={Link} href={`/components-overview/buttons${getQueryParams}`}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="All Components" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links> */}

                    {/* Optional: additional items were intentionally removed. Use MobileMenuListItem if you want tech list */}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}

ElevationScroll.propTypes = { children: PropTypes.node, window: PropTypes.func };

Header.propTypes = { layout: PropTypes.string, others: PropTypes.any };
