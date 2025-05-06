import React from "react";
import { Box, PropsWithBox } from "@saleor/macaw-ui-next";

export const Content: React.FC<PropsWithBox<{ children?: React.ReactNode }>> = ({
  children,
  ...rest
}) => (
  <Box paddingX={6} {...rest}>
    {children}
  </Box>
);
