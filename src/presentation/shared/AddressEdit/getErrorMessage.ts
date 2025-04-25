// @ts-strict-ignore
import getAccountErrorMessage from "@dashboard/business/utils/shared/errors/account";
import getOrderErrorMessage from "@dashboard/business/utils/shared/errors/order";
import { AccountErrorFragment, OrderErrorFragment } from "@dashboard/graphql";
import { IntlShape } from "react-intl";

export function getErrorMessage(
  err: AccountErrorFragment | OrderErrorFragment,
  intl: IntlShape,
): string {
  if (err?.message) {
    return err.message;
  }

  if (err?.__typename === "AccountError") {
    return getAccountErrorMessage(err, intl);
  }

  return getOrderErrorMessage(err, intl);
}
