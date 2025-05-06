import React from "react";

import { useAuth } from "@dashboard/business/hooks/auth/useAuth";
import { useBoundStore } from "@dashboard/stores";

import LoginPage from "../components/LoginPage";
import { LoginFormData } from "../components/LoginPage/types";

const LoginView: React.FC = () => {
  const authErrors = useBoundStore(state => state.authErrors);
  const authenticating = useBoundStore(state => state.authenticating);

  const { login } = useAuth();

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
