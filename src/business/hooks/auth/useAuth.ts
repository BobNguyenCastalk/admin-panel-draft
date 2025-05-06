import { useCallback, useEffect, useRef } from "react";
import { ApolloError, useApolloClient } from "@apollo/client";

import { parseAuthError } from "@business/utils/auth/errors";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { login, logout } from "@dashboard/business/utils/auth/temp";
import {
  checkIfCredentialsExist,
  isSupported as isCredentialsManagementAPISupported,
  login as loginWithCredentialsManagementAPI,
  saveCredentials,
} from "@dashboard/business/utils/shared/credentialsManagement";
import { AccountErrorCode } from "@dashboard/graphql";
import { useBoundStore } from "@dashboard/stores";
import { UserContext, UserContextError } from "@dashboard/types/auth";
import isEmpty from "lodash/isEmpty";

type AuthErrorCodes = `${AccountErrorCode}`;

export function useAuth(): UserContext {
  const client = useApolloClient();
  const navigate = useNavigator();
  const authenticated = useBoundStore(state => state.authenticated);
  const authenticating = useBoundStore(state => state.authenticating);
  const setUser = useBoundStore(state => state.setUser);
  const setAuthenticated = useBoundStore(state => state.setAuthenticated);
  const setAuthenticating = useBoundStore(state => state.setAuthenticating);
  const setAuthErrors = useBoundStore(state => state.setAuthErrors);
  const authErrors = useBoundStore(state => state.authErrors);

  const permitCredentialsAPI = useRef(true);

  const handleLoginError = useCallback(
    (error: ApolloError) => {
      const parsedErrors = parseAuthError(error);

      if (parsedErrors.length) {
        setAuthErrors(parsedErrors);
      } else {
        setAuthErrors(["unknownLoginError"]);
      }
    },
    [setAuthErrors],
  );

  const handleLogout = useCallback(async () => {
    setAuthenticated(false);
    setUser(null);

    const result = await logout(client);
    // Clear credentials from browser's credential manager only when exist.
    // Chrome 115 crash when calling preventSilentAccess() when no credentials exist.
    const hasCredentials = await checkIfCredentialsExist();

    if (isCredentialsManagementAPISupported && !!hasCredentials) {
      navigator.credentials.preventSilentAccess();
    }

    // Forget last logged in user data.
    // On next login, user details query will be refetched due to cache-and-network fetch policy.
    client.clearStore();

    const errors = result?.errors || [];
    const externalLogoutUrl = result
      ? JSON.parse(result.data?.externalLogout?.logoutData || null)?.logoutUrl
      : "";

    if (!errors.length) {
      if (externalLogoutUrl) {
        window.location.href = externalLogoutUrl;
      } else {
        navigate("/");
      }
    }
  }, [client, navigate, setAuthenticated, setUser]);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        setAuthenticating(true);

        const result = await login(client, {
          email,
          password,
          includeDetails: false,
        });

        const errorList = result.data?.tokenCreate?.errors?.map(
          ({ code }) => code,
          // SDK is deprecated and has outdated types - we need to use ones from Dashboard
        ) as AuthErrorCodes[];

        const userLoggedInButHasNoPermissions =
          result.data?.tokenCreate?.user &&
          isEmpty(result.data?.tokenCreate?.user?.userPermissions);

        if (userLoggedInButHasNoPermissions) {
          setAuthErrors(["noPermissionsError"]);
          await handleLogout();
        }

        if (!errorList?.length) {
          saveCredentials(result.data!.tokenCreate!.user!, password);
          setAuthenticated(true);
          setUser(result.data?.tokenCreate?.user);
        } else {
          const userContextErrorList: UserContextError[] = [];

          errorList?.forEach(error => {
            switch (error) {
              case AccountErrorCode.LOGIN_ATTEMPT_DELAYED:
                userContextErrorList.push("loginAttemptDelay");
                break;
              case AccountErrorCode.INVALID_CREDENTIALS:
                userContextErrorList.push("invalidCredentials");
                break;
              default:
                userContextErrorList.push("loginError");
                break;
            }
          });

          setAuthErrors(userContextErrorList);
        }

        return result.data?.tokenCreate;
      } catch (error) {
        if (error instanceof ApolloError) {
          handleLoginError(error);
        } else {
          setAuthErrors(["unknownLoginError"]);
        }
      } finally {
        setAuthenticating(false);
      }
    },
    [
      setAuthenticating,
      client,
      setAuthenticated,
      setUser,
      setAuthErrors,
      handleLogout,
      handleLoginError,
    ],
  );

  useEffect(() => {
    if (authenticating && authErrors.length) {
      setAuthErrors([]);
    }
  }, [authenticating, authErrors.length, setAuthErrors]);

  useEffect(() => {
    if (authenticated) {
      permitCredentialsAPI.current = true;
    }
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated && !authenticating && permitCredentialsAPI.current) {
      permitCredentialsAPI.current = false;
      loginWithCredentialsManagementAPI(handleLogin);
    }
  }, [authenticated, authenticating, handleLogin]);

  return {
    login: handleLogin,
    logout: handleLogout,
  };
}
