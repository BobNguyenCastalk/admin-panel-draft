import { MenuFragment } from "@dashboard/graphql";
import { sectionNames } from "@dashboard/intl";
import { menuListUrl, MenuListUrlSortField } from "@dashboard/navigation/urls";
import { ListActions, PageListProps, SortPage } from "@dashboard/types";
import { configurationMenuUrl } from "@presentation/pages/configuration";
import { TopNav } from "@presentation/shared//AppLayout/TopNav";
import { Button } from "@presentation/shared//Button";
import { ListPageLayout } from "@presentation/shared//Layouts";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import MenuList from "../MenuList";

export interface MenuListPageProps
  extends PageListProps,
    ListActions,
    SortPage<MenuListUrlSortField> {
  menus: MenuFragment[];
  onDelete: (id: string) => void;
}

const MenuListPage: React.FC<MenuListPageProps> = ({ ...listProps }) => {
  const intl = useIntl();
  const addUrl = menuListUrl({
    action: "add",
  });

  return (
    <ListPageLayout>
      <TopNav href={configurationMenuUrl} title={intl.formatMessage(sectionNames.navigation)}>
        <Button variant="primary" href={addUrl} data-test-id="add-menu">
          <FormattedMessage id="JXRYQg" defaultMessage="Create Menu" description="button" />
        </Button>
      </TopNav>
      <MenuList {...listProps} />
    </ListPageLayout>
  );
};

MenuListPage.displayName = "MenuListPage";
export default MenuListPage;
