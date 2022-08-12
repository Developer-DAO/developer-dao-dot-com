import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import Marquee from 'react-fast-marquee';
import Header from '../Components/Header';
import ReactMarkdown from 'react-markdown';

function Page({
  children,
  newsTickerContent,
}: {
  children?: object;
  newsTickerContent?: string;
}) {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Marquee
        style={{
          background: `${colorMode === 'dark' ? '#ffffff' : '#000000'}`,
          width: '100%',
          height: '44px',
          top: '0',
          left: '0',
          position: 'fixed',
          zIndex: 10,
          color: `${colorMode === 'dark' ? 'black' : 'white'}`,
          fontSize: '1rem',
        }}
        gradient={false}
        loop={0}
        speed={60}
      >
        <HStack spacing="2rem" as="span" justifyContent="space-between">
          {[...Array(5)].map((x, index) => (
            <ReactMarkdown key={index}>
              {newsTickerContent ? newsTickerContent : ''}
            </ReactMarkdown>
          ))}
        </HStack>
      </Marquee>
      <Stack
        paddingY="2.06rem"
        paddingX={{ base: '16px', md: '4px', lg: '48px' }}
        spacing={10}
      >
        <>
          <Header />
          {children}
        </>
      </Stack>
      <Marquee
        style={{
          background: `${colorMode === 'light' ? '#ffffff' : '#000000'}`,
          width: '100%',
          height: '44px',
          bottom: '0',
          left: '0',
          position: 'fixed',
          zIndex: 10,
          color: `${colorMode === 'dark' ? 'white' : 'black'}`,
          fontSize: '1rem',
        }}
        gradient={false}
        loop={0}
        speed={60}
      >
        <HStack spacing="2rem" as="span" justifyContent="space-between">
          {[...Array(6)].map((x, index) => (
            <ReactMarkdown key={index}>
              {newsTickerContent ? newsTickerContent : ''}
            </ReactMarkdown>
          ))}
        </HStack>
      </Marquee>
    </Box>
  );
}

export default Page;
