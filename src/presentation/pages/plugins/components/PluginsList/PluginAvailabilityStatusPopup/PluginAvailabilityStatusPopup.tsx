// @ts-strict-ignore
import { PluginBaseFragment } from "@dashboard/graphql";
import { Popper } from "@material-ui/core";
import { isPluginGlobal } from "@presentation/pages/plugins/views/utils";
import { DashboardCard } from "@presentation/shared/Card";
import ChannelsAvailabilityMenuContent from "@presentation/shared/ChannelsAvailabilityMenuContent";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";

import { mapPluginsToPills } from "../utils";
import GlobalConfigPluginPopupBody from "./GlobalConfigPluginPopupBody";

const useStyles = makeStyles(
  () => ({
    container: {
      maxWidth: 500,
      zIndex: 1000,
    },
  }),
  { name: "PluginChannelsAvailabilityStatusPopup" },
);

interface PluginAvailabilityStatusPopupProps {
  plugin: PluginBaseFragment;
  isOpen: boolean;
  anchor: React.RefObject<HTMLTableCellElement>;
}

const PluginAvailabilityStatusPopup: React.FC<PluginAvailabilityStatusPopupProps> = ({
  plugin,
  isOpen,
  anchor,
}) => {
  const classes = useStyles({});
  const isGlobalPlugin = isPluginGlobal(plugin.globalConfiguration);

  return (
    <Popper placement="left" open={isOpen} className={classes.container} anchorEl={anchor.current}>
      <DashboardCard boxShadow="defaultModal">
        {isGlobalPlugin ? (
          <GlobalConfigPluginPopupBody plugin={plugin} />
        ) : (
          <ChannelsAvailabilityMenuContent
            pills={mapPluginsToPills(plugin.channelConfigurations)}
          />
        )}
      </DashboardCard>
    </Popper>
  );
};

export default PluginAvailabilityStatusPopup;
