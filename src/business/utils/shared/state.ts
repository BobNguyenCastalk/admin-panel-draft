import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { USER } from "@business/utils/auth/temp";

interface SaleorClientInternals {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export const getState = (client: SaleorClientInternals["apolloClient"]) =>
  client.readQuery({
    query: USER,
  });
