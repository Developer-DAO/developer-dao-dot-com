import {
  Box,
  chakra,
  Flex,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '../layout/Page';

function Projects() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <chakra.main>
        <Box mx="auto" maxW="6xl" py={3} px={4}>
          <Text fontSize="xl">Projects</Text>
          <Text my={2} color="gray.600">
            {t('projects')}
          </Text>
          <UnorderedList spacing="1">
            <ListItem>
              <Flex alignItems="center">
                <Link href="https://ddao.ibby.dev/">DDAO Token Search</Link>
                <Box mx={1}>- {t('by')}</Box>
                <Text>Filipe Oliveira</Text>
                {/* <Link href="https://github.com/fmoliveira">fmoliveira</Link> */}
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Link href="https://developerdao.vercel.app/ ">
                  Developer DAO
                </Link>
                <Box mx={1}>- {t('by')}</Box>
                <Link href="https://github.com/fmoliveira">fmoliveira</Link>
              </Flex>
            </ListItem>
          </UnorderedList>
        </Box>
      </chakra.main>
    </PageLayout>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Projects;
