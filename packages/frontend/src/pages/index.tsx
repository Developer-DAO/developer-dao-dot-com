import { Divider, useColorMode, VStack } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { gql } from '@apollo/client';
import nextI18nextConfig from '../../next-i18next.config';
import client from '../utils/apollo-client';

// COMPONENTS
import Intro from '../Components/Intro';
import Partners from '../Components/Partners';
import Purpose from '../Components/Purpose';
import SEO from '../Components/SEO';
import Layout from '../layout';

import { HomePage, StrapiComponent, StrapiSingleData } from '../types';

type HomePageProps = StrapiComponent<HomePage>;

export default function IndexPage({
  heading,
  sub_heading,
  current_status,
  partners,
  values,
  mission,
  goals,
  Footer,
  meta_og,
  news_ticker,
}: HomePageProps) {
  const { colorMode } = useColorMode();

  return (
    <Layout newsTickerContent={news_ticker?.content} footer={Footer!}>
      <SEO
        title={meta_og?.title}
        description={meta_og?.description}
        image={meta_og?.image_media.data?.attributes.url}
      />

      <VStack w="full" justify="center" spacing={4}>
        <Intro
          heading={heading}
          subHeading={sub_heading}
          currentStatus={current_status}
        />
        <Purpose values={values} mission={mission} goals={goals} />
        <Partners data={partners!} />
        <Divider
          w="full"
          size="1px"
          color={colorMode === 'dark' ? '#ffffff' : '#000000'}
        />
      </VStack>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const { data } = await client.query<{
    general: any;
    homePage: StrapiSingleData<HomePage>;
  }>({
    query: gql`
      query HomePage {
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
        homePage {
          data {
            attributes {
              meta_og {
                id
                title
                description
                image
                image_media {
                  data {
                    id
                    attributes {
                      provider
                      url
                    }
                  }
                }
              }
              heading
              sub_heading
              current_status {
                statement {
                  id
                  name
                  title
                  description
                }
                link {
                  id
                  name
                  type
                  title
                  link
                  disabled
                }
              }
              values {
                id
                name
                description
                title
              }
              mission
              goals {
                id
                name
                description
                title
              }
              partners {
                data {
                  id
                  attributes {
                    name
                    website
                    logo_dark {
                      data {
                        attributes {
                          provider
                          url
                        }
                      }
                    }
                    logo_light {
                      data {
                        attributes {
                          provider
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  console.log(data);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
      ...(data?.homePage?.data ? { ...data.homePage.data.attributes } : {}),
      ...(data?.general?.data ? { ...data.general.data.attributes } : {}),
    },
  };
};
