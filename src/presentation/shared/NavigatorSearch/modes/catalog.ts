// @ts-strict-ignore
import { fuzzySearch } from "@dashboard/business/misc";
import { mapEdgesToItems } from "@dashboard/business/utils/shared/maps";
import { SearchCatalogQuery } from "@dashboard/graphql";
import { UseNavigatorResult } from "@dashboard/hooks/useNavigator";
import { IntlShape } from "react-intl";

import { QuickSearchAction, QuickSearchActionInput } from "../types";
import { getProductVariantLabel } from "./labels";
import messages from "./messages";

export function searchInCatalog(
  search: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  catalog: SearchCatalogQuery,
): QuickSearchAction[] {
  const variants: QuickSearchActionInput[] = (
    mapEdgesToItems(catalog?.productVariants) || []
  ).map<QuickSearchActionInput>(variant => ({
    caption: intl.formatMessage(messages.variant),
    extraInfo: variant.product.category.name,
    label: getProductVariantLabel(variant),
    searchValue: `${variant.product.name} ${variant.name} ${variant.sku}`,
    onClick: () => {
      return false;
    },
    text: variant.name,
    type: "catalog",
    thumbnail: variant.product.thumbnail,
  }));

  const searchableItems = [...variants];
  const searchResults = fuzzySearch(searchableItems, search, ["searchValue"], 0.8);

  return searchResults;
}

function getCatalogModeActions(
  query: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  catalog: SearchCatalogQuery,
): QuickSearchAction[] {
  return searchInCatalog(query, intl, navigate, catalog);
}

export default getCatalogModeActions;
