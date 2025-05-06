import React from "react";

import useNavigator from "@business/hooks/shared/useNavigator";
import { getAppMountUri } from "@dashboard/configs";
import ResetPasswordSuccessPage from "@presentation/pages/auth/components/ResetPasswordSuccessPage";

const ResetPasswordSuccessView: React.FC = () => {
  const navigate = useNavigator();

  return <ResetPasswordSuccessPage onBack={() => navigate(getAppMountUri())} />;
};

ResetPasswordSuccessView.displayName = "ResetPasswordSuccessView";
export default ResetPasswordSuccessView;
