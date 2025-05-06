import { gql } from "@apollo/client";

import { UserFragmentDoc } from "@dashboard/graphql/hooks.generated";

export const userDetailsQuery = gql`
  query UserDetails {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`;
