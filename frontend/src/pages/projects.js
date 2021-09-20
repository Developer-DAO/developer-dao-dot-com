import React from 'react';
import PageLayout from '../layout/Page';
import {
  chakra,
  VStack,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <chakra.main>
        <VStack px={52} w="full" align="self-start" textAlign="left">
          <Text fontSize="lg">Projects</Text>
          <Text fontSize="sm" color="gray.600">
            {t('projects')}
          </Text>
          <UnorderedList spacing="1">
            <ListItem>
              <Link href="https://ddao.ibby.dev/">Developer Dao Tokens</Link>
            </ListItem>
            <ListItem>
              <Link href="https://developerdao.vercel.app/ ">Developer DAO</Link>
            </ListItem>
          </UnorderedList>
        </VStack>
      </chakra.main>
    </PageLayout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Projects;
