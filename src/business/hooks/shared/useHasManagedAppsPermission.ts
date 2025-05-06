import { PermissionEnum } from "@dashboard/graphql";
import { useBoundStore } from "@dashboard/stores";

export const useHasManagedAppsPermission = () => {
  const permissions = useBoundStore(state => state.user?.userPermissions ?? []);
  const hasManagedAppsPermission = !!permissions?.find(
    ({ code }) => code === PermissionEnum.MANAGE_APPS,
  );

  return {
    hasManagedAppsPermission,
  };
};
