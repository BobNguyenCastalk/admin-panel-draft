import { Option } from "@saleor/macaw-ui-next";

import { ChangeEvent, FormChange } from "@dashboard/business/hooks/shared/useForm";

/**
 * @param change Use toggleValue callback delivered by form
 */
function createMultiselectChangeHandler(
  change: FormChange,
  setSelected: (choices: Option[]) => void,
): FormChange {
  return (event: ChangeEvent<Option[]>) => {
    change(event);
    setSelected(event.target.value);
  };
}

export default createMultiselectChangeHandler;
