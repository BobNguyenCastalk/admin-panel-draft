import { FetchMoreProps } from "@dashboard/types";

import { MenuItemTypeWithOptions } from "../types";

export const useLinkValue = (linkType: MenuItemTypeWithOptions) => {
  const searches = {};

  const selectedLinkTypeSearch = searches[linkType];

  const handleQueryChange = (query: string) => {
    if (selectedLinkTypeSearch) {
      selectedLinkTypeSearch.search(query);
    }
  };

  const fetchMoreProps: FetchMoreProps = {
    hasMore: selectedLinkTypeSearch?.result?.data?.search?.pageInfo?.hasNextPage ?? false,
    loading: selectedLinkTypeSearch?.result?.loading,
    onFetchMore: selectedLinkTypeSearch?.loadMore,
  };

  const options = {};

  return {
    options: options[linkType],
    fetchMoreProps,
    onQueryChange: handleQueryChange,
    loading: selectedLinkTypeSearch?.result?.loading,
  };
};
