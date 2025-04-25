import { newPasswordUrl } from "@business/utils/auth/urls";
import {
  staffListUrl,
  StaffListUrlDialog,
  StaffListUrlQueryParams,
  staffMemberDetailsUrl,
} from "@business/utils/staffs/urls";
import { useFilterPresets } from "@dashboard/business/hooks/shared/useFilterPresets";
import useListSettings from "@dashboard/business/hooks/shared/useListSettings";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import useNotifier from "@dashboard/business/hooks/shared/useNotifier";
import { usePaginationReset } from "@dashboard/business/hooks/shared/usePaginationReset";
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from "@dashboard/business/hooks/shared/usePaginator";
import createDialogActionHandlers from "@dashboard/business/utils/shared/handlers/dialogActionHandlers";
import createFilterHandlers from "@dashboard/business/utils/shared/handlers/filterHandlers";
import createSortHandler from "@dashboard/business/utils/shared/handlers/sortHandler";
import { mapEdgesToItems } from "@dashboard/business/utils/shared/maps";
import { getSortParams } from "@dashboard/business/utils/shared/sort";
import { getAppMountUriForRedirect } from "@dashboard/business/utils/shared/urls";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@dashboard/configs";
import { commonMessages } from "@dashboard/constants/common/intl";
import { useFlag } from "@dashboard/featureFlags";
import { useStaffListQuery, useStaffMemberAddMutation } from "@dashboard/graphql";
import usePermissionGroupSearch from "@dashboard/graphql/searches/usePermissionGroupSearch";
import { ListViews } from "@dashboard/types";
import { useConditionalFilterContext } from "@presentation/shared//ConditionalFilter";
import { createStaffMembersQueryVariables } from "@presentation/shared//ConditionalFilter/queryVariables";
import DeleteFilterTabDialog from "@presentation/shared//DeleteFilterTabDialog";
import SaveFilterTabDialog from "@presentation/shared//SaveFilterTabDialog";
import React from "react";
import { useIntl } from "react-intl";
import urlJoin from "url-join";

import StaffAddMemberDialog, { AddMemberFormData } from "../../components/StaffAddMemberDialog";
import StaffListPage from "../../components/StaffListPage";
import { getFilterOpts, getFilterQueryParam, getFilterVariables, storageUtils } from "./filters";
import { getSortQueryVariables } from "./sort";

interface StaffListProps {
  params: StaffListUrlQueryParams;
}

export const StaffList: React.FC<StaffListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const { updateListSettings, settings } = useListSettings(ListViews.STAFF_MEMBERS_LIST);
  const intl = useIntl();
  const { enabled: isStaffMembersFilteringEnabled } = useFlag("new_filters");
  const { valueProvider } = useConditionalFilterContext();
  const filters = createStaffMembersQueryVariables(valueProvider.value);

  usePaginationReset(staffListUrl, params, settings.rowNumber);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber],
  );
  const newQueryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: {
        ...filters,
        search: params.query,
      },
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber, valueProvider.value],
  );
  const { data: staffQueryData, loading } = useStaffListQuery({
    displayLoader: true,
    variables: isStaffMembersFilteringEnabled ? newQueryVariables : queryVariables,
  });
  const [addStaffMember, addStaffMemberData] = useStaffMemberAddMutation({
    onCompleted: data => {
      if (data?.staffCreate?.errors?.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
        navigate(staffMemberDetailsUrl(data?.staffCreate?.user?.id ?? ""));
      }
    },
  });
  const paginationValues = usePaginator({
    pageInfo: staffQueryData?.staffUsers?.pageInfo,
    paginationState,
    queryString: params,
  });
  const handleSort = createSortHandler(navigate, staffListUrl, params);
  const {
    hasPresetsChanged,
    onPresetChange,
    onPresetDelete,
    onPresetSave,
    onPresetUpdate,
    selectedPreset,
    presets,
    getPresetNameToDelete,
    setPresetIdToDelete,
  } = useFilterPresets({
    getUrl: staffListUrl,
    params,
    storageUtils,
  });
  const [changeFilters, resetFilters, handleSearchChange] = createFilterHandlers({
    createUrl: staffListUrl,
    getFilterQueryParam,
    navigate,
    params,
    keepActiveTab: true,
  });
  const [openModal, closeModal] = createDialogActionHandlers<
    StaffListUrlDialog,
    StaffListUrlQueryParams
  >(navigate, staffListUrl, params);
  const {
    loadMore: loadMorePermissionGroups,
    search: searchPermissionGroups,
    result: searchPermissionGroupsOpts,
  } = usePermissionGroupSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const handleStaffMemberAdd = (variables: AddMemberFormData) =>
    addStaffMember({
      variables: {
        input: {
          addGroups: variables.permissionGroups,
          email: variables.email,
          firstName: variables.firstName,
          lastName: variables.lastName,
          redirectUrl: urlJoin(
            window.location.origin,
            getAppMountUriForRedirect(),
            newPasswordUrl().replace(/\?/, ""),
          ),
        },
      },
    });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <StaffListPage
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ""}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onFilterPresetsAll={resetFilters}
        onFilterPresetDelete={id => {
          setPresetIdToDelete(id);
          openModal("delete-search");
        }}
        selectedFilterPreset={selectedPreset}
        onFilterPresetChange={onPresetChange}
        onFilterPresetUpdate={onPresetUpdate}
        hasPresetsChanged={hasPresetsChanged}
        onFilterPresetPresetSave={() => openModal("save-search")}
        filterPresets={presets.map(preset => preset.name)}
        disabled={loading || addStaffMemberData.loading}
        settings={settings}
        sort={getSortParams(params)}
        staffMembers={mapEdgesToItems(staffQueryData?.staffUsers) ?? []}
        onAdd={() => openModal("add")}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
      />

      <StaffAddMemberDialog
        availablePermissionGroups={mapEdgesToItems(searchPermissionGroupsOpts?.data?.search) ?? []}
        confirmButtonState={addStaffMemberData.status}
        initialSearch=""
        disabled={loading}
        errors={addStaffMemberData.data?.staffCreate?.errors || []}
        open={params.action === "add"}
        onClose={closeModal}
        onConfirm={handleStaffMemberAdd}
        fetchMorePermissionGroups={{
          hasMore: searchPermissionGroupsOpts.data?.search?.pageInfo?.hasNextPage ?? false,
          loading: searchPermissionGroupsOpts.loading,
          onFetchMore: loadMorePermissionGroups,
        }}
        onSearchChange={searchPermissionGroups}
      />

      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={onPresetSave}
      />

      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={onPresetDelete}
        tabName={getPresetNameToDelete()}
      />
    </PaginatorContext.Provider>
  );
};

export default StaffList;
