// TODO: Context is being defined in presentation layer. To fix this
import { useUser } from "@presentation/pages/auth";
import useRouter from "use-react-router";

const PLUGIN_ID_PARAM = "saleorPluginId";

export const useAuthRedirection = () => {
  // TODO: this is tightly coupled with login by external plugin logic. To either remove this or refactor it
  const router = useRouter();
  const params = new URLSearchParams(router.location.search);
  const shouldRedirect = params.has(PLUGIN_ID_PARAM);
  const { authenticated, authenticating, isCredentialsLogin } = useUser();

  return {
    authenticated,
    authenticating: (authenticating || shouldRedirect) && !isCredentialsLogin, // Prevent redirecting when user is logging in with credentials
  };
};
