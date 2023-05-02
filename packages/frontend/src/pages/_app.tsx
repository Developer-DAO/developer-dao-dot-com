import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

import { client } from "../hooks/useUrql";
import Layout from "../components/Layout";
import type { General, StrapiSingleData } from "../types";

import { Provider } from "urql";

const App = ({
  Component,
  pageProps,
  general,
}: AppProps
  & { general: StrapiSingleData<General> }
) => {
  return (
    <Provider value={client}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        <Layout
          general={general}
        >
          <Component {...pageProps}
            general={general}
          />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

// https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
App.getInitialProps = async () => {
  const { data } = await client
    .query(
      `
    query General {
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
                id
                title
                link
                disabled
                type
                name
              }
              discover {
                id
                title
                link
                disabled
                type
                name
              }
              social {
                id
                title
                link
                disabled
                type
                name
              }
            }
          }
        }
      }
    }`,
      {}
    )
    .toPromise();


  return {
    general: data.general
  };
};

export default App;
