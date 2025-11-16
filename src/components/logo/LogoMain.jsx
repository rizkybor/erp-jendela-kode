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

  // Logika untuk memilih logo:
  // Jika mode tema saat ini adalah DARK, gunakan logoDark.png, jika tidak, gunakan logo.png.
  // Properti 'reverse' (jika diaktifkan) bisa digunakan sebagai alternatif kontrol mode tema.
  
  // const selectedLogo = theme.palette.mode === ThemeMode.DARK ? logoDark : logo;
const selectedLogo =
  theme.palette.mode === ThemeMode.DARK
    ? "/assets/images/landing/logo-jeko-dark.png"
    : "/assets/images/landing/logo-jeko-white.png";  
  // Jika Anda ingin properti 'reverse' yang MENGGANTIKAN mode tema, gunakan logika ini:
  // const selectedLogo = reverse ? logoDark : logo; 

  return (
    // Menggunakan tag <img> untuk menampilkan logo PNG
    // Anda dapat menyesuaikan 'width' dan 'height' sesuai kebutuhan tata letak Anda.
    <img 
      src={selectedLogo} 
      alt="site logo" 
      // Ukuran berdasarkan atribut SVG sebelumnya, sesuaikan jika perlu.
      style={{ width: '66px', height: '28px' }} 
    />
  );
}

LogoMain.propTypes = { 
  /** * Jika true, dapat membalikkan logo (berguna untuk forced dark/light mode)
   */
  reverse: PropTypes.bool 
};