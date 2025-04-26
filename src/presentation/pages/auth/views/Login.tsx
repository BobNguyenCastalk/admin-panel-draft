import { useAuthParameters } from "@business/hooks/auth/useAuthParameters";
import { loginCallbackPath, LoginUrlQueryParams } from "@business/utils/auth/urls";
import { getAppMountUriForRedirect } from "@dashboard/business/utils/shared/urls";
import React from "react";
import urlJoin from "url-join";
import useRouter from "use-react-router";

import { useUser } from "..";
import LoginPage from "../components/LoginPage";
import { LoginFormData } from "../components/LoginPage/types";

interface LoginViewProps {
  params: LoginUrlQueryParams;
}

const LoginView: React.FC<LoginViewProps> = ({ params }) => {
  const { location } = useRouter();
  const { login, requestLoginByExternalPlugin, loginByExternalPlugin, authenticating, errors } =
    useUser();

  const {
    fallbackUri,
    requestedExternalPluginId,
    isCallbackPath,
    setFallbackUri,
    setRequestedExternalPluginId,
  } = useAuthParameters();

  const handleSubmit = async (data: LoginFormData) => {
    if (!login) {
      return;
    }

    const result = await login(data.email, data.password);
    const errors = result?.errors || [];

    return errors;
  };

  const handleRequestExternalAuthentication = async (pluginId: string) => {
    setFallbackUri(location.pathname);

    const result = await requestLoginByExternalPlugin!(pluginId, {
      redirectUri: urlJoin(window.location.origin, getAppMountUriForRedirect(), loginCallbackPath),
    });
    const data = JSON.parse(result?.authenticationData || "");

    if (data && !result?.errors?.length) {
      setRequestedExternalPluginId(pluginId);
      window.location.href = data.authorizationUrl;
    }
  };

  return (
    <LoginPage
      errors={errors}
      disabled={authenticating}
      loading={authenticating}
      onExternalAuthentication={handleRequestExternalAuthentication}
      onSubmit={handleSubmit}
    />
  );
};

LoginView.displayName = "LoginView";
export default LoginView;
