import React from "react";
import { FormattedMessage } from "react-intl";
import { Text } from "@saleor/macaw-ui-next";

import { channelsAvailabilityDialogMessages as messages } from "./messages";

export const NoChannels = () => (
  <Text fontSize={2}>
    <FormattedMessage {...messages.noChannels} />
  </Text>
);
