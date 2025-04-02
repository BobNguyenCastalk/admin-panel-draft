import Link from "@dashboard/components/Link";
import { OrderDetailsFragment } from "@dashboard/graphql";
import { Box } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage } from "react-intl";

import { messages } from "./messages";
import { showComma } from "./utils";

interface OrderUsedGiftCardsProps {
  giftCards: OrderDetailsFragment["giftCards"];
}

export const OrderUsedGiftCards = ({ giftCards }: OrderUsedGiftCardsProps) => {
  return (
    <FormattedMessage
      {...messages.usedGiftCard}
      values={{
        link: giftCards.map(({ id, last4CodeChars }, index) => {
          const hasComma = showComma(giftCards.length, index);

          return (
            <Link key={id} href={null}>
              <Box as="span" marginRight={hasComma ? 1 : 0}>
                {last4CodeChars}
                {hasComma && ", "}
              </Box>
            </Link>
          );
        }),
      }}
    />
  );
};
