import { IntlShape } from "react-intl";

import { permissionGroupListUrl } from "@business/utils/permissions/urls";
import { UseNavigatorResult } from "@dashboard/business/hooks/shared/useNavigator";
import { fuzzySearch } from "@dashboard/business/misc";
import { pluginListUrl } from "@dashboard/business/utils/plugins/urls";
import { staffListUrl } from "@dashboard/business/utils/staffs/urls";
import { sectionNames } from "@dashboard/constants/common/intl";

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
