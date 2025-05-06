import { useMemo, useState } from "react";

import { Option } from "@saleor/macaw-ui-next";

import { fuzzySearch } from "@dashboard/business/misc";

function useChoiceSearch(choices: Option[]) {
  const [query, setQuery] = useState("");
  const sortedChoices = useMemo(
    () => fuzzySearch(choices, query, ["label"]) || [],
    [choices, query],
  );

  return { search: setQuery, result: sortedChoices };
}

export default useChoiceSearch;
