import { graphql } from "@/gql";
import { client } from "@/shared/graphql/client";

export const getHomePageQuery = graphql(/* GraphQL */ `
  query getHomePageQuery {
    homePageCollection(limit: 1) {
      items {
        title
        metaTitle
        metaDescription
        carouselCollection {
          items {
            title
            image {
              url
            }
          }
        }
        sectionsCollection {
          items {
            __typename
            ... on TextSection {
              content {
                json
              }
              title
            }
            ... on ImageSection {
              image {
                url
              }
              title
            }
            ... on TextImageSection {
              content {
                json
              }
              title
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`);

export async function getHomePage() {
  const homePageOut = await client.request(getHomePageQuery);

  if (!homePageOut) {
    throw new Error("Homepage not found");
  }

  return homePageOut.homePageCollection;
}
