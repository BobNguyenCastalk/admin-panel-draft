import { ReactNode } from "react";

import { Sprinkles } from "@saleor/macaw-ui-next";

import { PermissionEnum } from "@dashboard/graphql";

export interface SidebarMenuItem {
  label?: string;
  id: string;
  url?: string;
  permissions?: PermissionEnum[];
  type: "item" | "itemGroup" | "divider";
  icon?: ReactNode;
  onClick?: () => void;
  children?: SidebarMenuItem[];
  paddingY?: Sprinkles["paddingY"];
  endAdornment?: ReactNode;
}
