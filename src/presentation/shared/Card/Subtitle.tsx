import React, { PropsWithChildren } from "react";

import { Sprinkles, Text } from "@saleor/macaw-ui-next";

type CardSubtitleProps = Sprinkles;

export const CardSubtitle: React.FC<PropsWithChildren<CardSubtitleProps>> = ({
  children,
  ...rest
}) => (
  <Text size={4} fontWeight="light" display="block" {...rest}>
    {children}
  </Text>
);
