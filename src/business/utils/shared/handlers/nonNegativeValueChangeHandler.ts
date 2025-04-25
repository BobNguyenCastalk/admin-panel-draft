import { FormChange } from "@dashboard/business/hooks/shared/useForm";

function createNonNegativeValueChangeHandler(change: FormChange) {
  return (event: React.ChangeEvent<any>) => {
    if (/^\d*(\.\d*)?$/.test(event.target.value)) {
      change(event);
    }
  };
}

export default createNonNegativeValueChangeHandler;
