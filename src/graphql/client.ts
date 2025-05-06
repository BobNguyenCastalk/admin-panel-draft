// DON'T TOUCH THIS
// These are separate clients and do not share configs between themselves
import { ApolloClient, ApolloLink, FetchResult, InMemoryCache } from "@apollo/client";

import { logout, refreshToken as getRefreshToken } from "@business/utils/auth/temp";
import { getState } from "@business/utils/shared/state";
import { createStorage, storage } from "@business/utils/shared/storage";
import { DEVELOPMENT_MODE, WINDOW_EXISTS } from "@constants/common/app";
import { ENABLED_SERVICE_NAME_HEADER, getApiUrl } from "@dashboard/configs";
import { createUploadLink } from "apollo-upload-client";
import jwtDecode from "jwt-decode";

import introspectionQueryResultData from "./fragmentTypes.generated";
import { TypedTypePolicies } from "./typePolicies.generated";

interface SaleorClientOpts {
  channel: string;
}

const attachVariablesLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const contextHeaders: Record<string, string> = { ...headers };

    if (ENABLED_SERVICE_NAME_HEADER) {
      contextHeaders["source-service-name"] = "saleor.dashboard";
    }

    return {
      headers: contextHeaders,
    };
  });

  return forward(operation).map(data => ({
    ...data,
    extensions: {
      ...data.extensions,
      variables: operation.variables,
    },
  }));
});

export type FetchConfig = Partial<{
  /**
   * Enable auto token refreshing. Default to `true`.
   */
  autoTokenRefresh: boolean;
  /**
   * Set a value for skew between local time and token expiration date in
   * seconds (only together with `autoTokenRefresh`). Defaults to `120`.
   */
  tokenRefreshTimeSkew: number;
  /**
   * Refresh token and retry the request when Saleor responds with `Unauthorized` error.
   * Defaults to `true`.
   */
  refreshOnUnauthorized: boolean;
}>;

export type JWTToken = {
  iat: number;
  iss: string;
  owner: string;
  exp: number;
  token: string;
  email: string;
  type: string;
  user_id: string;
  is_staff: boolean;
};

let refreshPromise = null;

export const createFetch =
  ({
    autoTokenRefresh = true,
    tokenRefreshTimeSkew = 120,
    refreshOnUnauthorized = true,
  }: FetchConfig = {}) =>
  async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
    let token = storage.getAccessToken();
    // try {
    //   if (
    //     ["refreshToken"].includes(
    //       // INFO: Non-null assertion is enabled because the block is wrapped inside try/catch
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //       JSON.parse(init.body!.toString()).operationName,
    //     )
    //   ) {
    //     return fetch(input, init);
    //   }
    // } catch (e) {
    //   // TODO: handle error
    // }

    if (autoTokenRefresh && token) {
      // auto refresh token before provided time skew (in seconds) until it expires
      const decodedToken = jwtDecode<JWTToken>(token);
      const expirationTime = (decodedToken.exp - tokenRefreshTimeSkew) * 1000;

      try {
        if (refreshPromise) {
          await refreshPromise;
        } else if (Date.now() >= expirationTime) {
          await refreshToken(apolloClient);
        }
      } catch (e) {
        // TODO: handle error
      } finally {
        refreshPromise = null;
      }

      token = storage.getAccessToken();
    }

    if (token) {
      init.headers = {
        ...init.headers,
        "authorization-bearer": token,
      };
    }

    if (refreshOnUnauthorized && token) {
      const response = await fetch(input, init);
      const data: FetchResult = await response.clone().json();
      const isUnauthenticated = data?.errors?.some(
        error => error.extensions?.exception.code === "ExpiredSignatureError",
      );
      let refreshTokenResponse = null;

      if (isUnauthenticated) {
        try {
          if (refreshPromise) {
            refreshTokenResponse = await refreshPromise;
          } else {
            refreshPromise = refreshToken(apolloClient);
            refreshTokenResponse = await refreshPromise;
          }

          if (refreshTokenResponse.data?.tokenRefresh?.token) {
            // check if mutation returns a valid token after refresh and retry the request
            return createFetch({
              autoTokenRefresh: false,
              refreshOnUnauthorized: false,
            })(input, init);
          } else {
            // after Saleor returns ExpiredSignatureError status and token refresh fails
            // we log out the user and return the failed response
            logout(apolloClient);
          }
        } catch (e) {
          // TODO: handle error
        } finally {
          refreshPromise = null;
        }
      }

      return response;
    }

    return fetch(input, init);
  };

export const link = attachVariablesLink.concat(
  createUploadLink({
    credentials: "include",
    uri: getApiUrl(),
    fetch: createFetch(),
  }) as unknown as ApolloLink, // type mismatch between apollo-upload-client and @apollo/cient
);

export const apolloClient = new ApolloClient({
  connectToDevTools: process.env.NODE_ENV === "development",
  cache: new InMemoryCache({
    possibleTypes: introspectionQueryResultData.possibleTypes,
    typePolicies: {
      CountryDisplay: {
        keyFields: ["code"],
      },
      Money: {
        merge: false,
      },
      TaxedMoney: {
        merge: false,
      },
      Weight: {
        merge: false,
      },
      Shop: {
        keyFields: [],
      },
      AttributeValue: {
        fields: {
          /**
           * Since, API sometimes creates an empty slug,
           * We need to handle that case also on front-end,
           * so after fix that problem in the API, the UI will ablle
           * to handle it.
           *
           * If the slug is empty, use the name
           */
          slug: (givenSlug, { readField }) => {
            if (!givenSlug) {
              return readField("name");
            }

            return givenSlug;
          },
        },
      },
    } as TypedTypePolicies,
  }),
  link,
});

const createSaleorClient = ({ channel }: SaleorClientOpts) => {
  let _channel = channel;

  const setChannel = (channel: string): string => {
    _channel = channel;

    return _channel;
  };

  createStorage(true);

  const refreshToken = storage.getRefreshToken();

  if (refreshToken) {
    getRefreshToken(apolloClient, true);
  }

  const client = {
    auth: null,
    user: null,
    config: { channel: _channel, setChannel, autologin: true },
    _internal: { apolloClient },
    getState: () => getState(apolloClient),
  };

  if (DEVELOPMENT_MODE && WINDOW_EXISTS) {
    (window as any).__SALEOR_CLIENT__ = client;
  }

  return client;
};

export const saleorClient = createSaleorClient({
  channel: "",
});
