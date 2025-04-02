// @ts-strict-ignore
import { useApolloClient } from "@apollo/client";
import { WindowTitle } from "@dashboard/components/WindowTitle";
import { AppSortField, AppTypeEnum, OrderDirection } from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import { sectionNames } from "@dashboard/intl";
import { findById } from "@dashboard/misc";
import createDialogActionHandlers from "@dashboard/utils/handlers/dialogActionHandlers";
import { mapEdgesToItems } from "@dashboard/utils/maps";
import { useOnboarding } from "@dashboard/welcomePage/WelcomePageOnboarding/onboardingContext";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import CustomAppListPage from "../components/CustomAppListPage";
import { messages } from "../messages";
import { CustomAppListUrlDialog, CustomAppListUrlQueryParams, CustomAppUrls } from "../urls";

interface CustomAppListProps {
  params: CustomAppListUrlQueryParams;
}

export const CustomAppList: React.FC<CustomAppListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const client = useApolloClient();
  const { markOnboardingStepAsCompleted } = useOnboarding();

  useEffect(() => {
    markOnboardingStepAsCompleted("view-webhooks");
  }, []);

  const [openModal, closeModal] = createDialogActionHandlers<
    CustomAppListUrlDialog,
    CustomAppListUrlQueryParams
  >(navigate, CustomAppUrls.resolveAppListUrl, params);

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.webhooksAndEvents)} />
      <CustomAppListPage
        appsList={[]}
        getCustomAppHref={id => CustomAppUrls.resolveAppUrl(id)}
        onRemove={id =>
          openModal("remove-custom-app", {
            id,
          })
        }
      />
    </>
  );
};

CustomAppList.displayName = "CustomAppList";
export default CustomAppList;
