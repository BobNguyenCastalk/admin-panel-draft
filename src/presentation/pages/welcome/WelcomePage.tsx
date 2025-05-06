import React from "react";
import { Box } from "@saleor/macaw-ui-next";

import { WelcomePageTitle } from "./WelcomePageTitle";

export const WelcomePage = () => {
  return (
    <Box
      display="grid"
      gap={7}
      gridTemplateColumns={{
        mobile: 1,
        tablet: 1,
        desktop: 3,
      }}
      paddingX={8}
      paddingY={6}
      paddingTop={9}
      __gridTemplateRows="auto 1fr"
    >
      <Box gridRowStart="1" __grid-column="1/-1">
        <WelcomePageTitle />
      </Box>
      <Box
        gridColumn={{
          mobile: "1",
          tablet: "1",
          desktop: "2",
        }}
      ></Box>
    </Box>
  );
};
