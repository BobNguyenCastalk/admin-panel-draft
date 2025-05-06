import React from "react";
import { FormattedMessage } from "react-intl";
import { Box, Checkbox, Text } from "@saleor/macaw-ui-next";

import { FormChange } from "@dashboard/business/hooks/shared/useForm";
import PreviewPill from "@presentation/shared/PreviewPill";

import { messages } from "./messages";

interface AllowUnpaidOrdersProps {
  onChange: FormChange;
  isChecked: boolean;
  hasError: boolean;
  disabled?: boolean;
}

export const AllowUnpaidOrders = ({
  onChange,
  isChecked,
  hasError,
  disabled,
}: AllowUnpaidOrdersProps) => (
  <Box paddingX={6}>
    <Checkbox
      name="allowUnpaidOrders"
      data-test-id="allow-unpaid-orders-checkbox"
      checked={isChecked}
      error={hasError}
      onCheckedChange={value => onChange({ target: { name: "allowUnpaidOrders", value } })}
      disabled={disabled}
    >
      <Text>
        <FormattedMessage {...messages.allowUnpaidOrdersLabel} />
      </Text>{" "}
      <PreviewPill />
    </Checkbox>
    <Box paddingLeft={4}>
      {" "}
      <Text size={3} color="default2" paddingLeft={0.5}>
        <FormattedMessage {...messages.allowUnpaidOrdersDescription} />
      </Text>
    </Box>
  </Box>
);
