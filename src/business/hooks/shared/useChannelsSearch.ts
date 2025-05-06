import React from "react";

import { fuzzySearch } from "@dashboard/business/misc";
import { ChannelDetailsFragment } from "@dashboard/graphql";
import { FetchMoreProps, Search, SearchProps } from "@dashboard/types";

export const useChannelsSearch = function <T extends { name: string }>(channels: T[]) {
  const [query, onQueryChange] = React.useState("");
  const filteredChannels = fuzzySearch(channels, query, ["name"]) || [];

  return { query, onQueryChange, filteredChannels };
};

export interface ChannelsWithLoadMoreProps extends FetchMoreProps, Search, SearchProps {
  channels: ChannelDetailsFragment[];
}
