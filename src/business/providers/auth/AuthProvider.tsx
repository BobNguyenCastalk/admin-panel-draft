import { useApolloClient } from "@apollo/client";
import { useAuthProvider } from "@business/hooks/auth/useAuthProvider";
import useNotifier from "@dashboard/hooks/useNotifier";
import { UserContext } from "@presentation/pages/auth";
import React from "react";
import { useIntl } from "react-intl";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const apolloClient = useApolloClient();
  const intl = useIntl();
  const notify = useNotifier();
  const authProvider = useAuthProvider({ intl, notify, apolloClient });

  return <UserContext.Provider value={authProvider}>{children}</UserContext.Provider>;
};

export default AuthProvider;
