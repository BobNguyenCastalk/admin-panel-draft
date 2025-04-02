// @ts-strict-ignore
import { WindowTitle } from "@dashboard/components/WindowTitle";
import { CustomAppUrls } from "@dashboard/custom-apps/urls";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import useShop from "@dashboard/hooks/useShop";
import { commonMessages } from "@dashboard/intl";
import { extractMutationErrors } from "@dashboard/misc";
import React from "react";
import { useIntl } from "react-intl";

import CustomAppCreatePage, {
  CustomAppCreatePageFormData,
} from "../../components/CustomAppCreatePage";
import { messages } from "./messages";

interface CustomAppCreateProps {
  setToken: (token: string) => void;
}

export const CustomAppCreate: React.FC<CustomAppCreateProps> = ({ setToken }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const shop = useShop();
  const onSubmit = data => {
    if (data.appCreate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges),
      });
      navigate(CustomAppUrls.resolveAppUrl(data.appCreate.app.id));
      setToken(data.appCreate.authToken);
    }
  };
  const handleSubmit = () => null;

  return (
    <>
      <WindowTitle title={intl.formatMessage(messages.createApp)} />
      <CustomAppCreatePage
        disabled={false}
        errors={[]}
        onSubmit={handleSubmit}
        permissions={shop?.permissions}
        saveButtonBarState={null}
      />
    </>
  );
};

export default CustomAppCreate;
