import { useContext } from "react";

import { IMessage, IMessageContext, MessageContext } from "@presentation/shared/messages";

export type UseNotifierResult = IMessageContext;

function useNotifier(): UseNotifierResult {
  const notificationContext = useContext(MessageContext);
  const notify = (options: IMessage) => {
    const timeout = options.status === "error" ? null : options.autohide;

    notificationContext?.show(options, timeout);
  };

  return notify;
}
export default useNotifier;
