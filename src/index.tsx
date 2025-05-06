import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import TagManager from "react-gtm-module";
import { useIntl } from "react-intl";
import { Switch } from "react-router-dom";

import { ThemeProvider as LegacyThemeProvider } from "@saleor/macaw-ui";
import { SaleorProvider } from "@saleor/sdk";

import { ApolloProvider } from "@apollo/client";

import useAppState from "@dashboard/business/hooks/shared/useAppState";
import { getById } from "@dashboard/business/misc";
import {
  ChannelFragment,
  PermissionEnum,
  useBaseChannelsQuery,
  useUserDetailsQuery,
} from "@dashboard/graphql";
import PermissionGroupSection from "@dashboard/presentation/pages/permissions";
import { useBoundStore } from "@dashboard/stores";
import { ThemeProvider } from "@dashboard/theme";
import ChannelsSection from "@presentation/pages/channels";
import ConfigurationSection from "@presentation/pages/configuration";
import PluginsSection from "@presentation/pages/plugins";
import StaffSection from "@presentation/pages/staffs";
import { WelcomePage } from "@presentation/pages/welcome";
import AppLayout from "@presentation/shared/AppLayout";
import { DevModeProvider } from "@presentation/shared/DevModePanel/DevModeProvider";
import ErrorPage from "@presentation/shared/ErrorPage";
import ExitFormDialogProvider from "@presentation/shared/Form/ExitFormDialogProvider";
import { LocaleProvider } from "@presentation/shared/Locale";
import MessageManagerProvider from "@presentation/shared/messages";
import { NavigatorSearchProvider } from "@presentation/shared/NavigatorSearch/NavigatorSearchProvider";
import { ProductAnalytics } from "@presentation/shared/ProductAnalytics";
import { history, Route, Router } from "@presentation/shared/Router";
import { SavebarRefProvider } from "@presentation/shared/Savebar/SavebarRefContext";
import { WindowTitle } from "@presentation/shared/WindowTitle";

import { useLocationState } from "./business/hooks/shared/useLocationState";
import { channelsSection } from "./business/utils/channels/urls";
import { getConfigMenuItemsPermissions } from "./business/utils/configuration/utils";
import { GTM_ID } from "./configs";
import { commonMessages } from "./constants/common/intl";
import AppStateProvider from "./containers/AppState";
import BackgroundTasksProvider from "./containers/BackgroundTasks";
import { FeatureFlagsProviderWithUser } from "./featureFlags/FeatureFlagsProvider";
import { apolloClient, saleorClient } from "./graphql/client";
import Auth from "./presentation/pages/auth";
import LoginLoading from "./presentation/pages/auth/components/LoginLoading/LoginLoading";
import SectionRoute from "./presentation/pages/auth/components/SectionRoute";
import { NotFound } from "./presentation/shared/NotFound";
import errorTracker from "./services/errorTracking";
import { paletteOverrides, themeOverrides } from "./themeOverrides";

import "@saleor/macaw-ui-next/style";
import "@assets/styles/index.css";

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

const isValidChannel = (channelId: string, channelList?: ChannelFragment[]) => {
  if (!channelId) {
    return false;
  }

  return channelList?.some(getById(channelId));
};

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

// TODO: handle use logic fetch user detail here and set Channels and selectedChannel

const Routes: React.FC = () => {
  const intl = useIntl();
  const [, dispatchAppState] = useAppState();
  const authenticated = useBoundStore(state => state.authenticated);
  const authenticating = useBoundStore(state => state.authenticating);
  const user = useBoundStore(state => state.user);
  const setUser = useBoundStore(state => state.setUser);
  const selectedChannel = useBoundStore(state => state.selectedChannel);
  const setSelectedChannel = useBoundStore(state => state.setSelectedChannel);
  const setChannels = useBoundStore(state => state.setChannels);
  const channelLoaded = !!selectedChannel;
  const homePageLoaded = channelLoaded && authenticated;
  const homePageLoading = (authenticated && !channelLoaded) || authenticating;
  const { isAppPath } = useLocationState();

  const userDetailsData = useUserDetailsQuery({
    client: apolloClient,
    skip: !authenticated,
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      setUser(data.me);
      setChannels(data.me.accessibleChannels);
      if (!selectedChannel && data.me.accessibleChannels.length > 0) {
        setSelectedChannel(data.me.accessibleChannels[0].id);
      }
    },
  });

  const baseChannelsData = useBaseChannelsQuery({
    skip: !authenticated || !user,
  });

  return (
    <>
      <WindowTitle title={intl.formatMessage(commonMessages.dashboard)} />
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

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
