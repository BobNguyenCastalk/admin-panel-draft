import React from "react";

import { Text } from "@saleor/macaw-ui-next";

import { IMoney } from "@dashboard/business/utils/shared/intl";

import Money from "../Money";
import { useStyles } from "./styles";

interface DiscountedPriceProps {
  regularPrice: IMoney;
  discountedPrice: IMoney;
}

const DiscountedPrice: React.FC<DiscountedPriceProps> = ({ regularPrice, discountedPrice }) => {
  const classes = useStyles();

  return (
    <>
      <Text className={classes.strike}>
        <Money money={regularPrice} />
      </Text>
      <Money money={discountedPrice} />
    </>
  );
};

export default DiscountedPrice;
