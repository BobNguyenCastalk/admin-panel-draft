import React from "react";
import { Text } from "@saleor/macaw-ui-next";

import { SearchCatalogQuery } from "@dashboard/graphql";

type Variant = NonNullable<SearchCatalogQuery["productVariants"]>["edges"][0]["node"];

export const getProductVariantLabel = (variant: Variant) => {
  return (
    <>
      {variant.product.name} / {variant.name}
      {variant.sku && (
        <Text marginLeft={2} size={2}>
          <i>({variant.sku})</i>
        </Text>
      )}
    </>
  );
};
