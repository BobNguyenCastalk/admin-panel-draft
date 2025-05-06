// @ts-strict-ignore
import { useIntl } from "react-intl";
import {
  ApolloError,
  MutationFunction,
  MutationHookOptions as BaseMutationHookOptions,
  MutationResult,
  useMutation as useBaseMutation,
} from "@apollo/client";

import { useAuth } from "@business/hooks/auth/useAuth";
import { isJwtError } from "@business/utils/auth/errors";
import { getMutationStatus } from "@dashboard/business/misc";
import { GqlErrors, hasError } from "@dashboard/business/utils/shared/api";
import { commonMessages } from "@dashboard/constants/common/intl";
import { handleNestedMutationErrors, showAllErrors } from "@dashboard/presentation/pages/auth";
import { MutationResultAdditionalProps } from "@dashboard/types";
import { DocumentNode } from "graphql";

import useNotifier from "./useNotifier";

export type MutationResultWithOpts<TData> = MutationResult<TData> & MutationResultAdditionalProps;

export type UseMutation<TData, TVariables> = [
  MutationFunction<TData, TVariables>,
  MutationResultWithOpts<TData>,
];
export type UseMutationHook<TData, TVariables> = (
  cbs: MutationHookOptions<TData, TVariables>,
) => UseMutation<TData, TVariables>;

export type MutationHookOptions<TData, TVariables> = BaseMutationHookOptions<TData, TVariables> & {
  disableErrorHandling?: boolean;
};

export function useMutation<TData, TVariables>(
  mutation: DocumentNode,
  { onCompleted, onError, disableErrorHandling, ...opts }: MutationHookOptions<TData, TVariables>,
): UseMutation<TData, TVariables> {
  const notify = useNotifier();
  const intl = useIntl();
  const { logout } = useAuth();
  const [mutateFn, result] = useBaseMutation(mutation, {
    ...opts,
    onCompleted: data => {
      if (!disableErrorHandling) {
        handleNestedMutationErrors({
          data,
          intl,
          notify,
        });
      }

      if (onCompleted) {
        onCompleted(data);
      }
    },
    onError: (err: ApolloError) => {
      if (!disableErrorHandling) {
        if (err?.graphQLErrors?.length > 0) {
          if (hasError(err, GqlErrors.ReadOnlyException)) {
            notify({
              status: "error",
              text: intl.formatMessage(commonMessages.readOnly),
            });
          } else if (err.graphQLErrors.some(isJwtError)) {
            logout();
            notify({
              status: "error",
              text: intl.formatMessage(commonMessages.sessionExpired),
            });
          } else if (!hasError(err, GqlErrors.LimitReachedException)) {
            err.graphQLErrors.forEach(graphQLError => {
              notify({
                status: "error",
                apiMessage: graphQLError.message,
              });
            });
          }
        } else {
          showAllErrors({ notify, error: err });
        }
      }

      if (onError) {
        onError(err);
      }
    },
  });

  return [
    mutateFn,
    {
      ...result,
      status: getMutationStatus(result),
    },
  ];
}

function makeMutation<TData, TVariables>(
  mutation: DocumentNode,
): UseMutationHook<TData, TVariables> {
  return (opts: MutationHookOptions<TData, TVariables>) =>
    useMutation<TData, TVariables>(mutation, opts);
}

export default makeMutation;
