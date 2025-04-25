// @ts-strict-ignore
import { MenuFragment } from "@dashboard/graphql";
import { maybe, renderCollection } from "@dashboard/misc";
import { MenuListUrlSortField, menuUrl } from "@dashboard/navigation/urls";
import { ListActions, ListProps, SortPage } from "@dashboard/types";
import { getArrowDirection } from "@dashboard/utils/sort";
import { TableBody, TableCell, TableFooter } from "@material-ui/core";
import { DashboardCard } from "@presentation/shared//Card";
import Checkbox from "@presentation/shared//Checkbox";
import IconButtonTableCell from "@presentation/shared//IconButtonTableCell";
import ResponsiveTable from "@presentation/shared//ResponsiveTable";
import { TableButtonWrapper } from "@presentation/shared//TableButtonWrapper/TableButtonWrapper";
import TableCellHeader from "@presentation/shared//TableCellHeader";
import TableHead from "@presentation/shared//TableHead";
import { TablePaginationWithContext } from "@presentation/shared//TablePagination";
import TableRowLink from "@presentation/shared//TableRowLink";
import { DeleteIcon, makeStyles } from "@saleor/macaw-ui";
import { Skeleton } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage } from "react-intl";

export interface MenuListProps extends ListProps, ListActions, SortPage<MenuListUrlSortField> {
  menus: MenuFragment[];
  onDelete: (id: string) => void;
}

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colItems: {
        width: 200,
      },
      colTitle: {},
    },
    colAction: {
      width: 84,
    },
    colItems: {
      textAlign: "right",
    },
    colTitle: {
      paddingLeft: 0,
    },
    row: {
      cursor: "pointer",
    },
  }),
  { name: "MenuList" },
);
const numberOfColumns = 4;
const MenuList: React.FC<MenuListProps> = props => {
  const {
    settings,
    disabled,
    isChecked,
    menus,
    onDelete,
    onUpdateListSettings,
    onSort,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  const classes = useStyles(props);

  return (
    <DashboardCard>
      <ResponsiveTable>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={menus}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            direction={
              sort.sort === MenuListUrlSortField.name ? getArrowDirection(sort.asc) : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(MenuListUrlSortField.name)}
            className={classes.colTitle}
          >
            <FormattedMessage id="jhh/D6" defaultMessage="Menu Title" />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === MenuListUrlSortField.items ? getArrowDirection(sort.asc) : undefined
            }
            textAlign="right"
            onClick={() => onSort(MenuListUrlSortField.items)}
            className={classes.colItems}
          >
            <FormattedMessage
              id="0nL1D6"
              defaultMessage="Items"
              description="number of menu items"
            />
          </TableCellHeader>
          <TableCell className={classes.colAction} />
        </TableHead>
        <TableFooter>
          <TableRowLink>
            <TablePaginationWithContext
              colSpan={numberOfColumns}
              settings={settings}
              onUpdateListSettings={onUpdateListSettings}
            />
          </TableRowLink>
        </TableFooter>
        <TableBody data-test-id="navigation-menu-list">
          {renderCollection(
            menus,
            menu => {
              const isSelected = menu ? isChecked(menu.id) : false;

              return (
                <TableRowLink
                  data-test-id="navigation-menu"
                  hover={!!menu}
                  key={menu ? menu.id : "skeleton"}
                  href={menu && menuUrl(menu.id)}
                  className={classes.row}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(menu.id)}
                    />
                  </TableCell>
                  <TableCell className={classes.colTitle} data-test-id="menu-name">
                    {maybe<React.ReactNode>(() => menu.name, <Skeleton />)}
                  </TableCell>
                  <TableCell className={classes.colItems}>
                    {maybe<React.ReactNode>(() => menu.items.length, <Skeleton />)}
                  </TableCell>
                  <TableButtonWrapper>
                    <IconButtonTableCell
                      className={classes.colAction}
                      disabled={disabled}
                      onClick={() => onDelete(menu.id)}
                    >
                      <DeleteIcon />
                    </IconButtonTableCell>
                  </TableButtonWrapper>
                </TableRowLink>
              );
            },
            () => (
              <TableRowLink>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage id="DWs4ba" defaultMessage="No menus found" />
                </TableCell>
              </TableRowLink>
            ),
          )}
        </TableBody>
      </ResponsiveTable>
    </DashboardCard>
  );
};

MenuList.displayName = "MenuList";
export default MenuList;
