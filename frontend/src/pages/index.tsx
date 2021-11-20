import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  LightMode,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
  useBreakpointValue,
  useTheme,
} from '@chakra-ui/react';
import { FiLayers } from 'react-icons/fi';
import {
  ImHeart,
  ImMagicWand,
  ImMakeGroup,
  ImSphere,
  ImStarEmpty,
  ImStarFull,
  ImTerminal,
} from 'react-icons/im';
import {
  GiAbstract015,
  GiAbstract016,
  GiAbstract038,
  GiAbstract061,
  GiAbstract063,
  GiAbstract102,
  GiAbstract107,
  GiAllForOne,
  GiAngelWings,
  GiBlackBook,
  GiBookAura,
  GiBookCover,
  GiBubblingFlask,
  GiBurningBook,
  GiCrownedHeart,
} from 'react-icons/gi';
import { BsLightningCharge } from 'react-icons/bs';
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';

const CurrentStatus = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const iconSize = useBreakpointValue({ base: 16, md: 24 });

  return (
    <Stack
      as="aside"
      py={6}
      px={8}
      align={{ base: 'flex-start', md: 'center' }}
      direction={{ base: 'column', md: 'row' }}
      spacing={{ base: 5, md: 8 }}
      bg="gray.50"
      rounded="lg"
      color="gray.900"
    >
      <Icon as={GiCrownedHeart} boxSize={iconSize} />

      <Stack spacing={4}>
        <Stack>
          <Text fontSize="sm" fontWeight="bold">
            Current Status: Season 0
          </Text>
          <Text fontSize="xs">
            We&apos;re forming guilds, creating culture, strengthening our
            community, teaching &amp; learning, and building cool shit together.
          </Text>
        </Stack>
        <Box>
          <Button
            size={buttonSize}
            fontSize="xs"
            bg="gray.50"
            border="1px"
            borderStyle="dashed"
            borderColor="gray.900"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.200' }}
            leftIcon={<BsLightningCharge />}
          >
            Read our Season 0 Snapshot
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default function IndexPage() {
  return (
    <Container>
      <Stack
        as="main"
        minH="100vh"
        py={10}
        px={{ base: 6, md: 4 }}
        justify="center"
        spacing={6}
        divider={
          <StackDivider
            h="2px"
            rounded="sm"
            bgGradient="linear(to-r, red.300, orange.300, yellow.300, green.300, blue.300, purple.300, pink.300)"
          />
        }
      >
        <Heading as="h1" fontSize="xl">
          Developer DAO
        </Heading>

        <Stack spacing={12}>
          <CurrentStatus />

          <Stack spacing={8}>
            <Heading as="h2" fontSize="lg">
              Mission
            </Heading>
            <Text>
              Developer DAO exists to accelerate the education and impact of a
              new wave of web3 builders.
            </Text>
          </Stack>

          <Stack spacing={8}>
            <Heading as="h2" fontSize="lg">
              Values
            </Heading>
            <UnorderedList spacing={3}>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Transparency
                </Text>
                : open source everything, conversations in public, document and
                share journey
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Diversity and Inclusion
                </Text>
                : seek to foster as diverse a membership as possible and support
                everyone to contribute
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Responsibility
                </Text>
                : as a self-governed community we rely on members to be
                personally responsible for their actions and commitments to the
                community
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Kindness and Empathy
                </Text>
                : we know that we are living in a complex, stressful, and
                diverse world and go out of our way to make people’s lives and
                days better through our interactions
              </ListItem>
            </UnorderedList>
          </Stack>

          <Stack spacing={8}>
            <Heading as="h2" fontSize="lg">
              Goals
            </Heading>
            <UnorderedList spacing={3}>
              <ListItem>
                Onboard, Educate, &amp; Support Web3 Developers
              </ListItem>
              <ListItem>
                Foster &amp; Build Web3 Tools &amp; Public Goods
              </ListItem>
            </UnorderedList>
          </Stack>
        </Stack>

        <HStack as="footer" justify="center">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="Twitter"
            icon={<FaTwitter />}
          />
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="Discord"
            icon={<FaDiscord />}
          />
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="GitHub"
            icon={<FaGithub />}
          />
        </HStack>
      </Stack>
    </Container>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
