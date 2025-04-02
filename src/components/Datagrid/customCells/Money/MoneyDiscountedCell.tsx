// @ts-strict-ignore
import { Locale } from "@dashboard/components/Locale";
import { CustomCell, CustomRenderer, GridCellKind } from "@glideapps/glide-data-grid";
import React, { useCallback } from "react";

import { cellHeight } from "../../styles";
import { drawCurrency, drawLineCrossedPrice, drawPrice, getFormattedMoney } from "./utils";

interface MoneyDiscountedCellProps {
  readonly kind: "money-discounted-cell";
  readonly currency: string;
  readonly undiscounted?: string | number;
  readonly value: number | string | null;
  readonly lineItemId?: string;
  readonly locale: Locale;
}

const DATAGRID_BORDER_WIDTH = 1;
const ROW_HEIGHT = cellHeight + DATAGRID_BORDER_WIDTH;

export type MoneyDiscuntedCell = CustomCell<MoneyDiscountedCellProps>;

const MoneyDiscountedCellEditor = ({ onFinishedEditing, value }) => {
  const editedLineId = value.data.lineItemId;

  return null;
};

// TODO: add new design
export const moneyDiscountedCellRenderer = (): CustomRenderer<MoneyDiscuntedCell> => ({
  kind: GridCellKind.Custom,
  isMatch: (c): c is MoneyDiscuntedCell => (c.data as any).kind === "money-discounted-cell",
  draw: (args, cell) => {
    const { ctx, theme, rect } = args;
    const { currency, value, undiscounted, locale } = cell.data;
    const hasValue = value === 0 ? true : !!value;
    const formattedValue = getFormattedMoney(value, currency, locale, "-");
    const formattedUndiscounted = getFormattedMoney(
      undiscounted !== value ? undiscounted : "",
      currency,
      locale,
    );
    const formattedWithDiscount = formattedUndiscounted + " " + formattedValue;

    drawPrice(ctx, theme, rect, formattedWithDiscount);

    // Draw crossed line above price without discount
    if (undiscounted !== undefined && undiscounted !== value) {
      drawLineCrossedPrice(ctx, rect, formattedWithDiscount, formattedUndiscounted);
    }

    ctx.save();
    drawCurrency(ctx, theme, rect, hasValue ? currency : "-");
    ctx.restore();

    return true;
  },
  provideEditor: () => ({
    editor: MoneyDiscountedCellEditor,
    styleOverride: {
      padding: `${ROW_HEIGHT}px 0 0 0`,
    },
    disableStyling: true,
  }),
});
