import React from "react";

import { Box, PropsWithBox } from "@saleor/macaw-ui-next";

export const Actions: React.FC<PropsWithBox<{ children: React.ReactNode }>> = ({
  children,
  className,
  style,
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection="row"
    gap={2}
    alignItems="center"
    justifyContent="flex-start"
    paddingX={6}
    paddingY={4}
    className={className}
    style={style}
    {...rest}
  >
    {children}
  </Box>
);
