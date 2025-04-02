import { useUser } from "@dashboard/auth";
import { categoryListUrl } from "@dashboard/categories/urls";
import { configurationMenuUrl } from "@dashboard/configuration";
import { getConfigMenuItemsPermissions } from "@dashboard/configuration/utils";
import { useFlag } from "@dashboard/featureFlags";
import { PermissionEnum } from "@dashboard/graphql";
import { ConfigurationIcon } from "@dashboard/icons/Configuration";
import { ContentsIcon } from "@dashboard/icons/Contents";
import { CustomersIcon } from "@dashboard/icons/Customers";
import { DiscountsIcon } from "@dashboard/icons/Discounts";
import { HomeIcon } from "@dashboard/icons/Home";
import { MarketplaceIcon } from "@dashboard/icons/Marketplace";
import { OrdersIcon } from "@dashboard/icons/Orders";
import { ProductsIcon } from "@dashboard/icons/Products";
import { TranslationsIcon } from "@dashboard/icons/Translations";
import { commonMessages, sectionNames } from "@dashboard/intl";
import { productListUrl } from "@dashboard/products/urls";
import { languageListUrl } from "@dashboard/translations/urls";
import { Box } from "@saleor/macaw-ui-next";
import isEmpty from "lodash/isEmpty";
import React from "react";
import { useIntl } from "react-intl";

import { SidebarMenuItem } from "../types";

export function useMenuStructure() {
  const intl = useIntl();
  const { user } = useUser();

  const appExtensionsHeaderItem: SidebarMenuItem = {
    id: "extensions",
    label: intl.formatMessage(sectionNames.appExtensions),
    type: "divider",
    paddingY: 1.5,
  };

  const menuItems: SidebarMenuItem[] = [
    {
      icon: renderIcon(<HomeIcon />),
      label: intl.formatMessage(sectionNames.home),
      id: "home",
      url: "/",
      type: "item",
    },
    {
      children: [
        {
          label: intl.formatMessage(sectionNames.categories),
          id: "categories",
          url: categoryListUrl(),
          permissions: [PermissionEnum.MANAGE_PRODUCTS],
          type: "item",
        },
      ],
      icon: renderIcon(<ProductsIcon />),
      url: productListUrl(),
      label: intl.formatMessage(commonMessages.products),
      permissions: [PermissionEnum.MANAGE_GIFT_CARD, PermissionEnum.MANAGE_PRODUCTS],
      id: "products",
      type: "itemGroup",
    },
    {
      children: undefined,
      icon: renderIcon(<TranslationsIcon />),
      label: intl.formatMessage(sectionNames.translations),
      permissions: [PermissionEnum.MANAGE_TRANSLATIONS],
      id: "translations",
      url: languageListUrl,
      type: "item",
    },
    {
      icon: renderIcon(<ConfigurationIcon />),
      label: intl.formatMessage(sectionNames.configuration),
      permissions: getConfigMenuItemsPermissions(intl),
      id: "configure",
      url: configurationMenuUrl,
      type: "item",
    },
  ];
  const isMenuItemPermitted = (menuItem: SidebarMenuItem) => {
    const userPermissions = (user?.userPermissions || []).map(permission => permission.code);

    if (!menuItem?.permissions || menuItem?.permissions?.length < 1) {
      return true;
    }

    return menuItem.permissions.some(permission => userPermissions.includes(permission));
  };
  const getFilteredMenuItems = (menuItems: SidebarMenuItem[]) =>
    menuItems.filter(isMenuItemPermitted);

  return menuItems.reduce((resultItems: SidebarMenuItem[], menuItem: SidebarMenuItem) => {
    if (!isMenuItemPermitted(menuItem)) {
      return resultItems;
    }

    const { children } = menuItem;
    const filteredChildren = children ? getFilteredMenuItems(children) : undefined;

    return [...resultItems, { ...menuItem, children: filteredChildren }];
  }, []);
}

function renderIcon(icon: React.ReactNode) {
  return (
    <Box color="default2" __width={20} __height={20}>
      {icon}
    </Box>
  );
}
