import { extendTheme, ThemeConfig } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    // heading:
    //   'InterVariable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    heading:
      '"Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace',
    body: 'InterVariable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
});
