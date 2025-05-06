// @ts-strict-ignore
import { IntlShape } from "react-intl";

import getAccountErrorMessage from "@dashboard/business/utils/shared/errors/account";
import getOrderErrorMessage from "@dashboard/business/utils/shared/errors/order";
import { AccountErrorFragment, OrderErrorFragment } from "@dashboard/graphql";

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
