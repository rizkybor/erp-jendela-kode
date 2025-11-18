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
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Links from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
/* Menu component removed (unused) */
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
/* Removed unused imports: CardMedia, ListItemAvatar, Tooltip */
import Box from '@mui/material/Box';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import Logo from 'components/logo';
import { ThemeDirection } from 'config';
import { techData } from 'data/tech-data';
import { useBuyNowLink } from 'hooks/getBuyNowLink';

// assets
import { ArrowDown2, ArrowUp2, ExportSquare, HambergerMenu, Minus } from '@wandersonalwes/iconsax-react';
/* GithubIcon removed (unused) */

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
  const [openDrawer, setOpenDrawer] = useState(false);

  const { menuMaster } = useGetMenuMaster();

  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };
  const { buyNowLink, getQueryParams } = useBuyNowLink();

  /* anchor/menu handlers removed because Live Preview menu is not used in this layout */

  const MobileMenuListItem = techData.map((item, index) => {
    const finalUrl = item.url !== '#!' ? item.url + getQueryParams : '#!';
    return (
      <ListItemButton key={index} component="a" href={finalUrl} target={item.target} sx={{ p: 0 }}>
        <ListItemIcon>
          <Dot size={4} color="secondary" />
        </ListItemIcon>
        <ListItemText primary={item.label} slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
      </ListItemButton>
    );
  });

  /* listItems removed (unused) */

  /* handleClose removed (unused) */
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
                href={`login${getQueryParams}`}
                target="_blank"
                underline="none"
              >
                Home
              </Links>
              <Links
                className="header-link"
                sx={(theme) => ({ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`login${getQueryParams}`}
                target="_blank"
                underline="none"
              >
                About
              </Links>
              <Links
                className="header-link"
                sx={(theme) => ({ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`login${getQueryParams}`}
                target="_blank"
                underline="none"
              >
                Contact
              </Links>
              {/* <Links
                className="header-link"
                sx={(theme) => ({ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={Link}
                href={`login${getQueryParams}`}
                target="_blank"
                underline="none"
              >
                Dashboard
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                component={Link}
                href={`/components-overview/buttons${getQueryParams}`}
                underline="none"
              >
                Components
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                href="https://phoenixcoded.gitbook.io/able-pro"
                target="_blank"
                underline="none"
              >
                Documentation
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                id="wallet-button"
                href="#"
                aria-controls={open ? 'wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                underline="none"
                sx={{ path: { strokeWidth: 2 }, svg: { marginBottom: '-3px' } }}
              >
                Live Preview {open ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}
              </Links> */}
              {/* <Menu
                id="wallet-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{ list: { 'aria-labelledby': 'wallet-button', sx: { p: 1.25, minWidth: 150 } } }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                sx={{ '.MuiModal-backdrop': { backgroundColor: 'unset' } }}
              >
                {listItems}
              </Menu> */}
              {/* <Links href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template" target="_blank" underline="none">
                <IconButton
                  size="large"
                  shape="rounded"
                  color="secondary"
                  sx={(theme) => ({
                    bgcolor: 'secondary.light',
                    color: 'secondary.darker',
                    '&:hover': {
                      color: 'secondary.lighter',
                      bgcolor: 'grey.800',
                      svg: { stroke: theme.palette.common.white },
                      ...theme.applyStyles('dark', { color: 'grey.500' })
                    }
                  })}
                >
                  <GithubIcon />
                </IconButton>
              </Links> */}
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
                {layout !== 'component' && (
                  <Button
                    variant="outlined"
                    color="warning"
                    component={Link}
                    href={`/components-overview/buttons${getQueryParams}`}
                    sx={{ mt: 0.25 }}
                  >
                    All Components
                  </Button>
                )}

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
                    <Links style={{ textDecoration: 'none' }} component={Link} href={`/login${getQueryParams}`} target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>
                    <Links
                      style={{ textDecoration: 'none' }}
                      component={Link}
                      href={`/components-overview/buttons${getQueryParams}`}
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="All Components" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>
                    <Links
                      style={{ textDecoration: 'none' }}
                      href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Free Version" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>
                    <Links style={{ textDecoration: 'none' }} href="https://phoenixcoded.gitbook.io/able-pro" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Documentation" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>
                    <Links style={{ textDecoration: 'none' }} href="https://phoenixcoded.authordesk.app/" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Support" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Links>
                    <Links style={{ textDecoration: 'none' }} href={buyNowLink} target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Purchase Now" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                        <Chip color="primary" label={process.env.NEXT_APP_VERSION} size="small" />
                      </ListItemButton>
                    </Links>
                    <Links style={{ textDecoration: 'none' }} href="#" onClick={() => setOpenDrawer(!openDrawer)}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Live Preview" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                        <Stack sx={{ path: { strokeWidth: 2 } }}>{openDrawer ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}</Stack>
                      </ListItemButton>
                    </Links>
                    <Collapse in={openDrawer} timeout="auto" unmountOnExit>
                      {openDrawer && <List sx={{ p: 0, pl: 6, '& .MuiListItemIcon-root': { minWidth: 20 } }}>{MobileMenuListItem}</List>}
                    </Collapse>
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
