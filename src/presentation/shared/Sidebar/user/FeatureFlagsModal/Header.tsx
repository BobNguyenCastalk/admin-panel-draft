import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { Box, Text } from "@saleor/macaw-ui-next";

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <Box display="flex" justifyContent="space-between" paddingX={3} paddingY={4}>
    <Text size={5} fontWeight="bold">
      <FormattedMessage defaultMessage="Features preview" id="krer6Z" />
    </Text>
    {children}
  </Box>
);
