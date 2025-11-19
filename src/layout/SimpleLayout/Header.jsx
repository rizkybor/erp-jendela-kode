'use client';
import PropTypes from 'prop-types';

import { useState, cloneElement } from 'react';
// next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import Logo from 'components/logo';
import { ThemeDirection } from 'config';
// import { useBuyNowLink } from 'hooks/getBuyNowLink';

// assets
import { ExportSquare, HambergerMenu, Minus, CloseCircle } from '@wandersonalwes/iconsax-react';

// animation
import { motion, AnimatePresence } from 'framer-motion';

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

const stripQuery = (href = '') => href.split('?')[0].replace(/\/+$/g, '') || '/';

// motion variants
const panelVariant = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { y: '100%', opacity: 0, transition: { ease: 'easeInOut', duration: 0.25 } }
};

const listVariant = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  hidden: {}
};

const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } }
};

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header({ layout = 'landing', ...others }) {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);

  const { menuMaster } = useGetMenuMaster();

  const pathname = usePathname() || '/';

  const drawerToggler = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };
  // const { buyNowLink, getQueryParams } = useBuyNowLink();

  const isActive = (href) => {
    const cleaned = stripQuery(href);
    if (cleaned === '/') return pathname === '/';
    return pathname === cleaned || pathname.startsWith(cleaned + '/');
  };

  // header link desktop styles
  const headerLinkSx = (href) => ({
    position: 'relative',
    display: 'inline-block',
    fontWeight: isActive(href) ? 700 : 500,
    color: isActive(href) ? 'primary.main' : 'secondary.main',
    transition: 'color 200ms ease, transform 160ms ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      color: 'primary.main'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -6,
      height: 3,
      width: isActive(href) ? '100%' : '0%',
      borderRadius: 2,
      transition: 'width 260ms cubic-bezier(.2,.8,.2,1)',
      backgroundColor: isActive(href) ? 'primary.main' : 'transparent'
    }
  });

  // mobile list item sx (for MUI ListItemButton)
  const mobileListItemSx = (href) => ({
    borderRadius: 2,
    px: 1.5,
    py: 1.25,
    mb: 0.75,
    transition: 'all 160ms ease',
    display: 'flex',
    alignItems: 'center',
    ...(isActive(href) && {
      background: (theme) => `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.light, 0.06)} 100%)`,
      transform: 'translateX(6px)'
    }),
    '& .MuiListItemText-primary': {
      fontWeight: isActive(href) ? 700 : 600,
      fontSize: '1.05rem'
    }
  });

  // mobile panel content (items)
  const MobileMenuContent = () => (
    <motion.div variants={panelVariant} initial="hidden" animate="visible" exit="exit">
      <Box
        sx={{
          minHeight: '100vh',
          px: 3,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16
        }}
        role="presentation"
      >
        {/* header row inside mobile panel */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
              <Logo to="/" />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Menu
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Explore the site
              </Typography>
            </Box>
          </Stack>

          <IconButton size="large" color="secondary" onClick={drawerToggler(false)} sx={{ p: 0.5 }}>
            <CloseCircle />
          </IconButton>
        </Stack>

        {/* search */}
        <Box>
          <TextField
            fullWidth
            size="small"
            placeholder="Search pages..."
            InputProps={{ sx: { borderRadius: 2 } }}
            aria-label="Search site pages"
          />
        </Box>

        <Divider />

        <Box sx={{ flexGrow: 1, overflow: 'auto', pt: 1 }}>
          <motion.div variants={listVariant} initial="hidden" animate="visible">
            <List sx={{ p: 0 }}>
              {/* Home */}
              <motion.div variants={itemVariant} key="home">
                <Links style={{ textDecoration: 'none' }} component={Link} href={`/${getQueryParams}`}>
                  <ListItemButton sx={mobileListItemSx(`/${getQueryParams}`)} onClick={drawerToggler(false)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Minus />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </Links>
              </motion.div>

              {/* About */}
              <motion.div variants={itemVariant} key="about">
                <Links style={{ textDecoration: 'none' }} component={Link} href={`/about${getQueryParams}`}>
                  <ListItemButton sx={mobileListItemSx(`/about${getQueryParams}`)} onClick={drawerToggler(false)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Minus />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </Links>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariant} key="contact">
                <Links style={{ textDecoration: 'none' }} component={Link} href={`/contact-us${getQueryParams}`}>
                  <ListItemButton sx={mobileListItemSx(`/contact-us${getQueryParams}`)} onClick={drawerToggler(false)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Minus />
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                  </ListItemButton>
                </Links>
              </motion.div>

              {/* Dashboard */}
              <motion.div variants={itemVariant} key="login">
                <Links style={{ textDecoration: 'none' }} component={Link} href={`/login${getQueryParams}`}>
                  <ListItemButton sx={mobileListItemSx(`/login${getQueryParams}`)} onClick={drawerToggler(false)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Minus />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </Links>
              </motion.div>

              {/* optional: map menuMaster dynamic items (if available) */}
              {Array.isArray(menuMaster?.items) &&
                menuMaster.items.map((m, i) => (
                  <motion.div variants={itemVariant} key={`mm-${i}`}>
                    <Links style={{ textDecoration: 'none' }} component={Link} href={m.href || '#!'}>
                      <ListItemButton sx={mobileListItemSx(m.href || '#!')} onClick={drawerToggler(false)}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary={m.label} />
                      </ListItemButton>
                    </Links>
                  </motion.div>
                ))}
            </List>
          </motion.div>
        </Box>

        <Divider />

        {/* CTA area */}
        <Box sx={{ pt: 1 }}>
          <AnimateButton>
            <Button
              fullWidth
              component={Links}
              href={`/auth/login${getQueryParams}`}
              target="_blank"
              startIcon={<ExportSquare />}
              variant="contained"
              size="large"
              disableElevation
              sx={{ borderRadius: 2, py: 1.25 }}
            >
              Get in Touch
            </Button>
          </AnimateButton>

          <Box sx={{ mt: 1.25, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );

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

            {/* Desktop links */}
            <Stack
              direction="row"
              sx={{
                gap: 3,
                alignItems: 'center',
                display: { xs: 'none', md: 'flex' },
                '& .header-link': { '&:hover': { color: 'primary.main' } }
              }}
            >
              <Links
                className="header-link"
                sx={(theme) => ({ ...headerLinkSx(`/${getQueryParams}`), ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`/${getQueryParams}`}
                underline="none"
                aria-current={isActive(`/${getQueryParams}`) ? 'page' : undefined}
              >
                Home
              </Links>

              <Links
                className="header-link"
                sx={(theme) => ({ ...headerLinkSx(`/about${getQueryParams}`), ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`/about${getQueryParams}`}
                underline="none"
                aria-current={isActive(`/about${getQueryParams}`) ? 'page' : undefined}
              >
                About
              </Links>

              <Links
                className="header-link"
                sx={(theme) => ({ ...headerLinkSx(`/contact-us${getQueryParams}`), ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`/contact-us${getQueryParams}`}
                underline="none"
                aria-current={isActive(`/contact-us${getQueryParams}`) ? 'page' : undefined}
              >
                Contact
              </Links>

              <Box sx={{ display: 'inline-block' }}>
                <AnimateButton>
                  <Button
                    component={Links}
                    href={`/auth/login${getQueryParams}`}
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
                anchor="bottom"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                ModalProps={{
                  keepMounted: true
                }}
                PaperProps={{
                  sx: {
                    background: 'transparent',
                    boxShadow: 'none',
                    overflow: 'visible'
                  }
                }}
              >
                {/* Backdrop blur + semi-transparent overlay */}
                <Box
                  onClick={drawerToggler(false)}
                  sx={{
                    position: 'fixed',
                    inset: 0,
                    bgcolor: (theme) => alpha(theme.palette.common.black, 0.35),
                    backdropFilter: 'blur(6px)'
                  }}
                />

                {/* Actual slide-up panel */}
                <Box
                  sx={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    display: 'flex',
                    justifyContent: 'center',
                    px: 2
                  }}
                >
                  <AnimatePresence initial={false} mode="wait">
                    {drawerToggle && (
                      <motion.div key="mobile-panel" style={{ width: '100%', maxWidth: 720 }}>
                        <MobileMenuContent />
                      </motion.div>
                    )}
                  </AnimatePresence>
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