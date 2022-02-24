import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
  useBreakpointValue,
  useColorMode,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { BsLightningCharge } from 'react-icons/bs';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { GiCrownedHeart } from 'react-icons/gi';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import IntroComponent from '../Components/Intro';
import Values from '../Components/Values';
import Partners from '../Components/Partners';
import Footer from '../Components/Footer';

export default function IndexPage() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <VStack w="full" justify="center" spacing={4}>
      <IntroComponent />
      <Values />
      <Partners />
      <Divider w="full" color={colorMode === 'dark' ? '#ffffff' : '#000000'} />
      <Footer />
    </VStack>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
