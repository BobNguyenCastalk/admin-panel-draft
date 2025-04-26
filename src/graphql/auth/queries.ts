import { gql } from "@apollo/client";

export const userDetailsQuery = gql`
  query UserDetails {
    me {
      ...User
    }
  }
`;
