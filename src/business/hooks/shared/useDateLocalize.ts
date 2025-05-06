import { useContext } from "react";

import { LocaleContext } from "@presentation/shared/Locale";
import moment from "moment-timezone";

export type LocalizeDate = (date: string, format?: string) => string;

function useDateLocalize(): LocalizeDate {
  const { locale } = useContext(LocaleContext);

  return (date: string, format?: string) =>
    moment(date)
      .locale(locale)
      .format(format || "ll");
}

export default useDateLocalize;
