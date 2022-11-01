import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import '@fontsource/inter/variable-full.css';
import '@fontsource/source-code-pro/400.css';
import '@fontsource/source-code-pro/600.css';
import { appWithTranslation } from 'next-i18next';

import { AppProps } from 'next/app';
import '../styles/globals.css';
import { theme } from '../theme';

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
    <Analytics />
  </ChakraProvider>
);

export default appWithTranslation(App);
