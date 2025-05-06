// @ts-strict-ignore
import { IntlShape } from "react-intl";

import { hasAllPermissions, hasAnyPermissions } from "@business/utils/auth/misc";
import { PermissionEnum, UserFragment } from "@dashboard/graphql";
import { createConfigurationMenu } from "@presentation/pages/configuration"; // TODO: to fix this

import { MenuItem } from "../../../types/configuration";

export const getConfigMenuItemsPermissions = (intl: IntlShape): PermissionEnum[] =>
  createConfigurationMenu(intl)
    .reduce(
      (prev, { menuItems }) => [...prev, ...menuItems.map(({ permissions }) => permissions)],
      [],
    )
    .flat();

export const hasUserMenuItemPermissions = (menuItem: MenuItem, user: UserFragment): boolean => {
  if (menuItem.permissions) {
    if (menuItem.requireAllPermissions) {
      return hasAllPermissions(menuItem.permissions, user);
    }

    return hasAnyPermissions(menuItem.permissions, user);
  }

  return true;
};
