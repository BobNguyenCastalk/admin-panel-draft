import { attributeListUrl } from "@dashboard/attributes/urls";
import { categoryListUrl } from "@dashboard/categories/urls";
import { customerListUrl } from "@dashboard/customers/urls";
import { UseNavigatorResult } from "@dashboard/hooks/useNavigator";
import { sectionNames } from "@dashboard/intl";
import { fuzzySearch } from "@dashboard/misc";
import { menuListUrl } from "@dashboard/navigation/urls";
import { permissionGroupListUrl } from "@dashboard/permissionGroups/urls";
import { pluginListUrl } from "@dashboard/plugins/urls";
import { productListUrl } from "@dashboard/products/urls";
import { productTypeListUrl } from "@dashboard/productTypes/urls";
import { siteSettingsUrl } from "@dashboard/siteSettings/urls";
import { staffListUrl } from "@dashboard/staff/urls";
import { languageListUrl } from "@dashboard/translations/urls";
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
      label: intl.formatMessage(sectionNames.attributes),
      url: attributeListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.categories),
      url: categoryListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.customers),
      url: customerListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.home),
      url: "/",
    },
    {
      label: intl.formatMessage(sectionNames.navigation),
      url: menuListUrl(),
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
      label: intl.formatMessage(sectionNames.productTypes),
      url: productTypeListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.products),
      url: productListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.siteSettings),
      url: siteSettingsUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.staff),
      url: staffListUrl(),
    },
    {
      label: intl.formatMessage(sectionNames.translations),
      url: languageListUrl,
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
