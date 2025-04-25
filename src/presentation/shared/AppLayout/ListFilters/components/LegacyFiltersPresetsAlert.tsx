import { getStatusColor } from "@dashboard/misc";
import { TokenType } from "@presentation/shared//ConditionalFilter/ValueProvider/UrlToken";
import { Box, Text, useTheme } from "@saleor/macaw-ui-next";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

export const LegacyFiltersPresetsAlert = () => {
  const presets = [];
  const { theme: currentTheme } = useTheme();
  const { formatMessage } = useIntl();
  const legacyPresets = presets.filter(
    preset => !preset.data.match(`[${Object.values(TokenType)}][0-9].`),
  );

  if (legacyPresets.length > 0) {
    return (
      <Box
        __backgroundColor={getStatusColor({ status: "warning", currentTheme })}
        paddingX={7}
        paddingY={5}
        marginBottom={5}
      >
        <Text>
          {formatMessage(messages.alertText, {
            presetNames: (
              <Text size={4} fontWeight="bold">
                {legacyPresets.map(p => p.name).join(", ")}
              </Text>
            ),
          })}
        </Text>
      </Box>
    );
  }

  return null;
};

const messages = defineMessages({
  alertText: {
    defaultMessage:
      "You are using an old version of filter presets. The following presets: {presetNames} must be updated to continue using filters",
    description: "Alert text",
    id: "eIGXwJ",
  },
});
