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
export const AttributeFragmentDoc = gql`
    fragment Attribute on Attribute {
  id
  name
  slug
  type
  visibleInStorefront
  filterableInDashboard
  filterableInStorefront
  unit
  inputType
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
export const AttributeDetailsFragmentDoc = gql`
    fragment AttributeDetails on Attribute {
  ...Attribute
  ...Metadata
  availableInGrid
  inputType
  entityType
  unit
  storefrontSearchPosition
  valueRequired
}
    ${AttributeFragmentDoc}
${MetadataFragmentDoc}`;
export const AvailableAttributeFragmentDoc = gql`
    fragment AvailableAttribute on Attribute {
  id
  name
  slug
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
export const WarehouseFragmentDoc = gql`
    fragment Warehouse on Warehouse {
  id
  name
}
    `;
export const ChannelDetailsFragmentDoc = gql`
    fragment ChannelDetails on Channel {
  ...Channel
  hasOrders
  warehouses {
    ...Warehouse
  }
  orderSettings {
    markAsPaidStrategy
    deleteExpiredOrdersAfter
    allowUnpaidOrders
  }
  paymentSettings {
    defaultTransactionFlowStrategy
  }
  checkoutSettings {
    automaticallyCompleteFullyPaidCheckouts
  }
}
    ${ChannelFragmentDoc}
${WarehouseFragmentDoc}`;
export const CollectionFragmentDoc = gql`
    fragment Collection on Collection {
  id
  name
  channelListings {
    isPublished
    publishedAt
    channel {
      id
      name
    }
  }
}
    `;
export const CollectionDetailsFragmentDoc = gql`
    fragment CollectionDetails on Collection {
  ...Collection
  ...Metadata
  backgroundImage {
    alt
    url
  }
  slug
  description
  seoDescription
  seoTitle
}
    ${CollectionFragmentDoc}
${MetadataFragmentDoc}`;
export const ChannelListingProductWithoutPricingFragmentDoc = gql`
    fragment ChannelListingProductWithoutPricing on ProductChannelListing {
  id
  isPublished
  publishedAt
  isAvailableForPurchase
  availableForPurchaseAt
  visibleInListings
  channel {
    id
    name
    currencyCode
  }
}
    `;
export const CollectionProductFragmentDoc = gql`
    fragment CollectionProduct on Product {
  id
  name
  productType {
    id
    name
  }
  thumbnail {
    url
  }
  channelListings {
    ...ChannelListingProductWithoutPricing
  }
}
    ${ChannelListingProductWithoutPricingFragmentDoc}`;
export const CustomerFragmentDoc = gql`
    fragment Customer on User {
  id
  email
  firstName
  lastName
}
    `;
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
export const CustomerDetailsFragmentDoc = gql`
    fragment CustomerDetails on User {
  ...Customer
  dateJoined
  lastLogin
  defaultShippingAddress {
    ...Address
  }
  defaultBillingAddress {
    ...Address
  }
  note
  isActive
}
    ${CustomerFragmentDoc}
${AddressFragmentDoc}`;
export const CustomerAddressesFragmentDoc = gql`
    fragment CustomerAddresses on User {
  ...Customer
  addresses {
    ...Address
  }
  defaultBillingAddress {
    id
  }
  defaultShippingAddress {
    id
  }
}
    ${CustomerFragmentDoc}
${AddressFragmentDoc}`;
export const SaleFragmentDoc = gql`
    fragment Sale on Sale {
  ...Metadata
  id
  name
  type
  startDate
  endDate
  channelListings {
    id
    channel {
      id
      name
      currencyCode
    }
    discountValue
    currency
  }
}
    ${MetadataFragmentDoc}`;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}
    `;
export const SaleDetailsFragmentDoc = gql`
    fragment SaleDetails on Sale {
  ...Sale
  variantsCount: variants {
    totalCount
  }
  productsCount: products {
    totalCount
  }
  collectionsCount: collections {
    totalCount
  }
  categoriesCount: categories {
    totalCount
  }
  variants(after: $after, before: $before, first: $first, last: $last) @include(if: $includeVariants) {
    edges {
      node {
        id
        name
        product {
          id
          name
          thumbnail {
            url
          }
          productType {
            id
            name
          }
          channelListings {
            ...ChannelListingProductWithoutPricing
          }
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
  products(after: $after, before: $before, first: $first, last: $last) @include(if: $includeProducts) {
    edges {
      node {
        id
        name
        productType {
          id
          name
        }
        thumbnail {
          url
        }
        channelListings {
          ...ChannelListingProductWithoutPricing
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
  categories(after: $after, before: $before, first: $first, last: $last) @include(if: $includeCategories) {
    edges {
      node {
        id
        name
        products {
          totalCount
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
  collections(after: $after, before: $before, first: $first, last: $last) @include(if: $includeCollections) {
    edges {
      node {
        id
        name
        products {
          totalCount
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${SaleFragmentDoc}
${ChannelListingProductWithoutPricingFragmentDoc}
${PageInfoFragmentDoc}`;
export const VoucherCodeFragmentDoc = gql`
    fragment VoucherCode on VoucherCode {
  code
  used
  isActive
}
    `;
export const VoucherFragmentDoc = gql`
    fragment Voucher on Voucher {
  ...Metadata
  id
  name
  startDate
  endDate
  usageLimit
  type
  discountValueType
  countries {
    code
    country
  }
  minCheckoutItemsQuantity
  channelListings {
    id
    channel {
      id
      name
      currencyCode
    }
    discountValue
    currency
    minSpent {
      amount
      currency
    }
  }
}
    ${MetadataFragmentDoc}`;
export const VoucherDetailsFragmentDoc = gql`
    fragment VoucherDetails on Voucher {
  ...Voucher
  usageLimit
  used
  applyOncePerOrder
  applyOncePerCustomer
  onlyForStaff
  singleUse
  productsCount: products {
    totalCount
  }
  collectionsCount: collections {
    totalCount
  }
  categoriesCount: categories {
    totalCount
  }
  products(after: $after, before: $before, first: $first, last: $last) @include(if: $includeProducts) {
    edges {
      node {
        id
        name
        productType {
          id
          name
        }
        thumbnail {
          url
        }
        channelListings {
          ...ChannelListingProductWithoutPricing
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
  collections(after: $after, before: $before, first: $first, last: $last) @include(if: $includeCollections) {
    edges {
      node {
        id
        name
        products {
          totalCount
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
  categories(after: $after, before: $before, first: $first, last: $last) @include(if: $includeCategories) {
    edges {
      node {
        id
        name
        products {
          totalCount
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${VoucherFragmentDoc}
${ChannelListingProductWithoutPricingFragmentDoc}
${PageInfoFragmentDoc}`;
export const PromotionRuleChannelFragmentDoc = gql`
    fragment PromotionRuleChannel on Channel {
  id
  isActive
  name
  slug
  currencyCode
  defaultCountry {
    code
    country
  }
}
    `;
export const PromotionRuleDetailsFragmentDoc = gql`
    fragment PromotionRuleDetails on PromotionRule {
  id
  name
  description
  channels {
    ...PromotionRuleChannel
  }
  giftIds
  rewardType
  rewardValueType
  rewardValue
  cataloguePredicate
  orderPredicate
}
    ${PromotionRuleChannelFragmentDoc}`;
export const PromotionDetailsFragmentDoc = gql`
    fragment PromotionDetails on Promotion {
  id
  name
  type
  description
  startDate
  endDate
  type
  rules {
    ...PromotionRuleDetails
  }
}
    ${PromotionRuleDetailsFragmentDoc}`;
export const PromotionFragmentDoc = gql`
    fragment Promotion on Promotion {
  ...Metadata
  id
  name
  startDate
  endDate
  type
}
    ${MetadataFragmentDoc}`;
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
export const GiftCardsSettingsFragmentDoc = gql`
    fragment GiftCardsSettings on GiftCardSettings {
  expiryType
  expiryPeriod {
    type
    amount
  }
}
    `;
export const MoneyFragmentDoc = gql`
    fragment Money on Money {
  amount
  currency
}
    `;
export const GiftCardEventFragmentDoc = gql`
    fragment GiftCardEvent on GiftCardEvent {
  expiryDate
  oldExpiryDate
  id
  date
  type
  message
  email
  orderId
  orderNumber
  tags
  oldTags
  balance {
    initialBalance {
      ...Money
    }
    currentBalance {
      ...Money
    }
    oldInitialBalance {
      ...Money
    }
    oldCurrentBalance {
      ...Money
    }
  }
}
    ${MoneyFragmentDoc}`;
export const UserBaseFragmentDoc = gql`
    fragment UserBase on User {
  id
  firstName
  lastName
}
    `;
export const GiftCardDataFragmentDoc = gql`
    fragment GiftCardData on GiftCard {
  ...Metadata
  last4CodeChars
  boughtInChannel
  createdBy {
    ...UserBase
  }
  product {
    id
    name
  }
  createdBy {
    ...UserBase
  }
  usedBy {
    ...UserBase
  }
  usedByEmail
  createdByEmail
  created
  expiryDate
  lastUsedOn
  isActive
  initialBalance {
    ...Money
  }
  currentBalance {
    ...Money
  }
  id
  tags {
    name
  }
}
    ${MetadataFragmentDoc}
${UserBaseFragmentDoc}
${MoneyFragmentDoc}`;
export const CustomerGiftCardFragmentDoc = gql`
    fragment CustomerGiftCard on GiftCard {
  id
  last4CodeChars
  expiryDate
  isActive
  currentBalance {
    ...Money
  }
}
    ${MoneyFragmentDoc}`;
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
export const OrderLineMetadataFragmentDoc = gql`
    fragment OrderLineMetadata on OrderLine {
  metadata {
    ...MetadataItem
  }
  privateMetadata {
    ...MetadataItem
  }
  variant {
    metadata {
      ...MetadataItem
    }
    privateMetadata @include(if: $hasManageProducts) {
      ...MetadataItem
    }
  }
}
    ${MetadataItemFragmentDoc}`;
export const OrderLineMetadataDetailsFragmentDoc = gql`
    fragment OrderLineMetadataDetails on OrderLine {
  id
  productName
  productSku
  quantity
  thumbnail {
    url
  }
  variant {
    id
    name
  }
  ...OrderLineMetadata
}
    ${OrderLineMetadataFragmentDoc}`;
export const RefundOrderLineFragmentDoc = gql`
    fragment RefundOrderLine on OrderLine {
  id
  productName
  quantity
  unitPrice {
    gross {
      ...Money
    }
  }
  thumbnail(size: 64) {
    url
  }
}
    ${MoneyFragmentDoc}`;
export const TransactionBaseEventFragmentDoc = gql`
    fragment TransactionBaseEvent on TransactionEvent {
  id
  pspReference
  amount {
    ...Money
  }
  externalUrl
  type
  message
  createdAt
}
    ${MoneyFragmentDoc}`;
export const TransactionBaseItemFragmentDoc = gql`
    fragment TransactionBaseItem on TransactionItem {
  id
  name
  actions
  events {
    ...TransactionBaseEvent
  }
}
    ${TransactionBaseEventFragmentDoc}`;
export const StaffMemberFragmentDoc = gql`
    fragment StaffMember on User {
  id
  email
  firstName
  isActive
  lastName
}
    `;
export const StaffMemberAvatarFragmentDoc = gql`
    fragment StaffMemberAvatar on User {
  ...StaffMember
  avatar(size: 512) {
    url
  }
}
    ${StaffMemberFragmentDoc}`;
export const AppAvatarFragmentDoc = gql`
    fragment AppAvatar on App {
  id
  name
}
    `;
export const TransactionEventFragmentDoc = gql`
    fragment TransactionEvent on TransactionEvent {
  ...TransactionBaseEvent
  createdBy {
    ... on User {
      ...StaffMemberAvatar
    }
    ... on App {
      ...AppAvatar
    }
  }
  externalUrl
}
    ${TransactionBaseEventFragmentDoc}
${StaffMemberAvatarFragmentDoc}
${AppAvatarFragmentDoc}`;
export const TransactionItemFragmentDoc = gql`
    fragment TransactionItem on TransactionItem {
  ...TransactionBaseItem
  pspReference
  externalUrl
  createdAt
  events {
    ...TransactionEvent
  }
  authorizedAmount {
    ...Money
  }
  chargedAmount {
    ...Money
  }
  refundedAmount {
    ...Money
  }
  canceledAmount {
    ...Money
  }
  authorizePendingAmount {
    ...Money
  }
  chargePendingAmount {
    ...Money
  }
  refundPendingAmount {
    ...Money
  }
  cancelPendingAmount {
    ...Money
  }
}
    ${TransactionBaseItemFragmentDoc}
${TransactionEventFragmentDoc}
${MoneyFragmentDoc}`;
export const OrderPaymentFragmentDoc = gql`
    fragment OrderPayment on Payment {
  id
  isActive
  actions
  gateway
  paymentMethodType
  availableCaptureAmount {
    ...Money
  }
  capturedAmount {
    ...Money
  }
  total {
    ...Money
  }
  availableRefundAmount {
    ...Money
  }
  modified
  transactions {
    id
    token
    created
    kind
    isSuccess
  }
}
    ${MoneyFragmentDoc}`;
export const OrderGiftCardFragmentDoc = gql`
    fragment OrderGiftCard on GiftCard {
  id
  last4CodeChars
  events {
    id
    type
    orderId
    date
    balance {
      initialBalance {
        ...Money
      }
      currentBalance {
        ...Money
      }
      oldInitialBalance {
        ...Money
      }
      oldCurrentBalance {
        ...Money
      }
    }
  }
}
    ${MoneyFragmentDoc}`;
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
export const OrderGrantedRefundFragmentDoc = gql`
    fragment OrderGrantedRefund on OrderGrantedRefund {
  id
  createdAt
  shippingCostsIncluded
  status
  amount {
    currency
    amount
  }
  transactionEvents {
    id
  }
  reason
  user {
    ...UserBaseAvatar
  }
  app {
    id
    name
  }
  lines {
    id
    quantity
    orderLine {
      id
    }
  }
}
    ${UserBaseAvatarFragmentDoc}`;
export const OrderDiscountFragmentDoc = gql`
    fragment OrderDiscount on OrderDiscount {
  id
  type
  name
  calculationMode: valueType
  value
  reason
  amount {
    ...Money
  }
}
    ${MoneyFragmentDoc}`;
export const OrderEventFragmentDoc = gql`
    fragment OrderEvent on OrderEvent {
  id
  amount
  shippingCostsIncluded
  date
  email
  emailType
  invoiceNumber
  discount {
    valueType
    value
    reason
    amount {
      amount
      currency
    }
    oldValueType
    oldValue
    oldAmount {
      amount
      currency
    }
  }
  relatedOrder {
    id
    number
  }
  related {
    id
  }
  message
  quantity
  transactionReference
  type
  user {
    id
    email
    firstName
    lastName
    avatar(size: 128) {
      url
    }
  }
  app {
    id
    name
    appUrl
    brand {
      logo {
        default(size: 128)
      }
    }
  }
  lines {
    quantity
    itemName
    discount {
      valueType
      value
      reason
      amount {
        amount
        currency
      }
      oldValueType
      oldValue
      oldAmount {
        amount
        currency
      }
    }
    orderLine {
      id
      productName
      variantName
    }
  }
}
    `;
export const StockFragmentDoc = gql`
    fragment Stock on Stock {
  id
  quantity
  quantityAllocated
  warehouse {
    ...Warehouse
  }
}
    ${WarehouseFragmentDoc}`;
export const TaxedMoneyFragmentDoc = gql`
    fragment TaxedMoney on TaxedMoney {
  net {
    ...Money
  }
  gross {
    ...Money
  }
}
    ${MoneyFragmentDoc}`;
export const OrderLineFragmentDoc = gql`
    fragment OrderLine on OrderLine {
  id
  isShippingRequired
  allocations {
    id
    quantity
    warehouse {
      id
      name
    }
  }
  variant {
    id
    name
    quantityAvailable
    preorder {
      endDate
    }
    stocks {
      ...Stock
    }
    product {
      id
      isAvailableForPurchase
    }
  }
  productName
  productSku
  isGift
  quantity
  quantityFulfilled
  quantityToFulfill
  totalPrice {
    ...TaxedMoney
  }
  unitDiscount {
    amount
    currency
  }
  unitDiscountValue
  unitDiscountReason
  unitDiscountType
  undiscountedUnitPrice {
    currency
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
  unitPrice {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
  thumbnail {
    url
  }
}
    ${StockFragmentDoc}
${TaxedMoneyFragmentDoc}`;
export const FulfillmentFragmentDoc = gql`
    fragment Fulfillment on Fulfillment {
  ...Metadata
  id
  lines {
    id
    quantity
    orderLine {
      ...OrderLine
    }
  }
  fulfillmentOrder
  status
  trackingNumber
  warehouse {
    id
    name
  }
}
    ${MetadataFragmentDoc}
${OrderLineFragmentDoc}`;
export const InvoiceFragmentDoc = gql`
    fragment Invoice on Invoice {
  id
  number
  createdAt
  url
  status
}
    `;
export const OrderDetailsFragmentDoc = gql`
    fragment OrderDetails on Order {
  id
  ...Metadata
  billingAddress {
    ...Address
  }
  transactions {
    ...TransactionItem
  }
  payments {
    ...OrderPayment
  }
  giftCards {
    ...OrderGiftCard
  }
  grantedRefunds {
    ...OrderGrantedRefund
  }
  isShippingRequired
  canFinalize
  created
  customerNote
  discounts {
    ...OrderDiscount
  }
  events {
    ...OrderEvent
  }
  fulfillments {
    ...Fulfillment
  }
  lines {
    ...OrderLine
  }
  number
  isPaid
  paymentStatus
  shippingAddress {
    ...Address
  }
  deliveryMethod {
    __typename
    ... on ShippingMethod {
      id
    }
    ... on Warehouse {
      id
      clickAndCollectOption
    }
  }
  shippingMethod {
    id
  }
  shippingMethodName
  collectionPointName
  shippingPrice {
    gross {
      amount
      currency
    }
  }
  status
  subtotal {
    gross {
      ...Money
    }
    net {
      ...Money
    }
  }
  total {
    gross {
      ...Money
    }
    net {
      ...Money
    }
    tax {
      ...Money
    }
  }
  totalRemainingGrant {
    ...Money
  }
  totalGrantedRefund {
    ...Money
  }
  totalRefundPending {
    ...Money
  }
  totalRefunded {
    ...Money
  }
  actions
  totalAuthorizePending {
    ...Money
  }
  totalAuthorized {
    ...Money
  }
  totalCaptured {
    ...Money
  }
  totalCharged {
    ...Money
  }
  totalChargePending {
    ...Money
  }
  totalCanceled {
    ...Money
  }
  totalCancelPending {
    ...Money
  }
  totalBalance {
    ...Money
  }
  undiscountedTotal {
    net {
      ...Money
    }
    gross {
      ...Money
    }
  }
  user {
    id
    email
  }
  userEmail
  shippingMethods {
    id
    name
    price {
      ...Money
    }
    active
    message
  }
  invoices {
    ...Invoice
  }
  channel {
    isActive
    id
    name
    currencyCode
    slug
    defaultCountry {
      code
    }
    orderSettings {
      markAsPaidStrategy
    }
  }
  isPaid
  chargeStatus
}
    ${MetadataFragmentDoc}
${AddressFragmentDoc}
${TransactionItemFragmentDoc}
${OrderPaymentFragmentDoc}
${OrderGiftCardFragmentDoc}
${OrderGrantedRefundFragmentDoc}
${OrderDiscountFragmentDoc}
${OrderEventFragmentDoc}
${FulfillmentFragmentDoc}
${OrderLineFragmentDoc}
${MoneyFragmentDoc}
${InvoiceFragmentDoc}`;
export const OrderLineWithMetadataFragmentDoc = gql`
    fragment OrderLineWithMetadata on OrderLine {
  ...OrderLine
  ...OrderLineMetadata
}
    ${OrderLineFragmentDoc}
${OrderLineMetadataFragmentDoc}`;
export const FulfillmentWithMetadataFragmentDoc = gql`
    fragment FulfillmentWithMetadata on Fulfillment {
  ...Fulfillment
  lines {
    orderLine {
      ...OrderLineWithMetadata
    }
  }
}
    ${FulfillmentFragmentDoc}
${OrderLineWithMetadataFragmentDoc}`;
export const OrderDetailsWithMetadataFragmentDoc = gql`
    fragment OrderDetailsWithMetadata on Order {
  ...OrderDetails
  fulfillments {
    ...FulfillmentWithMetadata
  }
  lines {
    ...OrderLine
  }
}
    ${OrderDetailsFragmentDoc}
${FulfillmentWithMetadataFragmentDoc}
${OrderLineFragmentDoc}`;
export const OrderSettingsFragmentDoc = gql`
    fragment OrderSettings on OrderSettings {
  automaticallyConfirmAllNewOrders
  automaticallyFulfillNonShippableGiftCard
}
    `;
export const ShopOrderSettingsFragmentDoc = gql`
    fragment ShopOrderSettings on Shop {
  fulfillmentAutoApprove
  fulfillmentAllowUnpaid
}
    `;
export const OrderFulfillLineFragmentDoc = gql`
    fragment OrderFulfillLine on OrderLine {
  id
  isShippingRequired
  productName
  quantity
  allocations {
    id
    quantity
    warehouse {
      id
      name
    }
  }
  quantityFulfilled
  quantityToFulfill
  variant {
    id
    name
    sku
    preorder {
      endDate
    }
    attributes {
      values {
        id
        name
      }
    }
    stocks {
      ...Stock
    }
    trackInventory
  }
  thumbnail(size: 64) {
    url
  }
}
    ${StockFragmentDoc}`;
export const OrderLineStockDataFragmentDoc = gql`
    fragment OrderLineStockData on OrderLine {
  id
  allocations {
    quantity
    warehouse {
      id
    }
  }
  quantity
  quantityToFulfill
  variant {
    stocks {
      ...Stock
    }
  }
}
    ${StockFragmentDoc}`;
export const OrderLineGrantRefundFragmentDoc = gql`
    fragment OrderLineGrantRefund on OrderLine {
  id
  thumbnail {
    url
  }
  productName
  quantity
  quantityToFulfill
  variantName
  productName
  unitPrice {
    gross {
      ...Money
    }
  }
}
    ${MoneyFragmentDoc}`;
export const OrderFulfillmentGrantRefundFragmentDoc = gql`
    fragment OrderFulfillmentGrantRefund on Fulfillment {
  id
  fulfillmentOrder
  status
  lines {
    id
    quantity
    orderLine {
      ...OrderLineGrantRefund
    }
  }
}
    ${OrderLineGrantRefundFragmentDoc}`;
export const OrderDetailsGrantedRefundFragmentDoc = gql`
    fragment OrderDetailsGrantedRefund on OrderGrantedRefund {
  id
  reason
  amount {
    ...Money
  }
  shippingCostsIncluded
  transaction {
    id
  }
  status
  lines {
    id
    quantity
    reason
    orderLine {
      ...OrderLine
    }
  }
}
    ${MoneyFragmentDoc}
${OrderLineFragmentDoc}`;
export const OrderDetailsGrantRefundFragmentDoc = gql`
    fragment OrderDetailsGrantRefund on Order {
  id
  number
  lines {
    ...OrderLineGrantRefund
  }
  fulfillments {
    ...OrderFulfillmentGrantRefund
  }
  shippingPrice {
    gross {
      ...Money
    }
  }
  total {
    gross {
      ...Money
    }
  }
  grantedRefunds {
    ...OrderDetailsGrantedRefund
  }
  transactions {
    ...TransactionItem
  }
}
    ${OrderLineGrantRefundFragmentDoc}
${OrderFulfillmentGrantRefundFragmentDoc}
${MoneyFragmentDoc}
${OrderDetailsGrantedRefundFragmentDoc}
${TransactionItemFragmentDoc}`;
export const ActivitiesFragmentDoc = gql`
    fragment Activities on OrderEvent {
  date
  email
  message
  orderNumber
  type
  user {
    email
  }
}
    `;
export const PageTypeFragmentDoc = gql`
    fragment PageType on PageType {
  id
  name
  hasPages
}
    `;
export const PageTypeDetailsFragmentDoc = gql`
    fragment PageTypeDetails on PageType {
  ...PageType
  ...Metadata
  attributes {
    ...Attribute
  }
}
    ${PageTypeFragmentDoc}
${MetadataFragmentDoc}
${AttributeFragmentDoc}`;
export const PageFragmentDoc = gql`
    fragment Page on Page {
  id
  title
  slug
  isPublished
}
    `;
export const FileFragmentDoc = gql`
    fragment File on File {
  url
  contentType
}
    `;
export const AttributeValueFragmentDoc = gql`
    fragment AttributeValue on AttributeValue {
  id
  name
  slug
  file {
    ...File
  }
  reference
  boolean
  date
  dateTime
  value
}
    ${FileFragmentDoc}`;
export const AttributeValueDetailsFragmentDoc = gql`
    fragment AttributeValueDetails on AttributeValue {
  ...AttributeValue
  plainText
  richText
}
    ${AttributeValueFragmentDoc}`;
export const AttributeValueListFragmentDoc = gql`
    fragment AttributeValueList on AttributeValueCountableConnection {
  pageInfo {
    ...PageInfo
  }
  edges {
    cursor
    node {
      ...AttributeValueDetails
    }
  }
}
    ${PageInfoFragmentDoc}
${AttributeValueDetailsFragmentDoc}`;
export const PageSelectedAttributeFragmentDoc = gql`
    fragment PageSelectedAttribute on SelectedAttribute {
  attribute {
    id
    slug
    name
    inputType
    entityType
    valueRequired
    unit
    choices(
      first: $firstValues
      after: $afterValues
      last: $lastValues
      before: $beforeValues
    ) {
      ...AttributeValueList
    }
  }
  values {
    ...AttributeValueDetails
  }
}
    ${AttributeValueListFragmentDoc}
${AttributeValueDetailsFragmentDoc}`;
export const PageAttributesFragmentDoc = gql`
    fragment PageAttributes on Page {
  attributes {
    ...PageSelectedAttribute
  }
  pageType {
    id
    name
    attributes {
      id
      name
      inputType
      entityType
      valueRequired
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeValueList
      }
    }
  }
}
    ${PageSelectedAttributeFragmentDoc}
${AttributeValueListFragmentDoc}`;
export const PageDetailsFragmentDoc = gql`
    fragment PageDetails on Page {
  ...Page
  ...PageAttributes
  ...Metadata
  content
  seoTitle
  seoDescription
  publishedAt
}
    ${PageFragmentDoc}
${PageAttributesFragmentDoc}
${MetadataFragmentDoc}`;
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
export const ProductTypeFragmentDoc = gql`
    fragment ProductType on ProductType {
  id
  name
  slug
  kind
  hasVariants
  isShippingRequired
  taxClass {
    id
    name
  }
}
    `;
export const ProductTypeDetailsFragmentDoc = gql`
    fragment ProductTypeDetails on ProductType {
  ...ProductType
  ...Metadata
  productAttributes {
    ...Attribute
  }
  variantAttributes {
    ...Attribute
  }
  assignedVariantAttributes {
    attribute {
      ...Attribute
    }
    variantSelection
  }
  weight {
    unit
    value
  }
}
    ${ProductTypeFragmentDoc}
${MetadataFragmentDoc}
${AttributeFragmentDoc}`;
export const PriceRangeFragmentDoc = gql`
    fragment PriceRange on TaxedMoneyRange {
  start {
    net {
      ...Money
    }
  }
  stop {
    net {
      ...Money
    }
  }
}
    ${MoneyFragmentDoc}`;
export const ChannelListingProductFragmentDoc = gql`
    fragment ChannelListingProduct on ProductChannelListing {
  ...ChannelListingProductWithoutPricing
  pricing {
    priceRange {
      ...PriceRange
    }
  }
}
    ${ChannelListingProductWithoutPricingFragmentDoc}
${PriceRangeFragmentDoc}`;
export const ProductWithChannelListingsFragmentDoc = gql`
    fragment ProductWithChannelListings on Product {
  id
  name
  thumbnail(size: 1024) {
    url
  }
  productType {
    id
    name
    hasVariants
  }
  category @include(if: $includeCategories) {
    id
    name
  }
  collections @include(if: $includeCollections) {
    id
    name
  }
  channelListings {
    ...ChannelListingProductWithoutPricing
    pricing @include(if: $hasChannel) {
      priceRange {
        ...PriceRange
      }
    }
  }
}
    ${ChannelListingProductWithoutPricingFragmentDoc}
${PriceRangeFragmentDoc}`;
export const VariantAttributeFragmentDoc = gql`
    fragment VariantAttribute on Attribute {
  id
  name
  slug
  inputType
  entityType
  valueRequired
  unit
  choices(
    first: $firstValues
    after: $afterValues
    last: $lastValues
    before: $beforeValues
  ) {
    ...AttributeValueList
  }
}
    ${AttributeValueListFragmentDoc}`;
export const ProductVariantAttributesFragmentDoc = gql`
    fragment ProductVariantAttributes on Product {
  id
  attributes {
    attribute {
      id
      slug
      name
      inputType
      entityType
      valueRequired
      unit
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeValueList
      }
    }
    values {
      ...AttributeValueDetails
    }
  }
  productType {
    id
    variantAttributes {
      ...VariantAttribute
    }
  }
  channelListings {
    channel {
      id
      name
      currencyCode
    }
  }
}
    ${AttributeValueListFragmentDoc}
${AttributeValueDetailsFragmentDoc}
${VariantAttributeFragmentDoc}`;
export const ProductMediaFragmentDoc = gql`
    fragment ProductMedia on ProductMedia {
  id
  alt
  sortOrder
  url(size: 1024)
  type
  oembedData
}
    `;
export const PreorderFragmentDoc = gql`
    fragment Preorder on PreorderData {
  globalThreshold
  globalSoldUnits
  endDate
}
    `;
export const ChannelListingProductVariantFragmentDoc = gql`
    fragment ChannelListingProductVariant on ProductVariantChannelListing {
  id
  channel {
    id
    name
    currencyCode
  }
  price {
    ...Money
  }
  costPrice {
    ...Money
  }
  preorderThreshold {
    quantity
    soldUnits
  }
}
    ${MoneyFragmentDoc}`;
export const ProductDetailsVariantFragmentDoc = gql`
    fragment ProductDetailsVariant on ProductVariant {
  id
  sku
  name
  attributes {
    attribute {
      id
      name
    }
    values {
      ...AttributeValueDetails
    }
  }
  media {
    url(size: 200)
  }
  stocks {
    ...Stock
  }
  trackInventory
  preorder {
    ...Preorder
  }
  channelListings {
    ...ChannelListingProductVariant
  }
  quantityLimitPerCustomer
}
    ${AttributeValueDetailsFragmentDoc}
${StockFragmentDoc}
${PreorderFragmentDoc}
${ChannelListingProductVariantFragmentDoc}`;
export const WeightFragmentDoc = gql`
    fragment Weight on Weight {
  unit
  value
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on Product {
  ...ProductVariantAttributes
  ...Metadata
  name
  slug
  description
  seoTitle
  seoDescription
  rating
  defaultVariant {
    id
  }
  category {
    id
    name
  }
  collections {
    id
    name
  }
  channelListings {
    ...ChannelListingProductWithoutPricing
  }
  media {
    ...ProductMedia
  }
  isAvailable
  variants {
    ...ProductDetailsVariant
  }
  productType {
    id
    name
    hasVariants
  }
  weight {
    ...Weight
  }
  taxClass {
    id
    name
  }
}
    ${ProductVariantAttributesFragmentDoc}
${MetadataFragmentDoc}
${ChannelListingProductWithoutPricingFragmentDoc}
${ProductMediaFragmentDoc}
${ProductDetailsVariantFragmentDoc}
${WeightFragmentDoc}`;
export const SelectedVariantAttributeFragmentDoc = gql`
    fragment SelectedVariantAttribute on SelectedAttribute {
  attribute {
    ...VariantAttribute
  }
  values {
    ...AttributeValueDetails
  }
}
    ${VariantAttributeFragmentDoc}
${AttributeValueDetailsFragmentDoc}`;
export const ProductVariantFragmentDoc = gql`
    fragment ProductVariant on ProductVariant {
  id
  ...Metadata
  selectionAttributes: attributes(variantSelection: VARIANT_SELECTION) {
    ...SelectedVariantAttribute
  }
  nonSelectionAttributes: attributes(variantSelection: NOT_VARIANT_SELECTION) {
    ...SelectedVariantAttribute
  }
  media {
    id
    url
    type
    oembedData
  }
  name
  product {
    id
    defaultVariant {
      id
    }
    media {
      ...ProductMedia
    }
    name
    thumbnail {
      url
    }
    channelListings {
      id
      publishedAt
      isPublished
      channel {
        id
        name
        currencyCode
      }
    }
    variants {
      id
      name
      sku
      media {
        id
        url(size: 200)
        type
        oembedData
      }
    }
    defaultVariant {
      id
    }
  }
  channelListings {
    ...ChannelListingProductVariant
  }
  sku
  stocks {
    ...Stock
  }
  trackInventory
  preorder {
    ...Preorder
  }
  weight {
    ...Weight
  }
  quantityLimitPerCustomer
}
    ${MetadataFragmentDoc}
${SelectedVariantAttributeFragmentDoc}
${ProductMediaFragmentDoc}
${ChannelListingProductVariantFragmentDoc}
${StockFragmentDoc}
${PreorderFragmentDoc}
${WeightFragmentDoc}`;
export const ExportFileFragmentDoc = gql`
    fragment ExportFile on ExportFile {
  id
  status
  url
}
    `;
export const ProductListAttributeFragmentDoc = gql`
    fragment ProductListAttribute on SelectedAttribute {
  attribute {
    id
  }
  values {
    ...AttributeValue
  }
}
    ${AttributeValueFragmentDoc}`;
export const ShippingMethodWithPostalCodesFragmentDoc = gql`
    fragment ShippingMethodWithPostalCodes on ShippingMethodType {
  id
  postalCodeRules {
    id
    inclusionType
    start
    end
  }
}
    `;
export const ShippingMethodTypeFragmentDoc = gql`
    fragment ShippingMethodType on ShippingMethodType {
  ...ShippingMethodWithPostalCodes
  ...Metadata
  taxClass {
    name
    id
  }
  minimumOrderWeight {
    unit
    value
  }
  maximumOrderWeight {
    unit
    value
  }
  minimumDeliveryDays
  maximumDeliveryDays
  name
  description
  type
  channelListings {
    id
    channel {
      id
      name
      currencyCode
    }
    price {
      ...Money
    }
    minimumOrderPrice {
      ...Money
    }
    maximumOrderPrice {
      ...Money
    }
  }
}
    ${ShippingMethodWithPostalCodesFragmentDoc}
${MetadataFragmentDoc}
${MoneyFragmentDoc}`;
export const ShippingMethodWithExcludedProductsFragmentDoc = gql`
    fragment ShippingMethodWithExcludedProducts on ShippingMethodType {
  ...ShippingMethodType
  excludedProducts(before: $before, after: $after, first: $first, last: $last) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      node {
        id
        name
        thumbnail {
          url
        }
      }
    }
  }
}
    ${ShippingMethodTypeFragmentDoc}`;
export const CountryFragmentDoc = gql`
    fragment Country on CountryDisplay {
  country
  code
}
    `;
export const ShippingZoneFragmentDoc = gql`
    fragment ShippingZone on ShippingZone {
  ...Metadata
  id
  countries {
    ...Country
  }
  name
  description
  priceRange {
    start {
      ...Money
    }
    stop {
      ...Money
    }
  }
}
    ${MetadataFragmentDoc}
${CountryFragmentDoc}
${MoneyFragmentDoc}`;
export const ShippingZoneDetailsFragmentDoc = gql`
    fragment ShippingZoneDetails on ShippingZone {
  ...ShippingZone
  shippingMethods {
    ...ShippingMethodType
  }
  warehouses {
    id
    name
  }
}
    ${ShippingZoneFragmentDoc}
${ShippingMethodTypeFragmentDoc}`;
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
export const CountryWithCodeFragmentDoc = gql`
    fragment CountryWithCode on CountryDisplay {
  country
  code
}
    `;
export const TaxConfigurationPerCountryFragmentDoc = gql`
    fragment TaxConfigurationPerCountry on TaxConfigurationPerCountry {
  country {
    ...CountryWithCode
  }
  chargeTaxes
  taxCalculationStrategy
  taxAppId
  displayGrossPrices
}
    ${CountryWithCodeFragmentDoc}`;
export const TaxConfigurationFragmentDoc = gql`
    fragment TaxConfiguration on TaxConfiguration {
  id
  channel {
    id
    name
  }
  displayGrossPrices
  pricesEnteredWithTax
  chargeTaxes
  taxCalculationStrategy
  taxAppId
  countries {
    ...TaxConfigurationPerCountry
  }
}
    ${TaxConfigurationPerCountryFragmentDoc}`;
export const TaxCountryConfigurationFragmentDoc = gql`
    fragment TaxCountryConfiguration on TaxCountryConfiguration {
  country {
    ...CountryWithCode
  }
  taxClassCountryRates {
    rate
    taxClass {
      id
      name
    }
  }
}
    ${CountryWithCodeFragmentDoc}`;
export const TaxClassBaseFragmentDoc = gql`
    fragment TaxClassBase on TaxClass {
  id
  name
}
    `;
export const TaxRateFragmentDoc = gql`
    fragment TaxRate on TaxClassCountryRate {
  country {
    ...CountryWithCode
  }
  rate
}
    ${CountryWithCodeFragmentDoc}`;
export const TaxClassFragmentDoc = gql`
    fragment TaxClass on TaxClass {
  ...TaxClassBase
  countries {
    ...TaxRate
  }
  ...Metadata
}
    ${TaxClassBaseFragmentDoc}
${TaxRateFragmentDoc}
${MetadataFragmentDoc}`;
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
export const WarehouseWithShippingFragmentDoc = gql`
    fragment WarehouseWithShipping on Warehouse {
  ...Warehouse
  shippingZones(first: 100) {
    edges {
      node {
        id
        name
      }
    }
  }
}
    ${WarehouseFragmentDoc}`;
export const WarehouseDetailsFragmentDoc = gql`
    fragment WarehouseDetails on Warehouse {
  isPrivate
  clickAndCollectOption
  ...WarehouseWithShipping
  address {
    ...Address
  }
}
    ${WarehouseWithShippingFragmentDoc}
${AddressFragmentDoc}`;
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
export const AttributeBulkDeleteDocument = gql`
    mutation AttributeBulkDelete($ids: [ID!]!) {
  attributeBulkDelete(ids: $ids) {
    errors {
      ...AttributeError
    }
  }
}
    ${AttributeErrorFragmentDoc}`;
export type AttributeBulkDeleteMutationFn = Apollo.MutationFunction<Types.AttributeBulkDeleteMutation, Types.AttributeBulkDeleteMutationVariables>;

/**
 * __useAttributeBulkDeleteMutation__
 *
 * To run a mutation, you first call `useAttributeBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeBulkDeleteMutation, { data, loading, error }] = useAttributeBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useAttributeBulkDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeBulkDeleteMutation, Types.AttributeBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeBulkDeleteMutation, Types.AttributeBulkDeleteMutationVariables>(AttributeBulkDeleteDocument, options);
      }
export type AttributeBulkDeleteMutationHookResult = ReturnType<typeof useAttributeBulkDeleteMutation>;
export type AttributeBulkDeleteMutationResult = Apollo.MutationResult<Types.AttributeBulkDeleteMutation>;
export type AttributeBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.AttributeBulkDeleteMutation, Types.AttributeBulkDeleteMutationVariables>;
export const AttributeDeleteDocument = gql`
    mutation AttributeDelete($id: ID!) {
  attributeDelete(id: $id) {
    errors {
      ...AttributeError
    }
  }
}
    ${AttributeErrorFragmentDoc}`;
export type AttributeDeleteMutationFn = Apollo.MutationFunction<Types.AttributeDeleteMutation, Types.AttributeDeleteMutationVariables>;

/**
 * __useAttributeDeleteMutation__
 *
 * To run a mutation, you first call `useAttributeDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeDeleteMutation, { data, loading, error }] = useAttributeDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAttributeDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeDeleteMutation, Types.AttributeDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeDeleteMutation, Types.AttributeDeleteMutationVariables>(AttributeDeleteDocument, options);
      }
export type AttributeDeleteMutationHookResult = ReturnType<typeof useAttributeDeleteMutation>;
export type AttributeDeleteMutationResult = Apollo.MutationResult<Types.AttributeDeleteMutation>;
export type AttributeDeleteMutationOptions = Apollo.BaseMutationOptions<Types.AttributeDeleteMutation, Types.AttributeDeleteMutationVariables>;
export const AttributeUpdateDocument = gql`
    mutation AttributeUpdate($id: ID!, $input: AttributeUpdateInput!) {
  attributeUpdate(id: $id, input: $input) {
    attribute {
      ...AttributeDetails
    }
    errors {
      ...AttributeError
    }
  }
}
    ${AttributeDetailsFragmentDoc}
${AttributeErrorFragmentDoc}`;
export type AttributeUpdateMutationFn = Apollo.MutationFunction<Types.AttributeUpdateMutation, Types.AttributeUpdateMutationVariables>;

/**
 * __useAttributeUpdateMutation__
 *
 * To run a mutation, you first call `useAttributeUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeUpdateMutation, { data, loading, error }] = useAttributeUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAttributeUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeUpdateMutation, Types.AttributeUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeUpdateMutation, Types.AttributeUpdateMutationVariables>(AttributeUpdateDocument, options);
      }
export type AttributeUpdateMutationHookResult = ReturnType<typeof useAttributeUpdateMutation>;
export type AttributeUpdateMutationResult = Apollo.MutationResult<Types.AttributeUpdateMutation>;
export type AttributeUpdateMutationOptions = Apollo.BaseMutationOptions<Types.AttributeUpdateMutation, Types.AttributeUpdateMutationVariables>;
export const AttributeValueDeleteDocument = gql`
    mutation AttributeValueDelete($id: ID!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  attributeValueDelete(id: $id) {
    attribute {
      id
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeValueList
      }
    }
    errors {
      ...AttributeError
    }
  }
}
    ${AttributeValueListFragmentDoc}
${AttributeErrorFragmentDoc}`;
export type AttributeValueDeleteMutationFn = Apollo.MutationFunction<Types.AttributeValueDeleteMutation, Types.AttributeValueDeleteMutationVariables>;

/**
 * __useAttributeValueDeleteMutation__
 *
 * To run a mutation, you first call `useAttributeValueDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeValueDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeValueDeleteMutation, { data, loading, error }] = useAttributeValueDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function useAttributeValueDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeValueDeleteMutation, Types.AttributeValueDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeValueDeleteMutation, Types.AttributeValueDeleteMutationVariables>(AttributeValueDeleteDocument, options);
      }
export type AttributeValueDeleteMutationHookResult = ReturnType<typeof useAttributeValueDeleteMutation>;
export type AttributeValueDeleteMutationResult = Apollo.MutationResult<Types.AttributeValueDeleteMutation>;
export type AttributeValueDeleteMutationOptions = Apollo.BaseMutationOptions<Types.AttributeValueDeleteMutation, Types.AttributeValueDeleteMutationVariables>;
export const AttributeValueUpdateDocument = gql`
    mutation AttributeValueUpdate($id: ID!, $input: AttributeValueUpdateInput!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  attributeValueUpdate(id: $id, input: $input) {
    attribute {
      id
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeValueList
      }
    }
    errors {
      ...AttributeError
    }
  }
}
    ${AttributeValueListFragmentDoc}
${AttributeErrorFragmentDoc}`;
export type AttributeValueUpdateMutationFn = Apollo.MutationFunction<Types.AttributeValueUpdateMutation, Types.AttributeValueUpdateMutationVariables>;

/**
 * __useAttributeValueUpdateMutation__
 *
 * To run a mutation, you first call `useAttributeValueUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeValueUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeValueUpdateMutation, { data, loading, error }] = useAttributeValueUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function useAttributeValueUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeValueUpdateMutation, Types.AttributeValueUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeValueUpdateMutation, Types.AttributeValueUpdateMutationVariables>(AttributeValueUpdateDocument, options);
      }
export type AttributeValueUpdateMutationHookResult = ReturnType<typeof useAttributeValueUpdateMutation>;
export type AttributeValueUpdateMutationResult = Apollo.MutationResult<Types.AttributeValueUpdateMutation>;
export type AttributeValueUpdateMutationOptions = Apollo.BaseMutationOptions<Types.AttributeValueUpdateMutation, Types.AttributeValueUpdateMutationVariables>;
export const AttributeValueCreateDocument = gql`
    mutation AttributeValueCreate($id: ID!, $input: AttributeValueCreateInput!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  attributeValueCreate(attribute: $id, input: $input) {
    attribute {
      id
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeValueList
      }
    }
    errors {
      ...AttributeError
    }
  }
}
    ${AttributeValueListFragmentDoc}
${AttributeErrorFragmentDoc}`;
export type AttributeValueCreateMutationFn = Apollo.MutationFunction<Types.AttributeValueCreateMutation, Types.AttributeValueCreateMutationVariables>;

/**
 * __useAttributeValueCreateMutation__
 *
 * To run a mutation, you first call `useAttributeValueCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeValueCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeValueCreateMutation, { data, loading, error }] = useAttributeValueCreateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function useAttributeValueCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeValueCreateMutation, Types.AttributeValueCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeValueCreateMutation, Types.AttributeValueCreateMutationVariables>(AttributeValueCreateDocument, options);
      }
export type AttributeValueCreateMutationHookResult = ReturnType<typeof useAttributeValueCreateMutation>;
export type AttributeValueCreateMutationResult = Apollo.MutationResult<Types.AttributeValueCreateMutation>;
export type AttributeValueCreateMutationOptions = Apollo.BaseMutationOptions<Types.AttributeValueCreateMutation, Types.AttributeValueCreateMutationVariables>;
export const AttributeCreateDocument = gql`
    mutation AttributeCreate($input: AttributeCreateInput!) {
  attributeCreate(input: $input) {
    attribute {
      id
    }
    errors {
      ...AttributeError
    }
  }
}
    ${AttributeErrorFragmentDoc}`;
export type AttributeCreateMutationFn = Apollo.MutationFunction<Types.AttributeCreateMutation, Types.AttributeCreateMutationVariables>;

/**
 * __useAttributeCreateMutation__
 *
 * To run a mutation, you first call `useAttributeCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeCreateMutation, { data, loading, error }] = useAttributeCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAttributeCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeCreateMutation, Types.AttributeCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeCreateMutation, Types.AttributeCreateMutationVariables>(AttributeCreateDocument, options);
      }
export type AttributeCreateMutationHookResult = ReturnType<typeof useAttributeCreateMutation>;
export type AttributeCreateMutationResult = Apollo.MutationResult<Types.AttributeCreateMutation>;
export type AttributeCreateMutationOptions = Apollo.BaseMutationOptions<Types.AttributeCreateMutation, Types.AttributeCreateMutationVariables>;
export const AttributeValueReorderDocument = gql`
    mutation AttributeValueReorder($id: ID!, $move: ReorderInput!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  attributeReorderValues(attributeId: $id, moves: [$move]) {
    attribute {
      id
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        pageInfo {
          ...PageInfo
        }
        edges {
          cursor
          node {
            id
          }
        }
      }
    }
    errors {
      ...AttributeError
    }
  }
}
    ${PageInfoFragmentDoc}
${AttributeErrorFragmentDoc}`;
export type AttributeValueReorderMutationFn = Apollo.MutationFunction<Types.AttributeValueReorderMutation, Types.AttributeValueReorderMutationVariables>;

/**
 * __useAttributeValueReorderMutation__
 *
 * To run a mutation, you first call `useAttributeValueReorderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttributeValueReorderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attributeValueReorderMutation, { data, loading, error }] = useAttributeValueReorderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      move: // value for 'move'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function useAttributeValueReorderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AttributeValueReorderMutation, Types.AttributeValueReorderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.AttributeValueReorderMutation, Types.AttributeValueReorderMutationVariables>(AttributeValueReorderDocument, options);
      }
export type AttributeValueReorderMutationHookResult = ReturnType<typeof useAttributeValueReorderMutation>;
export type AttributeValueReorderMutationResult = Apollo.MutationResult<Types.AttributeValueReorderMutation>;
export type AttributeValueReorderMutationOptions = Apollo.BaseMutationOptions<Types.AttributeValueReorderMutation, Types.AttributeValueReorderMutationVariables>;
export const AttributeDetailsDocument = gql`
    query AttributeDetails($id: ID!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  attribute(id: $id) {
    ...AttributeDetails
    choices(
      first: $firstValues
      after: $afterValues
      last: $lastValues
      before: $beforeValues
    ) {
      ...AttributeValueList
    }
  }
}
    ${AttributeDetailsFragmentDoc}
${AttributeValueListFragmentDoc}`;

/**
 * __useAttributeDetailsQuery__
 *
 * To run a query within a React component, call `useAttributeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributeDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function useAttributeDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.AttributeDetailsQuery, Types.AttributeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AttributeDetailsQuery, Types.AttributeDetailsQueryVariables>(AttributeDetailsDocument, options);
      }
export function useAttributeDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AttributeDetailsQuery, Types.AttributeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AttributeDetailsQuery, Types.AttributeDetailsQueryVariables>(AttributeDetailsDocument, options);
        }
export type AttributeDetailsQueryHookResult = ReturnType<typeof useAttributeDetailsQuery>;
export type AttributeDetailsLazyQueryHookResult = ReturnType<typeof useAttributeDetailsLazyQuery>;
export type AttributeDetailsQueryResult = Apollo.QueryResult<Types.AttributeDetailsQuery, Types.AttributeDetailsQueryVariables>;
export const AttributeListDocument = gql`
    query AttributeList($filter: AttributeFilterInput, $before: String, $after: String, $first: Int, $last: Int, $sort: AttributeSortingInput) {
  attributes(
    filter: $filter
    before: $before
    after: $after
    first: $first
    last: $last
    sortBy: $sort
  ) {
    edges {
      node {
        ...Attribute
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${AttributeFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useAttributeListQuery__
 *
 * To run a query within a React component, call `useAttributeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributeListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useAttributeListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.AttributeListQuery, Types.AttributeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AttributeListQuery, Types.AttributeListQueryVariables>(AttributeListDocument, options);
      }
export function useAttributeListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AttributeListQuery, Types.AttributeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AttributeListQuery, Types.AttributeListQueryVariables>(AttributeListDocument, options);
        }
export type AttributeListQueryHookResult = ReturnType<typeof useAttributeListQuery>;
export type AttributeListLazyQueryHookResult = ReturnType<typeof useAttributeListLazyQuery>;
export type AttributeListQueryResult = Apollo.QueryResult<Types.AttributeListQuery, Types.AttributeListQueryVariables>;
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
export const CheckOrderInvoicesStatusDocument = gql`
    query CheckOrderInvoicesStatus($id: ID!) {
  order(id: $id) {
    id
    invoices {
      ...Invoice
    }
  }
}
    ${InvoiceFragmentDoc}`;

/**
 * __useCheckOrderInvoicesStatusQuery__
 *
 * To run a query within a React component, call `useCheckOrderInvoicesStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckOrderInvoicesStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckOrderInvoicesStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckOrderInvoicesStatusQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.CheckOrderInvoicesStatusQuery, Types.CheckOrderInvoicesStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.CheckOrderInvoicesStatusQuery, Types.CheckOrderInvoicesStatusQueryVariables>(CheckOrderInvoicesStatusDocument, options);
      }
export function useCheckOrderInvoicesStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.CheckOrderInvoicesStatusQuery, Types.CheckOrderInvoicesStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.CheckOrderInvoicesStatusQuery, Types.CheckOrderInvoicesStatusQueryVariables>(CheckOrderInvoicesStatusDocument, options);
        }
export type CheckOrderInvoicesStatusQueryHookResult = ReturnType<typeof useCheckOrderInvoicesStatusQuery>;
export type CheckOrderInvoicesStatusLazyQueryHookResult = ReturnType<typeof useCheckOrderInvoicesStatusLazyQuery>;
export type CheckOrderInvoicesStatusQueryResult = Apollo.QueryResult<Types.CheckOrderInvoicesStatusQuery, Types.CheckOrderInvoicesStatusQueryVariables>;
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
export const MenuCreateDocument = gql`
    mutation MenuCreate($input: MenuCreateInput!) {
  menuCreate(input: $input) {
    errors {
      ...MenuError
    }
    menu {
      id
    }
  }
}
    ${MenuErrorFragmentDoc}`;
export type MenuCreateMutationFn = Apollo.MutationFunction<Types.MenuCreateMutation, Types.MenuCreateMutationVariables>;

/**
 * __useMenuCreateMutation__
 *
 * To run a mutation, you first call `useMenuCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuCreateMutation, { data, loading, error }] = useMenuCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMenuCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.MenuCreateMutation, Types.MenuCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.MenuCreateMutation, Types.MenuCreateMutationVariables>(MenuCreateDocument, options);
      }
export type MenuCreateMutationHookResult = ReturnType<typeof useMenuCreateMutation>;
export type MenuCreateMutationResult = Apollo.MutationResult<Types.MenuCreateMutation>;
export type MenuCreateMutationOptions = Apollo.BaseMutationOptions<Types.MenuCreateMutation, Types.MenuCreateMutationVariables>;
export const MenuBulkDeleteDocument = gql`
    mutation MenuBulkDelete($ids: [ID!]!) {
  menuBulkDelete(ids: $ids) {
    errors {
      ...MenuError
    }
  }
}
    ${MenuErrorFragmentDoc}`;
export type MenuBulkDeleteMutationFn = Apollo.MutationFunction<Types.MenuBulkDeleteMutation, Types.MenuBulkDeleteMutationVariables>;

/**
 * __useMenuBulkDeleteMutation__
 *
 * To run a mutation, you first call `useMenuBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuBulkDeleteMutation, { data, loading, error }] = useMenuBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMenuBulkDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.MenuBulkDeleteMutation, Types.MenuBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.MenuBulkDeleteMutation, Types.MenuBulkDeleteMutationVariables>(MenuBulkDeleteDocument, options);
      }
export type MenuBulkDeleteMutationHookResult = ReturnType<typeof useMenuBulkDeleteMutation>;
export type MenuBulkDeleteMutationResult = Apollo.MutationResult<Types.MenuBulkDeleteMutation>;
export type MenuBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.MenuBulkDeleteMutation, Types.MenuBulkDeleteMutationVariables>;
export const MenuDeleteDocument = gql`
    mutation MenuDelete($id: ID!) {
  menuDelete(id: $id) {
    errors {
      ...MenuError
    }
  }
}
    ${MenuErrorFragmentDoc}`;
export type MenuDeleteMutationFn = Apollo.MutationFunction<Types.MenuDeleteMutation, Types.MenuDeleteMutationVariables>;

/**
 * __useMenuDeleteMutation__
 *
 * To run a mutation, you first call `useMenuDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuDeleteMutation, { data, loading, error }] = useMenuDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMenuDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.MenuDeleteMutation, Types.MenuDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.MenuDeleteMutation, Types.MenuDeleteMutationVariables>(MenuDeleteDocument, options);
      }
export type MenuDeleteMutationHookResult = ReturnType<typeof useMenuDeleteMutation>;
export type MenuDeleteMutationResult = Apollo.MutationResult<Types.MenuDeleteMutation>;
export type MenuDeleteMutationOptions = Apollo.BaseMutationOptions<Types.MenuDeleteMutation, Types.MenuDeleteMutationVariables>;
export const MenuItemCreateDocument = gql`
    mutation MenuItemCreate($input: MenuItemCreateInput!) {
  menuItemCreate(input: $input) {
    errors {
      ...MenuError
    }
    menuItem {
      menu {
        id
        items {
          ...MenuItemNested
        }
      }
    }
  }
}
    ${MenuErrorFragmentDoc}
${MenuItemNestedFragmentDoc}`;
export type MenuItemCreateMutationFn = Apollo.MutationFunction<Types.MenuItemCreateMutation, Types.MenuItemCreateMutationVariables>;

/**
 * __useMenuItemCreateMutation__
 *
 * To run a mutation, you first call `useMenuItemCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuItemCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuItemCreateMutation, { data, loading, error }] = useMenuItemCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMenuItemCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.MenuItemCreateMutation, Types.MenuItemCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.MenuItemCreateMutation, Types.MenuItemCreateMutationVariables>(MenuItemCreateDocument, options);
      }
export type MenuItemCreateMutationHookResult = ReturnType<typeof useMenuItemCreateMutation>;
export type MenuItemCreateMutationResult = Apollo.MutationResult<Types.MenuItemCreateMutation>;
export type MenuItemCreateMutationOptions = Apollo.BaseMutationOptions<Types.MenuItemCreateMutation, Types.MenuItemCreateMutationVariables>;
export const MenuUpdateDocument = gql`
    mutation MenuUpdate($id: ID!, $name: String!, $moves: [MenuItemMoveInput!]!, $removeIds: [ID!]!) {
  menuUpdate(id: $id, input: {name: $name}) {
    errors {
      ...MenuError
    }
  }
  menuItemMove(menu: $id, moves: $moves) {
    errors {
      ...MenuError
    }
  }
  menuItemBulkDelete(ids: $removeIds) {
    errors {
      ...MenuError
    }
  }
}
    ${MenuErrorFragmentDoc}`;
export type MenuUpdateMutationFn = Apollo.MutationFunction<Types.MenuUpdateMutation, Types.MenuUpdateMutationVariables>;

/**
 * __useMenuUpdateMutation__
 *
 * To run a mutation, you first call `useMenuUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuUpdateMutation, { data, loading, error }] = useMenuUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      moves: // value for 'moves'
 *      removeIds: // value for 'removeIds'
 *   },
 * });
 */
export function useMenuUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.MenuUpdateMutation, Types.MenuUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.MenuUpdateMutation, Types.MenuUpdateMutationVariables>(MenuUpdateDocument, options);
      }
export type MenuUpdateMutationHookResult = ReturnType<typeof useMenuUpdateMutation>;
export type MenuUpdateMutationResult = Apollo.MutationResult<Types.MenuUpdateMutation>;
export type MenuUpdateMutationOptions = Apollo.BaseMutationOptions<Types.MenuUpdateMutation, Types.MenuUpdateMutationVariables>;
export const MenuItemUpdateDocument = gql`
    mutation MenuItemUpdate($id: ID!, $input: MenuItemInput!) {
  menuItemUpdate(id: $id, input: $input) {
    errors {
      ...MenuError
    }
    menuItem {
      ...MenuItem
    }
  }
}
    ${MenuErrorFragmentDoc}
${MenuItemFragmentDoc}`;
export type MenuItemUpdateMutationFn = Apollo.MutationFunction<Types.MenuItemUpdateMutation, Types.MenuItemUpdateMutationVariables>;

/**
 * __useMenuItemUpdateMutation__
 *
 * To run a mutation, you first call `useMenuItemUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuItemUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuItemUpdateMutation, { data, loading, error }] = useMenuItemUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMenuItemUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.MenuItemUpdateMutation, Types.MenuItemUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.MenuItemUpdateMutation, Types.MenuItemUpdateMutationVariables>(MenuItemUpdateDocument, options);
      }
export type MenuItemUpdateMutationHookResult = ReturnType<typeof useMenuItemUpdateMutation>;
export type MenuItemUpdateMutationResult = Apollo.MutationResult<Types.MenuItemUpdateMutation>;
export type MenuItemUpdateMutationOptions = Apollo.BaseMutationOptions<Types.MenuItemUpdateMutation, Types.MenuItemUpdateMutationVariables>;
export const MenuListDocument = gql`
    query MenuList($first: Int, $after: String, $last: Int, $before: String, $sort: MenuSortingInput) {
  menus(first: $first, after: $after, before: $before, last: $last, sortBy: $sort) {
    edges {
      node {
        ...Menu
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${MenuFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useMenuListQuery__
 *
 * To run a query within a React component, call `useMenuListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useMenuListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.MenuListQuery, Types.MenuListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.MenuListQuery, Types.MenuListQueryVariables>(MenuListDocument, options);
      }
export function useMenuListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.MenuListQuery, Types.MenuListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.MenuListQuery, Types.MenuListQueryVariables>(MenuListDocument, options);
        }
export type MenuListQueryHookResult = ReturnType<typeof useMenuListQuery>;
export type MenuListLazyQueryHookResult = ReturnType<typeof useMenuListLazyQuery>;
export type MenuListQueryResult = Apollo.QueryResult<Types.MenuListQuery, Types.MenuListQueryVariables>;
export const MenuDetailsDocument = gql`
    query MenuDetails($id: ID!) {
  menu(id: $id) {
    ...MenuDetails
  }
}
    ${MenuDetailsFragmentDoc}`;

/**
 * __useMenuDetailsQuery__
 *
 * To run a query within a React component, call `useMenuDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMenuDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.MenuDetailsQuery, Types.MenuDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.MenuDetailsQuery, Types.MenuDetailsQueryVariables>(MenuDetailsDocument, options);
      }
export function useMenuDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.MenuDetailsQuery, Types.MenuDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.MenuDetailsQuery, Types.MenuDetailsQueryVariables>(MenuDetailsDocument, options);
        }
export type MenuDetailsQueryHookResult = ReturnType<typeof useMenuDetailsQuery>;
export type MenuDetailsLazyQueryHookResult = ReturnType<typeof useMenuDetailsLazyQuery>;
export type MenuDetailsQueryResult = Apollo.QueryResult<Types.MenuDetailsQuery, Types.MenuDetailsQueryVariables>;
export const PageListDocument = gql`
    query PageList($first: Int, $after: String, $last: Int, $before: String, $sort: PageSortingInput, $filter: PageFilterInput) {
  pages(
    before: $before
    after: $after
    first: $first
    last: $last
    sortBy: $sort
    filter: $filter
  ) {
    edges {
      node {
        ...Page
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
    ${PageFragmentDoc}`;

/**
 * __usePageListQuery__
 *
 * To run a query within a React component, call `usePageListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePageListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.PageListQuery, Types.PageListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PageListQuery, Types.PageListQueryVariables>(PageListDocument, options);
      }
export function usePageListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PageListQuery, Types.PageListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PageListQuery, Types.PageListQueryVariables>(PageListDocument, options);
        }
export type PageListQueryHookResult = ReturnType<typeof usePageListQuery>;
export type PageListLazyQueryHookResult = ReturnType<typeof usePageListLazyQuery>;
export type PageListQueryResult = Apollo.QueryResult<Types.PageListQuery, Types.PageListQueryVariables>;
export const PageDetailsDocument = gql`
    query PageDetails($id: ID!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  page(id: $id) {
    ...PageDetails
  }
}
    ${PageDetailsFragmentDoc}`;

/**
 * __usePageDetailsQuery__
 *
 * To run a query within a React component, call `usePageDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function usePageDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.PageDetailsQuery, Types.PageDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PageDetailsQuery, Types.PageDetailsQueryVariables>(PageDetailsDocument, options);
      }
export function usePageDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PageDetailsQuery, Types.PageDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PageDetailsQuery, Types.PageDetailsQueryVariables>(PageDetailsDocument, options);
        }
export type PageDetailsQueryHookResult = ReturnType<typeof usePageDetailsQuery>;
export type PageDetailsLazyQueryHookResult = ReturnType<typeof usePageDetailsLazyQuery>;
export type PageDetailsQueryResult = Apollo.QueryResult<Types.PageDetailsQuery, Types.PageDetailsQueryVariables>;
export const PageTypeDocument = gql`
    query PageType($id: ID!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  pageType(id: $id) {
    id
    name
    attributes {
      id
      inputType
      entityType
      slug
      name
      valueRequired
      choices(
        first: $firstValues
        after: $afterValues
        last: $lastValues
        before: $beforeValues
      ) {
        ...AttributeValueList
      }
    }
  }
}
    ${AttributeValueListFragmentDoc}`;

/**
 * __usePageTypeQuery__
 *
 * To run a query within a React component, call `usePageTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageTypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function usePageTypeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.PageTypeQuery, Types.PageTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PageTypeQuery, Types.PageTypeQueryVariables>(PageTypeDocument, options);
      }
export function usePageTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PageTypeQuery, Types.PageTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PageTypeQuery, Types.PageTypeQueryVariables>(PageTypeDocument, options);
        }
export type PageTypeQueryHookResult = ReturnType<typeof usePageTypeQuery>;
export type PageTypeLazyQueryHookResult = ReturnType<typeof usePageTypeLazyQuery>;
export type PageTypeQueryResult = Apollo.QueryResult<Types.PageTypeQuery, Types.PageTypeQueryVariables>;
export const PageCountDocument = gql`
    query PageCount($filter: PageFilterInput) {
  pages(filter: $filter) {
    totalCount
  }
}
    `;

/**
 * __usePageCountQuery__
 *
 * To run a query within a React component, call `usePageCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePageCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.PageCountQuery, Types.PageCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PageCountQuery, Types.PageCountQueryVariables>(PageCountDocument, options);
      }
export function usePageCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PageCountQuery, Types.PageCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PageCountQuery, Types.PageCountQueryVariables>(PageCountDocument, options);
        }
export type PageCountQueryHookResult = ReturnType<typeof usePageCountQuery>;
export type PageCountLazyQueryHookResult = ReturnType<typeof usePageCountLazyQuery>;
export type PageCountQueryResult = Apollo.QueryResult<Types.PageCountQuery, Types.PageCountQueryVariables>;
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
export const SearchOrdersByNumberDocument = gql`
    query SearchOrdersByNumber($first: Int!, $query: [String!]) {
  orders(first: $first, filter: {numbers: $query}) {
    edges {
      node {
        id
        number
        status
      }
    }
  }
}
    `;

/**
 * __useSearchOrdersByNumberQuery__
 *
 * To run a query within a React component, call `useSearchOrdersByNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOrdersByNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOrdersByNumberQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchOrdersByNumberQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchOrdersByNumberQuery, Types.SearchOrdersByNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchOrdersByNumberQuery, Types.SearchOrdersByNumberQueryVariables>(SearchOrdersByNumberDocument, options);
      }
export function useSearchOrdersByNumberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchOrdersByNumberQuery, Types.SearchOrdersByNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchOrdersByNumberQuery, Types.SearchOrdersByNumberQueryVariables>(SearchOrdersByNumberDocument, options);
        }
export type SearchOrdersByNumberQueryHookResult = ReturnType<typeof useSearchOrdersByNumberQuery>;
export type SearchOrdersByNumberLazyQueryHookResult = ReturnType<typeof useSearchOrdersByNumberLazyQuery>;
export type SearchOrdersByNumberQueryResult = Apollo.QueryResult<Types.SearchOrdersByNumberQuery, Types.SearchOrdersByNumberQueryVariables>;
export const SearchCatalogDocument = gql`
    query SearchCatalog($first: Int!, $query: String!) {
  categories(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        backgroundImage(size: 64) {
          url
          alt
        }
        level
      }
    }
  }
  collections(first: $first, filter: {search: $query}) {
    edges {
      node {
        ...Collection
        backgroundImage(size: 64) {
          url
          alt
        }
      }
    }
  }
  products(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        category {
          id
          name
        }
        name
        thumbnail(size: 64) {
          alt
          url
        }
      }
    }
  }
  productVariants(first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        name
        sku
        product {
          id
          name
          category {
            id
            name
          }
          thumbnail(size: 64) {
            alt
            url
          }
        }
      }
    }
  }
}
    ${CollectionFragmentDoc}`;

/**
 * __useSearchCatalogQuery__
 *
 * To run a query within a React component, call `useSearchCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCatalogQuery({
 *   variables: {
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchCatalogQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>(SearchCatalogDocument, options);
      }
export function useSearchCatalogLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>(SearchCatalogDocument, options);
        }
export type SearchCatalogQueryHookResult = ReturnType<typeof useSearchCatalogQuery>;
export type SearchCatalogLazyQueryHookResult = ReturnType<typeof useSearchCatalogLazyQuery>;
export type SearchCatalogQueryResult = Apollo.QueryResult<Types.SearchCatalogQuery, Types.SearchCatalogQueryVariables>;
export const ShopInfoDocument = gql`
    query ShopInfo {
  shop {
    countries {
      ...CountryWithCode
    }
    defaultCountry {
      ...CountryWithCode
    }
    defaultWeightUnit
    domain {
      host
      url
    }
    languages {
      ...Language
    }
    name
    trackInventoryByDefault
    permissions {
      ...Permission
    }
    version
  }
}
    ${CountryWithCodeFragmentDoc}
${LanguageFragmentDoc}
${PermissionFragmentDoc}`;

/**
 * __useShopInfoQuery__
 *
 * To run a query within a React component, call `useShopInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useShopInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.ShopInfoQuery, Types.ShopInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ShopInfoQuery, Types.ShopInfoQueryVariables>(ShopInfoDocument, options);
      }
export function useShopInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ShopInfoQuery, Types.ShopInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ShopInfoQuery, Types.ShopInfoQueryVariables>(ShopInfoDocument, options);
        }
export type ShopInfoQueryHookResult = ReturnType<typeof useShopInfoQuery>;
export type ShopInfoLazyQueryHookResult = ReturnType<typeof useShopInfoLazyQuery>;
export type ShopInfoQueryResult = Apollo.QueryResult<Types.ShopInfoQuery, Types.ShopInfoQueryVariables>;
export const ShopCountriesDocument = gql`
    query ShopCountries($filter: CountryFilterInput) {
  shop {
    countries(filter: $filter) {
      code
      country
    }
  }
}
    `;

/**
 * __useShopCountriesQuery__
 *
 * To run a query within a React component, call `useShopCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopCountriesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useShopCountriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.ShopCountriesQuery, Types.ShopCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ShopCountriesQuery, Types.ShopCountriesQueryVariables>(ShopCountriesDocument, options);
      }
export function useShopCountriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ShopCountriesQuery, Types.ShopCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ShopCountriesQuery, Types.ShopCountriesQueryVariables>(ShopCountriesDocument, options);
        }
export type ShopCountriesQueryHookResult = ReturnType<typeof useShopCountriesQuery>;
export type ShopCountriesLazyQueryHookResult = ReturnType<typeof useShopCountriesLazyQuery>;
export type ShopCountriesQueryResult = Apollo.QueryResult<Types.ShopCountriesQuery, Types.ShopCountriesQueryVariables>;
export const RefreshLimitsDocument = gql`
    query RefreshLimits($channels: Boolean!, $orders: Boolean!, $productVariants: Boolean!, $staffUsers: Boolean!, $warehouses: Boolean!) {
  shop {
    ...ShopLimit
  }
}
    ${ShopLimitFragmentDoc}`;

/**
 * __useRefreshLimitsQuery__
 *
 * To run a query within a React component, call `useRefreshLimitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshLimitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshLimitsQuery({
 *   variables: {
 *      channels: // value for 'channels'
 *      orders: // value for 'orders'
 *      productVariants: // value for 'productVariants'
 *      staffUsers: // value for 'staffUsers'
 *      warehouses: // value for 'warehouses'
 *   },
 * });
 */
export function useRefreshLimitsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.RefreshLimitsQuery, Types.RefreshLimitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.RefreshLimitsQuery, Types.RefreshLimitsQueryVariables>(RefreshLimitsDocument, options);
      }
export function useRefreshLimitsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.RefreshLimitsQuery, Types.RefreshLimitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.RefreshLimitsQuery, Types.RefreshLimitsQueryVariables>(RefreshLimitsDocument, options);
        }
export type RefreshLimitsQueryHookResult = ReturnType<typeof useRefreshLimitsQuery>;
export type RefreshLimitsLazyQueryHookResult = ReturnType<typeof useRefreshLimitsLazyQuery>;
export type RefreshLimitsQueryResult = Apollo.QueryResult<Types.RefreshLimitsQuery, Types.RefreshLimitsQueryVariables>;
export const SearchAttributesDocument = gql`
    query SearchAttributes($after: String, $first: Int!, $query: String!) {
  search: attributes(after: $after, first: $first, filter: {search: $query}) {
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
 * __useSearchAttributesQuery__
 *
 * To run a query within a React component, call `useSearchAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAttributesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchAttributesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchAttributesQuery, Types.SearchAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchAttributesQuery, Types.SearchAttributesQueryVariables>(SearchAttributesDocument, options);
      }
export function useSearchAttributesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchAttributesQuery, Types.SearchAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchAttributesQuery, Types.SearchAttributesQueryVariables>(SearchAttributesDocument, options);
        }
export type SearchAttributesQueryHookResult = ReturnType<typeof useSearchAttributesQuery>;
export type SearchAttributesLazyQueryHookResult = ReturnType<typeof useSearchAttributesLazyQuery>;
export type SearchAttributesQueryResult = Apollo.QueryResult<Types.SearchAttributesQuery, Types.SearchAttributesQueryVariables>;
export const SearchAttributeValuesDocument = gql`
    query SearchAttributeValues($id: ID, $after: String, $first: Int!, $query: String!) {
  attribute(id: $id) {
    id
    choices(after: $after, first: $first, filter: {search: $query}) {
      edges {
        node {
          ...AttributeValueDetails
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${AttributeValueDetailsFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useSearchAttributeValuesQuery__
 *
 * To run a query within a React component, call `useSearchAttributeValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAttributeValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAttributeValuesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchAttributeValuesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchAttributeValuesQuery, Types.SearchAttributeValuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchAttributeValuesQuery, Types.SearchAttributeValuesQueryVariables>(SearchAttributeValuesDocument, options);
      }
export function useSearchAttributeValuesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchAttributeValuesQuery, Types.SearchAttributeValuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchAttributeValuesQuery, Types.SearchAttributeValuesQueryVariables>(SearchAttributeValuesDocument, options);
        }
export type SearchAttributeValuesQueryHookResult = ReturnType<typeof useSearchAttributeValuesQuery>;
export type SearchAttributeValuesLazyQueryHookResult = ReturnType<typeof useSearchAttributeValuesLazyQuery>;
export type SearchAttributeValuesQueryResult = Apollo.QueryResult<Types.SearchAttributeValuesQuery, Types.SearchAttributeValuesQueryVariables>;
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
export const SearchAvailablePageAttributesDocument = gql`
    query SearchAvailablePageAttributes($id: ID!, $after: String, $first: Int!, $query: String!) {
  pageType(id: $id) {
    id
    availableAttributes(after: $after, first: $first, filter: {search: $query}) {
      edges {
        node {
          ...AvailableAttribute
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${AvailableAttributeFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useSearchAvailablePageAttributesQuery__
 *
 * To run a query within a React component, call `useSearchAvailablePageAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAvailablePageAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAvailablePageAttributesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchAvailablePageAttributesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchAvailablePageAttributesQuery, Types.SearchAvailablePageAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchAvailablePageAttributesQuery, Types.SearchAvailablePageAttributesQueryVariables>(SearchAvailablePageAttributesDocument, options);
      }
export function useSearchAvailablePageAttributesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchAvailablePageAttributesQuery, Types.SearchAvailablePageAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchAvailablePageAttributesQuery, Types.SearchAvailablePageAttributesQueryVariables>(SearchAvailablePageAttributesDocument, options);
        }
export type SearchAvailablePageAttributesQueryHookResult = ReturnType<typeof useSearchAvailablePageAttributesQuery>;
export type SearchAvailablePageAttributesLazyQueryHookResult = ReturnType<typeof useSearchAvailablePageAttributesLazyQuery>;
export type SearchAvailablePageAttributesQueryResult = Apollo.QueryResult<Types.SearchAvailablePageAttributesQuery, Types.SearchAvailablePageAttributesQueryVariables>;
export const SearchAvailableProductAttributesDocument = gql`
    query SearchAvailableProductAttributes($id: ID!, $after: String, $first: Int!, $query: String!) {
  productType(id: $id) {
    id
    availableAttributes(after: $after, first: $first, filter: {search: $query}) {
      edges {
        node {
          ...AvailableAttribute
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${AvailableAttributeFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useSearchAvailableProductAttributesQuery__
 *
 * To run a query within a React component, call `useSearchAvailableProductAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAvailableProductAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAvailableProductAttributesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchAvailableProductAttributesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchAvailableProductAttributesQuery, Types.SearchAvailableProductAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchAvailableProductAttributesQuery, Types.SearchAvailableProductAttributesQueryVariables>(SearchAvailableProductAttributesDocument, options);
      }
export function useSearchAvailableProductAttributesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchAvailableProductAttributesQuery, Types.SearchAvailableProductAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchAvailableProductAttributesQuery, Types.SearchAvailableProductAttributesQueryVariables>(SearchAvailableProductAttributesDocument, options);
        }
export type SearchAvailableProductAttributesQueryHookResult = ReturnType<typeof useSearchAvailableProductAttributesQuery>;
export type SearchAvailableProductAttributesLazyQueryHookResult = ReturnType<typeof useSearchAvailableProductAttributesLazyQuery>;
export type SearchAvailableProductAttributesQueryResult = Apollo.QueryResult<Types.SearchAvailableProductAttributesQuery, Types.SearchAvailableProductAttributesQueryVariables>;
export const SearchCategoriesDocument = gql`
    query SearchCategories($after: String, $first: Int!, $query: String!) {
  search: categories(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        ...CategoryWithAncestors
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${CategoryWithAncestorsFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useSearchCategoriesQuery__
 *
 * To run a query within a React component, call `useSearchCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCategoriesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchCategoriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
      }
export function useSearchCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
        }
export type SearchCategoriesQueryHookResult = ReturnType<typeof useSearchCategoriesQuery>;
export type SearchCategoriesLazyQueryHookResult = ReturnType<typeof useSearchCategoriesLazyQuery>;
export type SearchCategoriesQueryResult = Apollo.QueryResult<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>;
export const SearchCollectionsDocument = gql`
    query SearchCollections($after: String, $first: Int!, $query: String!, $channel: String) {
  search: collections(
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
 * __useSearchCollectionsQuery__
 *
 * To run a query within a React component, call `useSearchCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCollectionsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useSearchCollectionsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchCollectionsQuery, Types.SearchCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchCollectionsQuery, Types.SearchCollectionsQueryVariables>(SearchCollectionsDocument, options);
      }
export function useSearchCollectionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchCollectionsQuery, Types.SearchCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchCollectionsQuery, Types.SearchCollectionsQueryVariables>(SearchCollectionsDocument, options);
        }
export type SearchCollectionsQueryHookResult = ReturnType<typeof useSearchCollectionsQuery>;
export type SearchCollectionsLazyQueryHookResult = ReturnType<typeof useSearchCollectionsLazyQuery>;
export type SearchCollectionsQueryResult = Apollo.QueryResult<Types.SearchCollectionsQuery, Types.SearchCollectionsQueryVariables>;
export const SearchCustomersDocument = gql`
    query SearchCustomers($after: String, $first: Int!, $query: String!) {
  search: customers(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        email
        firstName
        lastName
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchCustomersQuery__
 *
 * To run a query within a React component, call `useSearchCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCustomersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchCustomersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchCustomersQuery, Types.SearchCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchCustomersQuery, Types.SearchCustomersQueryVariables>(SearchCustomersDocument, options);
      }
export function useSearchCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchCustomersQuery, Types.SearchCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchCustomersQuery, Types.SearchCustomersQueryVariables>(SearchCustomersDocument, options);
        }
export type SearchCustomersQueryHookResult = ReturnType<typeof useSearchCustomersQuery>;
export type SearchCustomersLazyQueryHookResult = ReturnType<typeof useSearchCustomersLazyQuery>;
export type SearchCustomersQueryResult = Apollo.QueryResult<Types.SearchCustomersQuery, Types.SearchCustomersQueryVariables>;
export const SearchGiftCardTagsDocument = gql`
    query SearchGiftCardTags($query: String!, $first: Int!, $after: String, $last: Int, $before: String) {
  search: giftCardTags(
    filter: {search: $query}
    first: $first
    after: $after
    last: $last
    before: $before
  ) {
    totalCount
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
 * __useSearchGiftCardTagsQuery__
 *
 * To run a query within a React component, call `useSearchGiftCardTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGiftCardTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGiftCardTagsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useSearchGiftCardTagsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchGiftCardTagsQuery, Types.SearchGiftCardTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchGiftCardTagsQuery, Types.SearchGiftCardTagsQueryVariables>(SearchGiftCardTagsDocument, options);
      }
export function useSearchGiftCardTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchGiftCardTagsQuery, Types.SearchGiftCardTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchGiftCardTagsQuery, Types.SearchGiftCardTagsQueryVariables>(SearchGiftCardTagsDocument, options);
        }
export type SearchGiftCardTagsQueryHookResult = ReturnType<typeof useSearchGiftCardTagsQuery>;
export type SearchGiftCardTagsLazyQueryHookResult = ReturnType<typeof useSearchGiftCardTagsLazyQuery>;
export type SearchGiftCardTagsQueryResult = Apollo.QueryResult<Types.SearchGiftCardTagsQuery, Types.SearchGiftCardTagsQueryVariables>;
export const SearchOrderVariantDocument = gql`
    query SearchOrderVariant($channel: String!, $first: Int!, $query: String!, $after: String, $address: AddressInput, $isPublished: Boolean, $stockAvailability: StockAvailability) {
  search: products(
    first: $first
    after: $after
    filter: {search: $query, isPublished: $isPublished, stockAvailability: $stockAvailability}
    channel: $channel
  ) {
    edges {
      node {
        id
        name
        thumbnail {
          url
        }
        variants {
          id
          name
          sku
          pricing(address: $address) {
            priceUndiscounted {
              gross {
                ...Money
              }
            }
            price {
              gross {
                ...Money
              }
            }
            onSale
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    ${MoneyFragmentDoc}`;

/**
 * __useSearchOrderVariantQuery__
 *
 * To run a query within a React component, call `useSearchOrderVariantQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOrderVariantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOrderVariantQuery({
 *   variables: {
 *      channel: // value for 'channel'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *      after: // value for 'after'
 *      address: // value for 'address'
 *      isPublished: // value for 'isPublished'
 *      stockAvailability: // value for 'stockAvailability'
 *   },
 * });
 */
export function useSearchOrderVariantQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchOrderVariantQuery, Types.SearchOrderVariantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchOrderVariantQuery, Types.SearchOrderVariantQueryVariables>(SearchOrderVariantDocument, options);
      }
export function useSearchOrderVariantLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchOrderVariantQuery, Types.SearchOrderVariantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchOrderVariantQuery, Types.SearchOrderVariantQueryVariables>(SearchOrderVariantDocument, options);
        }
export type SearchOrderVariantQueryHookResult = ReturnType<typeof useSearchOrderVariantQuery>;
export type SearchOrderVariantLazyQueryHookResult = ReturnType<typeof useSearchOrderVariantLazyQuery>;
export type SearchOrderVariantQueryResult = Apollo.QueryResult<Types.SearchOrderVariantQuery, Types.SearchOrderVariantQueryVariables>;
export const SearchPagesDocument = gql`
    query SearchPages($after: String, $first: Int!, $query: String!) {
  search: pages(after: $after, first: $first, filter: {search: $query}) {
    edges {
      node {
        id
        title
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchPagesQuery__
 *
 * To run a query within a React component, call `useSearchPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPagesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchPagesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchPagesQuery, Types.SearchPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchPagesQuery, Types.SearchPagesQueryVariables>(SearchPagesDocument, options);
      }
export function useSearchPagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchPagesQuery, Types.SearchPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchPagesQuery, Types.SearchPagesQueryVariables>(SearchPagesDocument, options);
        }
export type SearchPagesQueryHookResult = ReturnType<typeof useSearchPagesQuery>;
export type SearchPagesLazyQueryHookResult = ReturnType<typeof useSearchPagesLazyQuery>;
export type SearchPagesQueryResult = Apollo.QueryResult<Types.SearchPagesQuery, Types.SearchPagesQueryVariables>;
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
export const SearchProductsDocument = gql`
    query SearchProducts($after: String, $first: Int!, $query: String!, $channel: String) {
  search: products(
    after: $after
    first: $first
    filter: {search: $query}
    channel: $channel
  ) {
    edges {
      node {
        id
        name
        thumbnail {
          url
        }
        channelListings {
          id
          channel {
            id
            name
            currencyCode
          }
        }
        variants {
          id
          name
          sku
          channelListings {
            channel {
              id
              isActive
              name
              currencyCode
            }
            price {
              amount
              currency
            }
          }
        }
        collections {
          id
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
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useSearchProductsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>(SearchProductsDocument, options);
      }
export function useSearchProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>(SearchProductsDocument, options);
        }
export type SearchProductsQueryHookResult = ReturnType<typeof useSearchProductsQuery>;
export type SearchProductsLazyQueryHookResult = ReturnType<typeof useSearchProductsLazyQuery>;
export type SearchProductsQueryResult = Apollo.QueryResult<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>;
export const SearchProductTypesDocument = gql`
    query SearchProductTypes($after: String, $first: Int!, $query: String!) {
  search: productTypes(after: $after, first: $first, filter: {search: $query}) {
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
 * __useSearchProductTypesQuery__
 *
 * To run a query within a React component, call `useSearchProductTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductTypesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchProductTypesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchProductTypesQuery, Types.SearchProductTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchProductTypesQuery, Types.SearchProductTypesQueryVariables>(SearchProductTypesDocument, options);
      }
export function useSearchProductTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchProductTypesQuery, Types.SearchProductTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchProductTypesQuery, Types.SearchProductTypesQueryVariables>(SearchProductTypesDocument, options);
        }
export type SearchProductTypesQueryHookResult = ReturnType<typeof useSearchProductTypesQuery>;
export type SearchProductTypesLazyQueryHookResult = ReturnType<typeof useSearchProductTypesLazyQuery>;
export type SearchProductTypesQueryResult = Apollo.QueryResult<Types.SearchProductTypesQuery, Types.SearchProductTypesQueryVariables>;
export const SearchShippingZonesDocument = gql`
    query SearchShippingZones($query: String!, $first: Int!, $after: String, $last: Int, $before: String) {
  search: shippingZones(
    filter: {search: $query}
    first: $first
    after: $after
    last: $last
    before: $before
  ) {
    totalCount
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
 * __useSearchShippingZonesQuery__
 *
 * To run a query within a React component, call `useSearchShippingZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchShippingZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchShippingZonesQuery({
 *   variables: {
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useSearchShippingZonesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchShippingZonesQuery, Types.SearchShippingZonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchShippingZonesQuery, Types.SearchShippingZonesQueryVariables>(SearchShippingZonesDocument, options);
      }
export function useSearchShippingZonesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchShippingZonesQuery, Types.SearchShippingZonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchShippingZonesQuery, Types.SearchShippingZonesQueryVariables>(SearchShippingZonesDocument, options);
        }
export type SearchShippingZonesQueryHookResult = ReturnType<typeof useSearchShippingZonesQuery>;
export type SearchShippingZonesLazyQueryHookResult = ReturnType<typeof useSearchShippingZonesLazyQuery>;
export type SearchShippingZonesQueryResult = Apollo.QueryResult<Types.SearchShippingZonesQuery, Types.SearchShippingZonesQueryVariables>;
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
export const SearchWarehousesDocument = gql`
    query SearchWarehouses($after: String, $first: Int!, $query: String!, $channnelsId: [ID!]) {
  search: warehouses(
    after: $after
    first: $first
    sortBy: {direction: ASC, field: NAME}
    filter: {search: $query, channels: $channnelsId}
  ) {
    totalCount
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
 * __useSearchWarehousesQuery__
 *
 * To run a query within a React component, call `useSearchWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchWarehousesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *      channnelsId: // value for 'channnelsId'
 *   },
 * });
 */
export function useSearchWarehousesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SearchWarehousesQuery, Types.SearchWarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SearchWarehousesQuery, Types.SearchWarehousesQueryVariables>(SearchWarehousesDocument, options);
      }
export function useSearchWarehousesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SearchWarehousesQuery, Types.SearchWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SearchWarehousesQuery, Types.SearchWarehousesQueryVariables>(SearchWarehousesDocument, options);
        }
export type SearchWarehousesQueryHookResult = ReturnType<typeof useSearchWarehousesQuery>;
export type SearchWarehousesLazyQueryHookResult = ReturnType<typeof useSearchWarehousesLazyQuery>;
export type SearchWarehousesQueryResult = Apollo.QueryResult<Types.SearchWarehousesQuery, Types.SearchWarehousesQueryVariables>;
export const ShopSettingsUpdateDocument = gql`
    mutation ShopSettingsUpdate($shopSettingsInput: ShopSettingsInput!, $addressInput: AddressInput) {
  shopSettingsUpdate(input: $shopSettingsInput) {
    errors {
      ...ShopError
    }
    shop {
      ...Shop
    }
  }
  shopAddressUpdate(input: $addressInput) {
    errors {
      ...ShopError
    }
    shop {
      companyAddress {
        ...Address
      }
    }
  }
}
    ${ShopErrorFragmentDoc}
${ShopFragmentDoc}
${AddressFragmentDoc}`;
export type ShopSettingsUpdateMutationFn = Apollo.MutationFunction<Types.ShopSettingsUpdateMutation, Types.ShopSettingsUpdateMutationVariables>;

/**
 * __useShopSettingsUpdateMutation__
 *
 * To run a mutation, you first call `useShopSettingsUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShopSettingsUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shopSettingsUpdateMutation, { data, loading, error }] = useShopSettingsUpdateMutation({
 *   variables: {
 *      shopSettingsInput: // value for 'shopSettingsInput'
 *      addressInput: // value for 'addressInput'
 *   },
 * });
 */
export function useShopSettingsUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.ShopSettingsUpdateMutation, Types.ShopSettingsUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.ShopSettingsUpdateMutation, Types.ShopSettingsUpdateMutationVariables>(ShopSettingsUpdateDocument, options);
      }
export type ShopSettingsUpdateMutationHookResult = ReturnType<typeof useShopSettingsUpdateMutation>;
export type ShopSettingsUpdateMutationResult = Apollo.MutationResult<Types.ShopSettingsUpdateMutation>;
export type ShopSettingsUpdateMutationOptions = Apollo.BaseMutationOptions<Types.ShopSettingsUpdateMutation, Types.ShopSettingsUpdateMutationVariables>;
export const SiteSettingsDocument = gql`
    query SiteSettings {
  shop {
    ...Shop
  }
}
    ${ShopFragmentDoc}`;

/**
 * __useSiteSettingsQuery__
 *
 * To run a query within a React component, call `useSiteSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSiteSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSiteSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSiteSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.SiteSettingsQuery, Types.SiteSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SiteSettingsQuery, Types.SiteSettingsQueryVariables>(SiteSettingsDocument, options);
      }
export function useSiteSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SiteSettingsQuery, Types.SiteSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SiteSettingsQuery, Types.SiteSettingsQueryVariables>(SiteSettingsDocument, options);
        }
export type SiteSettingsQueryHookResult = ReturnType<typeof useSiteSettingsQuery>;
export type SiteSettingsLazyQueryHookResult = ReturnType<typeof useSiteSettingsLazyQuery>;
export type SiteSettingsQueryResult = Apollo.QueryResult<Types.SiteSettingsQuery, Types.SiteSettingsQueryVariables>;
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
export const UpdateProductTranslationsDocument = gql`
    mutation UpdateProductTranslations($id: ID!, $input: TranslationInput!, $language: LanguageCodeEnum!) {
  productTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...ProductTranslateErrorFragment
    }
    product {
      id
      name
      description
      seoDescription
      seoTitle
      translation(languageCode: $language) {
        id
        description
        language {
          code
          language
        }
        name
        seoDescription
        seoTitle
      }
    }
  }
}
    ${ProductTranslateErrorFragmentFragmentDoc}`;
export type UpdateProductTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateProductTranslationsMutation, Types.UpdateProductTranslationsMutationVariables>;

/**
 * __useUpdateProductTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateProductTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductTranslationsMutation, { data, loading, error }] = useUpdateProductTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateProductTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateProductTranslationsMutation, Types.UpdateProductTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateProductTranslationsMutation, Types.UpdateProductTranslationsMutationVariables>(UpdateProductTranslationsDocument, options);
      }
export type UpdateProductTranslationsMutationHookResult = ReturnType<typeof useUpdateProductTranslationsMutation>;
export type UpdateProductTranslationsMutationResult = Apollo.MutationResult<Types.UpdateProductTranslationsMutation>;
export type UpdateProductTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProductTranslationsMutation, Types.UpdateProductTranslationsMutationVariables>;
export const UpdateProductVariantTranslationsDocument = gql`
    mutation UpdateProductVariantTranslations($id: ID!, $input: NameTranslationInput!, $language: LanguageCodeEnum!) {
  productVariantTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...ProductVariantTranslateErrorFragment
    }
    productVariant {
      id
      name
      translation(languageCode: $language) {
        id
        name
        language {
          code
          language
        }
      }
    }
  }
}
    ${ProductVariantTranslateErrorFragmentFragmentDoc}`;
export type UpdateProductVariantTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateProductVariantTranslationsMutation, Types.UpdateProductVariantTranslationsMutationVariables>;

/**
 * __useUpdateProductVariantTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateProductVariantTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductVariantTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductVariantTranslationsMutation, { data, loading, error }] = useUpdateProductVariantTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateProductVariantTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateProductVariantTranslationsMutation, Types.UpdateProductVariantTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateProductVariantTranslationsMutation, Types.UpdateProductVariantTranslationsMutationVariables>(UpdateProductVariantTranslationsDocument, options);
      }
export type UpdateProductVariantTranslationsMutationHookResult = ReturnType<typeof useUpdateProductVariantTranslationsMutation>;
export type UpdateProductVariantTranslationsMutationResult = Apollo.MutationResult<Types.UpdateProductVariantTranslationsMutation>;
export type UpdateProductVariantTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProductVariantTranslationsMutation, Types.UpdateProductVariantTranslationsMutationVariables>;
export const UpdateCategoryTranslationsDocument = gql`
    mutation UpdateCategoryTranslations($id: ID!, $input: TranslationInput!, $language: LanguageCodeEnum!) {
  categoryTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...CategoryTranslateErrorFragment
    }
    category {
      id
      name
      description
      seoDescription
      seoTitle
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
  }
}
    ${CategoryTranslateErrorFragmentFragmentDoc}`;
export type UpdateCategoryTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateCategoryTranslationsMutation, Types.UpdateCategoryTranslationsMutationVariables>;

/**
 * __useUpdateCategoryTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryTranslationsMutation, { data, loading, error }] = useUpdateCategoryTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateCategoryTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateCategoryTranslationsMutation, Types.UpdateCategoryTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateCategoryTranslationsMutation, Types.UpdateCategoryTranslationsMutationVariables>(UpdateCategoryTranslationsDocument, options);
      }
export type UpdateCategoryTranslationsMutationHookResult = ReturnType<typeof useUpdateCategoryTranslationsMutation>;
export type UpdateCategoryTranslationsMutationResult = Apollo.MutationResult<Types.UpdateCategoryTranslationsMutation>;
export type UpdateCategoryTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCategoryTranslationsMutation, Types.UpdateCategoryTranslationsMutationVariables>;
export const UpdateCollectionTranslationsDocument = gql`
    mutation UpdateCollectionTranslations($id: ID!, $input: TranslationInput!, $language: LanguageCodeEnum!) {
  collectionTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...CollectionTranslateErrorFragment
    }
    collection {
      id
      name
      description
      seoDescription
      seoTitle
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
  }
}
    ${CollectionTranslateErrorFragmentFragmentDoc}`;
export type UpdateCollectionTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateCollectionTranslationsMutation, Types.UpdateCollectionTranslationsMutationVariables>;

/**
 * __useUpdateCollectionTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionTranslationsMutation, { data, loading, error }] = useUpdateCollectionTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateCollectionTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateCollectionTranslationsMutation, Types.UpdateCollectionTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateCollectionTranslationsMutation, Types.UpdateCollectionTranslationsMutationVariables>(UpdateCollectionTranslationsDocument, options);
      }
export type UpdateCollectionTranslationsMutationHookResult = ReturnType<typeof useUpdateCollectionTranslationsMutation>;
export type UpdateCollectionTranslationsMutationResult = Apollo.MutationResult<Types.UpdateCollectionTranslationsMutation>;
export type UpdateCollectionTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCollectionTranslationsMutation, Types.UpdateCollectionTranslationsMutationVariables>;
export const UpdatePageTranslationsDocument = gql`
    mutation UpdatePageTranslations($id: ID!, $input: PageTranslationInput!, $language: LanguageCodeEnum!) {
  pageTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...PageTranslateErrorFragment
    }
    page {
      ...PageTranslation
    }
  }
}
    ${PageTranslateErrorFragmentFragmentDoc}
${PageTranslationFragmentDoc}`;
export type UpdatePageTranslationsMutationFn = Apollo.MutationFunction<Types.UpdatePageTranslationsMutation, Types.UpdatePageTranslationsMutationVariables>;

/**
 * __useUpdatePageTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdatePageTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageTranslationsMutation, { data, loading, error }] = useUpdatePageTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdatePageTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdatePageTranslationsMutation, Types.UpdatePageTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdatePageTranslationsMutation, Types.UpdatePageTranslationsMutationVariables>(UpdatePageTranslationsDocument, options);
      }
export type UpdatePageTranslationsMutationHookResult = ReturnType<typeof useUpdatePageTranslationsMutation>;
export type UpdatePageTranslationsMutationResult = Apollo.MutationResult<Types.UpdatePageTranslationsMutation>;
export type UpdatePageTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePageTranslationsMutation, Types.UpdatePageTranslationsMutationVariables>;
export const UpdateVoucherTranslationsDocument = gql`
    mutation UpdateVoucherTranslations($id: ID!, $input: NameTranslationInput!, $language: LanguageCodeEnum!) {
  voucherTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...VoucherTranslateErrorFragment
    }
    voucher {
      id
      name
      translation(languageCode: $language) {
        id
        language {
          code
          language
        }
        name
      }
    }
  }
}
    ${VoucherTranslateErrorFragmentFragmentDoc}`;
export type UpdateVoucherTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateVoucherTranslationsMutation, Types.UpdateVoucherTranslationsMutationVariables>;

/**
 * __useUpdateVoucherTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateVoucherTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoucherTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoucherTranslationsMutation, { data, loading, error }] = useUpdateVoucherTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateVoucherTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateVoucherTranslationsMutation, Types.UpdateVoucherTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateVoucherTranslationsMutation, Types.UpdateVoucherTranslationsMutationVariables>(UpdateVoucherTranslationsDocument, options);
      }
export type UpdateVoucherTranslationsMutationHookResult = ReturnType<typeof useUpdateVoucherTranslationsMutation>;
export type UpdateVoucherTranslationsMutationResult = Apollo.MutationResult<Types.UpdateVoucherTranslationsMutation>;
export type UpdateVoucherTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateVoucherTranslationsMutation, Types.UpdateVoucherTranslationsMutationVariables>;
export const UpdateSaleTranslationsDocument = gql`
    mutation UpdateSaleTranslations($id: ID!, $input: NameTranslationInput!, $language: LanguageCodeEnum!) {
  saleTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...SaleTranslateErrorFragment
    }
    sale {
      id
      name
      translation(languageCode: $language) {
        id
        language {
          code
          language
        }
        name
      }
    }
  }
}
    ${SaleTranslateErrorFragmentFragmentDoc}`;
export type UpdateSaleTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateSaleTranslationsMutation, Types.UpdateSaleTranslationsMutationVariables>;

/**
 * __useUpdateSaleTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateSaleTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSaleTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSaleTranslationsMutation, { data, loading, error }] = useUpdateSaleTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateSaleTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateSaleTranslationsMutation, Types.UpdateSaleTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateSaleTranslationsMutation, Types.UpdateSaleTranslationsMutationVariables>(UpdateSaleTranslationsDocument, options);
      }
export type UpdateSaleTranslationsMutationHookResult = ReturnType<typeof useUpdateSaleTranslationsMutation>;
export type UpdateSaleTranslationsMutationResult = Apollo.MutationResult<Types.UpdateSaleTranslationsMutation>;
export type UpdateSaleTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateSaleTranslationsMutation, Types.UpdateSaleTranslationsMutationVariables>;
export const UpdateAttributeTranslationsDocument = gql`
    mutation UpdateAttributeTranslations($id: ID!, $input: NameTranslationInput!, $language: LanguageCodeEnum!) {
  attributeTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...AttributeTranslateErrorFragment
    }
    attribute {
      id
      name
      translation(languageCode: $language) {
        id
        name
      }
    }
  }
}
    ${AttributeTranslateErrorFragmentFragmentDoc}`;
export type UpdateAttributeTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateAttributeTranslationsMutation, Types.UpdateAttributeTranslationsMutationVariables>;

/**
 * __useUpdateAttributeTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateAttributeTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttributeTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttributeTranslationsMutation, { data, loading, error }] = useUpdateAttributeTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateAttributeTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateAttributeTranslationsMutation, Types.UpdateAttributeTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateAttributeTranslationsMutation, Types.UpdateAttributeTranslationsMutationVariables>(UpdateAttributeTranslationsDocument, options);
      }
export type UpdateAttributeTranslationsMutationHookResult = ReturnType<typeof useUpdateAttributeTranslationsMutation>;
export type UpdateAttributeTranslationsMutationResult = Apollo.MutationResult<Types.UpdateAttributeTranslationsMutation>;
export type UpdateAttributeTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateAttributeTranslationsMutation, Types.UpdateAttributeTranslationsMutationVariables>;
export const UpdateAttributeValueTranslationsDocument = gql`
    mutation UpdateAttributeValueTranslations($id: ID!, $input: AttributeValueTranslationInput!, $language: LanguageCodeEnum!) {
  attributeValueTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...AttributeValueTranslateErrorFragment
    }
    attributeValue {
      id
      name
      richText
      translation(languageCode: $language) {
        id
        name
        richText
      }
    }
  }
}
    ${AttributeValueTranslateErrorFragmentFragmentDoc}`;
export type UpdateAttributeValueTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateAttributeValueTranslationsMutation, Types.UpdateAttributeValueTranslationsMutationVariables>;

/**
 * __useUpdateAttributeValueTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateAttributeValueTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttributeValueTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttributeValueTranslationsMutation, { data, loading, error }] = useUpdateAttributeValueTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateAttributeValueTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateAttributeValueTranslationsMutation, Types.UpdateAttributeValueTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateAttributeValueTranslationsMutation, Types.UpdateAttributeValueTranslationsMutationVariables>(UpdateAttributeValueTranslationsDocument, options);
      }
export type UpdateAttributeValueTranslationsMutationHookResult = ReturnType<typeof useUpdateAttributeValueTranslationsMutation>;
export type UpdateAttributeValueTranslationsMutationResult = Apollo.MutationResult<Types.UpdateAttributeValueTranslationsMutation>;
export type UpdateAttributeValueTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateAttributeValueTranslationsMutation, Types.UpdateAttributeValueTranslationsMutationVariables>;
export const UpdateShippingMethodTranslationsDocument = gql`
    mutation UpdateShippingMethodTranslations($id: ID!, $input: ShippingPriceTranslationInput!, $language: LanguageCodeEnum!) {
  shippingPriceTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      ...ShippingPriceTranslateErrorFragment
    }
    shippingMethod {
      id
      name
      description
      translation(languageCode: $language) {
        id
        language {
          language
        }
        name
        description
      }
    }
  }
}
    ${ShippingPriceTranslateErrorFragmentFragmentDoc}`;
export type UpdateShippingMethodTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateShippingMethodTranslationsMutation, Types.UpdateShippingMethodTranslationsMutationVariables>;

/**
 * __useUpdateShippingMethodTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateShippingMethodTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShippingMethodTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShippingMethodTranslationsMutation, { data, loading, error }] = useUpdateShippingMethodTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateShippingMethodTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateShippingMethodTranslationsMutation, Types.UpdateShippingMethodTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateShippingMethodTranslationsMutation, Types.UpdateShippingMethodTranslationsMutationVariables>(UpdateShippingMethodTranslationsDocument, options);
      }
export type UpdateShippingMethodTranslationsMutationHookResult = ReturnType<typeof useUpdateShippingMethodTranslationsMutation>;
export type UpdateShippingMethodTranslationsMutationResult = Apollo.MutationResult<Types.UpdateShippingMethodTranslationsMutation>;
export type UpdateShippingMethodTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateShippingMethodTranslationsMutation, Types.UpdateShippingMethodTranslationsMutationVariables>;
export const UpdateMenuItemTranslationsDocument = gql`
    mutation UpdateMenuItemTranslations($id: ID!, $input: NameTranslationInput!, $language: LanguageCodeEnum!) {
  menuItemTranslate(id: $id, input: $input, languageCode: $language) {
    errors {
      field
      message
    }
    menuItem {
      id
      name
      translation(languageCode: $language) {
        id
        language {
          language
        }
        name
      }
    }
  }
}
    `;
export type UpdateMenuItemTranslationsMutationFn = Apollo.MutationFunction<Types.UpdateMenuItemTranslationsMutation, Types.UpdateMenuItemTranslationsMutationVariables>;

/**
 * __useUpdateMenuItemTranslationsMutation__
 *
 * To run a mutation, you first call `useUpdateMenuItemTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMenuItemTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMenuItemTranslationsMutation, { data, loading, error }] = useUpdateMenuItemTranslationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateMenuItemTranslationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateMenuItemTranslationsMutation, Types.UpdateMenuItemTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.UpdateMenuItemTranslationsMutation, Types.UpdateMenuItemTranslationsMutationVariables>(UpdateMenuItemTranslationsDocument, options);
      }
export type UpdateMenuItemTranslationsMutationHookResult = ReturnType<typeof useUpdateMenuItemTranslationsMutation>;
export type UpdateMenuItemTranslationsMutationResult = Apollo.MutationResult<Types.UpdateMenuItemTranslationsMutation>;
export type UpdateMenuItemTranslationsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateMenuItemTranslationsMutation, Types.UpdateMenuItemTranslationsMutationVariables>;
export const CategoryTranslationsDocument = gql`
    query CategoryTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: CATEGORY
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...CategoryTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${CategoryTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCategoryTranslationsQuery__
 *
 * To run a query within a React component, call `useCategoryTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useCategoryTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.CategoryTranslationsQuery, Types.CategoryTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.CategoryTranslationsQuery, Types.CategoryTranslationsQueryVariables>(CategoryTranslationsDocument, options);
      }
export function useCategoryTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.CategoryTranslationsQuery, Types.CategoryTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.CategoryTranslationsQuery, Types.CategoryTranslationsQueryVariables>(CategoryTranslationsDocument, options);
        }
export type CategoryTranslationsQueryHookResult = ReturnType<typeof useCategoryTranslationsQuery>;
export type CategoryTranslationsLazyQueryHookResult = ReturnType<typeof useCategoryTranslationsLazyQuery>;
export type CategoryTranslationsQueryResult = Apollo.QueryResult<Types.CategoryTranslationsQuery, Types.CategoryTranslationsQueryVariables>;
export const CollectionTranslationsDocument = gql`
    query CollectionTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: COLLECTION
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...CollectionTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${CollectionTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCollectionTranslationsQuery__
 *
 * To run a query within a React component, call `useCollectionTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useCollectionTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.CollectionTranslationsQuery, Types.CollectionTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.CollectionTranslationsQuery, Types.CollectionTranslationsQueryVariables>(CollectionTranslationsDocument, options);
      }
export function useCollectionTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.CollectionTranslationsQuery, Types.CollectionTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.CollectionTranslationsQuery, Types.CollectionTranslationsQueryVariables>(CollectionTranslationsDocument, options);
        }
export type CollectionTranslationsQueryHookResult = ReturnType<typeof useCollectionTranslationsQuery>;
export type CollectionTranslationsLazyQueryHookResult = ReturnType<typeof useCollectionTranslationsLazyQuery>;
export type CollectionTranslationsQueryResult = Apollo.QueryResult<Types.CollectionTranslationsQuery, Types.CollectionTranslationsQueryVariables>;
export const ProductTranslationsDocument = gql`
    query ProductTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: PRODUCT
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...ProductTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${ProductTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useProductTranslationsQuery__
 *
 * To run a query within a React component, call `useProductTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useProductTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ProductTranslationsQuery, Types.ProductTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ProductTranslationsQuery, Types.ProductTranslationsQueryVariables>(ProductTranslationsDocument, options);
      }
export function useProductTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ProductTranslationsQuery, Types.ProductTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ProductTranslationsQuery, Types.ProductTranslationsQueryVariables>(ProductTranslationsDocument, options);
        }
export type ProductTranslationsQueryHookResult = ReturnType<typeof useProductTranslationsQuery>;
export type ProductTranslationsLazyQueryHookResult = ReturnType<typeof useProductTranslationsLazyQuery>;
export type ProductTranslationsQueryResult = Apollo.QueryResult<Types.ProductTranslationsQuery, Types.ProductTranslationsQueryVariables>;
export const PageTranslationsDocument = gql`
    query PageTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: PAGE
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...PageTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PageTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __usePageTranslationsQuery__
 *
 * To run a query within a React component, call `usePageTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function usePageTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.PageTranslationsQuery, Types.PageTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PageTranslationsQuery, Types.PageTranslationsQueryVariables>(PageTranslationsDocument, options);
      }
export function usePageTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PageTranslationsQuery, Types.PageTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PageTranslationsQuery, Types.PageTranslationsQueryVariables>(PageTranslationsDocument, options);
        }
export type PageTranslationsQueryHookResult = ReturnType<typeof usePageTranslationsQuery>;
export type PageTranslationsLazyQueryHookResult = ReturnType<typeof usePageTranslationsLazyQuery>;
export type PageTranslationsQueryResult = Apollo.QueryResult<Types.PageTranslationsQuery, Types.PageTranslationsQueryVariables>;
export const VoucherTranslationsDocument = gql`
    query VoucherTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: VOUCHER
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...VoucherTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${VoucherTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useVoucherTranslationsQuery__
 *
 * To run a query within a React component, call `useVoucherTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVoucherTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoucherTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useVoucherTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.VoucherTranslationsQuery, Types.VoucherTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.VoucherTranslationsQuery, Types.VoucherTranslationsQueryVariables>(VoucherTranslationsDocument, options);
      }
export function useVoucherTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.VoucherTranslationsQuery, Types.VoucherTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.VoucherTranslationsQuery, Types.VoucherTranslationsQueryVariables>(VoucherTranslationsDocument, options);
        }
export type VoucherTranslationsQueryHookResult = ReturnType<typeof useVoucherTranslationsQuery>;
export type VoucherTranslationsLazyQueryHookResult = ReturnType<typeof useVoucherTranslationsLazyQuery>;
export type VoucherTranslationsQueryResult = Apollo.QueryResult<Types.VoucherTranslationsQuery, Types.VoucherTranslationsQueryVariables>;
export const SaleTranslationsDocument = gql`
    query SaleTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: SALE
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...SaleTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${SaleTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useSaleTranslationsQuery__
 *
 * To run a query within a React component, call `useSaleTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSaleTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaleTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useSaleTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SaleTranslationsQuery, Types.SaleTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SaleTranslationsQuery, Types.SaleTranslationsQueryVariables>(SaleTranslationsDocument, options);
      }
export function useSaleTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SaleTranslationsQuery, Types.SaleTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SaleTranslationsQuery, Types.SaleTranslationsQueryVariables>(SaleTranslationsDocument, options);
        }
export type SaleTranslationsQueryHookResult = ReturnType<typeof useSaleTranslationsQuery>;
export type SaleTranslationsLazyQueryHookResult = ReturnType<typeof useSaleTranslationsLazyQuery>;
export type SaleTranslationsQueryResult = Apollo.QueryResult<Types.SaleTranslationsQuery, Types.SaleTranslationsQueryVariables>;
export const AttributeTranslationsDocument = gql`
    query AttributeTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: ATTRIBUTE
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...AttributeTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${AttributeTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useAttributeTranslationsQuery__
 *
 * To run a query within a React component, call `useAttributeTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributeTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributeTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useAttributeTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.AttributeTranslationsQuery, Types.AttributeTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AttributeTranslationsQuery, Types.AttributeTranslationsQueryVariables>(AttributeTranslationsDocument, options);
      }
export function useAttributeTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AttributeTranslationsQuery, Types.AttributeTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AttributeTranslationsQuery, Types.AttributeTranslationsQueryVariables>(AttributeTranslationsDocument, options);
        }
export type AttributeTranslationsQueryHookResult = ReturnType<typeof useAttributeTranslationsQuery>;
export type AttributeTranslationsLazyQueryHookResult = ReturnType<typeof useAttributeTranslationsLazyQuery>;
export type AttributeTranslationsQueryResult = Apollo.QueryResult<Types.AttributeTranslationsQuery, Types.AttributeTranslationsQueryVariables>;
export const ShippingMethodTranslationsDocument = gql`
    query ShippingMethodTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: SHIPPING_METHOD
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...ShippingMethodTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${ShippingMethodTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useShippingMethodTranslationsQuery__
 *
 * To run a query within a React component, call `useShippingMethodTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShippingMethodTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShippingMethodTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useShippingMethodTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ShippingMethodTranslationsQuery, Types.ShippingMethodTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ShippingMethodTranslationsQuery, Types.ShippingMethodTranslationsQueryVariables>(ShippingMethodTranslationsDocument, options);
      }
export function useShippingMethodTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ShippingMethodTranslationsQuery, Types.ShippingMethodTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ShippingMethodTranslationsQuery, Types.ShippingMethodTranslationsQueryVariables>(ShippingMethodTranslationsDocument, options);
        }
export type ShippingMethodTranslationsQueryHookResult = ReturnType<typeof useShippingMethodTranslationsQuery>;
export type ShippingMethodTranslationsLazyQueryHookResult = ReturnType<typeof useShippingMethodTranslationsLazyQuery>;
export type ShippingMethodTranslationsQueryResult = Apollo.QueryResult<Types.ShippingMethodTranslationsQuery, Types.ShippingMethodTranslationsQueryVariables>;
export const MenuItemTranslationsDocument = gql`
    query MenuItemTranslations($language: LanguageCodeEnum!, $first: Int, $after: String, $last: Int, $before: String) {
  translations(
    kind: MENU_ITEM
    before: $before
    after: $after
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...MenuItemTranslation
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${MenuItemTranslationFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useMenuItemTranslationsQuery__
 *
 * To run a query within a React component, call `useMenuItemTranslationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuItemTranslationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuItemTranslationsQuery({
 *   variables: {
 *      language: // value for 'language'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useMenuItemTranslationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.MenuItemTranslationsQuery, Types.MenuItemTranslationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.MenuItemTranslationsQuery, Types.MenuItemTranslationsQueryVariables>(MenuItemTranslationsDocument, options);
      }
export function useMenuItemTranslationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.MenuItemTranslationsQuery, Types.MenuItemTranslationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.MenuItemTranslationsQuery, Types.MenuItemTranslationsQueryVariables>(MenuItemTranslationsDocument, options);
        }
export type MenuItemTranslationsQueryHookResult = ReturnType<typeof useMenuItemTranslationsQuery>;
export type MenuItemTranslationsLazyQueryHookResult = ReturnType<typeof useMenuItemTranslationsLazyQuery>;
export type MenuItemTranslationsQueryResult = Apollo.QueryResult<Types.MenuItemTranslationsQuery, Types.MenuItemTranslationsQueryVariables>;
export const ProductTranslationDetailsDocument = gql`
    query ProductTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: PRODUCT, id: $id) {
    ...ProductTranslation
  }
}
    ${ProductTranslationFragmentDoc}`;

/**
 * __useProductTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useProductTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useProductTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ProductTranslationDetailsQuery, Types.ProductTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ProductTranslationDetailsQuery, Types.ProductTranslationDetailsQueryVariables>(ProductTranslationDetailsDocument, options);
      }
export function useProductTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ProductTranslationDetailsQuery, Types.ProductTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ProductTranslationDetailsQuery, Types.ProductTranslationDetailsQueryVariables>(ProductTranslationDetailsDocument, options);
        }
export type ProductTranslationDetailsQueryHookResult = ReturnType<typeof useProductTranslationDetailsQuery>;
export type ProductTranslationDetailsLazyQueryHookResult = ReturnType<typeof useProductTranslationDetailsLazyQuery>;
export type ProductTranslationDetailsQueryResult = Apollo.QueryResult<Types.ProductTranslationDetailsQuery, Types.ProductTranslationDetailsQueryVariables>;
export const ProductVariantListDocument = gql`
    query ProductVariantList($id: ID!) {
  product(id: $id) {
    id
    variants {
      id
      name
      sku
    }
  }
}
    `;

/**
 * __useProductVariantListQuery__
 *
 * To run a query within a React component, call `useProductVariantListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductVariantListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductVariantListQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductVariantListQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ProductVariantListQuery, Types.ProductVariantListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ProductVariantListQuery, Types.ProductVariantListQueryVariables>(ProductVariantListDocument, options);
      }
export function useProductVariantListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ProductVariantListQuery, Types.ProductVariantListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ProductVariantListQuery, Types.ProductVariantListQueryVariables>(ProductVariantListDocument, options);
        }
export type ProductVariantListQueryHookResult = ReturnType<typeof useProductVariantListQuery>;
export type ProductVariantListLazyQueryHookResult = ReturnType<typeof useProductVariantListLazyQuery>;
export type ProductVariantListQueryResult = Apollo.QueryResult<Types.ProductVariantListQuery, Types.ProductVariantListQueryVariables>;
export const ProductVariantTranslationDetailsDocument = gql`
    query ProductVariantTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: VARIANT, id: $id) {
    ...ProductVariantTranslation
  }
}
    ${ProductVariantTranslationFragmentDoc}`;

/**
 * __useProductVariantTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useProductVariantTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductVariantTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductVariantTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useProductVariantTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ProductVariantTranslationDetailsQuery, Types.ProductVariantTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ProductVariantTranslationDetailsQuery, Types.ProductVariantTranslationDetailsQueryVariables>(ProductVariantTranslationDetailsDocument, options);
      }
export function useProductVariantTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ProductVariantTranslationDetailsQuery, Types.ProductVariantTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ProductVariantTranslationDetailsQuery, Types.ProductVariantTranslationDetailsQueryVariables>(ProductVariantTranslationDetailsDocument, options);
        }
export type ProductVariantTranslationDetailsQueryHookResult = ReturnType<typeof useProductVariantTranslationDetailsQuery>;
export type ProductVariantTranslationDetailsLazyQueryHookResult = ReturnType<typeof useProductVariantTranslationDetailsLazyQuery>;
export type ProductVariantTranslationDetailsQueryResult = Apollo.QueryResult<Types.ProductVariantTranslationDetailsQuery, Types.ProductVariantTranslationDetailsQueryVariables>;
export const CategoryTranslationDetailsDocument = gql`
    query CategoryTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: CATEGORY, id: $id) {
    ...CategoryTranslation
  }
}
    ${CategoryTranslationFragmentDoc}`;

/**
 * __useCategoryTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useCategoryTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCategoryTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.CategoryTranslationDetailsQuery, Types.CategoryTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.CategoryTranslationDetailsQuery, Types.CategoryTranslationDetailsQueryVariables>(CategoryTranslationDetailsDocument, options);
      }
export function useCategoryTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.CategoryTranslationDetailsQuery, Types.CategoryTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.CategoryTranslationDetailsQuery, Types.CategoryTranslationDetailsQueryVariables>(CategoryTranslationDetailsDocument, options);
        }
export type CategoryTranslationDetailsQueryHookResult = ReturnType<typeof useCategoryTranslationDetailsQuery>;
export type CategoryTranslationDetailsLazyQueryHookResult = ReturnType<typeof useCategoryTranslationDetailsLazyQuery>;
export type CategoryTranslationDetailsQueryResult = Apollo.QueryResult<Types.CategoryTranslationDetailsQuery, Types.CategoryTranslationDetailsQueryVariables>;
export const CollectionTranslationDetailsDocument = gql`
    query CollectionTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(id: $id, kind: COLLECTION) {
    ...CollectionTranslation
  }
}
    ${CollectionTranslationFragmentDoc}`;

/**
 * __useCollectionTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useCollectionTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCollectionTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.CollectionTranslationDetailsQuery, Types.CollectionTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.CollectionTranslationDetailsQuery, Types.CollectionTranslationDetailsQueryVariables>(CollectionTranslationDetailsDocument, options);
      }
export function useCollectionTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.CollectionTranslationDetailsQuery, Types.CollectionTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.CollectionTranslationDetailsQuery, Types.CollectionTranslationDetailsQueryVariables>(CollectionTranslationDetailsDocument, options);
        }
export type CollectionTranslationDetailsQueryHookResult = ReturnType<typeof useCollectionTranslationDetailsQuery>;
export type CollectionTranslationDetailsLazyQueryHookResult = ReturnType<typeof useCollectionTranslationDetailsLazyQuery>;
export type CollectionTranslationDetailsQueryResult = Apollo.QueryResult<Types.CollectionTranslationDetailsQuery, Types.CollectionTranslationDetailsQueryVariables>;
export const PageTranslationDetailsDocument = gql`
    query PageTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(id: $id, kind: PAGE) {
    ...PageTranslation
  }
}
    ${PageTranslationFragmentDoc}`;

/**
 * __usePageTranslationDetailsQuery__
 *
 * To run a query within a React component, call `usePageTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function usePageTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.PageTranslationDetailsQuery, Types.PageTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.PageTranslationDetailsQuery, Types.PageTranslationDetailsQueryVariables>(PageTranslationDetailsDocument, options);
      }
export function usePageTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PageTranslationDetailsQuery, Types.PageTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.PageTranslationDetailsQuery, Types.PageTranslationDetailsQueryVariables>(PageTranslationDetailsDocument, options);
        }
export type PageTranslationDetailsQueryHookResult = ReturnType<typeof usePageTranslationDetailsQuery>;
export type PageTranslationDetailsLazyQueryHookResult = ReturnType<typeof usePageTranslationDetailsLazyQuery>;
export type PageTranslationDetailsQueryResult = Apollo.QueryResult<Types.PageTranslationDetailsQuery, Types.PageTranslationDetailsQueryVariables>;
export const SaleTranslationDetailsDocument = gql`
    query SaleTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: SALE, id: $id) {
    ...SaleTranslation
  }
}
    ${SaleTranslationFragmentDoc}`;

/**
 * __useSaleTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useSaleTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSaleTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaleTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useSaleTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.SaleTranslationDetailsQuery, Types.SaleTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.SaleTranslationDetailsQuery, Types.SaleTranslationDetailsQueryVariables>(SaleTranslationDetailsDocument, options);
      }
export function useSaleTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.SaleTranslationDetailsQuery, Types.SaleTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.SaleTranslationDetailsQuery, Types.SaleTranslationDetailsQueryVariables>(SaleTranslationDetailsDocument, options);
        }
export type SaleTranslationDetailsQueryHookResult = ReturnType<typeof useSaleTranslationDetailsQuery>;
export type SaleTranslationDetailsLazyQueryHookResult = ReturnType<typeof useSaleTranslationDetailsLazyQuery>;
export type SaleTranslationDetailsQueryResult = Apollo.QueryResult<Types.SaleTranslationDetailsQuery, Types.SaleTranslationDetailsQueryVariables>;
export const VoucherTranslationDetailsDocument = gql`
    query VoucherTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: VOUCHER, id: $id) {
    ...VoucherTranslation
  }
}
    ${VoucherTranslationFragmentDoc}`;

/**
 * __useVoucherTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useVoucherTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVoucherTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoucherTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useVoucherTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.VoucherTranslationDetailsQuery, Types.VoucherTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.VoucherTranslationDetailsQuery, Types.VoucherTranslationDetailsQueryVariables>(VoucherTranslationDetailsDocument, options);
      }
export function useVoucherTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.VoucherTranslationDetailsQuery, Types.VoucherTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.VoucherTranslationDetailsQuery, Types.VoucherTranslationDetailsQueryVariables>(VoucherTranslationDetailsDocument, options);
        }
export type VoucherTranslationDetailsQueryHookResult = ReturnType<typeof useVoucherTranslationDetailsQuery>;
export type VoucherTranslationDetailsLazyQueryHookResult = ReturnType<typeof useVoucherTranslationDetailsLazyQuery>;
export type VoucherTranslationDetailsQueryResult = Apollo.QueryResult<Types.VoucherTranslationDetailsQuery, Types.VoucherTranslationDetailsQueryVariables>;
export const AttributeTranslationDetailsDocument = gql`
    query AttributeTranslationDetails($id: ID!, $language: LanguageCodeEnum!, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
  translation(kind: ATTRIBUTE, id: $id) {
    ...AttributeTranslationDetails
  }
}
    ${AttributeTranslationDetailsFragmentDoc}`;

/**
 * __useAttributeTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useAttributeTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributeTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributeTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *      firstValues: // value for 'firstValues'
 *      afterValues: // value for 'afterValues'
 *      lastValues: // value for 'lastValues'
 *      beforeValues: // value for 'beforeValues'
 *   },
 * });
 */
export function useAttributeTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.AttributeTranslationDetailsQuery, Types.AttributeTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.AttributeTranslationDetailsQuery, Types.AttributeTranslationDetailsQueryVariables>(AttributeTranslationDetailsDocument, options);
      }
export function useAttributeTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.AttributeTranslationDetailsQuery, Types.AttributeTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.AttributeTranslationDetailsQuery, Types.AttributeTranslationDetailsQueryVariables>(AttributeTranslationDetailsDocument, options);
        }
export type AttributeTranslationDetailsQueryHookResult = ReturnType<typeof useAttributeTranslationDetailsQuery>;
export type AttributeTranslationDetailsLazyQueryHookResult = ReturnType<typeof useAttributeTranslationDetailsLazyQuery>;
export type AttributeTranslationDetailsQueryResult = Apollo.QueryResult<Types.AttributeTranslationDetailsQuery, Types.AttributeTranslationDetailsQueryVariables>;
export const ShippingMethodTranslationDetailsDocument = gql`
    query ShippingMethodTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: SHIPPING_METHOD, id: $id) {
    ...ShippingMethodTranslation
  }
}
    ${ShippingMethodTranslationFragmentDoc}`;

/**
 * __useShippingMethodTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useShippingMethodTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShippingMethodTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShippingMethodTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useShippingMethodTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.ShippingMethodTranslationDetailsQuery, Types.ShippingMethodTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.ShippingMethodTranslationDetailsQuery, Types.ShippingMethodTranslationDetailsQueryVariables>(ShippingMethodTranslationDetailsDocument, options);
      }
export function useShippingMethodTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.ShippingMethodTranslationDetailsQuery, Types.ShippingMethodTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.ShippingMethodTranslationDetailsQuery, Types.ShippingMethodTranslationDetailsQueryVariables>(ShippingMethodTranslationDetailsDocument, options);
        }
export type ShippingMethodTranslationDetailsQueryHookResult = ReturnType<typeof useShippingMethodTranslationDetailsQuery>;
export type ShippingMethodTranslationDetailsLazyQueryHookResult = ReturnType<typeof useShippingMethodTranslationDetailsLazyQuery>;
export type ShippingMethodTranslationDetailsQueryResult = Apollo.QueryResult<Types.ShippingMethodTranslationDetailsQuery, Types.ShippingMethodTranslationDetailsQueryVariables>;
export const MenuItemTranslationDetailsDocument = gql`
    query MenuItemTranslationDetails($id: ID!, $language: LanguageCodeEnum!) {
  translation(kind: MENU_ITEM, id: $id) {
    ...MenuItemTranslation
  }
}
    ${MenuItemTranslationFragmentDoc}`;

/**
 * __useMenuItemTranslationDetailsQuery__
 *
 * To run a query within a React component, call `useMenuItemTranslationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuItemTranslationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuItemTranslationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useMenuItemTranslationDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.MenuItemTranslationDetailsQuery, Types.MenuItemTranslationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.MenuItemTranslationDetailsQuery, Types.MenuItemTranslationDetailsQueryVariables>(MenuItemTranslationDetailsDocument, options);
      }
export function useMenuItemTranslationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.MenuItemTranslationDetailsQuery, Types.MenuItemTranslationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.MenuItemTranslationDetailsQuery, Types.MenuItemTranslationDetailsQueryVariables>(MenuItemTranslationDetailsDocument, options);
        }
export type MenuItemTranslationDetailsQueryHookResult = ReturnType<typeof useMenuItemTranslationDetailsQuery>;
export type MenuItemTranslationDetailsLazyQueryHookResult = ReturnType<typeof useMenuItemTranslationDetailsLazyQuery>;
export type MenuItemTranslationDetailsQueryResult = Apollo.QueryResult<Types.MenuItemTranslationDetailsQuery, Types.MenuItemTranslationDetailsQueryVariables>;
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
export const SaveOnBoardingStateDocument = gql`
    mutation SaveOnBoardingState($id: ID!, $input: [MetadataInput!]!) {
  updateMetadata(id: $id, input: $input) {
    errors {
      ...MetadataError
    }
  }
}
    ${MetadataErrorFragmentDoc}`;
export type SaveOnBoardingStateMutationFn = Apollo.MutationFunction<Types.SaveOnBoardingStateMutation, Types.SaveOnBoardingStateMutationVariables>;

/**
 * __useSaveOnBoardingStateMutation__
 *
 * To run a mutation, you first call `useSaveOnBoardingStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveOnBoardingStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveOnBoardingStateMutation, { data, loading, error }] = useSaveOnBoardingStateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveOnBoardingStateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.SaveOnBoardingStateMutation, Types.SaveOnBoardingStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<Types.SaveOnBoardingStateMutation, Types.SaveOnBoardingStateMutationVariables>(SaveOnBoardingStateDocument, options);
      }
export type SaveOnBoardingStateMutationHookResult = ReturnType<typeof useSaveOnBoardingStateMutation>;
export type SaveOnBoardingStateMutationResult = Apollo.MutationResult<Types.SaveOnBoardingStateMutation>;
export type SaveOnBoardingStateMutationOptions = Apollo.BaseMutationOptions<Types.SaveOnBoardingStateMutation, Types.SaveOnBoardingStateMutationVariables>;
export const WelcomePageActivitiesDocument = gql`
    query WelcomePageActivities($hasPermissionToManageOrders: Boolean!) {
  activities: homepageEvents(last: 10) @include(if: $hasPermissionToManageOrders) {
    edges {
      node {
        ...Activities
      }
    }
  }
}
    ${ActivitiesFragmentDoc}`;

/**
 * __useWelcomePageActivitiesQuery__
 *
 * To run a query within a React component, call `useWelcomePageActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWelcomePageActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWelcomePageActivitiesQuery({
 *   variables: {
 *      hasPermissionToManageOrders: // value for 'hasPermissionToManageOrders'
 *   },
 * });
 */
export function useWelcomePageActivitiesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.WelcomePageActivitiesQuery, Types.WelcomePageActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.WelcomePageActivitiesQuery, Types.WelcomePageActivitiesQueryVariables>(WelcomePageActivitiesDocument, options);
      }
export function useWelcomePageActivitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.WelcomePageActivitiesQuery, Types.WelcomePageActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.WelcomePageActivitiesQuery, Types.WelcomePageActivitiesQueryVariables>(WelcomePageActivitiesDocument, options);
        }
export type WelcomePageActivitiesQueryHookResult = ReturnType<typeof useWelcomePageActivitiesQuery>;
export type WelcomePageActivitiesLazyQueryHookResult = ReturnType<typeof useWelcomePageActivitiesLazyQuery>;
export type WelcomePageActivitiesQueryResult = Apollo.QueryResult<Types.WelcomePageActivitiesQuery, Types.WelcomePageActivitiesQueryVariables>;
export const WelcomePageAnalyticsDocument = gql`
    query WelcomePageAnalytics($channel: String!, $hasPermissionToManageOrders: Boolean!) {
  salesToday: ordersTotal(period: TODAY, channel: $channel) @include(if: $hasPermissionToManageOrders) {
    gross {
      amount
      currency
    }
  }
}
    `;

/**
 * __useWelcomePageAnalyticsQuery__
 *
 * To run a query within a React component, call `useWelcomePageAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWelcomePageAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWelcomePageAnalyticsQuery({
 *   variables: {
 *      channel: // value for 'channel'
 *      hasPermissionToManageOrders: // value for 'hasPermissionToManageOrders'
 *   },
 * });
 */
export function useWelcomePageAnalyticsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.WelcomePageAnalyticsQuery, Types.WelcomePageAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.WelcomePageAnalyticsQuery, Types.WelcomePageAnalyticsQueryVariables>(WelcomePageAnalyticsDocument, options);
      }
export function useWelcomePageAnalyticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.WelcomePageAnalyticsQuery, Types.WelcomePageAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.WelcomePageAnalyticsQuery, Types.WelcomePageAnalyticsQueryVariables>(WelcomePageAnalyticsDocument, options);
        }
export type WelcomePageAnalyticsQueryHookResult = ReturnType<typeof useWelcomePageAnalyticsQuery>;
export type WelcomePageAnalyticsLazyQueryHookResult = ReturnType<typeof useWelcomePageAnalyticsLazyQuery>;
export type WelcomePageAnalyticsQueryResult = Apollo.QueryResult<Types.WelcomePageAnalyticsQuery, Types.WelcomePageAnalyticsQueryVariables>;
export const WelcomePageNotificationsDocument = gql`
    query welcomePageNotifications($channel: String!) {
  productsOutOfStock: products(
    filter: {stockAvailability: OUT_OF_STOCK}
    channel: $channel
  ) {
    totalCount
  }
}
    `;

/**
 * __useWelcomePageNotificationsQuery__
 *
 * To run a query within a React component, call `useWelcomePageNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWelcomePageNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWelcomePageNotificationsQuery({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useWelcomePageNotificationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<Types.WelcomePageNotificationsQuery, Types.WelcomePageNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.WelcomePageNotificationsQuery, Types.WelcomePageNotificationsQueryVariables>(WelcomePageNotificationsDocument, options);
      }
export function useWelcomePageNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.WelcomePageNotificationsQuery, Types.WelcomePageNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.WelcomePageNotificationsQuery, Types.WelcomePageNotificationsQueryVariables>(WelcomePageNotificationsDocument, options);
        }
export type WelcomePageNotificationsQueryHookResult = ReturnType<typeof useWelcomePageNotificationsQuery>;
export type WelcomePageNotificationsLazyQueryHookResult = ReturnType<typeof useWelcomePageNotificationsLazyQuery>;
export type WelcomePageNotificationsQueryResult = Apollo.QueryResult<Types.WelcomePageNotificationsQuery, Types.WelcomePageNotificationsQueryVariables>;