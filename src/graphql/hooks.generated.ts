/* eslint-disable */
import * as Types from './types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@dashboard/hooks/graphql';
const defaultOptions = {} as const;
export const AppManifestFragmentDoc = gql`
    fragment AppManifest on Manifest {
  identifier
  version
  about
  name
  appUrl
  configurationUrl
  tokenTargetUrl
  dataPrivacy
  dataPrivacyUrl
  homepageUrl
  supportUrl
  permissions {
    code
    name
  }
  brand {
    logo {
      default(format: WEBP, size: 64)
    }
  }
}
    `;
export const WebhookFragmentDoc = gql`
    fragment Webhook on Webhook {
  id
  name
  isActive
  app {
    id
    name
  }
}
    `;
export const AppFragmentDoc = gql`
    fragment App on App {
  id
  name
  created
  isActive
  type
  homepageUrl
  appUrl
  manifestUrl
  configurationUrl
  supportUrl
  version
  accessToken
  brand {
    logo {
      default(format: WEBP, size: 64)
    }
  }
  privateMetadata @include(if: $hasManagedAppsPermission) {
    key
    value
  }
  metadata @include(if: $hasManagedAppsPermission) {
    key
    value
  }
  tokens @include(if: $hasManagedAppsPermission) {
    authToken
    id
    name
  }
  webhooks @include(if: $hasManagedAppsPermission) {
    ...Webhook
  }
}
    ${WebhookFragmentDoc}`;
export const AppInstallationFragmentDoc = gql`
    fragment AppInstallation on AppInstallation {
  status
  message
  appName
  manifestUrl
  id
  brand {
    logo {
      default(format: WEBP, size: 64)
    }
  }
}
    `;
export const AppPermissionFragmentDoc = gql`
    fragment AppPermission on Permission {
  name
  code
}
    `;
export const AppEventDeliveriesFragmentDoc = gql`
    fragment AppEventDeliveries on App {
  webhooks @include(if: $canFetchAppEvents) {
    failedDelivers: eventDeliveries(
      first: 1
      filter: {status: FAILED}
      sortBy: {field: CREATED_AT, direction: DESC}
    ) {
      edges {
        node {
          id
          createdAt
          attempts(first: 1, sortBy: {field: CREATED_AT, direction: DESC}) {
            edges {
              node {
                id
                status
                createdAt
              }
            }
          }
        }
      }
    }
    pendingDelivers: eventDeliveries(
      first: 6
      filter: {status: PENDING}
      sortBy: {field: CREATED_AT, direction: DESC}
    ) {
      edges {
        node {
          id
          attempts(first: 6, sortBy: {field: CREATED_AT, direction: DESC}) {
            edges {
              node {
                id
                status
                createdAt
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const AppListItemFragmentDoc = gql`
    fragment AppListItem on App {
  id
  name
  isActive
  type
  appUrl
  manifestUrl
  version
  created
  brand {
    logo {
      default(format: WEBP, size: 64)
    }
  }
  permissions {
    ...AppPermission
  }
  ...AppEventDeliveries
}
    ${AppPermissionFragmentDoc}
${AppEventDeliveriesFragmentDoc}`;
export const AppAvatarFragmentDoc = gql`
    fragment AppAvatar on App {
  id
  name
}
    `;
export const EventDeliveryAttemptFragmentDoc = gql`
    fragment EventDeliveryAttempt on EventDeliveryAttempt {
  id
  createdAt
  status
  response
  responseStatusCode
}
    `;
export const InstalledAppFragmentDoc = gql`
    fragment InstalledApp on App {
  id
  identifier
  manifestUrl
  isActive
}
    `;
export const UserPermissionFragmentDoc = gql`
    fragment UserPermission on UserPermission {
  code
  name
}
    `;
export const UserUserPermissionWithSourcePermissionGroupsFragmentDoc = gql`
    fragment UserUserPermissionWithSourcePermissionGroups on UserPermission {
  ...UserPermission
  sourcePermissionGroups(userId: $userId) {
    id
  }
}
    ${UserPermissionFragmentDoc}`;
export const ChannelFragmentDoc = gql`
    fragment Channel on Channel {
  id
  isActive
  name
  slug
  currencyCode
  defaultCountry {
    code
    country
  }
  stockSettings {
    allocationStrategy
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  isStaff
  dateJoined
  metadata {
    key
    value
  }
  userPermissions {
    ...UserPermission
  }
  avatar(size: 128) {
    url
  }
  accessibleChannels {
    ...Channel
  }
  restrictedAccessToChannels
}
    ${UserPermissionFragmentDoc}
${ChannelFragmentDoc}`;
export const UserBaseFragmentDoc = gql`
    fragment UserBase on User {
  id
  firstName
  lastName
}
    `;
export const UserBaseAvatarFragmentDoc = gql`
    fragment UserBaseAvatar on User {
  id
  firstName
  lastName
  email
  avatar {
    url
    alt
  }
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
  children {
    totalCount
  }
  products {
    totalCount
  }
}
    `;
export const MetadataItemFragmentDoc = gql`
    fragment MetadataItem on MetadataItem {
  key
  value
}
    `;
export const MetadataFragmentDoc = gql`
    fragment Metadata on ObjectWithMetadata {
  metadata {
    ...MetadataItem
  }
  privateMetadata {
    ...MetadataItem
  }
}
    ${MetadataItemFragmentDoc}`;
export const CategoryDetailsFragmentDoc = gql`
    fragment CategoryDetails on Category {
  id
  ...Metadata
  backgroundImage {
    alt
    url
  }
  name
  slug
  description
  seoDescription
  seoTitle
  parent {
    id
  }
}
    ${MetadataFragmentDoc}`;
export const CategoryWithAncestorsFragmentDoc = gql`
    fragment CategoryWithAncestors on Category {
  id
  name
  parent {
    id
    name
  }
  level
  ancestors(first: 1) {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;
export const ChannelErrorFragmentDoc = gql`
    fragment ChannelError on ChannelError {
  code
  field
  message
}
    `;
export const ChannelDetailsFragmentDoc = gql`
    fragment ChannelDetails on Channel {
  ...Channel
}
    ${ChannelFragmentDoc}`;
export const AttributeErrorFragmentDoc = gql`
    fragment AttributeError on AttributeError {
  code
  field
  message
}
    `;
export const ProductErrorFragmentDoc = gql`
    fragment ProductError on ProductError {
  code
  field
  message
}
    `;
export const ProductErrorWithAttributesFragmentDoc = gql`
    fragment ProductErrorWithAttributes on ProductError {
  ...ProductError
  attributes
}
    ${ProductErrorFragmentDoc}`;
export const ProductChannelListingErrorFragmentDoc = gql`
    fragment ProductChannelListingError on ProductChannelListingError {
  code
  field
  message
  channels
}
    `;
export const CollectionChannelListingErrorFragmentDoc = gql`
    fragment CollectionChannelListingError on CollectionChannelListingError {
  code
  field
  message
  channels
}
    `;
export const AccountErrorFragmentDoc = gql`
    fragment AccountError on AccountError {
  code
  field
  addressType
  message
}
    `;
export const DiscountErrorFragmentDoc = gql`
    fragment DiscountError on DiscountError {
  code
  field
  channels
  message
}
    `;
export const PromotionCreateErrorFragmentDoc = gql`
    fragment PromotionCreateError on PromotionCreateError {
  field
  message
  code
  index
}
    `;
export const PromotionUpdateErrorFragmentDoc = gql`
    fragment PromotionUpdateError on PromotionUpdateError {
  field
  message
  code
}
    `;
export const PromotionDeleteErrorFragmentDoc = gql`
    fragment PromotionDeleteError on PromotionDeleteError {
  field
  message
  code
}
    `;
export const PromotionRuleUpdateErrorFragmentDoc = gql`
    fragment PromotionRuleUpdateError on PromotionRuleUpdateError {
  field
  message
  code
  channels
}
    `;
export const PromotionRuleCreateErrorFragmentDoc = gql`
    fragment PromotionRuleCreateError on PromotionRuleCreateError {
  field
  message
  code
}
    `;
export const PromotionRuleDeleteErrorFragmentDoc = gql`
    fragment PromotionRuleDeleteError on PromotionRuleDeleteError {
  field
  message
  code
}
    `;
export const MenuErrorFragmentDoc = gql`
    fragment MenuError on MenuError {
  code
  field
  message
}
    `;
export const OrderErrorFragmentDoc = gql`
    fragment OrderError on OrderError {
  code
  field
  addressType
  message
  orderLines
}
    `;
export const OrderSettingsErrorFragmentDoc = gql`
    fragment OrderSettingsError on OrderSettingsError {
  code
  field
  message
}
    `;
export const PageErrorFragmentDoc = gql`
    fragment PageError on PageError {
  code
  field
  message
}
    `;
export const PageErrorWithAttributesFragmentDoc = gql`
    fragment PageErrorWithAttributes on PageError {
  ...PageError
  attributes
}
    ${PageErrorFragmentDoc}`;
export const PermissionGroupErrorFragmentDoc = gql`
    fragment PermissionGroupError on PermissionGroupError {
  code
  field
  message
}
    `;
export const BulkProductErrorFragmentDoc = gql`
    fragment BulkProductError on BulkProductError {
  field
  code
  index
  channels
  message
}
    `;
export const ProductVariantBulkErrorFragmentDoc = gql`
    fragment ProductVariantBulkError on ProductVariantBulkError {
  field
  code
  message
  attributes
  values
  warehouses
  channels
}
    `;
export const BulkStockErrorFragmentDoc = gql`
    fragment BulkStockError on BulkStockError {
  code
  field
  index
  message
}
    `;
export const StockErrorFragmentDoc = gql`
    fragment StockError on StockError {
  code
  field
  message
}
    `;
export const ShippingChannelsErrorFragmentDoc = gql`
    fragment ShippingChannelsError on ShippingError {
  code
  field
  channels
  message
}
    `;
export const ShippingErrorFragmentDoc = gql`
    fragment ShippingError on ShippingError {
  code
  field
  message
}
    `;
export const ShopErrorFragmentDoc = gql`
    fragment ShopError on ShopError {
  code
  field
  message
}
    `;
export const StaffErrorFragmentDoc = gql`
    fragment StaffError on StaffError {
  code
  field
  message
}
    `;
export const WarehouseErrorFragmentDoc = gql`
    fragment WarehouseError on WarehouseError {
  code
  field
  message
}
    `;
export const WebhookErrorFragmentDoc = gql`
    fragment WebhookError on WebhookError {
  code
  field
  message
}
    `;
export const InvoiceErrorFragmentDoc = gql`
    fragment InvoiceError on InvoiceError {
  code
  field
  message
}
    `;
export const AppErrorFragmentDoc = gql`
    fragment AppError on AppError {
  field
  message
  code
  permissions
}
    `;
export const ExportErrorFragmentDoc = gql`
    fragment ExportError on ExportError {
  code
  field
  message
}
    `;
export const PluginErrorFragmentDoc = gql`
    fragment PluginError on PluginError {
  code
  field
  message
}
    `;
export const MetadataErrorFragmentDoc = gql`
    fragment MetadataError on MetadataError {
  code
  field
  message
}
    `;
export const CollectionErrorFragmentDoc = gql`
    fragment CollectionError on CollectionError {
  code
  field
  message
}
    `;
export const UploadErrorFragmentDoc = gql`
    fragment UploadError on UploadError {
  code
  field
  message
}
    `;
export const GiftCardErrorFragmentDoc = gql`
    fragment GiftCardError on GiftCardError {
  code
  field
  message
}
    `;
export const GiftCardSettingsErrorFragmentDoc = gql`
    fragment GiftCardSettingsError on GiftCardSettingsError {
  code
  field
  message
}
    `;
export const SaleBulkDeleteErrorFragmentDoc = gql`
    fragment SaleBulkDeleteError on DiscountError {
  code
  field
  message
}
    `;
export const VoucherBulkDeleteErrorFragmentDoc = gql`
    fragment VoucherBulkDeleteError on DiscountError {
  code
  field
  message
}
    `;
export const GiftCardBulkCreateErrorFragmentFragmentDoc = gql`
    fragment GiftCardBulkCreateErrorFragment on GiftCardError {
  code
  field
  message
}
    `;
export const GiftCardCreateErrorFragmentFragmentDoc = gql`
    fragment GiftCardCreateErrorFragment on GiftCardError {
  code
  field
  message
}
    `;
export const PageBulkPublishErrorFragmentFragmentDoc = gql`
    fragment PageBulkPublishErrorFragment on PageError {
  code
  field
  message
}
    `;
export const PageBulkRemoveErrorFragmentFragmentDoc = gql`
    fragment PageBulkRemoveErrorFragment on PageError {
  code
  field
  message
}
    `;
export const PageTypeDeleteErrorFragmentFragmentDoc = gql`
    fragment PageTypeDeleteErrorFragment on PageError {
  code
  field
  message
}
    `;
export const ProductVariantStocksDeleteErrorFragmentDoc = gql`
    fragment ProductVariantStocksDeleteError on StockError {
  code
  field
  message
}
    `;
export const ProductTypeDeleteErrorFragmentFragmentDoc = gql`
    fragment ProductTypeDeleteErrorFragment on ProductError {
  code
  field
  message
}
    `;
export const ProductTypeBulkDeleteErrorFragmentFragmentDoc = gql`
    fragment ProductTypeBulkDeleteErrorFragment on ProductError {
  code
  field
  message
}
    `;
export const ProductTypeBulkUpdateErrorFragmentFragmentDoc = gql`
    fragment ProductTypeBulkUpdateErrorFragment on ProductError {
  code
  field
  message
}
    `;
export const ProductAttributeAssignErrorFragmentFragmentDoc = gql`
    fragment ProductAttributeAssignErrorFragment on ProductError {
  code
  field
  message
}
    `;
export const ProductAttributeUnassignErrorFragmentFragmentDoc = gql`
    fragment ProductAttributeUnassignErrorFragment on ProductError {
  code
  field
  message
}
    `;
export const ProductTypeCreateErrorFragmentFragmentDoc = gql`
    fragment ProductTypeCreateErrorFragment on ProductError {
  code
  field
  message
}
    `;
export const ProductTypeReorderAttributesErrorFragmentFragmentDoc = gql`
    fragment ProductTypeReorderAttributesErrorFragment on ProductError {
  code
  field
  message
}
    `;
export const ProductAttributeAssignmentUpdateErrorFragmentFragmentDoc = gql`
    fragment ProductAttributeAssignmentUpdateErrorFragment on ProductError {
  code
  field
  message
  attributes
}
    `;
export const ShopSettingsUpdateErrorFragmentFragmentDoc = gql`
    fragment ShopSettingsUpdateErrorFragment on ShopError {
  code
  field
  message
}
    `;
export const ShopFetchTaxRatesErrorFragmentFragmentDoc = gql`
    fragment ShopFetchTaxRatesErrorFragment on ShopError {
  code
  field
  message
}
    `;
export const ProductTranslateErrorFragmentFragmentDoc = gql`
    fragment ProductTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const ProductVariantTranslateErrorFragmentFragmentDoc = gql`
    fragment ProductVariantTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const CategoryTranslateErrorFragmentFragmentDoc = gql`
    fragment CategoryTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const CollectionTranslateErrorFragmentFragmentDoc = gql`
    fragment CollectionTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const PageTranslateErrorFragmentFragmentDoc = gql`
    fragment PageTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const VoucherTranslateErrorFragmentFragmentDoc = gql`
    fragment VoucherTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const SaleTranslateErrorFragmentFragmentDoc = gql`
    fragment SaleTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const AttributeTranslateErrorFragmentFragmentDoc = gql`
    fragment AttributeTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const AttributeValueTranslateErrorFragmentFragmentDoc = gql`
    fragment AttributeValueTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const ShippingPriceTranslateErrorFragmentFragmentDoc = gql`
    fragment ShippingPriceTranslateErrorFragment on TranslationError {
  code
  field
  message
}
    `;
export const TaxConfigurationUpdateErrorFragmentDoc = gql`
    fragment TaxConfigurationUpdateError on TaxConfigurationUpdateError {
  field
  code
  message
}
    `;
export const TaxCountryConfigurationUpdateErrorFragmentDoc = gql`
    fragment TaxCountryConfigurationUpdateError on TaxCountryConfigurationUpdateError {
  field
  code
  message
}
    `;
export const TaxCountryConfigurationDeleteErrorFragmentDoc = gql`
    fragment TaxCountryConfigurationDeleteError on TaxCountryConfigurationDeleteError {
  field
  code
  message
}
    `;
export const TaxClassUpdateErrorFragmentDoc = gql`
    fragment TaxClassUpdateError on TaxClassUpdateError {
  field
  code
  message
}
    `;
export const TaxClassCreateErrorFragmentDoc = gql`
    fragment TaxClassCreateError on TaxClassCreateError {
  field
  code
  message
}
    `;
export const TaxClassDeleteErrorFragmentDoc = gql`
    fragment TaxClassDeleteError on TaxClassDeleteError {
  field
  code
  message
}
    `;
export const TransactionRequestActionErrorFragmentDoc = gql`
    fragment TransactionRequestActionError on TransactionRequestActionError {
  field
  message
  code
}
    `;
export const TransactionCreateErrorFragmentDoc = gql`
    fragment TransactionCreateError on TransactionCreateError {
  field
  message
  code
}
    `;
export const OrderGrantRefundCreateErrorFragmentDoc = gql`
    fragment OrderGrantRefundCreateError on OrderGrantRefundCreateError {
  field
  message
  code
  lines {
    field
    message
    code
    lineId
  }
}
    `;
export const OrderGrantRefundUpdateErrorFragmentDoc = gql`
    fragment OrderGrantRefundUpdateError on OrderGrantRefundUpdateError {
  field
  message
  code
  addLines {
    field
    message
    code
    lineId
  }
  removeLines {
    field
    message
    code
    lineId
  }
}
    `;
export const TransactionRequestRefundForGrantedRefundErrorFragmentDoc = gql`
    fragment TransactionRequestRefundForGrantedRefundError on TransactionRequestRefundForGrantedRefundError {
  field
  message
  code
}
    `;
export const FileFragmentDoc = gql`
    fragment File on File {
  url
  contentType
}
    `;
export const MenuFragmentDoc = gql`
    fragment Menu on Menu {
  id
  name
  items {
    id
  }
}
    `;
export const MenuItemFragmentDoc = gql`
    fragment MenuItem on MenuItem {
  category {
    id
    name
  }
  collection {
    id
    name
  }
  id
  level
  name
  page {
    id
    title
  }
  url
}
    `;
export const MenuItemNestedFragmentDoc = gql`
    fragment MenuItemNested on MenuItem {
  ...MenuItem
  children {
    ...MenuItem
    children {
      ...MenuItem
      children {
        ...MenuItem
        children {
          ...MenuItem
          children {
            ...MenuItem
            children {
              ...MenuItem
            }
          }
        }
      }
    }
  }
}
    ${MenuItemFragmentDoc}`;
export const MenuDetailsFragmentDoc = gql`
    fragment MenuDetails on Menu {
  id
  items {
    ...MenuItemNested
  }
  name
}
    ${MenuItemNestedFragmentDoc}`;
export const PermissionGroupFragmentDoc = gql`
    fragment PermissionGroup on Group {
  id
  name
  userCanManage
  users {
    id
    firstName
    lastName
  }
}
    `;
export const PermissionFragmentDoc = gql`
    fragment Permission on Permission {
  code
  name
}
    `;
export const StaffMemberFragmentDoc = gql`
    fragment StaffMember on User {
  id
  email
  firstName
  isActive
  lastName
}
    `;
export const PermissionGroupMemberFragmentDoc = gql`
    fragment PermissionGroupMember on User {
  ...StaffMember
  avatar(size: 128) {
    url
  }
}
    ${StaffMemberFragmentDoc}`;
export const PermissionGroupDetailsFragmentDoc = gql`
    fragment PermissionGroupDetails on Group {
  ...PermissionGroup
  restrictedAccessToChannels
  accessibleChannels {
    ...Channel
  }
  permissions {
    ...Permission
  }
  users {
    ...PermissionGroupMember
  }
}
    ${PermissionGroupFragmentDoc}
${ChannelFragmentDoc}
${PermissionFragmentDoc}
${PermissionGroupMemberFragmentDoc}`;
export const PluginConfigurationBaseFragmentDoc = gql`
    fragment PluginConfigurationBase on PluginConfiguration {
  active
  channel {
    id
    name
    slug
  }
}
    `;
export const PluginBaseFragmentDoc = gql`
    fragment PluginBase on Plugin {
  id
  name
  description
  channelConfigurations {
    ...PluginConfigurationBase
  }
  globalConfiguration {
    ...PluginConfigurationBase
  }
}
    ${PluginConfigurationBaseFragmentDoc}`;
export const ConfigurationItemFragmentDoc = gql`
    fragment ConfigurationItem on ConfigurationItem {
  name
  value
  type
  helpText
  label
}
    `;
export const PluginConfigurationExtendedFragmentDoc = gql`
    fragment PluginConfigurationExtended on PluginConfiguration {
  ...PluginConfigurationBase
  configuration {
    ...ConfigurationItem
  }
}
    ${PluginConfigurationBaseFragmentDoc}
${ConfigurationItemFragmentDoc}`;
export const PluginsDetailsFragmentDoc = gql`
    fragment PluginsDetails on Plugin {
  id
  name
  description
  globalConfiguration {
    ...PluginConfigurationExtended
  }
  channelConfigurations {
    ...PluginConfigurationExtended
  }
}
    ${PluginConfigurationExtendedFragmentDoc}`;
export const PaymentGatewayFragmentDoc = gql`
    fragment PaymentGateway on PaymentGateway {
  name
  id
}
    `;
export const CountryWithCodeFragmentDoc = gql`
    fragment CountryWithCode on CountryDisplay {
  country
  code
}
    `;
export const LanguageFragmentDoc = gql`
    fragment Language on LanguageDisplay {
  code
  language
}
    `;
export const LimitInfoFragmentDoc = gql`
    fragment LimitInfo on Limits {
  channels @include(if: $channels)
  orders @include(if: $orders)
  productVariants @include(if: $productVariants)
  staffUsers @include(if: $staffUsers)
  warehouses @include(if: $warehouses)
}
    `;
export const ShopLimitFragmentDoc = gql`
    fragment ShopLimit on Shop {
  limits {
    currentUsage {
      ...LimitInfo
    }
    allowedUsage {
      ...LimitInfo
    }
  }
}
    ${LimitInfoFragmentDoc}`;
export const AddressFragmentDoc = gql`
    fragment Address on Address {
  city
  cityArea
  companyName
  country {
    __typename
    code
    country
  }
  countryArea
  firstName
  id
  lastName
  phone
  postalCode
  streetAddress1
  streetAddress2
}
    `;
export const ShopFragmentDoc = gql`
    fragment Shop on Shop {
  companyAddress {
    ...Address
  }
  countries {
    code
    country
  }
  customerSetPasswordUrl
  defaultMailSenderAddress
  defaultMailSenderName
  description
  domain {
    host
  }
  name
  reserveStockDurationAnonymousUser
  reserveStockDurationAuthenticatedUser
  limitQuantityPerCheckout
  enableAccountConfirmationByEmail
}
    ${AddressFragmentDoc}`;
export const StaffMemberDetailsFragmentDoc = gql`
    fragment StaffMemberDetails on User {
  ...StaffMember
  permissionGroups {
    id
    name
    userCanManage
  }
  userPermissions {
    code
    name
  }
  avatar(size: 512) {
    url
  }
  metadata {
    key
    value
  }
}
    ${StaffMemberFragmentDoc}`;
export const StaffMemberAvatarFragmentDoc = gql`
    fragment StaffMemberAvatar on User {
  ...StaffMember
  avatar(size: 512) {
    url
  }
}
    ${StaffMemberFragmentDoc}`;
export const TimePeriodFragmentDoc = gql`
    fragment TimePeriod on TimePeriod {
  amount
  type
}
    `;
export const CategoryTranslationFragmentDoc = gql`
    fragment CategoryTranslation on CategoryTranslatableContent {
  translation(languageCode: $language) {
    id
    description
    language {
      language
    }
    name
    seoDescription
    seoTitle
  }
  category {
    id
    name
    description
    seoDescription
    seoTitle
  }
}
    `;
export const CollectionTranslationFragmentDoc = gql`
    fragment CollectionTranslation on CollectionTranslatableContent {
  collection {
    id
    name
    description
    seoDescription
    seoTitle
  }
  translation(languageCode: $language) {
    id
    description
    language {
      language
    }
    name
    seoDescription
    seoTitle
  }
}
    `;
export const AttributeValueTranslatableFragmentDoc = gql`
    fragment AttributeValueTranslatable on AttributeValueTranslatableContent {
  id
  name
  plainText
  richText
  attributeValue {
    id
  }
  attribute {
    id
    name
  }
  translation(languageCode: $language) {
    id
    name
    plainText
    richText
    language {
      code
      language
    }
  }
}
    `;
export const ProductTranslationFragmentDoc = gql`
    fragment ProductTranslation on ProductTranslatableContent {
  product {
    id
    name
    description
    seoDescription
    seoTitle
  }
  translation(languageCode: $language) {
    id
    seoTitle
    seoDescription
    name
    description
    language {
      code
      language
    }
  }
  attributeValues {
    ...AttributeValueTranslatable
  }
}
    ${AttributeValueTranslatableFragmentDoc}`;
export const ProductVariantTranslationFragmentDoc = gql`
    fragment ProductVariantTranslation on ProductVariantTranslatableContent {
  productVariant {
    id
  }
  name
  translation(languageCode: $language) {
    id
    name
    language {
      code
      language
    }
  }
  attributeValues {
    ...AttributeValueTranslatable
  }
}
    ${AttributeValueTranslatableFragmentDoc}`;
export const SaleTranslationFragmentDoc = gql`
    fragment SaleTranslation on SaleTranslatableContent {
  sale {
    id
    name
  }
  translation(languageCode: $language) {
    id
    language {
      code
      language
    }
    name
  }
}
    `;
export const VoucherTranslationFragmentDoc = gql`
    fragment VoucherTranslation on VoucherTranslatableContent {
  name
  voucher {
    id
    name
  }
  translation(languageCode: $language) {
    id
    language {
      code
      language
    }
    name
  }
}
    `;
export const ShippingMethodTranslationFragmentDoc = gql`
    fragment ShippingMethodTranslation on ShippingMethodTranslatableContent {
  id
  name
  description
  shippingMethod {
    id
  }
  translation(languageCode: $language) {
    id
    language {
      code
      language
    }
    name
    description
  }
}
    `;
export const PageTranslationFragmentDoc = gql`
    fragment PageTranslation on PageTranslatableContent {
  page {
    id
    content
    seoDescription
    seoTitle
    title
  }
  translation(languageCode: $language) {
    id
    content
    seoDescription
    seoTitle
    title
    language {
      code
      language
    }
  }
  attributeValues {
    ...AttributeValueTranslatable
  }
}
    ${AttributeValueTranslatableFragmentDoc}`;
export const PageTranslatableFragmentDoc = gql`
    fragment PageTranslatable on PageTranslatableContent {
  id
  content
  seoDescription
  seoTitle
  title
  translation(languageCode: $language) {
    id
    content
    seoDescription
    seoTitle
    title
    language {
      code
      language
    }
  }
}
    `;
export const AttributeTranslationFragmentDoc = gql`
    fragment AttributeTranslation on AttributeTranslatableContent {
  id
  name
  translation(languageCode: $language) {
    id
    name
  }
  attribute {
    id
    name
    inputType
  }
}
    `;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}
    `;
export const AttributeChoicesTranslationFragmentDoc = gql`
    fragment AttributeChoicesTranslation on AttributeValueCountableConnection {
  pageInfo {
    ...PageInfo
  }
  edges {
    cursor
    node {
      id
      name
      plainText
      richText
      inputType
      translation(languageCode: $language) {
        id
        name
        plainText
        richText
      }
    }
  }
}
    ${PageInfoFragmentDoc}`;
export const AttributeTranslationDetailsFragmentDoc = gql`
    fragment AttributeTranslationDetails on AttributeTranslatableContent {
  translation(languageCode: $language) {
    id
    name
  }
  attribute {
    id
    name
    inputType
    withChoices
    choices(
      first: $firstValues
      after: $afterValues
      last: $lastValues
      before: $beforeValues
    ) {
      ...AttributeChoicesTranslation
    }
  }
}
    ${AttributeChoicesTranslationFragmentDoc}`;
export const MenuItemTranslationFragmentDoc = gql`
    fragment MenuItemTranslation on MenuItemTranslatableContent {
  translation(languageCode: $language) {
    id
    language {
      language
    }
    name
  }
  menuItem {
    id
    name
  }
}
    `;
export const WebhookDetailsFragmentDoc = gql`
    fragment WebhookDetails on Webhook {
  ...Webhook
  syncEvents {
    eventType
  }
  asyncEvents {
    eventType
  }
  secretKey
  targetUrl
  subscriptionQuery
  customHeaders
}
    ${WebhookFragmentDoc}`;
export const WeightFragmentDoc = gql`
    fragment Weight on Weight {
  unit
  value
}
    `;
export const UpdateMetadataDocument = gql`
    mutation UpdateMetadata($id: ID!, $input: [MetadataInput!]!, $keysToDelete: [String!]!) {
  updateMetadata(id: $id, input: $input) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
  deleteMetadata(id: $id, keys: $keysToDelete) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
}
    ${MetadataErrorFragmentDoc}
${MetadataFragmentDoc}`;
export type UpdateMetadataMutationFn = Apollo.MutationFunction<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>;

/**
 * __useUpdateMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMetadataMutation, { data, loading, error }] = useUpdateMetadataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      keysToDelete: // value for 'keysToDelete'
 *   },
 * });
 */
export function useUpdateMetadataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>(UpdateMetadataDocument, options);
      }
export type UpdateMetadataMutationHookResult = ReturnType<typeof useUpdateMetadataMutation>;
export type UpdateMetadataMutationResult = Apollo.MutationResult<Types.UpdateMetadataMutation>;
export type UpdateMetadataMutationOptions = Apollo.BaseMutationOptions<Types.UpdateMetadataMutation, Types.UpdateMetadataMutationVariables>;
export const UpdatePrivateMetadataDocument = gql`
    mutation UpdatePrivateMetadata($id: ID!, $input: [MetadataInput!]!, $keysToDelete: [String!]!) {
  updatePrivateMetadata(id: $id, input: $input) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
  deletePrivateMetadata(id: $id, keys: $keysToDelete) {
    errors {
      ...MetadataError
    }
    item {
      ...Metadata
      ... on Node {
        id
      }
    }
  }
}
    ${MetadataErrorFragmentDoc}
${MetadataFragmentDoc}`;
export type UpdatePrivateMetadataMutationFn = Apollo.MutationFunction<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>;

/**
 * __useUpdatePrivateMetadataMutation__
 *
 * To run a mutation, you first call `useUpdatePrivateMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrivateMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrivateMetadataMutation, { data, loading, error }] = useUpdatePrivateMetadataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      keysToDelete: // value for 'keysToDelete'
 *   },
 * });
 */
export function useUpdatePrivateMetadataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>(UpdatePrivateMetadataDocument, options);
      }
export type UpdatePrivateMetadataMutationHookResult = ReturnType<typeof useUpdatePrivateMetadataMutation>;
export type UpdatePrivateMetadataMutationResult = Apollo.MutationResult<Types.UpdatePrivateMetadataMutation>;
export type UpdatePrivateMetadataMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePrivateMetadataMutation, Types.UpdatePrivateMetadataMutationVariables>;
export const CheckExportFileStatusDocument = gql`
    query CheckExportFileStatus($id: ID!) {
  exportFile(id: $id) {
    id
    status
  }
}
    `;

/**
 * __useCheckExportFileStatusQuery__
 *
 * To run a query within a React component, call `useCheckExportFileStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckExportFileStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckExportFileStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckExportFileStatusQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.CheckExportFileStatusQuery, Types.CheckExportFileStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.CheckExportFileStatusQuery, Types.CheckExportFileStatusQueryVariables>(CheckExportFileStatusDocument, options);
      }
export function useCheckExportFileStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.CheckExportFileStatusQuery, Types.CheckExportFileStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.CheckExportFileStatusQuery, Types.CheckExportFileStatusQueryVariables>(CheckExportFileStatusDocument, options);
        }
export type CheckExportFileStatusQueryHookResult = ReturnType<typeof useCheckExportFileStatusQuery>;
export type CheckExportFileStatusLazyQueryHookResult = ReturnType<typeof useCheckExportFileStatusLazyQuery>;
export type CheckExportFileStatusQueryResult = Apollo.QueryResult<Types.CheckExportFileStatusQuery, Types.CheckExportFileStatusQueryVariables>;
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
  requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
    errors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type RequestPasswordResetMutationFn = Apollo.MutationFunction<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>;

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *      redirectUrl: // value for 'redirectUrl'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, options);
      }
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>;
export type RequestPasswordResetMutationResult = Apollo.MutationResult<Types.RequestPasswordResetMutation>;
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<Types.RequestPasswordResetMutation, Types.RequestPasswordResetMutationVariables>;
export const AvailableExternalAuthenticationsDocument = gql`
    query AvailableExternalAuthentications {
  shop {
    availableExternalAuthentications {
      id
      name
    }
  }
}
    `;

/**
 * __useAvailableExternalAuthenticationsQuery__
 *
 * To run a query within a React component, call `useAvailableExternalAuthenticationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableExternalAuthenticationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableExternalAuthenticationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableExternalAuthenticationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.AvailableExternalAuthenticationsQuery, Types.AvailableExternalAuthenticationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AvailableExternalAuthenticationsQuery, Types.AvailableExternalAuthenticationsQueryVariables>(AvailableExternalAuthenticationsDocument, options);
      }
export function useAvailableExternalAuthenticationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AvailableExternalAuthenticationsQuery, Types.AvailableExternalAuthenticationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AvailableExternalAuthenticationsQuery, Types.AvailableExternalAuthenticationsQueryVariables>(AvailableExternalAuthenticationsDocument, options);
        }
export type AvailableExternalAuthenticationsQueryHookResult = ReturnType<typeof useAvailableExternalAuthenticationsQuery>;
export type AvailableExternalAuthenticationsLazyQueryHookResult = ReturnType<typeof useAvailableExternalAuthenticationsLazyQuery>;
export type AvailableExternalAuthenticationsQueryResult = Apollo.QueryResult<Types.AvailableExternalAuthenticationsQuery, Types.AvailableExternalAuthenticationsQueryVariables>;
export const UserDetailsDocument = gql`
    query UserDetails {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserDetailsQuery__
 *
 * To run a query within a React component, call `useUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>(UserDetailsDocument, options);
      }
export function useUserDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>(UserDetailsDocument, options);
        }
export type UserDetailsQueryHookResult = ReturnType<typeof useUserDetailsQuery>;
export type UserDetailsLazyQueryHookResult = ReturnType<typeof useUserDetailsLazyQuery>;
export type UserDetailsQueryResult = Apollo.QueryResult<Types.UserDetailsQuery, Types.UserDetailsQueryVariables>;
export const ChannelCreateDocument = gql`
    mutation ChannelCreate($input: ChannelCreateInput!) {
  channelCreate(input: $input) {
    channel {
      ...ChannelDetails
    }
    errors {
      ...ChannelError
    }
  }
}
    ${ChannelDetailsFragmentDoc}
${ChannelErrorFragmentDoc}`;
export type ChannelCreateMutationFn = Apollo.MutationFunction<Types.ChannelCreateMutation, Types.ChannelCreateMutationVariables>;

/**
 * __useChannelCreateMutation__
 *
 * To run a mutation, you first call `useChannelCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChannelCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [channelCreateMutation, { data, loading, error }] = useChannelCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChannelCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChannelCreateMutation, Types.ChannelCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChannelCreateMutation, Types.ChannelCreateMutationVariables>(ChannelCreateDocument, options);
      }
export type ChannelCreateMutationHookResult = ReturnType<typeof useChannelCreateMutation>;
export type ChannelCreateMutationResult = Apollo.MutationResult<Types.ChannelCreateMutation>;
export type ChannelCreateMutationOptions = Apollo.BaseMutationOptions<Types.ChannelCreateMutation, Types.ChannelCreateMutationVariables>;
export const ChannelUpdateDocument = gql`
    mutation ChannelUpdate($id: ID!, $input: ChannelUpdateInput!) {
  channelUpdate(id: $id, input: $input) {
    channel {
      ...ChannelDetails
    }
    errors {
      ...ChannelError
    }
  }
}
    ${ChannelDetailsFragmentDoc}
${ChannelErrorFragmentDoc}`;
export type ChannelUpdateMutationFn = Apollo.MutationFunction<Types.ChannelUpdateMutation, Types.ChannelUpdateMutationVariables>;

/**
 * __useChannelUpdateMutation__
 *
 * To run a mutation, you first call `useChannelUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChannelUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [channelUpdateMutation, { data, loading, error }] = useChannelUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChannelUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChannelUpdateMutation, Types.ChannelUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChannelUpdateMutation, Types.ChannelUpdateMutationVariables>(ChannelUpdateDocument, options);
      }
export type ChannelUpdateMutationHookResult = ReturnType<typeof useChannelUpdateMutation>;
export type ChannelUpdateMutationResult = Apollo.MutationResult<Types.ChannelUpdateMutation>;
export type ChannelUpdateMutationOptions = Apollo.BaseMutationOptions<Types.ChannelUpdateMutation, Types.ChannelUpdateMutationVariables>;
export const ChannelDeleteDocument = gql`
    mutation ChannelDelete($id: ID!, $input: ChannelDeleteInput) {
  channelDelete(id: $id, input: $input) {
    errors {
      ...ChannelError
    }
  }
}
    ${ChannelErrorFragmentDoc}`;
export type ChannelDeleteMutationFn = Apollo.MutationFunction<Types.ChannelDeleteMutation, Types.ChannelDeleteMutationVariables>;

/**
 * __useChannelDeleteMutation__
 *
 * To run a mutation, you first call `useChannelDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChannelDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [channelDeleteMutation, { data, loading, error }] = useChannelDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChannelDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChannelDeleteMutation, Types.ChannelDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChannelDeleteMutation, Types.ChannelDeleteMutationVariables>(ChannelDeleteDocument, options);
      }
export type ChannelDeleteMutationHookResult = ReturnType<typeof useChannelDeleteMutation>;
export type ChannelDeleteMutationResult = Apollo.MutationResult<Types.ChannelDeleteMutation>;
export type ChannelDeleteMutationOptions = Apollo.BaseMutationOptions<Types.ChannelDeleteMutation, Types.ChannelDeleteMutationVariables>;
export const ChannelActivateDocument = gql`
    mutation ChannelActivate($id: ID!) {
  channelActivate(id: $id) {
    channel {
      ...ChannelDetails
    }
    errors {
      ...ChannelError
    }
  }
}
    ${ChannelDetailsFragmentDoc}
${ChannelErrorFragmentDoc}`;
export type ChannelActivateMutationFn = Apollo.MutationFunction<Types.ChannelActivateMutation, Types.ChannelActivateMutationVariables>;

/**
 * __useChannelActivateMutation__
 *
 * To run a mutation, you first call `useChannelActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChannelActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [channelActivateMutation, { data, loading, error }] = useChannelActivateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelActivateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChannelActivateMutation, Types.ChannelActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChannelActivateMutation, Types.ChannelActivateMutationVariables>(ChannelActivateDocument, options);
      }
export type ChannelActivateMutationHookResult = ReturnType<typeof useChannelActivateMutation>;
export type ChannelActivateMutationResult = Apollo.MutationResult<Types.ChannelActivateMutation>;
export type ChannelActivateMutationOptions = Apollo.BaseMutationOptions<Types.ChannelActivateMutation, Types.ChannelActivateMutationVariables>;
export const ChannelDeactivateDocument = gql`
    mutation ChannelDeactivate($id: ID!) {
  channelDeactivate(id: $id) {
    channel {
      ...ChannelDetails
    }
    errors {
      ...ChannelError
    }
  }
}
    ${ChannelDetailsFragmentDoc}
${ChannelErrorFragmentDoc}`;
export type ChannelDeactivateMutationFn = Apollo.MutationFunction<Types.ChannelDeactivateMutation, Types.ChannelDeactivateMutationVariables>;

/**
 * __useChannelDeactivateMutation__
 *
 * To run a mutation, you first call `useChannelDeactivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChannelDeactivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [channelDeactivateMutation, { data, loading, error }] = useChannelDeactivateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelDeactivateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChannelDeactivateMutation, Types.ChannelDeactivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChannelDeactivateMutation, Types.ChannelDeactivateMutationVariables>(ChannelDeactivateDocument, options);
      }
export type ChannelDeactivateMutationHookResult = ReturnType<typeof useChannelDeactivateMutation>;
export type ChannelDeactivateMutationResult = Apollo.MutationResult<Types.ChannelDeactivateMutation>;
export type ChannelDeactivateMutationOptions = Apollo.BaseMutationOptions<Types.ChannelDeactivateMutation, Types.ChannelDeactivateMutationVariables>;
export const ChannelReorderWarehousesDocument = gql`
    mutation ChannelReorderWarehouses($channelId: ID!, $moves: [ReorderInput!]!) {
  channelReorderWarehouses(channelId: $channelId, moves: $moves) {
    channel {
      ...ChannelDetails
    }
    errors {
      ...ChannelError
    }
  }
}
    ${ChannelDetailsFragmentDoc}
${ChannelErrorFragmentDoc}`;
export type ChannelReorderWarehousesMutationFn = Apollo.MutationFunction<Types.ChannelReorderWarehousesMutation, Types.ChannelReorderWarehousesMutationVariables>;

/**
 * __useChannelReorderWarehousesMutation__
 *
 * To run a mutation, you first call `useChannelReorderWarehousesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChannelReorderWarehousesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [channelReorderWarehousesMutation, { data, loading, error }] = useChannelReorderWarehousesMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      moves: // value for 'moves'
 *   },
 * });
 */
export function useChannelReorderWarehousesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChannelReorderWarehousesMutation, Types.ChannelReorderWarehousesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChannelReorderWarehousesMutation, Types.ChannelReorderWarehousesMutationVariables>(ChannelReorderWarehousesDocument, options);
      }
export type ChannelReorderWarehousesMutationHookResult = ReturnType<typeof useChannelReorderWarehousesMutation>;
export type ChannelReorderWarehousesMutationResult = Apollo.MutationResult<Types.ChannelReorderWarehousesMutation>;
export type ChannelReorderWarehousesMutationOptions = Apollo.BaseMutationOptions<Types.ChannelReorderWarehousesMutation, Types.ChannelReorderWarehousesMutationVariables>;
export const BaseChannelsDocument = gql`
    query BaseChannels {
  channels {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;

/**
 * __useBaseChannelsQuery__
 *
 * To run a query within a React component, call `useBaseChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBaseChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBaseChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBaseChannelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.BaseChannelsQuery, Types.BaseChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.BaseChannelsQuery, Types.BaseChannelsQueryVariables>(BaseChannelsDocument, options);
      }
export function useBaseChannelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.BaseChannelsQuery, Types.BaseChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.BaseChannelsQuery, Types.BaseChannelsQueryVariables>(BaseChannelsDocument, options);
        }
export type BaseChannelsQueryHookResult = ReturnType<typeof useBaseChannelsQuery>;
export type BaseChannelsLazyQueryHookResult = ReturnType<typeof useBaseChannelsLazyQuery>;
export type BaseChannelsQueryResult = Apollo.QueryResult<Types.BaseChannelsQuery, Types.BaseChannelsQueryVariables>;
export const ChannelsDocument = gql`
    query Channels {
  channels {
    ...ChannelDetails
  }
}
    ${ChannelDetailsFragmentDoc}`;

/**
 * __useChannelsQuery__
 *
 * To run a query within a React component, call `useChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChannelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.ChannelsQuery, Types.ChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ChannelsQuery, Types.ChannelsQueryVariables>(ChannelsDocument, options);
      }
export function useChannelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ChannelsQuery, Types.ChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ChannelsQuery, Types.ChannelsQueryVariables>(ChannelsDocument, options);
        }
export type ChannelsQueryHookResult = ReturnType<typeof useChannelsQuery>;
export type ChannelsLazyQueryHookResult = ReturnType<typeof useChannelsLazyQuery>;
export type ChannelsQueryResult = Apollo.QueryResult<Types.ChannelsQuery, Types.ChannelsQueryVariables>;
export const ChannelDocument = gql`
    query Channel($id: ID!) {
  channel(id: $id) {
    ...ChannelDetails
  }
}
    ${ChannelDetailsFragmentDoc}`;

/**
 * __useChannelQuery__
 *
 * To run a query within a React component, call `useChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ChannelQuery, Types.ChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ChannelQuery, Types.ChannelQueryVariables>(ChannelDocument, options);
      }
export function useChannelLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ChannelQuery, Types.ChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ChannelQuery, Types.ChannelQueryVariables>(ChannelDocument, options);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelQueryResult = Apollo.QueryResult<Types.ChannelQuery, Types.ChannelQueryVariables>;
export const FileUploadDocument = gql`
    mutation FileUpload($file: Upload!) {
  fileUpload(file: $file) {
    uploadedFile {
      ...File
    }
    errors {
      ...UploadError
    }
  }
}
    ${FileFragmentDoc}
${UploadErrorFragmentDoc}`;
export type FileUploadMutationFn = Apollo.MutationFunction<Types.FileUploadMutation, Types.FileUploadMutationVariables>;

/**
 * __useFileUploadMutation__
 *
 * To run a mutation, you first call `useFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fileUploadMutation, { data, loading, error }] = useFileUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useFileUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.FileUploadMutation, Types.FileUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.FileUploadMutation, Types.FileUploadMutationVariables>(FileUploadDocument, options);
      }
export type FileUploadMutationHookResult = ReturnType<typeof useFileUploadMutation>;
export type FileUploadMutationResult = Apollo.MutationResult<Types.FileUploadMutation>;
export type FileUploadMutationOptions = Apollo.BaseMutationOptions<Types.FileUploadMutation, Types.FileUploadMutationVariables>;
export const PermissionGroupDeleteDocument = gql`
    mutation PermissionGroupDelete($id: ID!) {
  permissionGroupDelete(id: $id) {
    errors {
      ...PermissionGroupError
    }
  }
}
    ${PermissionGroupErrorFragmentDoc}`;
export type PermissionGroupDeleteMutationFn = Apollo.MutationFunction<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>;

/**
 * __usePermissionGroupDeleteMutation__
 *
 * To run a mutation, you first call `usePermissionGroupDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [permissionGroupDeleteMutation, { data, loading, error }] = usePermissionGroupDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePermissionGroupDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>(PermissionGroupDeleteDocument, options);
      }
export type PermissionGroupDeleteMutationHookResult = ReturnType<typeof usePermissionGroupDeleteMutation>;
export type PermissionGroupDeleteMutationResult = Apollo.MutationResult<Types.PermissionGroupDeleteMutation>;
export type PermissionGroupDeleteMutationOptions = Apollo.BaseMutationOptions<Types.PermissionGroupDeleteMutation, Types.PermissionGroupDeleteMutationVariables>;
export const PermissionGroupCreateDocument = gql`
    mutation PermissionGroupCreate($input: PermissionGroupCreateInput!) {
  permissionGroupCreate(input: $input) {
    errors {
      ...PermissionGroupError
    }
    group {
      ...PermissionGroupDetails
    }
  }
}
    ${PermissionGroupErrorFragmentDoc}
${PermissionGroupDetailsFragmentDoc}`;
export type PermissionGroupCreateMutationFn = Apollo.MutationFunction<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>;

/**
 * __usePermissionGroupCreateMutation__
 *
 * To run a mutation, you first call `usePermissionGroupCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [permissionGroupCreateMutation, { data, loading, error }] = usePermissionGroupCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePermissionGroupCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>(PermissionGroupCreateDocument, options);
      }
export type PermissionGroupCreateMutationHookResult = ReturnType<typeof usePermissionGroupCreateMutation>;
export type PermissionGroupCreateMutationResult = Apollo.MutationResult<Types.PermissionGroupCreateMutation>;
export type PermissionGroupCreateMutationOptions = Apollo.BaseMutationOptions<Types.PermissionGroupCreateMutation, Types.PermissionGroupCreateMutationVariables>;
export const PermissionGroupUpdateDocument = gql`
    mutation PermissionGroupUpdate($id: ID!, $input: PermissionGroupUpdateInput!) {
  permissionGroupUpdate(id: $id, input: $input) {
    errors {
      ...PermissionGroupError
    }
    group {
      ...PermissionGroupDetails
    }
  }
}
    ${PermissionGroupErrorFragmentDoc}
${PermissionGroupDetailsFragmentDoc}`;
export type PermissionGroupUpdateMutationFn = Apollo.MutationFunction<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>;

/**
 * __usePermissionGroupUpdateMutation__
 *
 * To run a mutation, you first call `usePermissionGroupUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [permissionGroupUpdateMutation, { data, loading, error }] = usePermissionGroupUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePermissionGroupUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>(PermissionGroupUpdateDocument, options);
      }
export type PermissionGroupUpdateMutationHookResult = ReturnType<typeof usePermissionGroupUpdateMutation>;
export type PermissionGroupUpdateMutationResult = Apollo.MutationResult<Types.PermissionGroupUpdateMutation>;
export type PermissionGroupUpdateMutationOptions = Apollo.BaseMutationOptions<Types.PermissionGroupUpdateMutation, Types.PermissionGroupUpdateMutationVariables>;
export const PermissionGroupListDocument = gql`
    query PermissionGroupList($after: String, $before: String, $first: Int, $last: Int, $filter: PermissionGroupFilterInput, $sort: PermissionGroupSortingInput) {
  permissionGroups(
    after: $after
    before: $before
    first: $first
    last: $last
    filter: $filter
    sortBy: $sort
  ) {
    edges {
      node {
        ...PermissionGroup
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PermissionGroupFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __usePermissionGroupListQuery__
 *
 * To run a query within a React component, call `usePermissionGroupListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePermissionGroupListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function usePermissionGroupListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>(PermissionGroupListDocument, options);
      }
export function usePermissionGroupListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>(PermissionGroupListDocument, options);
        }
export type PermissionGroupListQueryHookResult = ReturnType<typeof usePermissionGroupListQuery>;
export type PermissionGroupListLazyQueryHookResult = ReturnType<typeof usePermissionGroupListLazyQuery>;
export type PermissionGroupListQueryResult = Apollo.QueryResult<Types.PermissionGroupListQuery, Types.PermissionGroupListQueryVariables>;
export const PermissionGroupDetailsDocument = gql`
    query PermissionGroupDetails($id: ID!, $userId: ID!) {
  permissionGroup(id: $id) {
    ...PermissionGroupDetails
  }
  user: me {
    editableGroups {
      id
    }
    userPermissions {
      code
      sourcePermissionGroups(userId: $userId) {
        id
      }
    }
  }
}
    ${PermissionGroupDetailsFragmentDoc}`;

/**
 * __usePermissionGroupDetailsQuery__
 *
 * To run a query within a React component, call `usePermissionGroupDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionGroupDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePermissionGroupDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePermissionGroupDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>(PermissionGroupDetailsDocument, options);
      }
export function usePermissionGroupDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>(PermissionGroupDetailsDocument, options);
        }
export type PermissionGroupDetailsQueryHookResult = ReturnType<typeof usePermissionGroupDetailsQuery>;
export type PermissionGroupDetailsLazyQueryHookResult = ReturnType<typeof usePermissionGroupDetailsLazyQuery>;
export type PermissionGroupDetailsQueryResult = Apollo.QueryResult<Types.PermissionGroupDetailsQuery, Types.PermissionGroupDetailsQueryVariables>;
export const PluginUpdateDocument = gql`
    mutation PluginUpdate($channelId: ID, $id: ID!, $input: PluginUpdateInput!) {
  pluginUpdate(channelId: $channelId, id: $id, input: $input) {
    errors {
      ...PluginError
    }
    plugin {
      ...PluginsDetails
    }
  }
}
    ${PluginErrorFragmentDoc}
${PluginsDetailsFragmentDoc}`;
export type PluginUpdateMutationFn = Apollo.MutationFunction<Types.PluginUpdateMutation, Types.PluginUpdateMutationVariables>;

/**
 * __usePluginUpdateMutation__
 *
 * To run a mutation, you first call `usePluginUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePluginUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pluginUpdateMutation, { data, loading, error }] = usePluginUpdateMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePluginUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.PluginUpdateMutation, Types.PluginUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.PluginUpdateMutation, Types.PluginUpdateMutationVariables>(PluginUpdateDocument, options);
      }
export type PluginUpdateMutationHookResult = ReturnType<typeof usePluginUpdateMutation>;
export type PluginUpdateMutationResult = Apollo.MutationResult<Types.PluginUpdateMutation>;
export type PluginUpdateMutationOptions = Apollo.BaseMutationOptions<Types.PluginUpdateMutation, Types.PluginUpdateMutationVariables>;
export const PluginsDocument = gql`
    query Plugins($first: Int, $after: String, $last: Int, $before: String, $filter: PluginFilterInput, $sort: PluginSortingInput) {
  plugins(
    before: $before
    after: $after
    first: $first
    last: $last
    filter: $filter
    sortBy: $sort
  ) {
    edges {
      node {
        ...PluginBase
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
    ${PluginBaseFragmentDoc}`;

/**
 * __usePluginsQuery__
 *
 * To run a query within a React component, call `usePluginsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePluginsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePluginsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function usePluginsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.PluginsQuery, Types.PluginsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PluginsQuery, Types.PluginsQueryVariables>(PluginsDocument, options);
      }
export function usePluginsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PluginsQuery, Types.PluginsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PluginsQuery, Types.PluginsQueryVariables>(PluginsDocument, options);
        }
export type PluginsQueryHookResult = ReturnType<typeof usePluginsQuery>;
export type PluginsLazyQueryHookResult = ReturnType<typeof usePluginsLazyQuery>;
export type PluginsQueryResult = Apollo.QueryResult<Types.PluginsQuery, Types.PluginsQueryVariables>;
export const PluginDocument = gql`
    query Plugin($id: ID!) {
  plugin(id: $id) {
    ...PluginsDetails
  }
}
    ${PluginsDetailsFragmentDoc}`;

/**
 * __usePluginQuery__
 *
 * To run a query within a React component, call `usePluginQuery` and pass it any options that fit your needs.
 * When your component renders, `usePluginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePluginQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePluginQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.PluginQuery, Types.PluginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PluginQuery, Types.PluginQueryVariables>(PluginDocument, options);
      }
export function usePluginLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PluginQuery, Types.PluginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PluginQuery, Types.PluginQueryVariables>(PluginDocument, options);
        }
export type PluginQueryHookResult = ReturnType<typeof usePluginQuery>;
export type PluginLazyQueryHookResult = ReturnType<typeof usePluginLazyQuery>;
export type PluginQueryResult = Apollo.QueryResult<Types.PluginQuery, Types.PluginQueryVariables>;
export const SearchAvailableInGridAttributesDocument = gql`
    query SearchAvailableInGridAttributes($first: Int!, $after: String, $query: String!) {
  availableInGrid: attributes(
    first: $first
    after: $after
    filter: {isVariantOnly: false, type: PRODUCT_TYPE, search: $query}
  ) {
    edges {
      node {
        id
        name
      }
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchAvailableInGridAttributesQuery__
 *
 * To run a query within a React component, call `useSearchAvailableInGridAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAvailableInGridAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAvailableInGridAttributesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchAvailableInGridAttributesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchAvailableInGridAttributesQuery, Types.SearchAvailableInGridAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchAvailableInGridAttributesQuery, Types.SearchAvailableInGridAttributesQueryVariables>(SearchAvailableInGridAttributesDocument, options);
      }
export function useSearchAvailableInGridAttributesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchAvailableInGridAttributesQuery, Types.SearchAvailableInGridAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchAvailableInGridAttributesQuery, Types.SearchAvailableInGridAttributesQueryVariables>(SearchAvailableInGridAttributesDocument, options);
        }
export type SearchAvailableInGridAttributesQueryHookResult = ReturnType<typeof useSearchAvailableInGridAttributesQuery>;
export type SearchAvailableInGridAttributesLazyQueryHookResult = ReturnType<typeof useSearchAvailableInGridAttributesLazyQuery>;
export type SearchAvailableInGridAttributesQueryResult = Apollo.QueryResult<Types.SearchAvailableInGridAttributesQuery, Types.SearchAvailableInGridAttributesQueryVariables>;
export const SearchPageTypesDocument = gql`
    query SearchPageTypes($after: String, $first: Int!, $query: String!) {
  search: pageTypes(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchPageTypesQuery__
 *
 * To run a query within a React component, call `useSearchPageTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPageTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPageTypesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchPageTypesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchPageTypesQuery, Types.SearchPageTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchPageTypesQuery, Types.SearchPageTypesQueryVariables>(SearchPageTypesDocument, options);
      }
export function useSearchPageTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchPageTypesQuery, Types.SearchPageTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchPageTypesQuery, Types.SearchPageTypesQueryVariables>(SearchPageTypesDocument, options);
        }
export type SearchPageTypesQueryHookResult = ReturnType<typeof useSearchPageTypesQuery>;
export type SearchPageTypesLazyQueryHookResult = ReturnType<typeof useSearchPageTypesLazyQuery>;
export type SearchPageTypesQueryResult = Apollo.QueryResult<Types.SearchPageTypesQuery, Types.SearchPageTypesQueryVariables>;
export const SearchPermissionGroupsDocument = gql`
    query SearchPermissionGroups($after: String, $first: Int!, $query: String!) {
  search: permissionGroups(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        userCanManage
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchPermissionGroupsQuery__
 *
 * To run a query within a React component, call `useSearchPermissionGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPermissionGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPermissionGroupsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchPermissionGroupsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>(SearchPermissionGroupsDocument, options);
      }
export function useSearchPermissionGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>(SearchPermissionGroupsDocument, options);
        }
export type SearchPermissionGroupsQueryHookResult = ReturnType<typeof useSearchPermissionGroupsQuery>;
export type SearchPermissionGroupsLazyQueryHookResult = ReturnType<typeof useSearchPermissionGroupsLazyQuery>;
export type SearchPermissionGroupsQueryResult = Apollo.QueryResult<Types.SearchPermissionGroupsQuery, Types.SearchPermissionGroupsQueryVariables>;
export const SearchStaffMembersDocument = gql`
    query SearchStaffMembers($after: String, $first: Int!, $query: String!) {
  search: staffUsers(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        email
        firstName
        lastName
        isActive
        avatar {
          alt
          url
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchStaffMembersQuery__
 *
 * To run a query within a React component, call `useSearchStaffMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchStaffMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchStaffMembersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchStaffMembersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>(SearchStaffMembersDocument, options);
      }
export function useSearchStaffMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>(SearchStaffMembersDocument, options);
        }
export type SearchStaffMembersQueryHookResult = ReturnType<typeof useSearchStaffMembersQuery>;
export type SearchStaffMembersLazyQueryHookResult = ReturnType<typeof useSearchStaffMembersLazyQuery>;
export type SearchStaffMembersQueryResult = Apollo.QueryResult<Types.SearchStaffMembersQuery, Types.SearchStaffMembersQueryVariables>;
export const SearchVariantsDocument = gql`
    query SearchVariants($after: String, $first: Int!, $query: String!, $channel: String) {
  search: productVariants(
    after: $after
    first: $first
    filter: {search: $query}
    channel: $channel
  ) {
    edges {
      node {
        id
        name
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchVariantsQuery__
 *
 * To run a query within a React component, call `useSearchVariantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVariantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVariantsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useSearchVariantsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchVariantsQuery, Types.SearchVariantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchVariantsQuery, Types.SearchVariantsQueryVariables>(SearchVariantsDocument, options);
      }
export function useSearchVariantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchVariantsQuery, Types.SearchVariantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchVariantsQuery, Types.SearchVariantsQueryVariables>(SearchVariantsDocument, options);
        }
export type SearchVariantsQueryHookResult = ReturnType<typeof useSearchVariantsQuery>;
export type SearchVariantsLazyQueryHookResult = ReturnType<typeof useSearchVariantsLazyQuery>;
export type SearchVariantsQueryResult = Apollo.QueryResult<Types.SearchVariantsQuery, Types.SearchVariantsQueryVariables>;
export const SearchVariantsWithProductDataDocument = gql`
    query SearchVariantsWithProductData($after: String, $first: Int!, $query: String!, $channel: String) {
  search: productVariants(
    after: $after
    first: $first
    filter: {search: $query}
    channel: $channel
  ) {
    edges {
      node {
        id
        name
        product {
          name
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchVariantsWithProductDataQuery__
 *
 * To run a query within a React component, call `useSearchVariantsWithProductDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVariantsWithProductDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVariantsWithProductDataQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useSearchVariantsWithProductDataQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchVariantsWithProductDataQuery, Types.SearchVariantsWithProductDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchVariantsWithProductDataQuery, Types.SearchVariantsWithProductDataQueryVariables>(SearchVariantsWithProductDataDocument, options);
      }
export function useSearchVariantsWithProductDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchVariantsWithProductDataQuery, Types.SearchVariantsWithProductDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchVariantsWithProductDataQuery, Types.SearchVariantsWithProductDataQueryVariables>(SearchVariantsWithProductDataDocument, options);
        }
export type SearchVariantsWithProductDataQueryHookResult = ReturnType<typeof useSearchVariantsWithProductDataQuery>;
export type SearchVariantsWithProductDataLazyQueryHookResult = ReturnType<typeof useSearchVariantsWithProductDataLazyQuery>;
export type SearchVariantsWithProductDataQueryResult = Apollo.QueryResult<Types.SearchVariantsWithProductDataQuery, Types.SearchVariantsWithProductDataQueryVariables>;
export const StaffMemberAddDocument = gql`
    mutation StaffMemberAdd($input: StaffCreateInput!) {
  staffCreate(input: $input) {
    errors {
      ...StaffError
    }
    user {
      ...StaffMemberDetails
    }
  }
}
    ${StaffErrorFragmentDoc}
${StaffMemberDetailsFragmentDoc}`;
export type StaffMemberAddMutationFn = Apollo.MutationFunction<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>;

/**
 * __useStaffMemberAddMutation__
 *
 * To run a mutation, you first call `useStaffMemberAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffMemberAddMutation, { data, loading, error }] = useStaffMemberAddMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffMemberAddMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>(StaffMemberAddDocument, options);
      }
export type StaffMemberAddMutationHookResult = ReturnType<typeof useStaffMemberAddMutation>;
export type StaffMemberAddMutationResult = Apollo.MutationResult<Types.StaffMemberAddMutation>;
export type StaffMemberAddMutationOptions = Apollo.BaseMutationOptions<Types.StaffMemberAddMutation, Types.StaffMemberAddMutationVariables>;
export const StaffMemberUpdateDocument = gql`
    mutation StaffMemberUpdate($id: ID!, $input: StaffUpdateInput!) {
  staffUpdate(id: $id, input: $input) {
    errors {
      ...StaffError
    }
    user {
      ...StaffMemberDetails
    }
  }
}
    ${StaffErrorFragmentDoc}
${StaffMemberDetailsFragmentDoc}`;
export type StaffMemberUpdateMutationFn = Apollo.MutationFunction<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>;

/**
 * __useStaffMemberUpdateMutation__
 *
 * To run a mutation, you first call `useStaffMemberUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffMemberUpdateMutation, { data, loading, error }] = useStaffMemberUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffMemberUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>(StaffMemberUpdateDocument, options);
      }
export type StaffMemberUpdateMutationHookResult = ReturnType<typeof useStaffMemberUpdateMutation>;
export type StaffMemberUpdateMutationResult = Apollo.MutationResult<Types.StaffMemberUpdateMutation>;
export type StaffMemberUpdateMutationOptions = Apollo.BaseMutationOptions<Types.StaffMemberUpdateMutation, Types.StaffMemberUpdateMutationVariables>;
export const UserPassowrdChangeDocument = gql`
    mutation UserPassowrdChange($newPassword: String!, $oldPassword: String!) {
  passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
    errors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type UserPassowrdChangeMutationFn = Apollo.MutationFunction<Types.UserPassowrdChangeMutation, Types.UserPassowrdChangeMutationVariables>;

/**
 * __useUserPassowrdChangeMutation__
 *
 * To run a mutation, you first call `useUserPassowrdChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPassowrdChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPassowrdChangeMutation, { data, loading, error }] = useUserPassowrdChangeMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      oldPassword: // value for 'oldPassword'
 *   },
 * });
 */
export function useUserPassowrdChangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UserPassowrdChangeMutation, Types.UserPassowrdChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UserPassowrdChangeMutation, Types.UserPassowrdChangeMutationVariables>(UserPassowrdChangeDocument, options);
      }
export type UserPassowrdChangeMutationHookResult = ReturnType<typeof useUserPassowrdChangeMutation>;
export type UserPassowrdChangeMutationResult = Apollo.MutationResult<Types.UserPassowrdChangeMutation>;
export type UserPassowrdChangeMutationOptions = Apollo.BaseMutationOptions<Types.UserPassowrdChangeMutation, Types.UserPassowrdChangeMutationVariables>;
export const UserAccountUpdateDocument = gql`
    mutation UserAccountUpdate($input: AccountInput!) {
  accountUpdate(input: $input) {
    user {
      metadata {
        key
        value
      }
    }
    errors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type UserAccountUpdateMutationFn = Apollo.MutationFunction<Types.UserAccountUpdateMutation, Types.UserAccountUpdateMutationVariables>;

/**
 * __useUserAccountUpdateMutation__
 *
 * To run a mutation, you first call `useUserAccountUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserAccountUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userAccountUpdateMutation, { data, loading, error }] = useUserAccountUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserAccountUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UserAccountUpdateMutation, Types.UserAccountUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UserAccountUpdateMutation, Types.UserAccountUpdateMutationVariables>(UserAccountUpdateDocument, options);
      }
export type UserAccountUpdateMutationHookResult = ReturnType<typeof useUserAccountUpdateMutation>;
export type UserAccountUpdateMutationResult = Apollo.MutationResult<Types.UserAccountUpdateMutation>;
export type UserAccountUpdateMutationOptions = Apollo.BaseMutationOptions<Types.UserAccountUpdateMutation, Types.UserAccountUpdateMutationVariables>;
export const StaffMemberDeleteDocument = gql`
    mutation StaffMemberDelete($id: ID!) {
  staffDelete(id: $id) {
    errors {
      ...StaffError
    }
  }
}
    ${StaffErrorFragmentDoc}`;
export type StaffMemberDeleteMutationFn = Apollo.MutationFunction<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>;

/**
 * __useStaffMemberDeleteMutation__
 *
 * To run a mutation, you first call `useStaffMemberDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffMemberDeleteMutation, { data, loading, error }] = useStaffMemberDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffMemberDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>(StaffMemberDeleteDocument, options);
      }
export type StaffMemberDeleteMutationHookResult = ReturnType<typeof useStaffMemberDeleteMutation>;
export type StaffMemberDeleteMutationResult = Apollo.MutationResult<Types.StaffMemberDeleteMutation>;
export type StaffMemberDeleteMutationOptions = Apollo.BaseMutationOptions<Types.StaffMemberDeleteMutation, Types.StaffMemberDeleteMutationVariables>;
export const UserAvatarUpdateDocument = gql`
    mutation UserAvatarUpdate($image: Upload!) {
  userAvatarUpdate(image: $image) {
    errors {
      ...AccountError
    }
    user {
      id
      avatar {
        url
      }
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type UserAvatarUpdateMutationFn = Apollo.MutationFunction<Types.UserAvatarUpdateMutation, Types.UserAvatarUpdateMutationVariables>;

/**
 * __useUserAvatarUpdateMutation__
 *
 * To run a mutation, you first call `useUserAvatarUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserAvatarUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userAvatarUpdateMutation, { data, loading, error }] = useUserAvatarUpdateMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUserAvatarUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UserAvatarUpdateMutation, Types.UserAvatarUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UserAvatarUpdateMutation, Types.UserAvatarUpdateMutationVariables>(UserAvatarUpdateDocument, options);
      }
export type UserAvatarUpdateMutationHookResult = ReturnType<typeof useUserAvatarUpdateMutation>;
export type UserAvatarUpdateMutationResult = Apollo.MutationResult<Types.UserAvatarUpdateMutation>;
export type UserAvatarUpdateMutationOptions = Apollo.BaseMutationOptions<Types.UserAvatarUpdateMutation, Types.UserAvatarUpdateMutationVariables>;
export const UserAvatarDeleteDocument = gql`
    mutation UserAvatarDelete {
  userAvatarDelete {
    errors {
      ...AccountError
    }
    user {
      id
      avatar {
        url
      }
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type UserAvatarDeleteMutationFn = Apollo.MutationFunction<Types.UserAvatarDeleteMutation, Types.UserAvatarDeleteMutationVariables>;

/**
 * __useUserAvatarDeleteMutation__
 *
 * To run a mutation, you first call `useUserAvatarDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserAvatarDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userAvatarDeleteMutation, { data, loading, error }] = useUserAvatarDeleteMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserAvatarDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UserAvatarDeleteMutation, Types.UserAvatarDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UserAvatarDeleteMutation, Types.UserAvatarDeleteMutationVariables>(UserAvatarDeleteDocument, options);
      }
export type UserAvatarDeleteMutationHookResult = ReturnType<typeof useUserAvatarDeleteMutation>;
export type UserAvatarDeleteMutationResult = Apollo.MutationResult<Types.UserAvatarDeleteMutation>;
export type UserAvatarDeleteMutationOptions = Apollo.BaseMutationOptions<Types.UserAvatarDeleteMutation, Types.UserAvatarDeleteMutationVariables>;
export const ChangeUserPasswordDocument = gql`
    mutation ChangeUserPassword($newPassword: String!, $oldPassword: String!) {
  passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
    errors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type ChangeUserPasswordMutationFn = Apollo.MutationFunction<Types.ChangeUserPasswordMutation, Types.ChangeUserPasswordMutationVariables>;

/**
 * __useChangeUserPasswordMutation__
 *
 * To run a mutation, you first call `useChangeUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserPasswordMutation, { data, loading, error }] = useChangeUserPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      oldPassword: // value for 'oldPassword'
 *   },
 * });
 */
export function useChangeUserPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ChangeUserPasswordMutation, Types.ChangeUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ChangeUserPasswordMutation, Types.ChangeUserPasswordMutationVariables>(ChangeUserPasswordDocument, options);
      }
export type ChangeUserPasswordMutationHookResult = ReturnType<typeof useChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationResult = Apollo.MutationResult<Types.ChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationOptions = Apollo.BaseMutationOptions<Types.ChangeUserPasswordMutation, Types.ChangeUserPasswordMutationVariables>;
export const StaffListDocument = gql`
    query StaffList($first: Int, $after: String, $last: Int, $before: String, $filter: StaffUserInput, $sort: UserSortingInput) {
  staffUsers(
    before: $before
    after: $after
    first: $first
    last: $last
    filter: $filter
    sortBy: $sort
  ) {
    edges {
      cursor
      node {
        ...StaffMember
        avatar(size: 128) {
          url
        }
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
    ${StaffMemberFragmentDoc}`;

/**
 * __useStaffListQuery__
 *
 * To run a query within a React component, call `useStaffListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useStaffListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.StaffListQuery, Types.StaffListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.StaffListQuery, Types.StaffListQueryVariables>(StaffListDocument, options);
      }
export function useStaffListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.StaffListQuery, Types.StaffListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.StaffListQuery, Types.StaffListQueryVariables>(StaffListDocument, options);
        }
export type StaffListQueryHookResult = ReturnType<typeof useStaffListQuery>;
export type StaffListLazyQueryHookResult = ReturnType<typeof useStaffListLazyQuery>;
export type StaffListQueryResult = Apollo.QueryResult<Types.StaffListQuery, Types.StaffListQueryVariables>;
export const StaffMemberDetailsDocument = gql`
    query StaffMemberDetails($id: ID!) {
  user(id: $id) {
    ...StaffMemberDetails
  }
}
    ${StaffMemberDetailsFragmentDoc}`;

/**
 * __useStaffMemberDetailsQuery__
 *
 * To run a query within a React component, call `useStaffMemberDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffMemberDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffMemberDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>(StaffMemberDetailsDocument, options);
      }
export function useStaffMemberDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>(StaffMemberDetailsDocument, options);
        }
export type StaffMemberDetailsQueryHookResult = ReturnType<typeof useStaffMemberDetailsQuery>;
export type StaffMemberDetailsLazyQueryHookResult = ReturnType<typeof useStaffMemberDetailsLazyQuery>;
export type StaffMemberDetailsQueryResult = Apollo.QueryResult<Types.StaffMemberDetailsQuery, Types.StaffMemberDetailsQueryVariables>;
export const AddressValidationRulesDocument = gql`
    query addressValidationRules($countryCode: CountryCode!) {
  addressValidationRules(countryCode: $countryCode) {
    countryAreaChoices {
      raw
      verbose
    }
    allowedFields
  }
}
    `;

/**
 * __useAddressValidationRulesQuery__
 *
 * To run a query within a React component, call `useAddressValidationRulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressValidationRulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressValidationRulesQuery({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *   },
 * });
 */
export function useAddressValidationRulesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.AddressValidationRulesQuery, Types.AddressValidationRulesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AddressValidationRulesQuery, Types.AddressValidationRulesQueryVariables>(AddressValidationRulesDocument, options);
      }
export function useAddressValidationRulesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AddressValidationRulesQuery, Types.AddressValidationRulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AddressValidationRulesQuery, Types.AddressValidationRulesQueryVariables>(AddressValidationRulesDocument, options);
        }
export type AddressValidationRulesQueryHookResult = ReturnType<typeof useAddressValidationRulesQuery>;
export type AddressValidationRulesLazyQueryHookResult = ReturnType<typeof useAddressValidationRulesLazyQuery>;
export type AddressValidationRulesQueryResult = Apollo.QueryResult<Types.AddressValidationRulesQuery, Types.AddressValidationRulesQueryVariables>;
export const _GetDynamicLeftOperandsDocument = gql`
    query _GetDynamicLeftOperands($first: Int!, $query: String!) {
  attributes(
    first: $first
    search: $query
    where: {type: {eq: PRODUCT_TYPE}, inputType: {oneOf: [DROPDOWN, MULTISELECT, BOOLEAN, NUMERIC, DATE, DATE_TIME, SWATCH]}}
  ) {
    edges {
      node {
        id
        name
        slug
        inputType
        __typename
      }
      __typename
    }
    __typename
  }
}
    `;

/**
 * __use_GetDynamicLeftOperandsQuery__
 *
 * To run a query within a React component, call `use_GetDynamicLeftOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetDynamicLeftOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetDynamicLeftOperandsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetDynamicLeftOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetDynamicLeftOperandsQuery, Types._GetDynamicLeftOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetDynamicLeftOperandsQuery, Types._GetDynamicLeftOperandsQueryVariables>(_GetDynamicLeftOperandsDocument, options);
      }
export function use_GetDynamicLeftOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetDynamicLeftOperandsQuery, Types._GetDynamicLeftOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetDynamicLeftOperandsQuery, Types._GetDynamicLeftOperandsQueryVariables>(_GetDynamicLeftOperandsDocument, options);
        }
export type _GetDynamicLeftOperandsQueryHookResult = ReturnType<typeof use_GetDynamicLeftOperandsQuery>;
export type _GetDynamicLeftOperandsLazyQueryHookResult = ReturnType<typeof use_GetDynamicLeftOperandsLazyQuery>;
export type _GetDynamicLeftOperandsQueryResult = Apollo.QueryResult<Types._GetDynamicLeftOperandsQuery, Types._GetDynamicLeftOperandsQueryVariables>;
export const _GetChannelOperandsDocument = gql`
    query _GetChannelOperands {
  channels {
    id: slug
    name
    slug
  }
}
    `;

/**
 * __use_GetChannelOperandsQuery__
 *
 * To run a query within a React component, call `use_GetChannelOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetChannelOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetChannelOperandsQuery({
 *   variables: {
 *   },
 * });
 */
export function use_GetChannelOperandsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types._GetChannelOperandsQuery, Types._GetChannelOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetChannelOperandsQuery, Types._GetChannelOperandsQueryVariables>(_GetChannelOperandsDocument, options);
      }
export function use_GetChannelOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetChannelOperandsQuery, Types._GetChannelOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetChannelOperandsQuery, Types._GetChannelOperandsQueryVariables>(_GetChannelOperandsDocument, options);
        }
export type _GetChannelOperandsQueryHookResult = ReturnType<typeof use_GetChannelOperandsQuery>;
export type _GetChannelOperandsLazyQueryHookResult = ReturnType<typeof use_GetChannelOperandsLazyQuery>;
export type _GetChannelOperandsQueryResult = Apollo.QueryResult<Types._GetChannelOperandsQuery, Types._GetChannelOperandsQueryVariables>;
export const _GetLegacyChannelOperandsDocument = gql`
    query _GetLegacyChannelOperands {
  channels {
    id
    name
    slug
  }
}
    `;

/**
 * __use_GetLegacyChannelOperandsQuery__
 *
 * To run a query within a React component, call `use_GetLegacyChannelOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetLegacyChannelOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetLegacyChannelOperandsQuery({
 *   variables: {
 *   },
 * });
 */
export function use_GetLegacyChannelOperandsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types._GetLegacyChannelOperandsQuery, Types._GetLegacyChannelOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetLegacyChannelOperandsQuery, Types._GetLegacyChannelOperandsQueryVariables>(_GetLegacyChannelOperandsDocument, options);
      }
export function use_GetLegacyChannelOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetLegacyChannelOperandsQuery, Types._GetLegacyChannelOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetLegacyChannelOperandsQuery, Types._GetLegacyChannelOperandsQueryVariables>(_GetLegacyChannelOperandsDocument, options);
        }
export type _GetLegacyChannelOperandsQueryHookResult = ReturnType<typeof use_GetLegacyChannelOperandsQuery>;
export type _GetLegacyChannelOperandsLazyQueryHookResult = ReturnType<typeof use_GetLegacyChannelOperandsLazyQuery>;
export type _GetLegacyChannelOperandsQueryResult = Apollo.QueryResult<Types._GetLegacyChannelOperandsQuery, Types._GetLegacyChannelOperandsQueryVariables>;
export const _SearchCollectionsOperandsDocument = gql`
    query _SearchCollectionsOperands($first: Int!, $collectionsSlugs: [String!]) {
  collections(first: $first, filter: {slugs: $collectionsSlugs}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_SearchCollectionsOperandsQuery__
 *
 * To run a query within a React component, call `use_SearchCollectionsOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_SearchCollectionsOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_SearchCollectionsOperandsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      collectionsSlugs: // value for 'collectionsSlugs'
 *   },
 * });
 */
export function use_SearchCollectionsOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._SearchCollectionsOperandsQuery, Types._SearchCollectionsOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._SearchCollectionsOperandsQuery, Types._SearchCollectionsOperandsQueryVariables>(_SearchCollectionsOperandsDocument, options);
      }
export function use_SearchCollectionsOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._SearchCollectionsOperandsQuery, Types._SearchCollectionsOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._SearchCollectionsOperandsQuery, Types._SearchCollectionsOperandsQueryVariables>(_SearchCollectionsOperandsDocument, options);
        }
export type _SearchCollectionsOperandsQueryHookResult = ReturnType<typeof use_SearchCollectionsOperandsQuery>;
export type _SearchCollectionsOperandsLazyQueryHookResult = ReturnType<typeof use_SearchCollectionsOperandsLazyQuery>;
export type _SearchCollectionsOperandsQueryResult = Apollo.QueryResult<Types._SearchCollectionsOperandsQuery, Types._SearchCollectionsOperandsQueryVariables>;
export const _SearchCategoriesOperandsDocument = gql`
    query _SearchCategoriesOperands($after: String, $first: Int!, $categoriesSlugs: [String!]) {
  categories(after: $after, first: $first, filter: {slugs: $categoriesSlugs}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_SearchCategoriesOperandsQuery__
 *
 * To run a query within a React component, call `use_SearchCategoriesOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_SearchCategoriesOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_SearchCategoriesOperandsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      categoriesSlugs: // value for 'categoriesSlugs'
 *   },
 * });
 */
export function use_SearchCategoriesOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._SearchCategoriesOperandsQuery, Types._SearchCategoriesOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._SearchCategoriesOperandsQuery, Types._SearchCategoriesOperandsQueryVariables>(_SearchCategoriesOperandsDocument, options);
      }
export function use_SearchCategoriesOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._SearchCategoriesOperandsQuery, Types._SearchCategoriesOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._SearchCategoriesOperandsQuery, Types._SearchCategoriesOperandsQueryVariables>(_SearchCategoriesOperandsDocument, options);
        }
export type _SearchCategoriesOperandsQueryHookResult = ReturnType<typeof use_SearchCategoriesOperandsQuery>;
export type _SearchCategoriesOperandsLazyQueryHookResult = ReturnType<typeof use_SearchCategoriesOperandsLazyQuery>;
export type _SearchCategoriesOperandsQueryResult = Apollo.QueryResult<Types._SearchCategoriesOperandsQuery, Types._SearchCategoriesOperandsQueryVariables>;
export const _SearchProductTypesOperandsDocument = gql`
    query _SearchProductTypesOperands($after: String, $first: Int!, $productTypesSlugs: [String!]) {
  productTypes(after: $after, first: $first, filter: {slugs: $productTypesSlugs}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_SearchProductTypesOperandsQuery__
 *
 * To run a query within a React component, call `use_SearchProductTypesOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_SearchProductTypesOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_SearchProductTypesOperandsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      productTypesSlugs: // value for 'productTypesSlugs'
 *   },
 * });
 */
export function use_SearchProductTypesOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._SearchProductTypesOperandsQuery, Types._SearchProductTypesOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._SearchProductTypesOperandsQuery, Types._SearchProductTypesOperandsQueryVariables>(_SearchProductTypesOperandsDocument, options);
      }
export function use_SearchProductTypesOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._SearchProductTypesOperandsQuery, Types._SearchProductTypesOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._SearchProductTypesOperandsQuery, Types._SearchProductTypesOperandsQueryVariables>(_SearchProductTypesOperandsDocument, options);
        }
export type _SearchProductTypesOperandsQueryHookResult = ReturnType<typeof use_SearchProductTypesOperandsQuery>;
export type _SearchProductTypesOperandsLazyQueryHookResult = ReturnType<typeof use_SearchProductTypesOperandsLazyQuery>;
export type _SearchProductTypesOperandsQueryResult = Apollo.QueryResult<Types._SearchProductTypesOperandsQuery, Types._SearchProductTypesOperandsQueryVariables>;
export const _SearchPageTypesOperandsDocument = gql`
    query _SearchPageTypesOperands($first: Int!, $pageTypesSlugs: [String!]) {
  pageTypes(first: $first, filter: {slugs: $pageTypesSlugs}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_SearchPageTypesOperandsQuery__
 *
 * To run a query within a React component, call `use_SearchPageTypesOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_SearchPageTypesOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_SearchPageTypesOperandsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      pageTypesSlugs: // value for 'pageTypesSlugs'
 *   },
 * });
 */
export function use_SearchPageTypesOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._SearchPageTypesOperandsQuery, Types._SearchPageTypesOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._SearchPageTypesOperandsQuery, Types._SearchPageTypesOperandsQueryVariables>(_SearchPageTypesOperandsDocument, options);
      }
export function use_SearchPageTypesOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._SearchPageTypesOperandsQuery, Types._SearchPageTypesOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._SearchPageTypesOperandsQuery, Types._SearchPageTypesOperandsQueryVariables>(_SearchPageTypesOperandsDocument, options);
        }
export type _SearchPageTypesOperandsQueryHookResult = ReturnType<typeof use_SearchPageTypesOperandsQuery>;
export type _SearchPageTypesOperandsLazyQueryHookResult = ReturnType<typeof use_SearchPageTypesOperandsLazyQuery>;
export type _SearchPageTypesOperandsQueryResult = Apollo.QueryResult<Types._SearchPageTypesOperandsQuery, Types._SearchPageTypesOperandsQueryVariables>;
export const _SearchAttributeOperandsDocument = gql`
    query _SearchAttributeOperands($attributesSlugs: [String!], $choicesIds: [ID!], $first: Int!) {
  attributes(first: $first, filter: {slugs: $attributesSlugs}) {
    edges {
      node {
        id
        name
        slug
        inputType
        choices(first: 5, filter: {ids: $choicesIds}) {
          edges {
            node {
              slug: id
              id
              name
              originalSlug: slug
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __use_SearchAttributeOperandsQuery__
 *
 * To run a query within a React component, call `use_SearchAttributeOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_SearchAttributeOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_SearchAttributeOperandsQuery({
 *   variables: {
 *      attributesSlugs: // value for 'attributesSlugs'
 *      choicesIds: // value for 'choicesIds'
 *      first: // value for 'first'
 *   },
 * });
 */
export function use_SearchAttributeOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._SearchAttributeOperandsQuery, Types._SearchAttributeOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._SearchAttributeOperandsQuery, Types._SearchAttributeOperandsQueryVariables>(_SearchAttributeOperandsDocument, options);
      }
export function use_SearchAttributeOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._SearchAttributeOperandsQuery, Types._SearchAttributeOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._SearchAttributeOperandsQuery, Types._SearchAttributeOperandsQueryVariables>(_SearchAttributeOperandsDocument, options);
        }
export type _SearchAttributeOperandsQueryHookResult = ReturnType<typeof use_SearchAttributeOperandsQuery>;
export type _SearchAttributeOperandsLazyQueryHookResult = ReturnType<typeof use_SearchAttributeOperandsLazyQuery>;
export type _SearchAttributeOperandsQueryResult = Apollo.QueryResult<Types._SearchAttributeOperandsQuery, Types._SearchAttributeOperandsQueryVariables>;
export const _GetAttributeChoicesDocument = gql`
    query _GetAttributeChoices($slug: String!, $first: Int!, $query: String!) {
  attribute(slug: $slug) {
    choices(first: $first, filter: {search: $query}) {
      edges {
        node {
          slug: id
          id
          name
          originalSlug: slug
        }
      }
    }
  }
}
    `;

/**
 * __use_GetAttributeChoicesQuery__
 *
 * To run a query within a React component, call `use_GetAttributeChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetAttributeChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetAttributeChoicesQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetAttributeChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetAttributeChoicesQuery, Types._GetAttributeChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetAttributeChoicesQuery, Types._GetAttributeChoicesQueryVariables>(_GetAttributeChoicesDocument, options);
      }
export function use_GetAttributeChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetAttributeChoicesQuery, Types._GetAttributeChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetAttributeChoicesQuery, Types._GetAttributeChoicesQueryVariables>(_GetAttributeChoicesDocument, options);
        }
export type _GetAttributeChoicesQueryHookResult = ReturnType<typeof use_GetAttributeChoicesQuery>;
export type _GetAttributeChoicesLazyQueryHookResult = ReturnType<typeof use_GetAttributeChoicesLazyQuery>;
export type _GetAttributeChoicesQueryResult = Apollo.QueryResult<Types._GetAttributeChoicesQuery, Types._GetAttributeChoicesQueryVariables>;
export const _GetCollectionsChoicesDocument = gql`
    query _GetCollectionsChoices($first: Int!, $query: String!) {
  collections(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_GetCollectionsChoicesQuery__
 *
 * To run a query within a React component, call `use_GetCollectionsChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetCollectionsChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetCollectionsChoicesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetCollectionsChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetCollectionsChoicesQuery, Types._GetCollectionsChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetCollectionsChoicesQuery, Types._GetCollectionsChoicesQueryVariables>(_GetCollectionsChoicesDocument, options);
      }
export function use_GetCollectionsChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetCollectionsChoicesQuery, Types._GetCollectionsChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetCollectionsChoicesQuery, Types._GetCollectionsChoicesQueryVariables>(_GetCollectionsChoicesDocument, options);
        }
export type _GetCollectionsChoicesQueryHookResult = ReturnType<typeof use_GetCollectionsChoicesQuery>;
export type _GetCollectionsChoicesLazyQueryHookResult = ReturnType<typeof use_GetCollectionsChoicesLazyQuery>;
export type _GetCollectionsChoicesQueryResult = Apollo.QueryResult<Types._GetCollectionsChoicesQuery, Types._GetCollectionsChoicesQueryVariables>;
export const _GetCategoriesChoicesDocument = gql`
    query _GetCategoriesChoices($first: Int!, $query: String!) {
  categories(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_GetCategoriesChoicesQuery__
 *
 * To run a query within a React component, call `use_GetCategoriesChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetCategoriesChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetCategoriesChoicesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetCategoriesChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetCategoriesChoicesQuery, Types._GetCategoriesChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetCategoriesChoicesQuery, Types._GetCategoriesChoicesQueryVariables>(_GetCategoriesChoicesDocument, options);
      }
export function use_GetCategoriesChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetCategoriesChoicesQuery, Types._GetCategoriesChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetCategoriesChoicesQuery, Types._GetCategoriesChoicesQueryVariables>(_GetCategoriesChoicesDocument, options);
        }
export type _GetCategoriesChoicesQueryHookResult = ReturnType<typeof use_GetCategoriesChoicesQuery>;
export type _GetCategoriesChoicesLazyQueryHookResult = ReturnType<typeof use_GetCategoriesChoicesLazyQuery>;
export type _GetCategoriesChoicesQueryResult = Apollo.QueryResult<Types._GetCategoriesChoicesQuery, Types._GetCategoriesChoicesQueryVariables>;
export const _GetProductTypesChoicesDocument = gql`
    query _GetProductTypesChoices($first: Int!, $query: String!) {
  productTypes(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_GetProductTypesChoicesQuery__
 *
 * To run a query within a React component, call `use_GetProductTypesChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetProductTypesChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetProductTypesChoicesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetProductTypesChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetProductTypesChoicesQuery, Types._GetProductTypesChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetProductTypesChoicesQuery, Types._GetProductTypesChoicesQueryVariables>(_GetProductTypesChoicesDocument, options);
      }
export function use_GetProductTypesChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetProductTypesChoicesQuery, Types._GetProductTypesChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetProductTypesChoicesQuery, Types._GetProductTypesChoicesQueryVariables>(_GetProductTypesChoicesDocument, options);
        }
export type _GetProductTypesChoicesQueryHookResult = ReturnType<typeof use_GetProductTypesChoicesQuery>;
export type _GetProductTypesChoicesLazyQueryHookResult = ReturnType<typeof use_GetProductTypesChoicesLazyQuery>;
export type _GetProductTypesChoicesQueryResult = Apollo.QueryResult<Types._GetProductTypesChoicesQuery, Types._GetProductTypesChoicesQueryVariables>;
export const _GetPageTypesChoicesDocument = gql`
    query _GetPageTypesChoices($first: Int!, $query: String!) {
  pageTypes(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_GetPageTypesChoicesQuery__
 *
 * To run a query within a React component, call `use_GetPageTypesChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetPageTypesChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetPageTypesChoicesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetPageTypesChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetPageTypesChoicesQuery, Types._GetPageTypesChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetPageTypesChoicesQuery, Types._GetPageTypesChoicesQueryVariables>(_GetPageTypesChoicesDocument, options);
      }
export function use_GetPageTypesChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetPageTypesChoicesQuery, Types._GetPageTypesChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetPageTypesChoicesQuery, Types._GetPageTypesChoicesQueryVariables>(_GetPageTypesChoicesDocument, options);
        }
export type _GetPageTypesChoicesQueryHookResult = ReturnType<typeof use_GetPageTypesChoicesQuery>;
export type _GetPageTypesChoicesLazyQueryHookResult = ReturnType<typeof use_GetPageTypesChoicesLazyQuery>;
export type _GetPageTypesChoicesQueryResult = Apollo.QueryResult<Types._GetPageTypesChoicesQuery, Types._GetPageTypesChoicesQueryVariables>;
export const _GetProductChoicesDocument = gql`
    query _GetProductChoices($first: Int!, $query: String!) {
  products(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_GetProductChoicesQuery__
 *
 * To run a query within a React component, call `use_GetProductChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetProductChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetProductChoicesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetProductChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetProductChoicesQuery, Types._GetProductChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetProductChoicesQuery, Types._GetProductChoicesQueryVariables>(_GetProductChoicesDocument, options);
      }
export function use_GetProductChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetProductChoicesQuery, Types._GetProductChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetProductChoicesQuery, Types._GetProductChoicesQueryVariables>(_GetProductChoicesDocument, options);
        }
export type _GetProductChoicesQueryHookResult = ReturnType<typeof use_GetProductChoicesQuery>;
export type _GetProductChoicesLazyQueryHookResult = ReturnType<typeof use_GetProductChoicesLazyQuery>;
export type _GetProductChoicesQueryResult = Apollo.QueryResult<Types._GetProductChoicesQuery, Types._GetProductChoicesQueryVariables>;
export const _GetGiftCardTagsChoicesDocument = gql`
    query _GetGiftCardTagsChoices($first: Int!, $query: String!) {
  giftCardTags(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

/**
 * __use_GetGiftCardTagsChoicesQuery__
 *
 * To run a query within a React component, call `use_GetGiftCardTagsChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetGiftCardTagsChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetGiftCardTagsChoicesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetGiftCardTagsChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetGiftCardTagsChoicesQuery, Types._GetGiftCardTagsChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetGiftCardTagsChoicesQuery, Types._GetGiftCardTagsChoicesQueryVariables>(_GetGiftCardTagsChoicesDocument, options);
      }
export function use_GetGiftCardTagsChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetGiftCardTagsChoicesQuery, Types._GetGiftCardTagsChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetGiftCardTagsChoicesQuery, Types._GetGiftCardTagsChoicesQueryVariables>(_GetGiftCardTagsChoicesDocument, options);
        }
export type _GetGiftCardTagsChoicesQueryHookResult = ReturnType<typeof use_GetGiftCardTagsChoicesQuery>;
export type _GetGiftCardTagsChoicesLazyQueryHookResult = ReturnType<typeof use_GetGiftCardTagsChoicesLazyQuery>;
export type _GetGiftCardTagsChoicesQueryResult = Apollo.QueryResult<Types._GetGiftCardTagsChoicesQuery, Types._GetGiftCardTagsChoicesQueryVariables>;
export const _GetCustomersChoicesDocument = gql`
    query _GetCustomersChoices($first: Int!, $query: String!) {
  customers(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        email
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __use_GetCustomersChoicesQuery__
 *
 * To run a query within a React component, call `use_GetCustomersChoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `use_GetCustomersChoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_GetCustomersChoicesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function use_GetCustomersChoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._GetCustomersChoicesQuery, Types._GetCustomersChoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._GetCustomersChoicesQuery, Types._GetCustomersChoicesQueryVariables>(_GetCustomersChoicesDocument, options);
      }
export function use_GetCustomersChoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._GetCustomersChoicesQuery, Types._GetCustomersChoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._GetCustomersChoicesQuery, Types._GetCustomersChoicesQueryVariables>(_GetCustomersChoicesDocument, options);
        }
export type _GetCustomersChoicesQueryHookResult = ReturnType<typeof use_GetCustomersChoicesQuery>;
export type _GetCustomersChoicesLazyQueryHookResult = ReturnType<typeof use_GetCustomersChoicesLazyQuery>;
export type _GetCustomersChoicesQueryResult = Apollo.QueryResult<Types._GetCustomersChoicesQuery, Types._GetCustomersChoicesQueryVariables>;
export const _SearchCustomersOperandsDocument = gql`
    query _SearchCustomersOperands($first: Int!, $customersIds: [ID!]) {
  customers(first: $first, filter: {ids: $customersIds}) {
    edges {
      node {
        id
        email
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __use_SearchCustomersOperandsQuery__
 *
 * To run a query within a React component, call `use_SearchCustomersOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_SearchCustomersOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_SearchCustomersOperandsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      customersIds: // value for 'customersIds'
 *   },
 * });
 */
export function use_SearchCustomersOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._SearchCustomersOperandsQuery, Types._SearchCustomersOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._SearchCustomersOperandsQuery, Types._SearchCustomersOperandsQueryVariables>(_SearchCustomersOperandsDocument, options);
      }
export function use_SearchCustomersOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._SearchCustomersOperandsQuery, Types._SearchCustomersOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._SearchCustomersOperandsQuery, Types._SearchCustomersOperandsQueryVariables>(_SearchCustomersOperandsDocument, options);
        }
export type _SearchCustomersOperandsQueryHookResult = ReturnType<typeof use_SearchCustomersOperandsQuery>;
export type _SearchCustomersOperandsLazyQueryHookResult = ReturnType<typeof use_SearchCustomersOperandsLazyQuery>;
export type _SearchCustomersOperandsQueryResult = Apollo.QueryResult<Types._SearchCustomersOperandsQuery, Types._SearchCustomersOperandsQueryVariables>;
export const _SearchProductOperandsDocument = gql`
    query _SearchProductOperands($first: Int!, $productsIds: [ID!]) {
  products(first: $first, filter: {ids: $productsIds}) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `;

/**
 * __use_SearchProductOperandsQuery__
 *
 * To run a query within a React component, call `use_SearchProductOperandsQuery` and pass it any options that fit your needs.
 * When your component renders, `use_SearchProductOperandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_SearchProductOperandsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      productsIds: // value for 'productsIds'
 *   },
 * });
 */
export function use_SearchProductOperandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types._SearchProductOperandsQuery, Types._SearchProductOperandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types._SearchProductOperandsQuery, Types._SearchProductOperandsQueryVariables>(_SearchProductOperandsDocument, options);
      }
export function use_SearchProductOperandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types._SearchProductOperandsQuery, Types._SearchProductOperandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types._SearchProductOperandsQuery, Types._SearchProductOperandsQueryVariables>(_SearchProductOperandsDocument, options);
        }
export type _SearchProductOperandsQueryHookResult = ReturnType<typeof use_SearchProductOperandsQuery>;
export type _SearchProductOperandsLazyQueryHookResult = ReturnType<typeof use_SearchProductOperandsLazyQuery>;
export type _SearchProductOperandsQueryResult = Apollo.QueryResult<Types._SearchProductOperandsQuery, Types._SearchProductOperandsQueryVariables>;
export const TriggerWebhookDryRunDocument = gql`
    mutation TriggerWebhookDryRun($objectId: ID!, $query: String!) {
  webhookDryRun(objectId: $objectId, query: $query) {
    payload
    errors {
      field
      message
    }
  }
}
    `;
export type TriggerWebhookDryRunMutationFn = Apollo.MutationFunction<Types.TriggerWebhookDryRunMutation, Types.TriggerWebhookDryRunMutationVariables>;

/**
 * __useTriggerWebhookDryRunMutation__
 *
 * To run a mutation, you first call `useTriggerWebhookDryRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTriggerWebhookDryRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [triggerWebhookDryRunMutation, { data, loading, error }] = useTriggerWebhookDryRunMutation({
 *   variables: {
 *      objectId: // value for 'objectId'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useTriggerWebhookDryRunMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.TriggerWebhookDryRunMutation, Types.TriggerWebhookDryRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.TriggerWebhookDryRunMutation, Types.TriggerWebhookDryRunMutationVariables>(TriggerWebhookDryRunDocument, options);
      }
export type TriggerWebhookDryRunMutationHookResult = ReturnType<typeof useTriggerWebhookDryRunMutation>;
export type TriggerWebhookDryRunMutationResult = Apollo.MutationResult<Types.TriggerWebhookDryRunMutation>;
export type TriggerWebhookDryRunMutationOptions = Apollo.BaseMutationOptions<Types.TriggerWebhookDryRunMutation, Types.TriggerWebhookDryRunMutationVariables>;
export const CheckoutListDocument = gql`
    query CheckoutList($first: Int, $after: String, $last: Int, $before: String) {
  checkouts(before: $before, after: $after, first: $first, last: $last) {
    edges {
      cursor
      node {
        id
        created
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __useCheckoutListQuery__
 *
 * To run a query within a React component, call `useCheckoutListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useCheckoutListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.CheckoutListQuery, Types.CheckoutListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.CheckoutListQuery, Types.CheckoutListQueryVariables>(CheckoutListDocument, options);
      }
export function useCheckoutListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.CheckoutListQuery, Types.CheckoutListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.CheckoutListQuery, Types.CheckoutListQueryVariables>(CheckoutListDocument, options);
        }
export type CheckoutListQueryHookResult = ReturnType<typeof useCheckoutListQuery>;
export type CheckoutListLazyQueryHookResult = ReturnType<typeof useCheckoutListLazyQuery>;
export type CheckoutListQueryResult = Apollo.QueryResult<Types.CheckoutListQuery, Types.CheckoutListQueryVariables>;
export const ChannelListDocument = gql`
    query ChannelList {
  channels {
    id
    name
  }
}
    `;

/**
 * __useChannelListQuery__
 *
 * To run a query within a React component, call `useChannelListQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelListQuery({
 *   variables: {
 *   },
 * });
 */
export function useChannelListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.ChannelListQuery, Types.ChannelListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ChannelListQuery, Types.ChannelListQueryVariables>(ChannelListDocument, options);
      }
export function useChannelListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ChannelListQuery, Types.ChannelListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ChannelListQuery, Types.ChannelListQueryVariables>(ChannelListDocument, options);
        }
export type ChannelListQueryHookResult = ReturnType<typeof useChannelListQuery>;
export type ChannelListLazyQueryHookResult = ReturnType<typeof useChannelListLazyQuery>;
export type ChannelListQueryResult = Apollo.QueryResult<Types.ChannelListQuery, Types.ChannelListQueryVariables>;