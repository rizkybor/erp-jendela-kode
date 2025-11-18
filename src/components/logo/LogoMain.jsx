import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

// ==============================|| LOGO IMAGE COMPONENT ||============================== //
export default function LogoMain({ reverse, width, height }) {
  const theme = useTheme();

  // Pilih logo sesuai mode tema (Dark/Light)
  const selectedLogo =
    reverse
      ? '/assets/images/landing/logo-jeko-dark.png'
      : theme.palette.mode === ThemeMode.DARK
        ? '/assets/images/landing/logo-jeko-dark.png'
        : '/assets/images/landing/logo-jeko-white.png';

  return (
    <img
      src={selectedLogo}
      alt="site logo"
      style={{
        width: width ? `${width}px` : '100px',   // default: 150px
        height: height ? `${height}px` : 'auto', // default: auto agar proporsional
        objectFit: 'contain'
      }}
    />
  );
}

LogoMain.propTypes = {
  reverse: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};