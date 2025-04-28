import { PermissionGroupListUrlSortField } from "@business/utils/permissions/urls";
import { getColumnSortDirectionIcon } from "@dashboard/business/utils/shared/columns/getColumnSortDirectionIcon";
import { PermissionGroupFragment } from "@dashboard/graphql";
import { Sort } from "@dashboard/types";
import { GridCell, Item } from "@glideapps/glide-data-grid";
import { PLACEHOLDER } from "@presentation/shared/Datagrid/const";
import { readonlyTextCell } from "@presentation/shared/Datagrid/customCells/cells";
import { AvailableColumn } from "@presentation/shared/Datagrid/types";
import { IntlShape } from "react-intl";

import { columnsMessages } from "./messages";

export const permissionGroupsListStaticColumnsAdapter = (
  intl: IntlShape,
  sort: Sort<PermissionGroupListUrlSortField>,
  emptyColumn: AvailableColumn,
) =>
  [
    emptyColumn,
    {
      id: "name",
      title: intl.formatMessage(columnsMessages.name),
      width: 450,
    },
    {
      id: "members",
      title: intl.formatMessage(columnsMessages.members),
      width: 200,
    },
  ].map(column => ({
    ...column,
    icon: getColumnSortDirectionIcon(sort, column.id),
  }));

export const createGetCellContent =
  ({
    permissionGroups,
    columns,
  }: {
    permissionGroups: PermissionGroupFragment[];
    columns: AvailableColumn[];
  }) =>
  ([column, row]: Item): GridCell => {
    const rowData: PermissionGroupFragment | undefined = permissionGroups[row];
    const columnId = columns[column]?.id;

    if (!columnId || !rowData) {
      return readonlyTextCell("");
    }

    switch (columnId) {
      case "name":
        return readonlyTextCell(rowData?.name ?? PLACEHOLDER);
      case "members":
        return readonlyTextCell(rowData?.users?.length?.toString() ?? PLACEHOLDER);
      default:
        return readonlyTextCell("");
    }
  };
