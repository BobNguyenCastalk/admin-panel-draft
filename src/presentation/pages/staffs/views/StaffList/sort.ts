import { createGetSortQueryVariables } from "@dashboard/business/utils/shared/sort";
import { StaffListUrlSortField } from "@dashboard/business/utils/staffs/urls";
import { UserSortField } from "@dashboard/graphql";

export function getSortQueryField(sort: StaffListUrlSortField): UserSortField | undefined {
  switch (sort) {
    case StaffListUrlSortField.name:
      return UserSortField.LAST_NAME;
    case StaffListUrlSortField.email:
      return UserSortField.EMAIL;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
