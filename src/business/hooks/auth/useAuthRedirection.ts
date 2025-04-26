import { loginCallbackPath } from "@business/utils/auth/urls";
import { getAppMountUriForRedirect } from "@dashboard/business/utils/shared/urls";
// TODO: Context is being defined in presentation layer. To fix this
import { useUser } from "@presentation/pages/auth";
import { useEffect } from "react";
import urlJoin from "url-join";
import useRouter from "use-react-router";

const PLUGIN_ID_PARAM = "saleorPluginId";

export const useAuthRedirection = () => {
  // TODO: this is tightly coupled with login by external plugin logic. To either remove this or refactor it
  const router = useRouter();
  const params = new URLSearchParams(router.location.search);
  const shouldRedirect = params.has(PLUGIN_ID_PARAM);
  const { authenticated, authenticating, requestLoginByExternalPlugin, isCredentialsLogin } =
    useUser();
  const pluginId = params.get(PLUGIN_ID_PARAM);
  const handleAuthentication = async () => {
    const redirectUri = urlJoin(
      window.location.origin,
      getAppMountUriForRedirect(),
      loginCallbackPath,
    );
    const response = await requestLoginByExternalPlugin!(pluginId!, {
      redirectUri,
    });
    const data = JSON.parse(response?.authenticationData || "");

    if (data && !response?.errors?.length) {
      window.location.href = data.authorizationUrl;
    }
  };

  useEffect(() => {
    if (shouldRedirect && !authenticated && !authenticating) {
      handleAuthentication();
    }
  }, [shouldRedirect, authenticated, authenticating]);

  return {
    authenticated,
    authenticating: (authenticating || shouldRedirect) && !isCredentialsLogin, // Prevent redirecting when user is logging in with credentials
  };
};
