import React from "react";
import { RouteComponentProps, Switch } from "react-router-dom";

import {
  newPasswordPath,
  passwordResetPath,
  passwordResetSuccessPath,
} from "@business/utils/auth/urls";
import { Route } from "@presentation/shared/Router";

import Layout from "./components/Layout";
import LoginViewComponent from "./views/Login";
import NewPassword from "./views/NewPassword";
import ResetPassword from "./views/ResetPassword";
import ResetPasswordSuccess from "./views/ResetPasswordSuccess";

const LoginView: React.FC<RouteComponentProps<any>> = () => {
  return <LoginViewComponent />;
};

const AuthRouter: React.FC = () => (
  <Layout>
    <Switch>
      <Route path={newPasswordPath} component={NewPassword} />
      <Route path={passwordResetSuccessPath} component={ResetPasswordSuccess} />
      <Route path={passwordResetPath} component={ResetPassword} />
      <Route component={LoginView} />
    </Switch>
  </Layout>
);

AuthRouter.displayName = "AuthRouter";
export default AuthRouter;

export * from "@business/utils/auth/utils"; // TODO: to update this
