import { gql } from '@apollo/client';
import { Box, Flex, Heading, Text, Link, VStack } from '@chakra-ui/react';

import { format } from 'date-fns';
import client from '../utils/apollo-client';

// COMPONENTS
import Layout from '../layout';
import { Footer as footer } from '../types/cms/footer';

export default function JoinPage({
  news_ticker,
  Footer,
}: {
  news_ticker: { content: string };
  Footer: footer;
}) {
  return (
    <Layout newsTickerContent={news_ticker?.content} footer={Footer!}>
      <Flex
        mx="auto"
        flexDirection={{ base: 'column' }}
        justifyContent="space-between"
        pt={{ base: '0', lg: '4.5rem' }}
        pb="5rem"
        w="100%"
        maxW="5xl"
      >
        <Box mx="auto">
          <Heading
            as="h1"
            fontFamily="Inter"
            fontWeight="800"
            mr="2rem"
            fontSize={{ base: '2.625rem', xl: '3.375rem' }}
            lineHeight={{ base: '2.625rem', xl: '4rem' }}
          >
            Join Developer DAO
          </Heading>
          <Text fontSize="xs" mt="1rem">
            Last updated:{' '}
            {`${format(new Date(2023, 1, 17), "do',' MMMM yyyy")}`}
          </Text>
          <Flex
            mt="2.5rem"
            as="main"
            flexDirection={{ base: 'column' }}
            justifyContent="space-between"
            pt={{ base: '0', lg: '4.5rem' }}
            pb="5rem"
            w="100%"
          >
            <VStack alignItems="left" spacing="2.5" width="full">
              <Heading as="h2" fontSize="md">
                How do I join the Developer DAO?
              </Heading>
              <Text>
                Please visit our{' '}
                <Link
                  isExternal
                  textDecoration="underline"
                  href="https://developerdao.notion.site/Getting-Started-with-Developer-DAO-2bddd332c51a4957b0b83f60f9fa4ebe"
                >
                  Getting Started with Developer DAO
                </Link>{' '}
                Wiki page.
              </Text>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const { data } = await client.query({
    query: gql`
      query PrivacyPolucyPage {
        general {
          data {
            attributes {
              news_ticker {
                content
              }
              Footer {
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                useful_links {
                  title
                  link
                }
                discover {
                  title
                  link
                }
                social {
                  name
                  link
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      ...(data?.general?.data ? { ...data.general.data.attributes } : {}),
    },
  };
};
