import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useApolloClient } from "@apollo/client";

import { setUserPassword } from "@business/utils/auth/temp";
import { NewPasswordUrlQueryParams } from "@business/utils/auth/urls";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { AccountErrorFragment } from "@dashboard/graphql";
import { parse as parseQs } from "qs";

import NewPasswordPage, { NewPasswordPageFormData } from "../components/NewPasswordPage";

const NewPassword: React.FC<RouteComponentProps> = ({ location }) => {
  const navigate = useNavigator();
  const apolloClient = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AccountErrorFragment[]>([]);
  const params: NewPasswordUrlQueryParams = parseQs(location.search.substr(1)) as any;
  const handleSubmit = async (data: NewPasswordPageFormData) => {
    setLoading(true);

    const result = await setUserPassword(apolloClient, {
      email: params.email,
      password: data.password,
      token: params.token,
    });
    const errors = (result.data?.setPassword?.errors || []) as AccountErrorFragment[];

    setErrors(errors);
    setLoading(false);

    if (!errors.length) {
      navigate("/", { replace: true });
    }
  };

  return <NewPasswordPage errors={errors} loading={loading} onSubmit={handleSubmit} />;
};

NewPassword.displayName = "NewPassword";
export default NewPassword;
