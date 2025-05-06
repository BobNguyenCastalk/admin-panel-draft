import { ApolloQueryResult } from "@apollo/client";
import { UserDetailsQuery, UserFragment } from "@dashboard/graphql";
import { LoginData } from "@saleor/sdk";

export interface RequestExternalLoginInput {
  redirectUri: string;
}

export interface ExternalLoginInput {
  code: string;
  state: string;
}

export interface RequestExternalLogoutInput {
  returnTo: string;
}

export const UserContextError = {
  loginError: "loginError",
  serverError: "serverError",
  noPermissionsError: "noPermissionsError",
  externalLoginError: "externalLoginError",
  loginAttemptDelay: "loginAttemptDelay",
  unknownLoginError: "unknownLoginError",
  invalidCredentials: "invalidCredentials",
} as const;

export type UserContextError = (typeof UserContextError)[keyof typeof UserContextError];

export interface UserContext {
  login?: (username: string, password: string) => Promise<LoginData | undefined>;
  logout?: () => Promise<void>;
  authenticating: boolean;
  authenticated: boolean;
  errors: UserContextError[];
}
