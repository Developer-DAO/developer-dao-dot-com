import React from 'react';
import DirectMint from './DirectMint';
import Logo from '../../components/Logo';
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

// Layout for the Direct Mint Box
// used on the minting page
const DirectMintBox = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container maxW="container.md" centerContent>
        <Box borderWidth="4px" borderRadius="lg" w="75%" padding="20">
          <Stack spacing={6} align="center">
            <Logo w={52} h={52} />
            <Heading>{t('mintPageHeader')}</Heading>
            <Text>
              {t('availableTokensText')}{' '}
              <Link href="https://ddao.ibby.dev" isExternal>
                here
              </Link>
            </Text>
            <DirectMint />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default DirectMintBox;
