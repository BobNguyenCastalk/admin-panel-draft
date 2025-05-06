import { useContext } from "react";

import BackgroundTasksContext from "@dashboard/containers/BackgroundTasks/context";

function useBackgroundTask() {
  return useContext(BackgroundTasksContext);
}

export default useBackgroundTask;
