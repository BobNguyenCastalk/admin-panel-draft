import React from "react";

import { useUser } from "..";
import LoginPage from "../components/LoginPage";
import { LoginFormData } from "../components/LoginPage/types";

const LoginView: React.FC = () => {
  const { login, requestLoginByExternalPlugin, loginByExternalPlugin, authenticating, errors } =
    useUser();

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
      errors={errors}
      disabled={authenticating}
      loading={authenticating}
      onSubmit={handleSubmit}
    />
  );
};

LoginView.displayName = "LoginView";
export default LoginView;
