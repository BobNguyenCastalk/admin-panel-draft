import { getStatusColor, getUserName } from "@dashboard/business/misc";
import { StaffListUrlSortField } from "@dashboard/business/utils/staffs/urls";
import { commonStatusMessages } from "@dashboard/constants/common/intl";
import { Sort } from "@dashboard/types";
import { StaffMember, StaffMembers } from "@dashboard/types/staffs";
import { getColumnSortDirectionIcon } from "@dashboard/utils/columns/getColumnSortDirectionIcon";
import { GridCell, Item } from "@glideapps/glide-data-grid";
import {
  readonlyTextCell,
  tagsCell,
  thumbnailCell,
} from "@presentation/shared//Datagrid/customCells/cells";
import { AvailableColumn } from "@presentation/shared//Datagrid/types";
import { PLACEHOLDER } from "@presentation/shared/Datagrid/const";
import { DefaultTheme } from "@saleor/macaw-ui-next";
import { IntlShape } from "react-intl";

import { columnsMessages } from "./messages";

export const staffMembersListStaticColumnsAdapter = (
  intl: IntlShape,
  sort: Sort<StaffListUrlSortField>,
  emptyColumn: AvailableColumn,
) =>
  [
    emptyColumn,
    {
      id: "name",
      title: intl.formatMessage(columnsMessages.name),
      width: 400,
    },
    {
      id: "status",
      title: intl.formatMessage(columnsMessages.status),
      width: 150,
    },
    {
      id: "email",
      title: intl.formatMessage(columnsMessages.email),
      width: 400,
    },
  ].map(column => ({
    ...column,
    icon: getColumnSortDirectionIcon(sort, column.id),
  }));

export const createGetCellContent =
  ({
    staffMembers,
    columns,
    intl,
    currentTheme,
  }: {
    staffMembers: StaffMembers;
    columns: AvailableColumn[];
    intl: IntlShape;
    currentTheme: DefaultTheme;
  }) =>
  ([column, row]: Item): GridCell => {
    const rowData: StaffMember | undefined = staffMembers[row];
    const columnId = columns[column]?.id;

    if (!columnId || !rowData) {
      return readonlyTextCell("");
    }

    switch (columnId) {
      case "name":
        return thumbnailCell(getUserName(rowData) ?? "", rowData?.avatar?.url ?? "", {
          cursor: "pointer",
        });
      case "status": {
        const isActive = rowData?.isActive;
        const color = getStatusColor({
          status: isActive ? "success" : "error",
          currentTheme,
        });
        const status = isActive
          ? intl.formatMessage(commonStatusMessages.active)
          : intl.formatMessage(commonStatusMessages.notActive);

        return tagsCell(
          [
            {
              tag: status,
              color: color.base,
            },
          ],
          [status],
          {
            readonly: true,
            allowOverlay: false,
            cursor: "pointer",
          },
        );
      }
      case "email":
        return readonlyTextCell(rowData?.email ?? PLACEHOLDER);
      default:
        return readonlyTextCell("");
    }
  };
