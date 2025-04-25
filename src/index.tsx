import "@saleor/macaw-ui-next/style";
import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { useAuthRedirection } from "@business/hooks/auth/useAuthRedirection";
import AuthProvider from "@business/providers/auth/AuthProvider";
import { PermissionEnum } from "@dashboard/graphql";
import useAppState from "@dashboard/hooks/useAppState";
import { ThemeProvider } from "@dashboard/theme";
import { OnboardingProvider } from "@dashboard/welcomePage/WelcomePageOnboarding/onboardingContext";
import AppLayout from "@presentation/shared/AppLayout";
import useAppChannel, {
  AppChannelProvider,
} from "@presentation/shared/AppLayout/AppChannelContext";
import { DateProvider } from "@presentation/shared/Date";
import DemoBanner from "@presentation/shared/DemoBanner";
import { DevModeProvider } from "@presentation/shared/DevModePanel/DevModeProvider";
import ErrorPage from "@presentation/shared/ErrorPage";
import ExitFormDialogProvider from "@presentation/shared/Form/ExitFormDialogProvider";
import { LocaleProvider } from "@presentation/shared/Locale";
import MessageManagerProvider from "@presentation/shared/messages";
import { NavigatorSearchProvider } from "@presentation/shared/NavigatorSearch/NavigatorSearchProvider";
import { ProductAnalytics } from "@presentation/shared/ProductAnalytics";
import { history, Route, Router } from "@presentation/shared/Router";
import { SavebarRefProvider } from "@presentation/shared/Savebar/SavebarRefContext";
import { ShopProvider } from "@presentation/shared/Shop";
import { WindowTitle } from "@presentation/shared/WindowTitle";
import { ThemeProvider as LegacyThemeProvider } from "@saleor/macaw-ui";
import { SaleorProvider } from "@saleor/sdk";
import React from "react";
import { render } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import TagManager from "react-gtm-module";
import { useIntl } from "react-intl";
import { Switch } from "react-router-dom";

import ChannelsSection from "./channels";
import { channelsSection } from "./channels/urls";
import { DEMO_MODE, GTM_ID } from "./config";
import ConfigurationSection from "./configuration";
import { getConfigMenuItemsPermissions } from "./configuration/utils";
import AppStateProvider from "./containers/AppState";
import BackgroundTasksProvider from "./containers/BackgroundTasks";
import { FeatureFlagsProviderWithUser } from "./featureFlags/FeatureFlagsProvider";
import { apolloClient, saleorClient } from "./graphql/client";
import { useLocationState } from "./hooks/useLocationState";
import { commonMessages } from "./intl";
import NavigationSection from "./navigation";
import { navigationSection } from "./navigation/urls";
import { NotFound } from "./NotFound";
import PermissionGroupSection from "./permissionGroups";
import PluginsSection from "./plugins";
import Auth from "./presentation/pages/auth";
import LoginLoading from "./presentation/pages/auth/components/LoginLoading/LoginLoading";
import SectionRoute from "./presentation/pages/auth/components/SectionRoute";
import errorTracker from "./services/errorTracking";
import StaffSection from "./staff";
import { paletteOverrides, themeOverrides } from "./themeOverrides";
import { WelcomePage } from "./welcomePage";

if (GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID });
}

errorTracker.init(history);

/*
  Handle legacy theming toggle. Since we use new and old macaw,
  we need to handle both theme swticher for a while.
*/
const handleLegacyTheming = () => {
  const activeTheme = localStorage.getItem("activeMacawUITheme");

  if (activeTheme === "defaultDark") {
    localStorage.setItem("macaw-ui-theme", "dark");

    return;
  }

  localStorage.setItem("macaw-ui-theme", "light");
};

handleLegacyTheming();

const App: React.FC = () => (
  <SaleorProvider client={saleorClient}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <LegacyThemeProvider overrides={themeOverrides} palettes={paletteOverrides}>
          <ThemeProvider>
            <DateProvider>
              <LocaleProvider>
                <MessageManagerProvider>
                  <BackgroundTasksProvider>
                    <AppStateProvider>
                      <AuthProvider>
                        <ProductAnalytics>
                          <ShopProvider>
                            <AppChannelProvider>
                              <ExitFormDialogProvider>
                                <DevModeProvider>
                                  <NavigatorSearchProvider>
                                    <SavebarRefProvider>
                                      <FeatureFlagsProviderWithUser>
                                        <OnboardingProvider>
                                          <Routes />
                                        </OnboardingProvider>
                                      </FeatureFlagsProviderWithUser>
                                    </SavebarRefProvider>
                                  </NavigatorSearchProvider>
                                </DevModeProvider>
                              </ExitFormDialogProvider>
                            </AppChannelProvider>
                          </ShopProvider>
                        </ProductAnalytics>
                      </AuthProvider>
                    </AppStateProvider>
                  </BackgroundTasksProvider>
                </MessageManagerProvider>
              </LocaleProvider>
            </DateProvider>
          </ThemeProvider>
        </LegacyThemeProvider>
      </Router>
    </ApolloProvider>
  </SaleorProvider>
);
const Routes: React.FC = () => {
  const intl = useIntl();
  const [, dispatchAppState] = useAppState();
  const { authenticated, authenticating } = useAuthRedirection();
  const { channel } = useAppChannel(false);
  const channelLoaded = typeof channel !== "undefined";
  const homePageLoaded = channelLoaded && authenticated;
  const homePageLoading = (authenticated && !channelLoaded) || authenticating;
  const { isAppPath } = useLocationState();

  return (
    <>
      <WindowTitle title={intl.formatMessage(commonMessages.dashboard)} />
      {DEMO_MODE && <DemoBanner />}
      {homePageLoaded ? (
        <AppLayout fullSize={isAppPath}>
          <ErrorBoundary
            onError={e => {
              const errorId = errorTracker.captureException(e);

              dispatchAppState({
                payload: {
                  error: "unhandled",
                  errorId,
                },
                type: "displayError",
              });
            }}
            fallbackRender={({ resetErrorBoundary }) => (
              <ErrorPage onBack={resetErrorBoundary} onRefresh={() => window.location.reload()} />
            )}
          >
            <Switch>
              <SectionRoute exact path="/" component={WelcomePage} />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_PLUGINS]}
                path="/plugins"
                component={PluginsSection}
              />
              <SectionRoute path="/staff" component={StaffSection} />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_STAFF]}
                path="/permission-groups"
                component={PermissionGroupSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_MENUS]}
                path={navigationSection}
                component={NavigationSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_CHANNELS]}
                path={channelsSection}
                component={ChannelsSection}
              />
              <SectionRoute
                matchPermission="any"
                permissions={getConfigMenuItemsPermissions(intl)}
                exact
                path="/configuration"
                component={ConfigurationSection}
              />
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </AppLayout>
      ) : homePageLoading ? (
        <LoginLoading />
      ) : (
        <Auth />
      )}
    </>
  );
};

render(<App />, document.querySelector("#dashboard-app"));
