import { graphql } from "@/gql";
import { client } from "@/shared/graphql/client";

export const getPageBySlugQuery = graphql(/* GraphQL */ `
  query pageCollectionQuery($slug: String) {
    pageCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        metaTitle
        metaDescription
        slug
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

export async function getPageBySlug(slug: string) {
  const pageOut = await client.request(getPageBySlugQuery, { slug });

  if (!pageOut || !pageOut.pageCollection?.items?.[0]) {
    throw new Error(`Page with slug '${slug}' not found`);
  }

  return pageOut.pageCollection.items[0];
}

export type PageBySlug = Awaited<ReturnType<typeof getPageBySlug>>;
