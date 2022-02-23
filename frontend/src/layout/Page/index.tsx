import React from 'react';
import { Stack } from '@chakra-ui/react';

function Page({ children }: { children?: object }) {
  return <Stack spacing={10}>{children}</Stack>;
}

export default Page;
