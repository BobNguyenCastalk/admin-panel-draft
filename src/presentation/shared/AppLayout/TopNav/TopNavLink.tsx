import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Button, sprinkles } from "@saleor/macaw-ui-next";

type Variant = "secondary" | "tertiary";

export const TopNavLink: React.FC<{
  to: string;
  variant?: Variant;
}> = ({ to, variant = "secondary" }) => (
  <Link to={to} className={sprinkles({ marginRight: 2 })}>
    <Button
      icon={<ArrowLeftIcon />}
      variant={variant}
      size="large"
      data-test-id="app-header-back-button"
    />
  </Link>
);
