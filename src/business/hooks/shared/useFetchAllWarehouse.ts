import { makeFetchAll } from "@dashboard/business/hooks/shared/makeFetchAll";
import {
  WarehouseListDocument,
  WarehouseListQuery,
  WarehouseListQueryVariables,
} from "@dashboard/graphql";

export const useFetchAllWarehouses = makeFetchAll<WarehouseListQuery, WarehouseListQueryVariables>(
  WarehouseListDocument,
  "warehouses",
  (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    const previousEdges = previousResult?.warehouses?.edges ?? [];
    const fetchMoreEdges = fetchMoreResult?.warehouses?.edges ?? [];

    if (fetchMoreResult?.warehouses?.edges) {
      fetchMoreResult.warehouses.edges = [...previousEdges, ...fetchMoreEdges];

      return { ...fetchMoreResult };
    }

    return previousResult;
  },
);
