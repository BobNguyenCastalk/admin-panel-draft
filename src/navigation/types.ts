import { MenuItemFragment } from "@dashboard/graphql";
import { TreeItem } from "@presentation/shared//SortableTree/types";

export type RecursiveMenuItem = MenuItemFragment & {
  children?: RecursiveMenuItem[];
};

export type MenuTreeItem = TreeItem<MenuItemFragment>;
