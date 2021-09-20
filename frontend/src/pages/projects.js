import {
  Box,
  chakra,
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
          <Text fontSize="lg">Projects</Text>
          <Text my={2} fontSize="sm" color="gray.600">
            {t('projects')}
          </Text>
          <UnorderedList spacing="1">
            <ListItem>
              <Link href="https://ddao.ibby.dev/">Developer Dao Tokens</Link>
            </ListItem>
            <ListItem>
              <Link href="https://developerdao.vercel.app/ ">
                Developer DAO
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
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
