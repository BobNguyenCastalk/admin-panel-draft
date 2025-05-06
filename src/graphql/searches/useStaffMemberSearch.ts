// @ts-strict-ignore
import { gql } from "@apollo/client";

import makeTopLevelSearch from "@dashboard/business/hooks/shared/makeTopLevelSearch";
import {
  SearchStaffMembersDocument,
  SearchStaffMembersQuery,
  SearchStaffMembersQueryVariables,
} from "@graphql";

export const searchStaffMembers = gql`
  query SearchStaffMembers($after: String, $first: Int!, $query: String!) {
    search: staffUsers(after: $after, first: $first, filter: { search: $query }) {
      edges {
        node {
          id
          email
          firstName
          lastName
          isActive
          avatar {
            alt
            url
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export default makeTopLevelSearch<SearchStaffMembersQuery, SearchStaffMembersQueryVariables>(
  SearchStaffMembersDocument,
);
