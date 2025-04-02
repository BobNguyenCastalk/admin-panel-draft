// @ts-strict-ignore
import NotFoundPage from "@dashboard/components/NotFoundPage";
import { WindowTitle } from "@dashboard/components/WindowTitle";
import { getApiUrl } from "@dashboard/config";
import TokenCreateDialog from "@dashboard/custom-apps/components/TokenCreateDialog";
import TokenDeleteDialog from "@dashboard/custom-apps/components/TokenDeleteDialog";
import WebhookDeleteDialog from "@dashboard/custom-apps/components/WebhookDeleteDialog";
import { CustomAppUrls } from "@dashboard/custom-apps/urls";
import { useWebhookDeleteMutation, WebhookDeleteMutation } from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import useShop from "@dashboard/hooks/useShop";
import { commonMessages } from "@dashboard/intl";
import { extractMutationErrors, getStringOrPlaceholder } from "@dashboard/misc";
import getAppErrorMessage from "@dashboard/utils/errors/app";
import createDialogActionHandlers from "@dashboard/utils/handlers/dialogActionHandlers";
import React from "react";
import { useIntl } from "react-intl";

import CustomAppDetailsPage, {
  CustomAppDetailsPageFormData,
} from "../../components/CustomAppDetailsPage";
import { CustomAppDetailsUrlDialog, CustomAppDetailsUrlQueryParams } from "../../urls";

interface OrderListProps {
  id: string;
  params: CustomAppDetailsUrlQueryParams;
  token: string;
  onTokenClose: () => void;
}

export const CustomAppDetails: React.FC<OrderListProps> = ({ id, params, token, onTokenClose }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const shop = useShop();

  React.useEffect(() => onTokenClose, []);

  return (
    <>
      <WindowTitle title="To Delete" />
    </>
  );
};

export default CustomAppDetails;
