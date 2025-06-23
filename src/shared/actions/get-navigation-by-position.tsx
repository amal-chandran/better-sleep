import { graphql } from "@/gql";
import { client } from "@/shared/graphql/client";

export const getNavigationByPositionQuery = graphql(/* GraphQL */ `
  query getNavigationByPosition($position: String!) {
    navigationCollection(where: { position: $position }) {
      items {
        link
        label
        groupName
        position
      }
    }
  }
`);

export async function getNavigationByPosition(position: string) {
  const navigationOut = await client.request(getNavigationByPositionQuery, {
    position,
  });

  if (!navigationOut || !navigationOut.navigationCollection?.items) {
    throw new Error(`Navigation for position ${position} not found`);
  }

  return navigationOut.navigationCollection;
}

export type NavigationItem = Awaited<
  ReturnType<typeof getNavigationByPosition>
>["items"][number];
