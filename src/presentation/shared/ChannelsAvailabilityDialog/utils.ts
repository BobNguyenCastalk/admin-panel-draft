import React from "react";

import { fuzzySearch } from "@dashboard/business/misc";

export const useChannelsSearch = function <T extends { name: string }>(channels: T[]) {
  const [query, onQueryChange] = React.useState("");
  const filteredChannels = fuzzySearch(channels, query, ["name"]);

  return { query, onQueryChange, filteredChannels };
};
