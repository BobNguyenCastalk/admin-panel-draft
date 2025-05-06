import React, { ReactNode } from "react";

import { Box } from "@saleor/macaw-ui-next";

import { useModalContext } from "@presentation/shared/Modal/context";

import { Close } from "./Close";
import { Title, TitleProps } from "./Title";

interface HeaderProps extends TitleProps {
  children: ReactNode;
}

export const Header = ({ children, ...rest }: HeaderProps) => {
  const { onChange } = useModalContext();

  return (
    <Box display="flex" justifyContent="space-between">
      <Title {...rest}>{children}</Title>
      <Close onClose={() => onChange?.(false)} />
    </Box>
  );
};
