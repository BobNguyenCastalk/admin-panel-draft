import { DateContext } from "@presentation/shared//Date/DateContext";
import { useContext } from "react";

function useCurrentDate(): number {
  const currentDate = useContext(DateContext);

  return currentDate;
}

export default useCurrentDate;
