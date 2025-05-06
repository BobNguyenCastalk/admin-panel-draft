// @ts-strict-ignore
import React from "react";
import { useIntl } from "react-intl";

import { FilterFieldBaseProps, FilterType } from "@presentation/shared/Filter";
import { getIsFilterMultipleChoices } from "@presentation/shared/Filter/FilterContent/utils";
import FormSpacer from "@presentation/shared/FormSpacer";
import { Select } from "@presentation/shared/Select";

type FilterSingleSelectFieldProps = FilterFieldBaseProps<string>;

export const FilterSingleSelectField: React.FC<FilterSingleSelectFieldProps> = ({
  filter,
  onFilterPropertyChange,
}) => {
  const intl = useIntl();

  return (
    <>
      <Select
        data-test-id="filter-range-type-choice"
        options={getIsFilterMultipleChoices(intl)}
        value={filter.multiple ? FilterType.MULTIPLE : FilterType.SINGULAR}
        onChange={({ target }) =>
          onFilterPropertyChange({
            payload: {
              name: filter.name,
              update: {
                multiple: target.value === FilterType.MULTIPLE,
                ...(target.value !== FilterType.MULTIPLE && {
                  value: filter.value.slice(0, 1) as string[],
                }),
              },
            },
            type: "set-property",
          })
        }
      />
      <FormSpacer />
    </>
  );
};
