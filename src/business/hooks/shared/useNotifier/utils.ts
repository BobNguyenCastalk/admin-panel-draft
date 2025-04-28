import commonErrorMessages from "@dashboard/business/utils/shared/errors/common";
import { commonMessages } from "@dashboard/constants/common/intl";
import { IMessage } from "@presentation/shared/messages";
import { IntlShape } from "react-intl";

export const getDefaultNotifierSuccessErrorData = (errors: any[], intl: IntlShape): IMessage =>
  !errors.length
    ? {
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges),
      }
    : {
        status: "error",
        text: intl.formatMessage(commonErrorMessages.unknownError),
      };
