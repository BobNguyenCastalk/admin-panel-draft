// @ts-strict-ignore
import { PluginListUrlSortField } from "@dashboard/business/utils/plugins/urls";
import { createGetSortQueryVariables } from "@dashboard/business/utils/shared/sort";
import { PluginSortField } from "@dashboard/graphql";

export function getSortQueryField(sort: PluginListUrlSortField): PluginSortField {
  switch (sort) {
    case PluginListUrlSortField.name:
      return PluginSortField.NAME;
    case PluginListUrlSortField.active:
      return PluginSortField.IS_ACTIVE;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
