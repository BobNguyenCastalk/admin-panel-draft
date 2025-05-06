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

export declare type LanguageCodeEnum = 'AR' | 'AZ' | 'BG' | 'BN' | 'CA' | 'CS' | 'DA' | 'DE' | 'EL' | 'EN' | 'ES' | 'ES_CO' | 'ET' | 'FA' | 'FI' | 'FR' | 'HI' | 'HU' | 'HY' | 'ID' | 'IS' | 'IT' | 'JA' | 'KA' | 'KM' | 'KO' | 'LT' | 'MN' | 'MY' | 'NB' | 'NL' | 'PL' | 'PT' | 'PT_BR' | 'RO' | 'RU' | 'SK' | 'SL' | 'SQ' | 'SR' | 'SV' | 'SW' | 'TA' | 'TH' | 'TR' | 'UK' | 'VI' | 'ZH_HANS' | 'ZH_HANT';
