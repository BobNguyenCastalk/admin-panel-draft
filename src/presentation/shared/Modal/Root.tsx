import React from "react";
import { Modal, ModalRootProps } from "@saleor/macaw-ui-next";

import { ModalContextProvider } from "@presentation/shared/Modal/context";

type RootProps = ModalRootProps;

export const Root = ({ children, onChange, open, ...rest }: RootProps) => {
  return (
    <ModalContextProvider onChange={onChange} open={open}>
      <Modal onChange={onChange} open={open} {...rest}>
        {children}
      </Modal>
    </ModalContextProvider>
  );
};
