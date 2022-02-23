import {
  Box,
  Button,
  Container,
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

export default function IndexPage() {
  const { t } = useTranslation();

  return <Container></Container>;
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
