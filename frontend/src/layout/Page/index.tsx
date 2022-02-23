import React from 'react';
import { Box, Flex, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import Header from '../../Components/Header';
import Marquee from 'react-fast-marquee';

function Page({ children }: { children?: object }) {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Marquee
        style={{
          background: '#fff',
          width: '100%',
          height: '44px',
          top: '0',
          left: '0',
          position: 'fixed',
        }}
        gradient={false}
        loop={1}
        speed={60}
        pauseOnHover={true}
      >
        <Flex>
          <Image src="/Blur-img-dark.svg" alt="Blur" />
          <Text
            variant="medium"
            color={colorMode === 'light' ? '#ffffff' : '#000000'}
          >
            Current Status: Season 0
          </Text>
        </Flex>
      </Marquee>
      <Stack paddingY="2.06rem" paddingX="5rem" spacing={10}>
        <Header />
        {children}
      </Stack>
    </Box>
  );
}

export default Page;
