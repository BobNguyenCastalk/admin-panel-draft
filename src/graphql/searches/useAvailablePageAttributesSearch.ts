// @ts-strict-ignore
import { gql } from "@apollo/client";

import makeSearch from "@dashboard/business/hooks/shared/makeSearch";
import {
  SearchAvailablePageAttributesDocument,
  SearchAvailablePageAttributesQuery,
  SearchAvailablePageAttributesQueryVariables,
} from "@dashboard/graphql";

export default makeSearch<
  SearchAvailablePageAttributesQuery,
  SearchAvailablePageAttributesQueryVariables
>(SearchAvailablePageAttributesDocument, result =>
  result.loadMore(
    (prev, next) => {
      if (
        prev.pageType.availableAttributes.pageInfo.endCursor ===
        next.pageType.availableAttributes.pageInfo.endCursor
      ) {
        return prev;
      }

      return {
        ...prev,
        pageType: {
          ...prev.pageType,
          availableAttributes: {
            ...prev.pageType.availableAttributes,
            edges: [
              ...prev.pageType.availableAttributes.edges,
              ...next.pageType.availableAttributes.edges,
            ],
            pageInfo: next.pageType.availableAttributes.pageInfo,
          },
        },
      };
    },
    {
      after: result.data.pageType.availableAttributes.pageInfo.endCursor,
    },
  ),
);
