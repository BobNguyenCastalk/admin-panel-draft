import React from "react";
import { RouteProps } from "react-router-dom";

import { hasAllPermissions, hasAnyPermissions } from "@business/utils/auth/misc";
import { PermissionEnum } from "@dashboard/graphql";
import useBoundStore from "@dashboard/stores";
import NotFound from "@presentation/shared/NotFound";
import { Route } from "@presentation/shared/Router";

type MatchPermissionType = "all" | "any";

interface SectionRouteProps extends RouteProps {
  permissions?: PermissionEnum[];
  matchPermission?: MatchPermissionType;
}

const matchAll = (match: MatchPermissionType) => match === "all";

export const SectionRoute: React.FC<SectionRouteProps> = ({
  permissions,
  matchPermission = "all",
  ...props
}) => {
  const user = useBoundStore(state => state.user);

  // Prevents race condition
  if (user === undefined) {
    return null;
  }

  // TODO: check if use has section permission is carried out successfully
  const hasSectionPermissions = () => {
    if (!permissions) {
      return true;
    }

    if (matchAll(matchPermission)) {
      return hasAllPermissions(permissions, user!);
    }

    return hasAnyPermissions(permissions, user!);
  };

  return hasSectionPermissions() ? <Route {...props} /> : <NotFound />;
};
SectionRoute.displayName = "Route";
export default SectionRoute;
