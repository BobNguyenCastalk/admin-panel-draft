import React from "react";
import { useIntl } from "react-intl";

import { useApolloClient } from "@apollo/client";

import { useAuth } from "@dashboard/business/hooks/auth/useAuth";
import useNotifier from "@dashboard/business/hooks/shared/useNotifier";
import { useBoundStore } from "@dashboard/stores";

import LoginPage from "../components/LoginPage";
import { LoginFormData } from "../components/LoginPage/types";

const LoginView: React.FC = () => {
  const apolloClient = useApolloClient();
  const intl = useIntl();
  const notify = useNotifier();

  const authErrors = useBoundStore(state => state.authErrors);
  const authenticating = useBoundStore(state => state.authenticating);

  const { login } = useAuth({ intl, notify, apolloClient });

  const handleSubmit = async (data: LoginFormData) => {
    if (!login) {
      return;
    }

    const result = await login(data.email, data.password);
    const errors = result?.errors || [];

    return errors;
  };

  return (
    <LoginPage
      errors={authErrors}
      disabled={authenticating}
      loading={authenticating}
      onSubmit={handleSubmit}
    />
  );
};

LoginView.displayName = "LoginView";
export default LoginView;
