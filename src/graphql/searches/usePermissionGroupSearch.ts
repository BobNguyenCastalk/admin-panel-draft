// @ts-strict-ignore
import { gql } from "@apollo/client";
import makeTopLevelSearch from "@dashboard/business/hooks/shared/makeTopLevelSearch";
import {
  SearchPermissionGroupsDocument,
  SearchPermissionGroupsQuery,
  SearchPermissionGroupsQueryVariables,
} from "@dashboard/graphql";

export const searchPermissionGroups = gql`
  query SearchPermissionGroups($after: String, $first: Int!, $query: String!) {
    search: permissionGroups(after: $after, first: $first, filter: { search: $query }) {
      edges {
        node {
          id
          name
          userCanManage
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export default makeTopLevelSearch<
  SearchPermissionGroupsQuery,
  SearchPermissionGroupsQueryVariables
>(SearchPermissionGroupsDocument);
