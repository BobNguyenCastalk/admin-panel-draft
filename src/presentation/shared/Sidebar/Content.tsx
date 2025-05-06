// TODO: shared component should not import business logic. To fix this
import React from "react";

import { Box } from "@saleor/macaw-ui-next";

import { useCloud } from "@business/hooks/auth/useCloud";

import { Menu } from "./menu";
import { EnvironmentLink } from "./menu/EnvironmentLink";
import { MountingPoint } from "./MountingPoint";
import { UserInfo } from "./user";

export const SidebarContent = () => {
  const { isAuthenticatedViaCloud } = useCloud();

  return (
    <Box
      backgroundColor="default2"
      as="aside"
      height="100%"
      display="grid"
      __gridTemplateRows="auto 1fr auto"
    >
      <MountingPoint />
      <Menu />
      <Box>
        {isAuthenticatedViaCloud && (
          <Box paddingX={5} paddingBottom={2}>
            <EnvironmentLink />
          </Box>
        )}
        <UserInfo />
      </Box>
    </Box>
  );
};
