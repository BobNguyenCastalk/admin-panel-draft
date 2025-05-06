import { ApolloError } from "@apollo/client";

import { findValueInEnum } from "@dashboard/business/misc";
import { GraphQLError } from "graphql";

import { UserContextError } from "../../../types/auth";

export enum JWTError {
  invalid = "InvalidTokenError",
  invalidSignature = "InvalidSignatureError",
  expired = "ExpiredSignatureError",
}

export const AuthError = {
  PermissionDenied: "PermissionDenied",
  OAuthError: "OAuthError",
} as const;

export type AuthError = (typeof AuthError)[keyof typeof AuthError];

export function isJwtError(error: GraphQLError): boolean {
  let jwtError: boolean;

  try {
    jwtError = !!findValueInEnum(error.extensions?.exception.code, JWTError);
  } catch (e) {
    jwtError = false;
  }

  return jwtError;
}

export function isTokenExpired(error: GraphQLError): boolean {
  return error.extensions?.exception.code === JWTError.expired;
}

export function getAuthErrorType(graphQLError: GraphQLError): UserContextError {
  switch (graphQLError.extensions?.exception?.code as AuthError) {
    case AuthError.PermissionDenied:
      return UserContextError.noPermissionsError;
    default:
      return UserContextError.unknownLoginError;
  }
}

export function parseAuthError(authError: ApolloError): UserContextError[] {
  return authError?.graphQLErrors?.map(graphQLError => getAuthErrorType(graphQLError)) || [];
}
