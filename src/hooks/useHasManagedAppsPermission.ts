import { useUserPermissions } from "@business/hooks/auth/useUserPermissions";
import { PermissionEnum } from "@dashboard/graphql";

export const useHasManagedAppsPermission = () => {
  const permissions = useUserPermissions();
  const hasManagedAppsPermission = !!permissions?.find(
    ({ code }) => code === PermissionEnum.MANAGE_APPS,
  );

  return {
    hasManagedAppsPermission,
  };
};
