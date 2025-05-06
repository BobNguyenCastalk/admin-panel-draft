// @ts-strict-ignore
import { useIntl } from "react-intl";

import useNotifier from "@dashboard/business/hooks/shared/useNotifier";
import { getProductErrorMessage } from "@dashboard/business/utils/shared/errors";
import { Node, useProductVariantSetDefaultMutation } from "@dashboard/graphql";

function useOnSetDefaultVariant(productId: string, variant: Node) {
  const notify = useNotifier();
  const intl = useIntl();
  const [productVariantSetDefault] = useProductVariantSetDefaultMutation({
    onCompleted: data => {
      const errors = data.productVariantSetDefault.errors;

      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl),
          }),
        );
      } else {
        const defaultVariant = data.productVariantSetDefault.product.variants.find(
          variant => variant.id === data.productVariantSetDefault.product.defaultVariant.id,
        );

        if (defaultVariant) {
          notify({
            status: "success",
            text: intl.formatMessage(
              {
                id: "gSQ0Ge",
                defaultMessage: "Variant {name} has been set as default.",
              },
              { name: defaultVariant.name },
            ),
          });
        }
      }
    },
  });
  const onSetDefaultVariant = (selectedVariant = null) => {
    productVariantSetDefault({
      variables: {
        productId,
        variantId: variant ? variant.id : selectedVariant.id,
      },
    });
  };

  return onSetDefaultVariant;
}
export default useOnSetDefaultVariant;
