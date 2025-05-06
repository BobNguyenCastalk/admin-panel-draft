import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import {
  _SearchPageTypesOperandsDocument,
  _SearchPageTypesOperandsQuery,
  _SearchPageTypesOperandsQueryVariables,
} from "@dashboard/graphql";
import { createInitialPageState } from "@presentation/shared/ConditionalFilter/API/initialState/helpers";
import { InitialPageAPIResponse } from "@presentation/shared/ConditionalFilter/API/initialState/types";
import { PageFetchingParams } from "@presentation/shared/ConditionalFilter/ValueProvider/TokenArray/fetchingParams";

import { InitialPageStateResponse } from "./InitialPageState";

export interface InitialPageAPIState {
  data: InitialPageStateResponse;
  loading: boolean;
  fetchQueries: (params: PageFetchingParams) => Promise<void>;
}

export const useInitialPageState = () => {
  const client = useApolloClient();
  const [data, setData] = useState<InitialPageStateResponse>(InitialPageStateResponse.empty());
  const [loading, setLoading] = useState(true);
  const queriesToRun: Array<Promise<InitialPageAPIResponse>> = [];

  const fetchQueries = async ({ pageTypes }: PageFetchingParams) => {
    if (pageTypes.length > 0) {
      queriesToRun.push(
        client.query<_SearchPageTypesOperandsQuery, _SearchPageTypesOperandsQueryVariables>({
          query: _SearchPageTypesOperandsDocument,
          variables: {
            first: 5,
            pageTypesSlugs: pageTypes,
          },
        }),
      );
    }

    const data = await Promise.all(queriesToRun);
    const initialState = createInitialPageState(data);

    setData(new InitialPageStateResponse(initialState.pageTypes));
    setLoading(false);
  };

  return {
    data,
    loading,
    fetchQueries,
  };
};
