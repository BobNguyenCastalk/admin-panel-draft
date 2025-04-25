import { stringifyQs } from "@dashboard/business/utils/shared/urls";

export const newPasswordPath = "/new-password/";
export const loginCallbackPath = "/login/callback/";

// TODO: remove password reset and new password related paths

export interface NewPasswordUrlQueryParams {
  email: string;
  token: string;
}
export const newPasswordUrl = (params?: NewPasswordUrlQueryParams) =>
  newPasswordPath + "?" + stringifyQs(params);

export interface LoginOpenidconnectUrlQueryParams {
  code: string;
  state: string;
}
export type LoginUrlQueryParams = LoginOpenidconnectUrlQueryParams;
