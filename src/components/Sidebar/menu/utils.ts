// @ts-strict-ignore
import { AppExtensionMountEnum } from "@dashboard/graphql";
import { matchPath } from "react-router";

import { SidebarMenuItem } from "./types";

export function isMenuActive(location: string, menuItem: SidebarMenuItem) {
  if (!menuItem.url) {
    return false;
  }

  const activeUrl = getPureUrl(location.split("?")[0]);
  const menuItemUrl = menuItem.url.split("?")[0];

  if (isMenuItemExtension(menuItem)) {
    return false;
  }

  return !!matchPath(activeUrl, {
    exact: menuItemUrl === "/",
    path: menuItemUrl,
  });
}

const getPureUrl = (url: string) => {
  if (url.includes("/dashboard")) {
    return url.split("/dashboard")[1];
  }

  return url;
};
const isMenuItemExtension = (menuItem: SidebarMenuItem) => menuItem.id.startsWith("extension-");
