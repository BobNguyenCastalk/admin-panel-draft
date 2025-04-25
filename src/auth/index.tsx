import { Route } from "@presentation/shared/Router";
import { parse as parseQs } from "qs";
import React, { useContext } from "react";
import { RouteComponentProps, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import { UserContext as Context } from "./types";
import { LoginUrlQueryParams, newPasswordPath } from "./urls";
import LoginViewComponent from "./views/Login";
import NewPassword from "./views/NewPassword";

const LoginView: React.FC<RouteComponentProps<any>> = () => {
  const qs = parseQs(location.search.substr(1)) as any;
  const params: LoginUrlQueryParams = qs;

  return <LoginViewComponent params={params} />;
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

export * from "./utils";
export const useUser = () => useContext(UserContext);
