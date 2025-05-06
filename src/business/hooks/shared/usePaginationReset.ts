import { useEffect } from "react";

import { DEFAULT_INITIAL_PAGINATION_DATA } from "@dashboard/configs";
import { Pagination } from "@dashboard/types";

import useNavigator from "./useNavigator";

export function usePaginationReset<T extends Pagination>(
  urlFunc: (params: T) => string,
  params: T,
  rowNumber: number,
) {
  const navigate = useNavigator();

  useEffect(
    () =>
      navigate(
        urlFunc({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA,
        }),
        { replace: true },
      ),
    [rowNumber],
  );
  useEffect(
    () =>
      navigate(
        urlFunc({
          ...params,
        }),
        { replace: true },
      ),
    [params.before, params.after],
  );
}
