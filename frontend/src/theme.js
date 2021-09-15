import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    code: '"Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});
