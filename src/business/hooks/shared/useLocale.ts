import { useContext } from "react";

import { LocaleContext } from "@presentation/shared/Locale";

function useLocale() {
  const localeInfo = useContext(LocaleContext);

  return localeInfo;
}
export default useLocale;
