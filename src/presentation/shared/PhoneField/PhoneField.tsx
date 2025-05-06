// @ts-strict-ignore
import React from "react";
import { makeStyles } from "@saleor/macaw-ui";
import { TextField } from "@material-ui/core";

import { ChangeEvent } from "@dashboard/business/hooks/shared/useForm";
import { Select } from "@presentation/shared/Select";

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "5rem 1fr",
    },
  }),
  { name: "PhoneField" },
);

interface PhoneFieldProps {
  name: string;
  prefix: string;
  number: string;
  prefixes: string[];
  label?: string;
  onChange: (event: ChangeEvent) => any;
}

const PhoneField: React.FC<PhoneFieldProps> = props => {
  const { name, number: phoneNumber, prefix, prefixes, label, onChange } = props;
  const classes = useStyles(props);
  const nameWithPrefix = name + "_prefix";

  return (
    <div className={classes.root}>
      <Select
        name={nameWithPrefix}
        options={prefixes.map(p => ({ label: "+" + p, value: p }))}
        onChange={onChange}
        value={prefix}
        label={label}
      />
      <TextField name={name + "_number"} onChange={onChange} value={phoneNumber} label="&nbsp;" />
    </div>
  );
};

PhoneField.displayName = "PhoneField";
export default PhoneField;
