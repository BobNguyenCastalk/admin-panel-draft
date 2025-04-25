import { gql } from "@apollo/client";

export const searchOrdersByNumber = gql`
  query SearchOrdersByNumber($first: Int!, $query: [String!]) {
    orders(first: $first, filter: { numbers: $query }) {
      edges {
        node {
          id
          number
          status
        }
      }
    }
  }
`;

export const searchCatalog = gql`
  query SearchCatalog($first: Int!, $query: String!) {
  }
`;
