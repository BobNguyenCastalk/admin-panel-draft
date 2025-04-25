// @ts-strict-ignore
import { pluginListUrl } from "@dashboard/business/utils/plugins/urls";
import { channelsListUrl } from "@dashboard/channels/urls";
import { APP_VERSION as dashboardVersion } from "@dashboard/config";
import { PermissionEnum } from "@dashboard/graphql";
import Channels from "@dashboard/icons/Channels";
import Navigation from "@dashboard/icons/Navigation";
import PermissionGroups from "@dashboard/icons/PermissionGroups";
import Plugins from "@dashboard/icons/Plugins";
import StaffMembers from "@dashboard/icons/StaffMembers";
import { sectionNames } from "@dashboard/intl";
import { maybe } from "@dashboard/misc";
import { menuListUrl } from "@dashboard/navigation/urls";
import { permissionGroupListUrl } from "@dashboard/permissionGroups/urls";
import { useUser } from "@dashboard/presentation/pages/auth";
import { staffListUrl } from "@dashboard/staff/urls";
import { WindowTitle } from "@presentation/shared//WindowTitle";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

import { ConfigurationPage } from "./ConfigurationPage";
import { MenuSection } from "./types";

export function createConfigurationMenu(intl: IntlShape): MenuSection[] {
  return [
    {
      label: intl.formatMessage({
        id: "jFrdB5",
        defaultMessage: "Product Settings",
      }),
      menuItems: [],
    },
    {
      label: intl.formatMessage({
        id: "UN+yTt",
        defaultMessage: "Staff Settings",
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            id: "RQUkVW",
            defaultMessage: "Manage your employees and their permissions",
          }),
          icon: <StaffMembers />,
          permissions: [PermissionEnum.MANAGE_STAFF],
          title: intl.formatMessage(sectionNames.staff),
          url: staffListUrl(),
          testId: "configuration-menu-staff",
        },
        {
          description: intl.formatMessage({
            id: "ivJ1qt",
            defaultMessage: "Manage your permission groups and their permissions",
          }),
          icon: <PermissionGroups />,
          permissions: [PermissionEnum.MANAGE_STAFF],
          title: intl.formatMessage(sectionNames.permissionGroups),
          url: permissionGroupListUrl(),
          testId: "configuration-menu-permission-groups",
        },
      ],
    },
    {
      label: intl.formatMessage({
        id: "MWSacl",
        defaultMessage: "Multichannel",
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            id: "8vJCJ4",
            defaultMessage: "Define and manage your sales channels",
          }),
          icon: <Channels />,
          permissions: [PermissionEnum.MANAGE_CHANNELS],
          title: intl.formatMessage(sectionNames.channels),
          url: channelsListUrl(),
          testId: "configuration-menu-channels",
        },
      ],
    },
    {
      label: intl.formatMessage({
        id: "YZl6cv",
        defaultMessage: "Miscellaneous",
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            id: "hpMcW8",
            defaultMessage: "Define how users can navigate through your store",
          }),
          icon: <Navigation />,
          permissions: [PermissionEnum.MANAGE_MENUS],
          title: intl.formatMessage(sectionNames.navigation),
          url: menuListUrl(),
          testId: "configuration-menu-navigation",
        },
        {
          description: intl.formatMessage({
            id: "m19JfL",
            defaultMessage: "View and update your plugins and their settings.",
          }),
          icon: (
            <Plugins fontSize="inherit" viewBox="-8 -5 44 44" preserveAspectRatio="xMinYMin meet" />
          ),
          permissions: [PermissionEnum.MANAGE_PLUGINS],
          title: intl.formatMessage(sectionNames.plugins),
          url: pluginListUrl(),
          testId: "configuration-plugins-pages",
        },
      ],
    },
  ];
}

export const configurationMenuUrl = "/configuration/";

export const ConfigurationSection: React.FC = () => {
  const versions = {
    dashboardVersion,
    coreVersion: "",
  };
  const user = useUser();
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.configuration)} />
      <ConfigurationPage
        menu={createConfigurationMenu(intl)}
        user={maybe(() => user.user)}
        versionInfo={versions}
      />
    </>
  );
};
export default ConfigurationSection;
