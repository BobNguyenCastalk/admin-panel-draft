import React from "react";
import { useIntl } from "react-intl";
import { Text } from "@saleor/macaw-ui-next";

import { sectionNames } from "@constants/common/intl";
import { ChannelShippingZones } from "@dashboard/channels/pages/ChannelDetailsPage/types";
import { SearchShippingZonesQuery } from "@dashboard/graphql";
import { FetchMoreProps, RelayToFlat } from "@dashboard/types";
import { DashboardCard } from "@presentation/shared/Card";

import AssignmentList from "../AssignmentList";
import { messages } from "./messages";

export interface ShippingZonesProps {
  addShippingZone: (id: string) => void;
  removeShippingZone: (id: string) => void;
  searchShippingZones: (searchPhrase: string) => void;
  loading: boolean;
  totalCount: number;
  fetchMoreShippingZones: FetchMoreProps;
  shippingZones: ChannelShippingZones;
  shippingZonesChoices: RelayToFlat<SearchShippingZonesQuery["search"]>;
}

const ShippingZones: React.FC<ShippingZonesProps> = props => {
  const {
    addShippingZone,
    removeShippingZone,
    searchShippingZones,
    loading,
    totalCount,
    fetchMoreShippingZones,
    shippingZones,
    shippingZonesChoices,
  } = props;
  const intl = useIntl();

  return (
    <DashboardCard data-test-id="shipping-zones-section">
      <DashboardCard.Header>
        <DashboardCard.Title>{intl.formatMessage(sectionNames.shippingZones)}</DashboardCard.Title>
      </DashboardCard.Header>
      <DashboardCard.Content>
        <Text>{intl.formatMessage(messages.subtitle)}</Text>
      </DashboardCard.Content>
      <AssignmentList
        loading={loading}
        items={shippingZones!}
        itemsChoices={shippingZonesChoices!}
        addItem={addShippingZone}
        removeItem={removeShippingZone}
        searchItems={searchShippingZones}
        fetchMoreItems={fetchMoreShippingZones}
        totalCount={totalCount}
        dataTestId="shipping"
        inputName="shippingZone"
        itemsName={intl.formatMessage(sectionNames.shippingZones)}
      />
    </DashboardCard>
  );
};

export default ShippingZones;
