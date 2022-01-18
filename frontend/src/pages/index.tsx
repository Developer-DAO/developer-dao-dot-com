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

  return (
    <Container>
      <Stack
        as="main"
        minH="100vh"
        spacing={{ base: 6, md: 8 }}
        divider={
          <StackDivider
            h="2px"
            rounded="sm"
            bgGradient="linear(to-r, red.300, orange.300, yellow.300, green.300, blue.300, purple.300, pink.300)"
          />
        }
      >
        <Heading as="h1" fontSize="xl">
          {t('title')}
        </Heading>

        <VStack spacing={4}>
          <HStack as="footer" justify="center">
            <SocialIconLink
              href="https://twitter.com/developer_dao"
              label="Twitter"
            >
              <>
                <FaTwitter />
                <VisuallyHidden>
                  {t('socialLinkLabel', { platform: 'Twitter' })}
                </VisuallyHidden>
              </>
            </SocialIconLink>
            <SocialIconLink href="https://discord.gg/devdao" label="Discord">
              <>
                <FaDiscord />
                <VisuallyHidden>
                  {t('socialLinkLabel', { platform: 'Discord' })}
                </VisuallyHidden>
              </>
            </SocialIconLink>
            <SocialIconLink
              href="https://github.com/Developer-DAO"
              label="GitHub"
            >
              <>
                <FaGithub />
                <VisuallyHidden>
                  {t('socialLinkLabel', { platform: 'GitHub' })}
                </VisuallyHidden>
              </>
            </SocialIconLink>
          </HStack>

          <HStack
            as="a"
            href="https://vercel.com/?utm_source=developerdao&utm_campaign=oss"
            fontSize="sm"
          >
            <Text>Powered by</Text>
            <Flex align="center">
              <Image
                src="/vercel-logotype-light.svg"
                alt="Vercel"
                width="100px"
                height="22px"
              />
            </Flex>
          </HStack>
        </VStack>
      </Stack>
    </Container>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const SocialIconLink = ({
  children,
  href,
  label,
}: {
  children: ReactElement;
  href: string;
  label: string;
}) => {
  return (
    <IconButton
      as="a"
      aria-label={label}
      cursor="pointer"
      href={href}
      icon={children}
      size="lg"
      variant="ghost"
    />
  );
};
