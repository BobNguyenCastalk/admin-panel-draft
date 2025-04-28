import { mapNodeToChoice } from "@dashboard/business/utils/shared/maps";
import { ChannelFragment } from "@dashboard/graphql";
import { ChannelProps } from "@dashboard/types";
import { Select } from "@presentation/shared/Select";
import { Box } from "@saleor/macaw-ui-next";
import React from "react";

export interface AppChannelSelectProps extends ChannelProps {
  channels: ChannelFragment[];
  onChannelSelect: (id: string) => void;
}

const AppChannelSelect: React.FC<AppChannelSelectProps> = ({
  channels,
  onChannelSelect,
  selectedChannelId,
}) => {
  return (
    <Box>
      <Select
        __width={130}
        data-test-id="app-channel-select"
        size="large"
        onChange={({ target }) => onChannelSelect(target.value)}
        value={selectedChannelId}
        options={mapNodeToChoice(channels)}
      />
    </Box>
  );
};

AppChannelSelect.displayName = "AppChannelSelect";
export default AppChannelSelect;
