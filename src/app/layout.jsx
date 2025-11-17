import PropTypes from 'prop-types';

import './globals.css';

// project-imports
import ProviderWrapper from './ProviderWrapper';

export const metadata = {
  title: 'Jendela Kode',
  description: 'Journey to Digital Transformation Services.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://fomo.codedthemes.com/pixel/CDkpF1sQ8Tt5wpMZgqRvKpQiUhpWE3bc"></script>
      </head>
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.node };
