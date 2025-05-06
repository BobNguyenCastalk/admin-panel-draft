import React from "react";
import { makeStyles } from "@saleor/macaw-ui";

import useLocale from "@dashboard/business/hooks/shared/useLocale";
import { IMoney } from "@dashboard/business/utils/shared/intl";

import { formatMoneyAmount } from ".";

const useStyles = makeStyles(
  {
    root: {
      fontWeight: 500,
    },
    currency: {
      fontSize: "0.87em",
      marginRight: "0.2rem",
    },
  },
  { name: "Money" },
);

export interface MoneyProps {
  money: IMoney | null;
}

export const Money: React.FC<MoneyProps> = props => {
  const { money, ...rest } = props;
  const { locale } = useLocale();
  const classes = useStyles();

  if (!money) {
    return null;
  }

  return (
    <span data-test-id="money-value" className={classes.root} {...rest}>
      <span className={classes.currency}>{money.currency}</span>
      {formatMoneyAmount(money, locale)}
    </span>
  );
};

Money.displayName = "Money";
export default Money;
