import { DefaultTheme, useTheme as useMacawTheme } from "@saleor/macaw-ui-next";

import useLocalStorage from "@dashboard/business/hooks/shared/useLocalStorage";

import { defaultTheme, localStorageKey } from "./consts";

export const useTheme = () => {
  const { theme, setTheme } = useMacawTheme();
  const [, setActiveTheme] = useLocalStorage<DefaultTheme>(localStorageKey, defaultTheme);

  return {
    theme,
    setTheme: (to: DefaultTheme) => {
      setActiveTheme(to);
      setTheme(to);
    },
  };
};
