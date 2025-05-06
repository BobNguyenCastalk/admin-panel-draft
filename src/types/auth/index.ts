import { LoginData } from "@saleor/sdk";

export const UserContextError = {
  loginError: "loginError",
  serverError: "serverError",
  noPermissionsError: "noPermissionsError",
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
}
