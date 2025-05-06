
export declare type Maybe<T> = T | null;
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /**
     * The `Date` scalar type represents a Date
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
    Date: any;
    /**
     * The `DateTime` scalar type represents a DateTime
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
    DateTime: any;
    /**
     * The `GenericScalar` scalar type represents a generic
     * GraphQL scalar value that could be:
     * String, Boolean, Int, Float, List or Object.
     */
    GenericScalar: any;
    /**
     * Allows use of a JSON String for input / output from the GraphQL schema.
     *
     * Use of this type is *not recommended* as you lose the benefits of having a defined, static
     * schema (one of the key benefits of GraphQL).
     */
    JSONString: any;
    /**
     * Positive Decimal scalar implementation.
     *
     * Should be used in places where value must be positive.
     */
    PositiveDecimal: any;
    UUID: any;
    /** Variables of this type must be set to null in mutations. They will be replaced with a filename from a following multipart part containing a binary file. See: https://github.com/jaydenseric/graphql-multipart-request-spec. */
    Upload: any;
    WeightScalar: any;
    /** Anything */
    _Any: any;
};

export declare type Image = {
    /** The URL of the image. */
    url: Scalars['String'];
    /** Alt text for an image. */
    alt: Maybe<Scalars['String']>;
};

export declare type AccountErrorCode = 'ACTIVATE_OWN_ACCOUNT' | 'ACTIVATE_SUPERUSER_ACCOUNT' | 'DUPLICATED_INPUT_ITEM' | 'DEACTIVATE_OWN_ACCOUNT' | 'DEACTIVATE_SUPERUSER_ACCOUNT' | 'DELETE_NON_STAFF_USER' | 'DELETE_OWN_ACCOUNT' | 'DELETE_STAFF_ACCOUNT' | 'DELETE_SUPERUSER_ACCOUNT' | 'GRAPHQL_ERROR' | 'INACTIVE' | 'INVALID' | 'INVALID_PASSWORD' | 'LEFT_NOT_MANAGEABLE_PERMISSION' | 'INVALID_CREDENTIALS' | 'NOT_FOUND' | 'OUT_OF_SCOPE_USER' | 'OUT_OF_SCOPE_GROUP' | 'OUT_OF_SCOPE_PERMISSION' | 'PASSWORD_ENTIRELY_NUMERIC' | 'PASSWORD_TOO_COMMON' | 'PASSWORD_TOO_SHORT' | 'PASSWORD_TOO_SIMILAR' | 'REQUIRED' | 'UNIQUE' | 'JWT_SIGNATURE_EXPIRED' | 'JWT_INVALID_TOKEN' | 'JWT_DECODE_ERROR' | 'JWT_MISSING_TOKEN' | 'JWT_INVALID_CSRF_TOKEN' | 'CHANNEL_INACTIVE' | 'MISSING_CHANNEL_SLUG';
export declare type LanguageCodeEnum = 'AR' | 'AZ' | 'BG' | 'BN' | 'CA' | 'CS' | 'DA' | 'DE' | 'EL' | 'EN' | 'ES' | 'ES_CO' | 'ET' | 'FA' | 'FI' | 'FR' | 'HI' | 'HU' | 'HY' | 'ID' | 'IS' | 'IT' | 'JA' | 'KA' | 'KM' | 'KO' | 'LT' | 'MN' | 'MY' | 'NB' | 'NL' | 'PL' | 'PT' | 'PT_BR' | 'RO' | 'RU' | 'SK' | 'SL' | 'SQ' | 'SR' | 'SV' | 'SW' | 'TA' | 'TH' | 'TR' | 'UK' | 'VI' | 'ZH_HANS' | 'ZH_HANT';
export declare type PermissionEnum = 'MANAGE_USERS' | 'MANAGE_STAFF' | 'MANAGE_APPS' | 'MANAGE_CHANNELS' | 'MANAGE_DISCOUNTS' | 'MANAGE_PLUGINS' | 'MANAGE_GIFT_CARD' | 'MANAGE_MENUS' | 'MANAGE_ORDERS' | 'MANAGE_PAGES' | 'MANAGE_PAGE_TYPES_AND_ATTRIBUTES' | 'HANDLE_PAYMENTS' | 'MANAGE_PRODUCTS' | 'MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES' | 'MANAGE_SHIPPING' | 'MANAGE_SETTINGS' | 'MANAGE_TRANSLATIONS' | 'MANAGE_CHECKOUTS';

export declare type UserBaseFragment = (Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'isStaff'> & {
    userPermissions: Maybe<Array<Maybe<Pick<UserPermission, 'code' | 'name'>>>>;
});

export declare type UserDetailsFragment = ({
    metadata: Array<Maybe<Pick<MetadataItem, 'key' | 'value'>>>;
} & UserBaseFragment);

export const UserAuthError = {
  loginError: "loginError",
  serverError: "serverError",
  noPermissionsError: "noPermissionsError",
  loginAttemptDelay: "loginAttemptDelay",
  unknownLoginError: "unknownLoginError",
  invalidCredentials: "invalidCredentials",
} as const;

export type UserAuthError = (typeof UserAuthError)[keyof typeof UserAuthError];

type AccountError = {
    /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
    field: Maybe<Scalars['String']>;
    /** The error message. */
    message: Maybe<Scalars['String']>;
    /** The error code. */
    code: AccountErrorCode;
};

type CreateToken = {
    /** JWT token, required to authenticate. */
    token: Maybe<Scalars['String']>;
    /** JWT refresh token, required to re-generate access token. */
    refreshToken: Maybe<Scalars['String']>;
    /** CSRF token required to re-generate access token. */
    csrfToken: Maybe<Scalars['String']>;
    /** A user instance. */
    user: Maybe<User>;
    /** @deprecated Use errors field instead. This field will be removed in Saleor 4.0. */
    accountErrors: Array<AccountError>;
    errors: Array<AccountError>;
};

export declare type MetadataItem = {
    /** Key of a metadata item. */
    key: Scalars['String'];
    /** Value of a metadata item. */
    value: Scalars['String'];
};

export declare type ObjectWithMetadata = {
    /** List of private metadata items.Requires proper staff permissions to access. */
    privateMetadata: Array<Maybe<MetadataItem>>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<Maybe<MetadataItem>>;
};

/** Represents a permission object in a friendly form. */
export declare type Permission = {
    /** Internal code for permission. */
    code: PermissionEnum;
    /** Describe action(s) allowed to do by permission. */
    name: Scalars['String'];
};

/** Represents permission group data. */
export declare type Group = Node & {
    /** The ID of the object. */
    id: Scalars['ID'];
    name: Scalars['String'];
    /** List of group permissions */
    permissions: Maybe<Array<Maybe<Permission>>>;
    /** List of group users */
    users: Maybe<Array<Maybe<User>>>;
    /** True, if the currently authenticated user has rights to manage a group. */
    userCanManage: Scalars['Boolean'];
};

export declare type UserPermission = {
    /** Internal code for permission. */
    code: PermissionEnum;
    /** Describe action(s) allowed to do by permission. */
    name: Scalars['String'];
    /** List of user permission groups which contains this permission. */
    sourcePermissionGroups: Maybe<Array<Group>>;
};

export declare type AccountErrorFragment = Pick<AccountError, 'code' | 'field' | 'message'>;

type User = Node & ObjectWithMetadata & {
    /** The ID of the object. */
    id: Scalars['ID'];
    lastLogin: Maybe<Scalars['DateTime']>;
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    isStaff: Scalars['Boolean'];
    isActive: Scalars['Boolean'];
    /** A note about the customer. */
    note: Maybe<Scalars['String']>;
    dateJoined: Scalars['DateTime'];
    /** List of private metadata items.Requires proper staff permissions to access. */
    privateMetadata: Array<Maybe<MetadataItem>>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<Maybe<MetadataItem>>;
    /** List of user's permissions. */
    userPermissions: Maybe<Array<Maybe<UserPermission>>>;
    /** List of user's permission groups. */
    permissionGroups: Maybe<Array<Maybe<Group>>>;
    /** List of user's permission groups which user can manage. */
    editableGroups: Maybe<Array<Maybe<Group>>>;
    avatar: Maybe<Image>;
    /** User language code. */
    languageCode: LanguageCodeEnum;
};

type LoginData = {
    tokenCreate: Maybe<(Pick<CreateToken, 'token' | 'refreshToken'> & {
        errors: Array<AccountErrorFragment>;
        user: Maybe<UserDetailsFragment>;
    })>;
};

export interface IAuthContext {
  login?: (username: string, password: string) => Promise<LoginData | undefined>;
  logout?: () => Promise<void>;
}

export interface IUserSlice {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  authenticated: boolean;
  authenticating: boolean;
  authErrors: string[];
  setAuthErrors: (authErrors: string[]) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setAuthenticating: (authenticating: boolean) => void;
  setUser: (user: IUserSlice) => void;
}

export interface AuthSliceI extends IUserSlice {}
