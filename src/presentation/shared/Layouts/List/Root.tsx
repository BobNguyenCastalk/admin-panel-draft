import React from "react";

import { Box } from "@saleor/macaw-ui-next";

interface ListPageLayoutProps {
  children: React.ReactNode;
  hasSaveBar?: boolean;
  hasTopNav?: boolean;
}

export const ListPageLayout: React.FC<ListPageLayoutProps> = ({ children }) => (
  <Box display="grid" __gridTemplateColumns="1fr" __gridTemplateRows="auto 1fr" height="100%">
    {children}
  </Box>
);
