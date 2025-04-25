import { DEFAULT_INITIAL_SEARCH_DATA } from "@dashboard/config";
import usePageSearch from "@dashboard/searches/usePageSearch";
import { FetchMoreProps } from "@dashboard/types";
import { mapEdgesToItems } from "@dashboard/utils/maps";

import { MenuItemTypeWithOptions } from "../types";

export const useLinkValue = (linkType: MenuItemTypeWithOptions) => {
  const pageSearch = usePageSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
    skip: linkType !== "page",
  });

  const searches = {
    page: pageSearch,
  };

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

  const pages = mapEdgesToItems(pageSearch?.result?.data?.search) || [];

  const pagesOptions = pages?.map(page => ({
    value: page.id,
    label: page.title,
  }));

  const options = {
    page: pagesOptions,
  };

  return {
    options: options[linkType],
    fetchMoreProps,
    onQueryChange: handleQueryChange,
    loading: selectedLinkTypeSearch?.result?.loading,
  };
};
