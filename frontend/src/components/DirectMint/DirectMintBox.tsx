import React from 'react';
import DirectMint from './DirectMint';
import Logo from '../../components/Logo';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';

// Layout for the Direct Mint Box
// used on the minting page
const DirectMintBox = () => {
  return (
    <>
      <Container maxW="container.md" centerContent mt="10%">
        <Box borderWidth="4px" borderRadius="lg" w="75%" padding="20">
          <Flex flexDirection="column" justify="center" align="center">
            <Logo w={52} h={52} />
            <Heading marginTop="6">DDAO Token Minter</Heading>
            <DirectMint />
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default DirectMintBox;
