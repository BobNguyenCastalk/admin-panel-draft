import { IntlShape } from "react-intl";

import { MutationFunction } from "@apollo/client";

import { UseNavigatorResult } from "@dashboard/business/hooks/shared/useNavigator";
import { fuzzySearch } from "@dashboard/business/misc";
import { OrderDraftCreateMutation } from "@dashboard/graphql";

import { QuickSearchAction, QuickSearchMode } from "../../types";
import { searchInCommands } from "../commands";
import searchInViews from "./views";

const maxActions = 5;

function getDefaultModeActions(
  query: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void,
): QuickSearchAction[] {
  return fuzzySearch(
    [
      ...searchInViews(query, intl, navigate),
      ...searchInCommands(query, intl, navigate, createOrder, setMode),
    ],
    query,
    ["label"],
  ).slice(0, maxActions);
}

export default getDefaultModeActions;
