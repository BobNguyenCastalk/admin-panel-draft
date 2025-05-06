import React from "react";

import {
  permissionGroupListUrl,
  PermissionGroupListUrlQueryParams,
} from "@business/utils/permissions/urls";
import useListSettings from "@dashboard/business/hooks/shared/useListSettings";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { usePaginationReset } from "@dashboard/business/hooks/shared/usePaginationReset";
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from "@dashboard/business/hooks/shared/usePaginator";
import createSortHandler from "@dashboard/business/utils/shared/handlers/sortHandler";
import { mapEdgesToItems } from "@dashboard/business/utils/shared/maps";
import { getSortParams } from "@dashboard/business/utils/shared/sort";
import { usePermissionGroupListQuery } from "@dashboard/graphql";
import { ListViews } from "@dashboard/types";

import PermissionGroupListPage from "../../components/PermissionGroupListPage";
import { getSortQueryVariables } from "./sort";

interface PermissionGroupListProps {
  params: PermissionGroupListUrlQueryParams;
}

export const PermissionGroupList: React.FC<PermissionGroupListProps> = ({ params }) => {
  const navigate = useNavigator();
  const { updateListSettings, settings } = useListSettings(ListViews.PERMISSION_GROUP_LIST);

  usePaginationReset(permissionGroupListUrl, params, settings.rowNumber);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber],
  );
  const { data, loading } = usePermissionGroupListQuery({
    displayLoader: true,
    variables: queryVariables,
  });
  const paginationValues = usePaginator({
    pageInfo: data?.permissionGroups?.pageInfo,
    paginationState,
    queryString: params,
  });
  const handleSort = createSortHandler(navigate, permissionGroupListUrl, params);
  const permissionGroups = mapEdgesToItems(data?.permissionGroups) ?? [];

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <PermissionGroupListPage
        disabled={loading}
        settings={settings}
        sort={getSortParams(params)}
        permissionGroups={permissionGroups}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
      />
    </PaginatorContext.Provider>
  );
};

export default PermissionGroupList;
