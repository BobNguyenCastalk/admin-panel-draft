// @ts-strict-ignore
import React from "react";

import { PermissionEnum, UserPermissionFragment } from "@dashboard/graphql";
import { useBoundStore } from "@dashboard/stores";

const findPerm = (permList, perm) => permList.find(userPerm => userPerm.code === perm);

export function hasPermissions(
  userPermissions: UserPermissionFragment[],
  requiredPermissions: PermissionEnum[],
): boolean {
  return requiredPermissions.reduce((acc, perm) => acc && !!findPerm(userPermissions, perm), true);
}

export function hasOneOfPermissions(
  userPermissions: UserPermissionFragment[],
  givenPermissions: PermissionEnum[],
): boolean {
  return givenPermissions.some(perm => !!findPerm(userPermissions, perm));
}

export interface RequirePermissionsProps {
  children: React.ReactNode | React.ReactNodeArray;
  requiredPermissions?: PermissionEnum[];
  oneOfPermissions?: PermissionEnum[];
}

const RequirePermissions: React.FC<RequirePermissionsProps> = ({
  children,
  requiredPermissions,
  oneOfPermissions,
}) => {
  const userPermissions = useBoundStore(state => state.user?.userPermissions ?? []);

  if (!userPermissions) {
    return null;
  }

  if (requiredPermissions && hasPermissions(userPermissions, requiredPermissions)) {
    return <>{children}</>;
  }

  if (oneOfPermissions && hasOneOfPermissions(userPermissions, oneOfPermissions)) {
    return <>{children}</>;
  }

  return null;
};

RequirePermissions.displayName = "RequirePermissions";
export default RequirePermissions;
