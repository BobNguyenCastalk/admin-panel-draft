import { useUser } from "@presentation/pages/auth";

export const useUserPermissions = () => useUser().user?.userPermissions;
