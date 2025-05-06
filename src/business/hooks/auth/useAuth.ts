import { ApolloClient, ApolloError } from "@apollo/client";
import { parseAuthError } from "@business/utils/auth/errors";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { login, logout } from "@dashboard/business/utils/auth/temp";
import {
  checkIfCredentialsExist,
  isSupported as isCredentialsManagementAPISupported,
  login as loginWithCredentialsManagementAPI,
  saveCredentials,
} from "@dashboard/business/utils/shared/credentialsManagement";
import { commonMessages } from "@dashboard/constants/common/intl";
import { AccountErrorCode, useUserDetailsQuery } from "@dashboard/graphql";
import { useBoundStore } from "@dashboard/stores";
import { UserContext, UserContextError } from "@dashboard/types/auth";
import { IMessageContext } from "@presentation/shared/messages";
import isEmpty from "lodash/isEmpty";
import { useCallback, useEffect, useRef, useState } from "react";
import { IntlShape } from "react-intl";

export interface UseAuthOpts {
  intl: IntlShape;
  notify: IMessageContext;
  apolloClient: ApolloClient<any>;
}
type AuthErrorCodes = `${AccountErrorCode}`;

export function useAuth({ intl, notify, apolloClient }: UseAuthOpts): UserContext {
  const navigate = useNavigator();
  const authenticated = useBoundStore(state => state.authenticated);
  const authenticating = useBoundStore(state => state.authenticating);
  const user = useBoundStore(state => state.user);
  const setUser = useBoundStore(state => state.setUser);
  const setAuthenticated = useBoundStore(state => state.setAuthenticated);
  const setAuthenticating = useBoundStore(state => state.setAuthenticating);

  const [errors, setErrors] = useState<UserContextError[]>([]);
  const permitCredentialsAPI = useRef(true);

  const handleLoginError = (error: ApolloError) => {
    const parsedErrors = parseAuthError(error);

    if (parsedErrors.length) {
      setErrors(parsedErrors);
    } else {
      setErrors(["unknownLoginError"]);
    }
  };

  const handleLogout = useCallback(async () => {
    setAuthenticated(false);
    setUser(null);

    const result = await logout(apolloClient);
    // Clear credentials from browser's credential manager only when exist.
    // Chrome 115 crash when calling preventSilentAccess() when no credentials exist.
    const hasCredentials = await checkIfCredentialsExist();

    if (isCredentialsManagementAPISupported && !!hasCredentials) {
      navigator.credentials.preventSilentAccess();
    }

    // Forget last logged in user data.
    // On next login, user details query will be refetched due to cache-and-network fetch policy.
    apolloClient.clearStore();

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
  }, [apolloClient, navigate, setAuthenticated, setUser]);

  const logoutNonStaffUser = useCallback(
    async data => {
      if (data?.user && !data.user.isStaff) {
        notify({
          status: "error",
          text: intl.formatMessage(commonMessages.unauthorizedDashboardAccess),
          title: intl.formatMessage(commonMessages.insufficientPermissions),
        });
        await handleLogout();
      }
    },
    [handleLogout, intl, notify],
  );

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        setAuthenticating(true);

        const result = await login(apolloClient, {
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
          setErrors(["noPermissionsError"]);
          await handleLogout();
        }

        const hasUser = !!result.data?.tokenCreate?.user;

        if (hasUser && !errorList?.length) {
          saveCredentials(result.data!.tokenCreate!.user!, password);
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

          setErrors(userContextErrorList);
        }

        await logoutNonStaffUser(result.data?.tokenCreate!);
        setAuthenticated(true);
        setUser(result.data?.tokenCreate?.user);

        return result.data?.tokenCreate;
      } catch (error) {
        if (error instanceof ApolloError) {
          handleLoginError(error);
        } else {
          setErrors(["unknownLoginError"]);
        }
      } finally {
        setAuthenticating(false);
      }
    },
    [apolloClient, handleLogout, logoutNonStaffUser, setAuthenticated, setAuthenticating, setUser],
  );

  useEffect(() => {
    if (authenticating && errors.length) {
      setErrors([]);
    }
  }, [authenticating, errors.length]);

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
    authenticating: authenticating && !errors.length,
    authenticated: authenticated && !!user?.isStaff && !errors.length,
    errors,
  };
}
