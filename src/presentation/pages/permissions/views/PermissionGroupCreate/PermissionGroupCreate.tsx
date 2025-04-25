import { permissionGroupDetailsUrl } from "@business/utils/permissions/urls";
import {
  checkIfUserHasRestictedAccessToChannels,
  getUserAccessibleChannelsOptions,
} from "@business/utils/permissions/utils";
import { extractMutationErrors } from "@dashboard/business/misc";
import { usePermissionGroupCreateMutation } from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import { PermissionData } from "@dashboard/permissionGroups/components/PermissionGroupDetailsPage";
import { useUser } from "@dashboard/presentation/pages/auth";
import useAppChannel from "@presentation/shared//AppLayout/AppChannelContext";
import { WindowTitle } from "@presentation/shared//WindowTitle";
import React, { useMemo } from "react";
import { useIntl } from "react-intl";

import {
  PermissionGroupCreateFormData,
  PermissionGroupCreatePage,
} from "../../components/PermissionGroupCreatePage";

export const PermissionGroupCreate: React.FC = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const user = useUser();
  const { availableChannels } = useAppChannel(false);
  const hasUserRestrictedAccessToChannels = checkIfUserHasRestictedAccessToChannels(user.user);
  const userAccessibleChannelsOptions = useMemo(
    () => getUserAccessibleChannelsOptions(availableChannels, user.user),
    [availableChannels, user.user],
  );
  const [createPermissionGroup, createPermissionGroupResult] = usePermissionGroupCreateMutation({
    onCompleted: data => {
      if (data?.permissionGroupCreate?.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage({
            id: "eUjFjW",
            defaultMessage: "Permission group created",
          }),
        });

        if (data?.permissionGroupCreate?.group?.id) {
          navigate(permissionGroupDetailsUrl(data.permissionGroupCreate.group.id));
        }
      }
    },
  });
  const errors = createPermissionGroupResult?.data?.permissionGroupCreate?.errors || [];
  const onSubmit = (formData: PermissionGroupCreateFormData) => {
    const channelChoices = userAccessibleChannelsOptions.map(channel => channel.id);

    return extractMutationErrors(
      createPermissionGroup({
        variables: {
          input: {
            addPermissions: formData.permissions,
            addUsers: [],
            name: formData.name,
            addChannels: formData.hasAllChannels ? channelChoices : formData.channels,
            restrictedAccessToChannels:
              hasUserRestrictedAccessToChannels || !formData.hasAllChannels,
          },
        },
      }),
    );
  };
  const userPermissions = user?.user?.userPermissions?.map(p => p.code) || [];
  const permissions: PermissionData[] =
    shop?.permissions.map(
      p =>
        ({
          ...p,
          disabled: !userPermissions.includes(p.code),
          lastSource: false,
        }) as PermissionData,
    ) || [];

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          id: "Irflxf",
          defaultMessage: "Create category",
          description: "window title",
        })}
      />
      <PermissionGroupCreatePage
        errors={errors as any}
        disabled={createPermissionGroupResult.loading}
        permissions={permissions}
        channels={userAccessibleChannelsOptions}
        hasRestrictedChannels={hasUserRestrictedAccessToChannels}
        saveButtonBarState={createPermissionGroupResult.status}
        onSubmit={onSubmit}
      />
    </>
  );
};
