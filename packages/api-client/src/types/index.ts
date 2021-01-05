import {
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartOutput,
  cartQuery,
  CategoryFilterInput,
  categoryList,
  CategoryTree,
  cmsPageQuery,
  createEmptyCartMutation,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductInterface,
  Products,
  storeConfigQuery,
  urlResolver,
  Cart as CartInterface,
  CartItemInterface,
  UpdateCartItemsInput,
  UpdateCartItemsOutput,
  RemoveItemFromCartInput,
  RemoveItemFromCartOutput,
  ApplyCouponToCartInput,
  ApplyCouponToCartOutput,
  AppliedCoupon,
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartOutput,
  CustomerToken,
  customerQuery,
  CustomerInput,
  Customer as CustomerInterface
} from './GraphQL';
import {ApolloQueryResult} from 'apollo-client';
import {ExecutionResult} from 'graphql';

export type Cart = CartInterface;
export type Wishlist = {}
export type Product = ProductInterface;
export type ProductList = Products;
export type Category = CategoryTree;
export type CategoryFilter = CategoryFilterInput
export type ShippingMethod = {}
export type CartItem = CartItemInterface;
export type Coupon = AppliedCoupon;
export type Customer = CustomerInterface;
export type CustomerUpdateParameters = CustomerInput;

export type ProductAttributeFilter = ProductAttributeFilterInput;

export const enum ProductsQueryType {
  list = 'LIST',
  detail = 'DETAIL',
}

export interface ApiClientMethods {
  categoryList(categoryFilter?: CategoryFilterInput): Promise<ApolloQueryResult<categoryList>>;
  urlResolver(url: string): Promise<ApolloQueryResult<urlResolver>>;
  products(pageSize: number,
    currentPage: number,
    queryType: ProductsQueryType,
    search?: string,
    filter?: ProductAttributeFilterInput,
    sort?: ProductAttributeSortInput): Promise<ApolloQueryResult<Products>>;
  storeConfig(): Promise<ApolloQueryResult<storeConfigQuery>>;
  cmsPage(indentifier: string): Promise<ApolloQueryResult<cmsPageQuery>>;
  createEmptyCart(): Promise<ExecutionResult<createEmptyCartMutation>>;
  cart(cartId: string): Promise<ApolloQueryResult<cartQuery>>;
  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<ExecutionResult<AddSimpleProductsToCartOutput>>;
  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<ExecutionResult<AddConfigurableProductsToCartOutput>>;
  updateCartItems(input: UpdateCartItemsInput): Promise<ExecutionResult<UpdateCartItemsOutput>>;
  removeItemFromCart(input: RemoveItemFromCartInput): Promise<ExecutionResult<RemoveItemFromCartOutput>>;
  applyCouponToCart(input: ApplyCouponToCartInput): Promise<ExecutionResult<ApplyCouponToCartOutput>>;
  generateCustomerToken(email: string, password: string): Promise<ExecutionResult<CustomerToken>>;
  customer(): Promise<ApolloQueryResult<customerQuery>>;
  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<ExecutionResult<Cart>>;
  customerCart(): Promise<ApolloQueryResult<cartQuery>>;
  createCustomer(input: CustomerInput): Promise<Customer>;
  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<Customer>;
  revokeCustomerToken(): Promise<boolean>;
  updateCustomer(input: CustomerInput): Promise<Customer>;
}
export type ExternalCheckoutStore = {
  cmsUrl: string;
}

export interface Storage {
  setItem: (
    name: string,
    value: any,
  ) => void;
  getItem: (name: string) => any;
  removeItem: (name: string) => any;
  clear: () => void;
}

export type Website = {
  code: string;
  defaultStoreGroup: string;
  storeGroups: Record<string, StoreGroup>;
}

export type StoreGroup = {
  code: string;
  defaultStore: string;
  stores: Record<string, Store>;
  website?: Website;
}

export type Store = {
  code: string;
  storeGroup?: StoreGroup;
}
