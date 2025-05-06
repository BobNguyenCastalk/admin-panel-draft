import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "@saleor/macaw-ui-next";

import {
  permissionGroupAddUrl,
  PermissionGroupListUrlSortField,
} from "@business/utils/permissions/urls";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { sectionNames } from "@dashboard/constants/common/intl";
import { PermissionGroupFragment } from "@dashboard/graphql";
import { PageListProps, SortPage } from "@dashboard/types";
import { configurationMenuUrl } from "@presentation/pages/configuration";
import { TopNav } from "@presentation/shared/AppLayout/TopNav";
import { DashboardCard } from "@presentation/shared/Card";
import { ListPageLayout } from "@presentation/shared/Layouts";

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
