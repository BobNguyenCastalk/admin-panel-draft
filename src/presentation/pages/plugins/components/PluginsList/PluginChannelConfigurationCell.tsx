// @ts-strict-ignore
import React from "react";
import { FormattedMessage } from "react-intl";
import { TableCell } from "@material-ui/core";

import { PluginBaseFragment } from "@dashboard/graphql";
import { isPluginGlobal } from "@presentation/pages/plugins/views/utils";

import { pluginChannelConfigurationCellMessages as messages } from "./messages";

interface PluginChannelConfigurationCellProps {
  plugin: PluginBaseFragment;
}

const PluginChannelConfigurationCell: React.FC<PluginChannelConfigurationCellProps> = ({
  plugin,
}) => {
  const message = isPluginGlobal(plugin.globalConfiguration)
    ? messages.globalLabel
    : messages.channelLabel;

  return (
    <TableCell colSpan={2}>
      <FormattedMessage {...message} />
    </TableCell>
  );
};

export default PluginChannelConfigurationCell;
