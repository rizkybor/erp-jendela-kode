import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';

// NOTE: Anda harus mengimpor 'ThemeMode' dari file konfigurasi Anda
import { ThemeMode } from 'config';

// ====================================================================
// Pastikan Anda telah MENGGANTI PATH ini sesuai dengan lokasi file PNG Anda
// import logoDark from 'assets/images/landing/logo-jeko-dark.png';
// import logo from 'assets/images/landing/logo-jeko-white.png';
// ====================================================================

// ==============================|| LOGO IMAGE COMPONENT ||============================== //
export default function LogoMain({ reverse }) {
  const theme = useTheme();

  // Jika ingin berdasarkan file PNG langsung:
  // const selectedLogo = theme.palette.mode === ThemeMode.DARK ? logoDark : logo;

  const selectedLogo =
    theme.palette.mode === ThemeMode.DARK
      ? '/assets/images/landing/logo-jeko-dark.png'
      : '/assets/images/landing/logo-jeko-white.png';

  // Jika ingin override menggunakan props reverse:
  // const selectedLogo = reverse ? logoDark : logo;

  return (
    <img
      src={selectedLogo}
      alt="site logo"
      style={{ width: '66px', height: '28px' }}
    />
  );
}

LogoMain.propTypes = {
  /** Jika true, membalikkan logo (berguna untuk forced dark/light mode) */
  reverse: PropTypes.bool
};