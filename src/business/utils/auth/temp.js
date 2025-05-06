// This is the temporary file for the authentication function
// TODO: Remove this file after the authentication is done
import { gql } from "@apollo/client";
import { storage } from "@business/utils/shared/storage";
import { useBoundStore } from "@dashboard/stores";

export const userBaseFragment = gql`
  fragment UserBaseFragment on User {
    id
    email
    firstName
    lastName
    isStaff
    userPermissions {
      code
      name
    }
  }
`;

export const userDetailsFragment = gql`
  ${userBaseFragment}
  fragment UserDetailsFragment on User {
    ...UserBaseFragment
    metadata {
      key
      value
    }
  }
`;

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
    message
  }
`;

export const USER_WITHOUT_DETAILS = gql`
  ${userBaseFragment}
  query UserWithoutDetails {
    user: me {
      ...UserBaseFragment
    }
    authenticated @client
    authenticating @client
  }
`;

export const LOGIN_WITHOUT_DETAILS = gql`
  ${accountErrorFragment}
  ${userBaseFragment}
  mutation loginWithoutDetails($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      refreshToken
      token
      errors {
        ...AccountErrorFragment
      }
      user {
        ...UserBaseFragment
      }
    }
  }
`;

export const USER = gql`
  ${userDetailsFragment}
  query User {
    user: me {
      ...UserDetailsFragment
    }
    authenticated @client
    authenticating @client
  }
`;

export const REFRESH_TOKEN = gql`
  ${accountErrorFragment}
  mutation refreshToken($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const REFRESH_TOKEN_WITH_USER = gql`
  ${accountErrorFragment}
  ${userDetailsFragment}
  mutation refreshTokenWithUser($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
      user {
        ...UserDetailsFragment
      }
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const login = (client, { email, password }) => {
  const query = USER_WITHOUT_DETAILS;
  const loginMutation = LOGIN_WITHOUT_DETAILS;

  client.writeQuery({
    query,
    data: {
      authenticating: true,
    },
  });

  return client.mutate({
    mutation: loginMutation,
    variables: {
      email,
      password,
    },
    update: (_, { data }) => {
      if (data?.tokenCreate?.token) {
        storage.setTokens({
          accessToken: data.tokenCreate.token,
          refreshToken: data.tokenCreate.refreshToken,
        });
      } else {
        client.writeQuery({
          query,
          data: {
            authenticating: false,
          },
        });
      }
    },
  });
};

export const logout = client => {
  storage.clear();
  client.writeQuery({
    query: USER,
    data: {
      authenticating: false,
    },
  });
  client.resetStore();

  return null;
};

export const refreshToken = (client, includeUser = false) => {
  const refreshToken = storage.getRefreshToken();

  if (!refreshToken) {
    throw Error("refreshToken not present");
  }

  if (includeUser) {
    return client.mutate({
      mutation: REFRESH_TOKEN_WITH_USER,
      variables: {
        refreshToken,
      },
      update: (_, { data }) => {
        if (data?.tokenRefresh?.token) {
          storage.setAccessToken(data.tokenRefresh.token);
          useBoundStore.setState({ authenticated: true });
        } else {
          logout(client);
        }
      },
    });
  }

  return client.mutate({
    mutation: REFRESH_TOKEN,
    variables: {
      refreshToken,
    },
    update: (_, { data }) => {
      if (data?.tokenRefresh?.token) {
        storage.setAccessToken(data.tokenRefresh.token);
      } else {
        logout();
      }
    },
  });
};
