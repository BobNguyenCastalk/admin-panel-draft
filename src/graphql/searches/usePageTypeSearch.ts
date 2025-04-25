// @ts-strict-ignore
import { gql } from "@apollo/client";
import makeTopLevelSearch from "@dashboard/business/hooks/shared/makeTopLevelSearch";
import {
  SearchPageTypesDocument,
  SearchPageTypesQuery,
  SearchPageTypesQueryVariables,
} from "@dashboard/graphql";

export const searchPageTypes = gql`
  query SearchPageTypes($after: String, $first: Int!, $query: String!) {
    search: pageTypes(after: $after, first: $first, filter: { search: $query }) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export default makeTopLevelSearch<SearchPageTypesQuery, SearchPageTypesQueryVariables>(
  SearchPageTypesDocument,
);
