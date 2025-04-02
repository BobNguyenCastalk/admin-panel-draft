// @ts-strict-ignore
import {
  AttributeListDocument,
  AttributeListQuery,
  AttributeListQueryVariables,
  CategoryDetailsQuery,
  CategoryDetailsQueryVariables,
  CheckoutListDocument,
  CheckoutListQuery,
  CheckoutListQueryVariables,
  CollectionListDocument,
  CollectionListQuery,
  CollectionListQueryVariables,
  CustomerAddressesQuery,
  CustomerAddressesQueryVariables,
  CustomerDetailsQuery,
  CustomerDetailsQueryVariables,
  ListCustomersDocument,
  ListCustomersQuery,
  ListCustomersQueryVariables,
  MenuListDocument,
  MenuListQuery,
  MenuListQueryVariables,
  OrderFulfillDataQuery,
  OrderFulfillDataQueryVariables,
  OrderListDocument,
  OrderListQuery,
  OrderListQueryVariables,
  ProductListDocument,
  ProductListQuery,
  ProductListQueryVariables,
  ProductVariantListQuery,
  ProductVariantListQueryVariables,
  RootCategoriesDocument,
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  SaleListDocument,
  SaleListQuery,
  SaleListQueryVariables,
  StaffListDocument,
  StaffListQuery,
  StaffListQueryVariables,
  VoucherListDocument,
  VoucherListQuery,
  VoucherListQueryVariables,
} from "@dashboard/graphql";
import { DocumentNode } from "graphql";

const DefaultVariables = {
  first: 100,
};

export type TData =
  | ProductListQuery
  | OrderListQuery
  | CustomerAddressesQuery
  | AttributeListQuery
  | CategoryDetailsQuery
  | CheckoutListQuery
  | CollectionListQuery
  | CustomerDetailsQuery
  | OrderFulfillDataQuery
  | ListCustomersQuery
  | MenuListQuery
  | OrderListQuery
  | ProductListQuery
  | ProductVariantListQuery
  | RootCategoriesQuery
  | SaleListQuery
  | StaffListQuery
  | VoucherListQuery;

export type TVariables =
  | ProductListQueryVariables
  | OrderListQueryVariables
  | CustomerAddressesQueryVariables
  | AttributeListQueryVariables
  | CategoryDetailsQueryVariables
  | ListCustomersQueryVariables
  | CheckoutListQueryVariables
  | CollectionListQueryVariables
  | CustomerDetailsQueryVariables
  | OrderFulfillDataQueryVariables
  | MenuListQueryVariables
  | OrderListQueryVariables
  | ProductListQueryVariables
  | ProductVariantListQueryVariables
  | RootCategoriesQueryVariables
  | SaleListQueryVariables
  | StaffListQueryVariables
  | VoucherListQueryVariables;

interface Document {
  document: DocumentNode;
  variables: TVariables;
  collection?: string;
  displayedAttribute?: string;
}

export const DocumentMap: Record<string, Document> = {
  ATTRIBUTE: {
    document: AttributeListDocument,
    variables: DefaultVariables,
    displayedAttribute: "name",
  },
  CATEGORY: {
    document: RootCategoriesDocument,
    variables: DefaultVariables,
    collection: "categories",
    displayedAttribute: "name",
  },
  CHECKOUT: {
    document: CheckoutListDocument,
    variables: DefaultVariables,
    displayedAttribute: "id",
  },
  COLLECTION: {
    document: CollectionListDocument,
    variables: DefaultVariables,
    displayedAttribute: "name",
  },
  CUSTOMER: {
    document: ListCustomersDocument,
    variables: DefaultVariables,
    displayedAttribute: "email",
    // TODO inverted name
  },
  MENU: {
    document: MenuListDocument,
    variables: DefaultVariables,
    displayedAttribute: "name",
  },
  ORDER: {
    document: OrderListDocument,
    variables: DefaultVariables,
    displayedAttribute: "number",
  },
  PRODUCT: {
    document: ProductListDocument,
    variables: {
      first: 100,
      hasChannel: true,
      includeCategories: false,
      includeCollections: false,
    },
    displayedAttribute: "name",
  },
  SALE: {
    document: SaleListDocument,
    variables: DefaultVariables,
    displayedAttribute: "name",
  },
  STAFF: {
    document: StaffListDocument,
    variables: DefaultVariables,
    collection: "staffUsers",
    displayedAttribute: "email",
  },
  VOUCHER: {
    document: VoucherListDocument,
    variables: DefaultVariables,
    displayedAttribute: "code",
  },
};

// Documents which require parent object or can't be handled ATM
//
export const ExcludedDocumentKeys = [
  // USER ID REQUIRED
  "ADDRESS",
  // it's not a countable collection
  "CHANNEL",
  // ORDER ID REQUIRED
  "FULFILLMENT",
  // PRODUCT ID REQUIRED
  "PRODUCT_VARIANT",
  "PRODUCT_EXPORT_COMPLETED",
  "PRODUCT_MEDIA_CREATED",
  "PRODUCT_MEDIA_DELETED",
  "PRODUCT_MEDIA_UPDATED",
  "PRODUCT_VARIANT_BACK_IN_STOCK",
  "PRODUCT_VARIANT_CREATED",
  "PRODUCT_VARIANT_DELETED",
  "PRODUCT_VARIANT_METADATA_UPDATED",
  "PRODUCT_VARIANT_OUT_OF_STOCK",
  "PRODUCT_VARIANT_STOCK_UPDATED",
  "PRODUCT_VARIANT_UPDATED",
  "VOUCHER_CODES_CREATED",
  "VOUCHER_CODES_DELETED",
  "VOUCHER_CODE_EXPORT_COMPLETED",
  "ORDER_BULK_CREATED",
  "TRANSLATION",
];
