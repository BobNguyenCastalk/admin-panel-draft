import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { renderCollection } from "@dashboard/business/misc";
import { getPluginsWithAppReplacementsIds } from "@dashboard/business/utils/plugins/plugins-with-app-replacements";
import { PluginListUrlSortField, pluginUrl } from "@dashboard/business/utils/plugins/urls";
import { PluginBaseFragment } from "@dashboard/graphql";
import { ListProps, SortPage } from "@dashboard/types";
import { TableBody, TableCell, TableFooter } from "@material-ui/core";
import ResponsiveTable from "@presentation/shared//ResponsiveTable";
import { TablePaginationWithContext } from "@presentation/shared//TablePagination";
import TableRowLink from "@presentation/shared//TableRowLink";
import { EditIcon, makeStyles } from "@saleor/macaw-ui";
import { Skeleton, Text } from "@saleor/macaw-ui-next";
import React from "react";
import { useIntl } from "react-intl";

import { pluginsMiscMessages } from "./messages";
import PluginChannelAvailabilityCell from "./PluginChannelAvailabilityCell";
import PluginChannelConfigurationCell from "./PluginChannelConfigurationCell";
import PluginListTableHead from "./PluginListTableHead";

export const useStyles = makeStyles(
  () => ({
    link: {
      cursor: "pointer",
    },
  }),
  { name: "PluginsList" },
);

const pluginsWithAppReplacements = getPluginsWithAppReplacementsIds();
const hasAppReplacement = (pluginId: string) => pluginsWithAppReplacements.includes(pluginId);

export interface PluginListProps extends ListProps, SortPage<PluginListUrlSortField> {
  plugins: PluginBaseFragment[];
}

const totalColSpan = 10;
const PluginList: React.FC<PluginListProps> = props => {
  const { settings, plugins, disabled, sort, onSort, onUpdateListSettings } = props;
  const classes = useStyles(props);
  const navigate = useNavigator();
  const intl = useIntl();

  return (
    <ResponsiveTable>
      <PluginListTableHead sort={sort} onSort={onSort} />
      <TableFooter>
        <TableRowLink>
          <TablePaginationWithContext
            colSpan={totalColSpan}
            onUpdateListSettings={onUpdateListSettings}
            settings={settings}
            disabled={disabled}
          />
        </TableRowLink>
      </TableFooter>
      <TableBody>
        {renderCollection(
          plugins,
          plugin => {
            const hasReplacement = plugin && hasAppReplacement(plugin.id);
            const activeChannelConfigurations = plugin?.channelConfigurations?.filter(
              c => c.active,
            );
            const isActive =
              plugin?.globalConfiguration?.active ||
              (activeChannelConfigurations && activeChannelConfigurations.length > 0);

            return plugin ? (
              <TableRowLink
                data-test-id="plugin"
                hover={!!plugin}
                className={plugin ? classes.link : undefined}
                // FIXME: middle click doesn't work - issues with deployments
                // shows 404 not found
                onClick={() => plugin && navigate(pluginUrl(plugin.id))}
                key={plugin ? plugin.id : "skeleton"}
              >
                <TableCell colSpan={5}>
                  <Text>{plugin.name}</Text>
                  {hasReplacement && isActive && (
                    <Text size={2} fontWeight="light" color="critical1" display="block">
                      {intl.formatMessage(pluginsMiscMessages.appReplacementMessage)}
                    </Text>
                  )}
                </TableCell>
                <PluginChannelConfigurationCell plugin={plugin} />
                <PluginChannelAvailabilityCell plugin={plugin} />
                <TableCell align="right">
                  <EditIcon />
                </TableCell>
              </TableRowLink>
            ) : (
              <TableRowLink>
                <TableCell colSpan={totalColSpan}>
                  <Skeleton />
                </TableCell>
              </TableRowLink>
            );
          },
          () => (
            <TableRowLink>
              <TableCell colSpan={totalColSpan}>
                {intl.formatMessage({
                  id: "Co2U4u",
                  defaultMessage: "No plugins found",
                })}
              </TableCell>
            </TableRowLink>
          ),
        )}
      </TableBody>
    </ResponsiveTable>
  );
};

PluginList.displayName = "PluginList";
export default PluginList;
