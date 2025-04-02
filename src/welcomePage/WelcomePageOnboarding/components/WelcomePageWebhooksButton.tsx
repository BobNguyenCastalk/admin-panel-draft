import { Button } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { PrimaryActionProps } from "./type";

export const WelcomePageWebhooksButton = ({ onClick }: PrimaryActionProps) => {
  return (
    <Link to={null} onClick={onClick}>
      <Button variant="primary">
        <FormattedMessage defaultMessage="Go to Webhooks" id="5TzisG" description="btn label" />
      </Button>
    </Link>
  );
};
