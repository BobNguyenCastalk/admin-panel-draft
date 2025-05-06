import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useIntl } from "react-intl";
import { Switch } from "react-router-dom";

import { useLocationState } from "@business/hooks/shared/useLocationState";
import { channelsSection } from "@business/utils/channels/urls";
import { getConfigMenuItemsPermissions } from "@business/utils/configuration/utils";
import { commonMessages } from "@constants/common/intl";
import useAppState from "@dashboard/business/hooks/shared/useAppState";
import { PermissionEnum, useUserDetailsQuery } from "@dashboard/graphql";
import { apolloClient } from "@dashboard/graphql/client";
import PermissionGroupSection from "@dashboard/presentation/pages/permissions";
import { useBoundStore } from "@dashboard/stores";
import Auth from "@presentation/pages/auth";
import LoginLoading from "@presentation/pages/auth/components/LoginLoading/LoginLoading";
import SectionRoute from "@presentation/pages/auth/components/SectionRoute";
import ChannelsSection from "@presentation/pages/channels";
import ConfigurationSection from "@presentation/pages/configuration";
import PluginsSection from "@presentation/pages/plugins";
import StaffSection from "@presentation/pages/staffs";
import { WelcomePage } from "@presentation/pages/welcome";
import AppLayout from "@presentation/shared/AppLayout";
import ErrorPage from "@presentation/shared/ErrorPage";
import { NotFound } from "@presentation/shared/NotFound";
import { Route } from "@presentation/shared/Router";
import { WindowTitle } from "@presentation/shared/WindowTitle";

const Routes: React.FC = () => {
  const intl = useIntl();
  const [, dispatchAppState] = useAppState();
  const authenticated = useBoundStore(state => state.authenticated);
  const authenticating = useBoundStore(state => state.authenticating);
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

  // const baseChannelsData = useBaseChannelsQuery({
  //   skip: !authenticated || !user,
  // });

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

export default Routes;
