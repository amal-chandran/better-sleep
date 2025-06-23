import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  process.env.CONTENTFUL_GRAPHQL_ENDPOINT!,
  {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_TOKEN}`,
    },
  }
);
