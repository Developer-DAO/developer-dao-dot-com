import { createClient } from "urql";

export const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API || "https://localhost:1337/graphql",
});
