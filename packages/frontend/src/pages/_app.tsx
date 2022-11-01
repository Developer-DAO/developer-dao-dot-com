import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";

import { createClient, Provider } from "urql";

const client = createClient({
  url: process.env.NEXT_PUBLIC_STRAPI_URL || "",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
