import React from "react";
import { Box, PropsWithBox } from "@saleor/macaw-ui-next";

export const Toolbar: React.FC<PropsWithBox<{ children: React.ReactNode }>> = ({
  children,
  ...rest
}) => (
  <Box display="flex" flexDirection="row" gap={2} {...rest}>
    {children}
  </Box>
);
