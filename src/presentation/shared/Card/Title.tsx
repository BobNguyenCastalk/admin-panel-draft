import React, { PropsWithChildren } from "react";
import { Text, TextProps } from "@saleor/macaw-ui-next";

export const Title: React.FC<PropsWithChildren<TextProps>> = ({ children, ...rest }) => (
  <Text size={5} fontWeight="bold" __width="auto" {...rest}>
    {children}
  </Text>
);
