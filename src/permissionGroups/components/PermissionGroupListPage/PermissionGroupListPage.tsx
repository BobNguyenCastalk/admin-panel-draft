import { PermissionGroupFragment } from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import { sectionNames } from "@dashboard/intl";
import { configurationMenuUrl } from "@presentation/pages/configuration";
import { TopNav } from "@presentation/shared//AppLayout/TopNav";
import { DashboardCard } from "@presentation/shared//Card";
import { ListPageLayout } from "@presentation/shared//Layouts";
import { Button } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { PageListProps, SortPage } from "../../../types";
import { permissionGroupAddUrl, PermissionGroupListUrlSortField } from "../../urls";
import { PermissionGroupListDatagrid } from "../PermissionGroupListDatagrid";

export interface PermissionGroupListPageProps
  extends PageListProps,
    SortPage<PermissionGroupListUrlSortField> {
  permissionGroups: PermissionGroupFragment[];
}

const PermissionGroupListPage: React.FC<PermissionGroupListPageProps> = listProps => {
  const intl = useIntl();
  const navigate = useNavigator();

  return (
    <ListPageLayout>
      <TopNav
        withoutBorder
        href={configurationMenuUrl}
        title={intl.formatMessage(sectionNames.permissionGroups)}
      >
        <Button
          variant="primary"
          onClick={() => navigate(permissionGroupAddUrl)}
          data-test-id="create-permission-group"
        >
          <FormattedMessage
            id="bRJD/v"
            defaultMessage="Create permission group"
            description="button"
          />
        </Button>
      </TopNav>
      <DashboardCard>
        <PermissionGroupListDatagrid {...listProps} />
      </DashboardCard>
    </ListPageLayout>
  );
};

PermissionGroupListPage.displayName = "PermissionGroupListPage";
export default PermissionGroupListPage;
