import { permissionGroupListUrl } from "@business/utils/permissions/urls";
import { pluginListUrl } from "@dashboard/business/utils/plugins/urls";
import { UseNavigatorResult } from "@dashboard/hooks/useNavigator";
import { sectionNames } from "@dashboard/intl";
import { fuzzySearch } from "@dashboard/misc";
import { staffListUrl } from "@dashboard/staff/urls";
import { IntlShape } from "react-intl";

import { QuickSearchActionInput } from "../../types";

interface View {
  label: string;
  url: string;
}
function searchInViews(
  search: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
): QuickSearchActionInput[] {
  const views: View[] = [
    {
      label: intl.formatMessage(sectionNames.home),
      url: "/",
    },
    {
      label: intl.formatMessage(sectionNames.permissionGroups),
      url: permissionGroupListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.plugins),
      url: pluginListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.staff),
      url: staffListUrl(),
    },
  ];

  return fuzzySearch(views, search, ["label"]).map(view => ({
    label: view.label,
    searchValue: view.label,
    onClick: () => {
      navigate(view.url);

      return false;
    },
    text: view.label,
    type: "view",
  }));
}

export default searchInViews;
