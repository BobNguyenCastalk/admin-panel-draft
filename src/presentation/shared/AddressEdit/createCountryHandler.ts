import { FormChange } from "@dashboard/business/hooks/shared/useForm";
import { AddressTypeInput } from "@dashboard/customers/types";
import { ChangeEvent } from "react";

export const createCountryHandler =
  (currentHandler: FormChange, set: (dataSet: Partial<AddressTypeInput>) => void) =>
  (event: ChangeEvent<any>) => {
    currentHandler(event);
    set({ countryArea: "" });
  };
