import React from "react";

import NotFoundPage from "@presentation/shared/NotFoundPage";

import useNavigator from "../../business/hooks/shared/useNavigator";

export const NotFound: React.FC = () => {
  const navigate = useNavigator();

  return <NotFoundPage onBack={() => navigate("/")} />;
};
export default NotFound;
