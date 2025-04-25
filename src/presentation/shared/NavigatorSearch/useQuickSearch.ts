// @ts-strict-ignore
import { ChangeEvent, FormChange } from "@dashboard/hooks/useForm";
import useModalDialogOpen from "@dashboard/hooks/useModalDialogOpen";
import useNavigator from "@dashboard/hooks/useNavigator";
import { RefObject, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import getModeActions from "./modes";
import { getMode } from "./modes/utils";
import { QuickSearchAction, QuickSearchMode } from "./types";

type UseQuickSearch = [string, QuickSearchMode, FormChange, QuickSearchAction[]];
function useQuickSearch(open: boolean, input: RefObject<HTMLInputElement>): UseQuickSearch {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<QuickSearchMode>("default");
  const intl = useIntl();
  const navigate = useNavigator();

  useModalDialogOpen(open, {
    onClose: () => {
      setMode("default");
      setQuery("");
    },
  });

  const handleBack = (event: KeyboardEvent) => {
    // `any` type because of poorly typed `KeyboardEvent.EventTarget` which
    // has no `value` key. Which it would have if `KeyboardEvent` and
    // `EventTarget` would be generic types accepting HTMLDOM element types.
    if ((event.target as any).value === "" && event.keyCode === 8) {
      setMode("default");
    }
  };

  useEffect(() => {
    setQuery("");

    const inputInstance = input.current;

    if (mode !== "default" && input.current) {
      inputInstance.addEventListener("keyup", handleBack);

      return () => {
        if (inputInstance) {
          inputInstance.removeEventListener("keyup", handleBack);
        }
      };
    }
  }, [mode, open]);

  const change = (event: ChangeEvent) => {
    const value = event.target.value;

    if (mode === "default" || mode === "help") {
      const newMode = getMode(value);

      if (newMode) {
        setMode(newMode);
      }
    }

    setQuery(value);
  };

  return [
    query,
    mode,
    change,
    getModeActions(
      mode,
      query,
      intl,
      {},
      {
        createOrder: () => null,
        navigate,
        setMode,
      },
    ),
  ];
}

export default useQuickSearch;
