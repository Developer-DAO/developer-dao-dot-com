import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

export default function IndexPage() {
  const { t } = useTranslation();

  return (
    <Container>
      <Stack minH="100vh" py={8} justify="center" spacing={12}>
        <Heading as="h1" fontSize="5xl">
          Developer DAO
        </Heading>

        <Stack spacing={10}>
          <Stack spacing={6}>
            <Heading as="h2">Mission</Heading>
            <Text>
              Developer DAO exists to accelerate the education and impact of a
              new wave of web3 builders.
            </Text>
          </Stack>

          <Stack spacing={6}>
            <Heading as="h2">Values</Heading>
            <UnorderedList spacing={2}>
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

          <Stack spacing={6}>
            <Heading as="h2">Goals</Heading>
            <UnorderedList spacing={2}>
              <ListItem>
                Onboard, Educate, &amp; Support Web3 Developers
              </ListItem>
              <ListItem>
                Foster &amp; Build Web3 Tools &amp; Public Goods
              </ListItem>
            </UnorderedList>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
