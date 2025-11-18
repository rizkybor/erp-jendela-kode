import PropTypes from 'prop-types';
// next
import Link from 'next/link';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project-imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';

export default function LogoSection({ reverse, isIcon, width, height, sx, to, ...rest }) {
  return (
    <ButtonBase
      disableRipple
      component={Link}
      href={!to ? APP_DEFAULT_PATH : to}
      sx={sx}
    >
      {isIcon ? (
        // Jika LogoIcon mendukung width/height, maka akan diterima;
        // kalau tidak, prop ini tidak berpengaruh — Anda bisa menyesuaikan LogoIcon bila perlu.
        <LogoIcon width={width} height={height} {...rest} />
      ) : (
        <Logo reverse={reverse} width={width} height={height} {...rest} />
      )}
    </ButtonBase>
  );
}

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  isIcon: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.any,
  to: PropTypes.any
};

LogoSection.defaultProps = {
  reverse: false,
  isIcon: false,
  width: null,
  height: null,
  sx: undefined,
  to: undefined
};