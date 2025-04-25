import { PermissionGroupListUrlSortField } from "@business/utils/permissions/urls";
import { PermissionGroupSortField } from "@dashboard/graphql";
import { createGetSortQueryVariables } from "@dashboard/utils/sort";

export function getSortQueryField(sort: PermissionGroupListUrlSortField): PermissionGroupSortField {
  switch (sort) {
    case PermissionGroupListUrlSortField.name:
      return PermissionGroupSortField.NAME;
    default:
      return "" as PermissionGroupSortField;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);

export function canBeSorted(sort: PermissionGroupListUrlSortField) {
  switch (sort) {
    case PermissionGroupListUrlSortField.name:
      return true;
    default:
      return false;
  }
}
