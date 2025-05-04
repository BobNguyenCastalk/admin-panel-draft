import { userDetailsQuery } from "@dashboard/graphql/auth/queries";
import { apolloClient } from "@dashboard/graphql/client";

export const fetchUser = () => {
  return apolloClient.query({
    query: userDetailsQuery,
    fetchPolicy: "network-only",
  });
};
