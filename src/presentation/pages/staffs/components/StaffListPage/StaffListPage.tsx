import { StaffListUrlSortField } from "@dashboard/business/utils/staffs/urls";
import { useFlag } from "@dashboard/featureFlags";
import { sectionNames } from "@dashboard/intl";
import { FilterPagePropsWithPresets, ListProps, SortPage } from "@dashboard/types";
import { StaffMembers } from "@dashboard/types/staffs";
import { configurationMenuUrl } from "@presentation/pages/configuration";
import { useContextualLink } from "@presentation/shared//AppLayout/ContextualLinks/useContextualLink";
import { ListFilters } from "@presentation/shared//AppLayout/ListFilters";
import { TopNav } from "@presentation/shared//AppLayout/TopNav";
import { DashboardCard } from "@presentation/shared//Card";
import { FilterPresetsSelect } from "@presentation/shared//FilterPresetsSelect";
import { ListPageLayout } from "@presentation/shared//Layouts";
import { Box, Button, ChevronRightIcon } from "@saleor/macaw-ui-next";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { StaffListDatagrid } from "../StaffListDatagrid";
import { createFilterStructure, StaffFilterKeys, StaffListFilterOpts } from "./filters";

export interface StaffListPageProps
  extends ListProps,
    FilterPagePropsWithPresets<StaffFilterKeys, StaffListFilterOpts>,
    SortPage<StaffListUrlSortField> {
  staffMembers: StaffMembers;
  onAdd: () => void;
}

const StaffListPage: React.FC<StaffListPageProps> = ({
  filterOpts,
  initialSearch,
  limits,
  currencySymbol,
  filterPresets,
  selectedFilterPreset,
  onAdd,
  onFilterChange,
  onSearchChange,
  hasPresetsChanged,
  onFilterPresetChange,
  onFilterPresetDelete,
  onFilterPresetPresetSave,
  onFilterPresetUpdate,
  onFilterPresetsAll,
  ...listProps
}) => {
  const subtitle = useContextualLink("staff_members");
  const intl = useIntl();
  const [isFilterPresetOpen, setFilterPresetOpen] = useState(false);
  const structure = createFilterStructure(intl, filterOpts);
  const { enabled: isStaffMembersFilteringEnabled } = useFlag("new_filters");

  return (
    <ListPageLayout>
      <TopNav
        href={configurationMenuUrl}
        title={intl.formatMessage(sectionNames.staff)}
        subtitle={subtitle}
        isAlignToRight={false}
        withoutBorder
      >
        <Box __flex={1} display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Box marginX={3} display="flex" alignItems="center">
              <ChevronRightIcon />
            </Box>

            <FilterPresetsSelect
              presetsChanged={hasPresetsChanged()}
              onSelect={onFilterPresetChange}
              onRemove={onFilterPresetDelete}
              onUpdate={onFilterPresetUpdate}
              savedPresets={filterPresets}
              activePreset={selectedFilterPreset}
              onSelectAll={onFilterPresetsAll}
              onSave={onFilterPresetPresetSave}
              isOpen={isFilterPresetOpen}
              onOpenChange={setFilterPresetOpen}
              selectAllLabel={intl.formatMessage({
                id: "OTDo9I",
                defaultMessage: "All staff members",
                description: "tab name",
              })}
            />
          </Box>
          <Box>
            <Button data-test-id="invite-staff-member" variant="primary" onClick={onAdd}>
              <FormattedMessage
                id="4JcNaA"
                defaultMessage="Invite staff member"
                description="button"
              />
            </Button>
          </Box>
        </Box>
      </TopNav>
      <DashboardCard>
        {isStaffMembersFilteringEnabled ? (
          <ListFilters<StaffFilterKeys>
            type="expression-filter"
            initialSearch={initialSearch}
            onSearchChange={onSearchChange}
            searchPlaceholder={intl.formatMessage({
              id: "o68j+t",
              defaultMessage: "Search staff members...",
            })}
          />
        ) : (
          <ListFilters<StaffFilterKeys>
            currencySymbol={currencySymbol}
            initialSearch={initialSearch}
            onFilterChange={onFilterChange}
            onSearchChange={onSearchChange}
            filterStructure={structure}
            searchPlaceholder={intl.formatMessage({
              id: "o68j+t",
              defaultMessage: "Search staff members...",
            })}
          />
        )}

        <StaffListDatagrid {...listProps} />
      </DashboardCard>
    </ListPageLayout>
  );
};

StaffListPage.displayName = "StaffListPage";
export default StaffListPage;
