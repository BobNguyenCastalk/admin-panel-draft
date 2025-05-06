import React from "react";
import { DefaultTheme, ThemeProvider as MacawThemeProvider } from "@saleor/macaw-ui-next";

import useLocalStorage from "@dashboard/business/hooks/shared/useLocalStorage";

import { defaultTheme, localStorageKey } from "./consts";

export const ThemeProvider: React.FC = ({ children }) => {
  const [activeTheme] = useLocalStorage<DefaultTheme>(localStorageKey, defaultTheme);

  return <MacawThemeProvider defaultTheme={activeTheme}>{children}</MacawThemeProvider>;
};
