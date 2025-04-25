import { MutationFunction } from "@apollo/client";
import { UseNavigatorResult } from "@dashboard/business/hooks/shared/useNavigator";
import { IntlShape } from "react-intl";

import { QuickSearchAction, QuickSearchMode } from "../types";
import getCatalogModeActions from "./catalog";
import getCommandModeActions from "./commands";
import getCustomersModeActions from "./customers";
import getDefaultModeActions from "./default";
import getHelpModeActions from "./help";
import { ActionQueries } from "./types";

function getModeActions(
  mode: QuickSearchMode,
  query: string,
  intl: IntlShape,
  queries: ActionQueries,
  cbs: {
    createOrder: MutationFunction<any, {}>;
    navigate: UseNavigatorResult;
    setMode: (mode: QuickSearchMode) => void;
  },
): QuickSearchAction[] {
  switch (mode) {
    case "catalog":
      return getCatalogModeActions(query, intl, cbs.navigate, queries.catalog);
    case "commands":
      return getCommandModeActions(query, intl, cbs.navigate, cbs.createOrder, cbs.setMode);
    case "help":
      return getHelpModeActions(query, intl, cbs.setMode);
    default:
      return getDefaultModeActions(query, intl, cbs.navigate, cbs.createOrder, cbs.setMode);
  }
}

export default getModeActions;
