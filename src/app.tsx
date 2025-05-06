import React from "react";

import { ThemeProvider as LegacyThemeProvider } from "@saleor/macaw-ui";
import { SaleorProvider } from "@saleor/sdk";

import { ApolloProvider } from "@apollo/client";

import { apolloClient, saleorClient } from "@dashboard/graphql/client";
import { ThemeProvider } from "@dashboard/theme";
import { paletteOverrides, themeOverrides } from "@dashboard/themeOverrides";
import Routes from "@presentation/routes";
import { DevModeProvider } from "@presentation/shared/DevModePanel/DevModeProvider";
import ExitFormDialogProvider from "@presentation/shared/Form/ExitFormDialogProvider";
import { LocaleProvider } from "@presentation/shared/Locale";
import MessageManagerProvider from "@presentation/shared/messages";
import { NavigatorSearchProvider } from "@presentation/shared/NavigatorSearch/NavigatorSearchProvider";
import { ProductAnalytics } from "@presentation/shared/ProductAnalytics";
import { Router } from "@presentation/shared/Router";
import { SavebarRefProvider } from "@presentation/shared/Savebar/SavebarRefContext";

import AppStateProvider from "./containers/AppState";
import BackgroundTasksProvider from "./containers/BackgroundTasks";
import { FeatureFlagsProviderWithUser } from "./featureFlags/FeatureFlagsProvider";

const App: React.FC = () => {
  return (
    <SaleorProvider client={saleorClient}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <LegacyThemeProvider overrides={themeOverrides} palettes={paletteOverrides}>
            <ThemeProvider>
              <LocaleProvider>
                <MessageManagerProvider>
                  <BackgroundTasksProvider>
                    <AppStateProvider>
                      <ProductAnalytics>
                        <ExitFormDialogProvider>
                          <DevModeProvider>
                            <NavigatorSearchProvider>
                              <SavebarRefProvider>
                                <FeatureFlagsProviderWithUser>
                                  <Routes />
                                </FeatureFlagsProviderWithUser>
                              </SavebarRefProvider>
                            </NavigatorSearchProvider>
                          </DevModeProvider>
                        </ExitFormDialogProvider>
                      </ProductAnalytics>
                    </AppStateProvider>
                  </BackgroundTasksProvider>
                </MessageManagerProvider>
              </LocaleProvider>
            </ThemeProvider>
          </LegacyThemeProvider>
        </Router>
      </ApolloProvider>
    </SaleorProvider>
  );
};

export default App;
