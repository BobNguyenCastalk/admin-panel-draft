import React from "react";
import { useIntl } from "react-intl";

import { Box } from "@saleor/macaw-ui-next";

import { permissionGroupListUrl } from "@business/utils/permissions/urls";
import { FormChange, SubmitPromise } from "@dashboard/business/hooks/shared/useForm";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { getFormErrors } from "@dashboard/business/utils/shared/errors";
import getPermissionGroupErrorMessage from "@dashboard/business/utils/shared/errors/permissionGroups";
import { buttonMessages, sectionNames } from "@dashboard/constants/common/intl";
import { ChannelFragment, PermissionEnum, PermissionGroupErrorFragment } from "@dashboard/graphql";
import AccountPermissions from "@presentation/shared/AccountPermissions";
import { TopNav } from "@presentation/shared/AppLayout/TopNav";
import { Backlink } from "@presentation/shared/Backlink";
import { ChannelPermission } from "@presentation/shared/ChannelPermission";
import Form from "@presentation/shared/Form";
import FormSpacer from "@presentation/shared/FormSpacer";
import { DetailPageLayout } from "@presentation/shared/Layouts";
import { Savebar } from "@presentation/shared/Savebar";

import { PermissionData } from "../PermissionGroupDetailsPage";
import PermissionGroupInfo from "../PermissionGroupInfo";

export interface PermissionGroupCreateFormData {
  name: string;
  hasFullAccess: boolean;
  hasAllChannels: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
  channels: string[];
}

const initialForm: PermissionGroupCreateFormData = {
  hasFullAccess: false,
  hasAllChannels: true,
  isActive: false,
  name: "",
  permissions: [],
  channels: [],
};

export interface PermissionGroupCreatePageProps {
  disabled: boolean;
  errors: PermissionGroupErrorFragment[];
  permissions: PermissionData[];
  channels: ChannelFragment[];
  hasRestrictedChannels: boolean;
  saveButtonBarState: "loading" | "success" | "error" | "default";
  onSubmit: (data: PermissionGroupCreateFormData) => SubmitPromise;
}

export const PermissionGroupCreatePage: React.FC<PermissionGroupCreatePageProps> = ({
  disabled,
  permissions,
  channels,
  onSubmit,
  saveButtonBarState,
  hasRestrictedChannels,
  errors,
}) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const formErrors = getFormErrors(["addPermissions"], errors || []);
  const permissionsError = getPermissionGroupErrorMessage(formErrors.addPermissions, intl);

  return (
    <Form
      confirmLeave
      initial={{
        ...initialForm,
        hasAllChannels: !hasRestrictedChannels,
      }}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {({ data, change, submit, isSaveDisabled }) => {
        const handleChannelChange: FormChange = event => {
          change({
            target: {
              name: "channels",
              value: event.target.value,
            },
          });
        };
        const handleHasAllChannelsChange = () => {
          change({
            target: {
              name: "hasAllChannels",
              value: !data.hasAllChannels,
            },
          });
        };

        return (
          <DetailPageLayout>
            <TopNav title="New Permission Group" />
            <DetailPageLayout.Content>
              <Backlink href={permissionGroupListUrl()}>
                {intl.formatMessage(sectionNames.permissionGroups)}
              </Backlink>
              <PermissionGroupInfo
                data={data}
                errors={errors}
                onChange={change}
                disabled={disabled}
              />

              <FormSpacer />

              <Box paddingX={6}>
                <ChannelPermission
                  allChannels={channels}
                  selectedChannels={data.channels}
                  onChannelChange={handleChannelChange}
                  onHasAllChannelsChange={handleHasAllChannelsChange}
                  hasAllChannels={data.hasAllChannels}
                  disabled={false}
                  disabledSelectAllChannels={hasRestrictedChannels}
                />
              </Box>
            </DetailPageLayout.Content>
            <DetailPageLayout.RightSidebar>
              <AccountPermissions
                permissionsExceeded={false}
                data={data}
                errorMessage={permissionsError}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
                fullAccessLabel={intl.formatMessage(buttonMessages.selectAll)}
                description={intl.formatMessage({
                  id: "CYZse9",
                  defaultMessage:
                    "Expand or restrict group's permissions to access certain part of saleor system.",
                  description: "card description",
                })}
              />
            </DetailPageLayout.RightSidebar>
            <Savebar>
              <Savebar.Spacer />
              <Savebar.CancelButton onClick={() => navigate(permissionGroupListUrl())} />
              <Savebar.ConfirmButton
                transitionState={saveButtonBarState}
                onClick={submit}
                disabled={!!isSaveDisabled}
              />
            </Savebar>
          </DetailPageLayout>
        );
      }}
    </Form>
  );
};
