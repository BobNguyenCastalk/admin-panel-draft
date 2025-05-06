import { useContext } from "react";

import { DateContext } from "@presentation/shared/Date/DateContext";

function useCurrentDate(): number {
  const currentDate = useContext(DateContext);

  return currentDate;
}

export default useCurrentDate;
