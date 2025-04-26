import { newPasswordPath } from "@business/utils/auth/urls";
import { Route } from "@presentation/shared/Router";
import { parse as parseQs } from "qs";
import React, { useContext } from "react";
import { RouteComponentProps, Switch } from "react-router-dom";

import { UserContext as Context } from "../../../auth/types";
import Layout from "./components/Layout";
import LoginViewComponent from "./views/Login";
import NewPassword from "./views/NewPassword";

const LoginView: React.FC<RouteComponentProps<any>> = () => {
  const qs = parseQs(location.search.substr(1)) as any;

  return <LoginViewComponent />;
};

export const UserContext = React.createContext<Context>({
  login: undefined,
  loginByExternalPlugin: undefined,
  logout: undefined,
  requestLoginByExternalPlugin: undefined,
  authenticating: false,
  isCredentialsLogin: false,
  authenticated: false,
  errors: [],
  refetchUser: undefined,
});

const AuthRouter: React.FC = () => (
  <Layout>
    <Switch>
      <Route path={newPasswordPath} component={NewPassword} />
      <Route component={LoginView} />
    </Switch>
  </Layout>
);

AuthRouter.displayName = "AuthRouter";
export default AuthRouter;

export * from "@business/utils/auth/utils"; // TODO: to update this
export const useUser = () => useContext(UserContext);
