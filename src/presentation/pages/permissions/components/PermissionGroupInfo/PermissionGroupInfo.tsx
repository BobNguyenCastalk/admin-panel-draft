// @ts-strict-ignore
import { FormChange } from "@dashboard/business/hooks/shared/useForm";
import { getFieldError, getFormErrors } from "@dashboard/business/utils/shared/errors";
import getPermissionGroupErrorMessage from "@dashboard/business/utils/shared/errors/permissionGroups";
import { commonMessages } from "@dashboard/constants/common/intl";
import { PermissionGroupErrorFragment } from "@dashboard/graphql";
import { TextField } from "@material-ui/core";
import { DashboardCard } from "@presentation/shared/Card";
import React from "react";
import { useIntl } from "react-intl";

export interface PermissionGroupInfoProps {
  disabled: boolean;
  errors: PermissionGroupErrorFragment[];
  onChange: FormChange;
  data: {
    name: string;
  };
}

const PermissionGroupInfo: React.FC<PermissionGroupInfoProps> = ({
  disabled,
  onChange,
  data,
  errors,
}) => {
  const intl = useIntl();
  const formErrors = getFormErrors(["name"], errors);

  return (
    <DashboardCard>
      <DashboardCard.Header>
        <DashboardCard.Title>
          {intl.formatMessage(commonMessages.generalInformations)}
        </DashboardCard.Title>
      </DashboardCard.Header>
      <DashboardCard.Content>
        <TextField
          data-test-id="permission-group-name-input"
          name="name"
          label={intl.formatMessage({
            id: "rs815i",
            defaultMessage: "Group name",
            description: "text field label",
          })}
          value={data.name}
          onChange={onChange}
          disabled={disabled}
          error={!!getFieldError(errors, "name")}
          helperText={getPermissionGroupErrorMessage(formErrors.name, intl)}
          fullWidth
        />
      </DashboardCard.Content>
    </DashboardCard>
  );
};

PermissionGroupInfo.displayName = "PermissionGroupInfo";
export default PermissionGroupInfo;
