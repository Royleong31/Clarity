import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
  Timestamp: any;
};

export enum Aggregation_Interval {
  HOUR = 'hour',
  DAY = 'day'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Bundle = {
  __typename?: 'Bundle';
  id: Scalars['ID'];
  syncingIndex: Scalars['BigInt'];
};

export type Bundle_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  syncingIndex?: InputMaybe<Scalars['BigInt']>;
  syncingIndex_not?: InputMaybe<Scalars['BigInt']>;
  syncingIndex_gt?: InputMaybe<Scalars['BigInt']>;
  syncingIndex_lt?: InputMaybe<Scalars['BigInt']>;
  syncingIndex_gte?: InputMaybe<Scalars['BigInt']>;
  syncingIndex_lte?: InputMaybe<Scalars['BigInt']>;
  syncingIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  syncingIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bundle_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bundle_Filter>>>;
};

export enum Bundle_OrderBy {
  ID = 'id',
  SYNCINGINDEX = 'syncingIndex'
}

export type Manager = {
  __typename?: 'Manager';
  id: Scalars['ID'];
  spAddress: Scalars['String'];
  spHook: Scalars['String'];
  baseCurrency: Scalars['String'];
  orderCount: Scalars['BigInt'];
  settledOrderCount: Scalars['BigInt'];
  reviewedOrderCount: Scalars['BigInt'];
  txCount: Scalars['BigInt'];
  totalRevenue: Scalars['BigInt'];
  merchantCount: Scalars['BigInt'];
  payeeCount: Scalars['BigInt'];
  owner: Scalars['String'];
};

export type Manager_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spAddress?: InputMaybe<Scalars['String']>;
  spAddress_not?: InputMaybe<Scalars['String']>;
  spAddress_gt?: InputMaybe<Scalars['String']>;
  spAddress_lt?: InputMaybe<Scalars['String']>;
  spAddress_gte?: InputMaybe<Scalars['String']>;
  spAddress_lte?: InputMaybe<Scalars['String']>;
  spAddress_in?: InputMaybe<Array<Scalars['String']>>;
  spAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  spAddress_contains?: InputMaybe<Scalars['String']>;
  spAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  spAddress_not_contains?: InputMaybe<Scalars['String']>;
  spAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  spAddress_starts_with?: InputMaybe<Scalars['String']>;
  spAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  spAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spAddress_ends_with?: InputMaybe<Scalars['String']>;
  spAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  spAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spHook?: InputMaybe<Scalars['String']>;
  spHook_not?: InputMaybe<Scalars['String']>;
  spHook_gt?: InputMaybe<Scalars['String']>;
  spHook_lt?: InputMaybe<Scalars['String']>;
  spHook_gte?: InputMaybe<Scalars['String']>;
  spHook_lte?: InputMaybe<Scalars['String']>;
  spHook_in?: InputMaybe<Array<Scalars['String']>>;
  spHook_not_in?: InputMaybe<Array<Scalars['String']>>;
  spHook_contains?: InputMaybe<Scalars['String']>;
  spHook_contains_nocase?: InputMaybe<Scalars['String']>;
  spHook_not_contains?: InputMaybe<Scalars['String']>;
  spHook_not_contains_nocase?: InputMaybe<Scalars['String']>;
  spHook_starts_with?: InputMaybe<Scalars['String']>;
  spHook_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spHook_not_starts_with?: InputMaybe<Scalars['String']>;
  spHook_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spHook_ends_with?: InputMaybe<Scalars['String']>;
  spHook_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spHook_not_ends_with?: InputMaybe<Scalars['String']>;
  spHook_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseCurrency?: InputMaybe<Scalars['String']>;
  baseCurrency_not?: InputMaybe<Scalars['String']>;
  baseCurrency_gt?: InputMaybe<Scalars['String']>;
  baseCurrency_lt?: InputMaybe<Scalars['String']>;
  baseCurrency_gte?: InputMaybe<Scalars['String']>;
  baseCurrency_lte?: InputMaybe<Scalars['String']>;
  baseCurrency_in?: InputMaybe<Array<Scalars['String']>>;
  baseCurrency_not_in?: InputMaybe<Array<Scalars['String']>>;
  baseCurrency_contains?: InputMaybe<Scalars['String']>;
  baseCurrency_contains_nocase?: InputMaybe<Scalars['String']>;
  baseCurrency_not_contains?: InputMaybe<Scalars['String']>;
  baseCurrency_not_contains_nocase?: InputMaybe<Scalars['String']>;
  baseCurrency_starts_with?: InputMaybe<Scalars['String']>;
  baseCurrency_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseCurrency_not_starts_with?: InputMaybe<Scalars['String']>;
  baseCurrency_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseCurrency_ends_with?: InputMaybe<Scalars['String']>;
  baseCurrency_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseCurrency_not_ends_with?: InputMaybe<Scalars['String']>;
  baseCurrency_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  orderCount?: InputMaybe<Scalars['BigInt']>;
  orderCount_not?: InputMaybe<Scalars['BigInt']>;
  orderCount_gt?: InputMaybe<Scalars['BigInt']>;
  orderCount_lt?: InputMaybe<Scalars['BigInt']>;
  orderCount_gte?: InputMaybe<Scalars['BigInt']>;
  orderCount_lte?: InputMaybe<Scalars['BigInt']>;
  orderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  orderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settledOrderCount?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_not?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_gt?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_lt?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_gte?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_lte?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settledOrderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedOrderCount?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_not?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_gt?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_lt?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_gte?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_lte?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedOrderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRevenue?: InputMaybe<Scalars['BigInt']>;
  totalRevenue_not?: InputMaybe<Scalars['BigInt']>;
  totalRevenue_gt?: InputMaybe<Scalars['BigInt']>;
  totalRevenue_lt?: InputMaybe<Scalars['BigInt']>;
  totalRevenue_gte?: InputMaybe<Scalars['BigInt']>;
  totalRevenue_lte?: InputMaybe<Scalars['BigInt']>;
  totalRevenue_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRevenue_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  merchantCount?: InputMaybe<Scalars['BigInt']>;
  merchantCount_not?: InputMaybe<Scalars['BigInt']>;
  merchantCount_gt?: InputMaybe<Scalars['BigInt']>;
  merchantCount_lt?: InputMaybe<Scalars['BigInt']>;
  merchantCount_gte?: InputMaybe<Scalars['BigInt']>;
  merchantCount_lte?: InputMaybe<Scalars['BigInt']>;
  merchantCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  merchantCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  payeeCount?: InputMaybe<Scalars['BigInt']>;
  payeeCount_not?: InputMaybe<Scalars['BigInt']>;
  payeeCount_gt?: InputMaybe<Scalars['BigInt']>;
  payeeCount_lt?: InputMaybe<Scalars['BigInt']>;
  payeeCount_gte?: InputMaybe<Scalars['BigInt']>;
  payeeCount_lte?: InputMaybe<Scalars['BigInt']>;
  payeeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  payeeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Manager_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<Manager_Filter>>>;
};

export enum Manager_OrderBy {
  ID = 'id',
  SPADDRESS = 'spAddress',
  SPHOOK = 'spHook',
  BASECURRENCY = 'baseCurrency',
  ORDERCOUNT = 'orderCount',
  SETTLEDORDERCOUNT = 'settledOrderCount',
  REVIEWEDORDERCOUNT = 'reviewedOrderCount',
  TXCOUNT = 'txCount',
  TOTALREVENUE = 'totalRevenue',
  MERCHANTCOUNT = 'merchantCount',
  PAYEECOUNT = 'payeeCount',
  OWNER = 'owner'
}

export type Merchant = {
  __typename?: 'Merchant';
  id: Scalars['ID'];
  user: User;
  revenue: Scalars['BigInt'];
  completedOrderCount: Scalars['BigInt'];
  reviewedOrderCount: Scalars['BigInt'];
  withdrawn: Scalars['BigInt'];
};

export type Merchant_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  revenue?: InputMaybe<Scalars['BigInt']>;
  revenue_not?: InputMaybe<Scalars['BigInt']>;
  revenue_gt?: InputMaybe<Scalars['BigInt']>;
  revenue_lt?: InputMaybe<Scalars['BigInt']>;
  revenue_gte?: InputMaybe<Scalars['BigInt']>;
  revenue_lte?: InputMaybe<Scalars['BigInt']>;
  revenue_in?: InputMaybe<Array<Scalars['BigInt']>>;
  revenue_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  completedOrderCount?: InputMaybe<Scalars['BigInt']>;
  completedOrderCount_not?: InputMaybe<Scalars['BigInt']>;
  completedOrderCount_gt?: InputMaybe<Scalars['BigInt']>;
  completedOrderCount_lt?: InputMaybe<Scalars['BigInt']>;
  completedOrderCount_gte?: InputMaybe<Scalars['BigInt']>;
  completedOrderCount_lte?: InputMaybe<Scalars['BigInt']>;
  completedOrderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  completedOrderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedOrderCount?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_not?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_gt?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_lt?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_gte?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_lte?: InputMaybe<Scalars['BigInt']>;
  reviewedOrderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedOrderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawn?: InputMaybe<Scalars['BigInt']>;
  withdrawn_not?: InputMaybe<Scalars['BigInt']>;
  withdrawn_gt?: InputMaybe<Scalars['BigInt']>;
  withdrawn_lt?: InputMaybe<Scalars['BigInt']>;
  withdrawn_gte?: InputMaybe<Scalars['BigInt']>;
  withdrawn_lte?: InputMaybe<Scalars['BigInt']>;
  withdrawn_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Merchant_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<Merchant_Filter>>>;
};

export enum Merchant_OrderBy {
  ID = 'id',
  USER = 'user',
  USER__ID = 'user__id',
  USER__TYPE = 'user__type',
  REVENUE = 'revenue',
  COMPLETEDORDERCOUNT = 'completedOrderCount',
  REVIEWEDORDERCOUNT = 'reviewedOrderCount',
  WITHDRAWN = 'withdrawn'
}

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  merchant: Scalars['String'];
  payee: Scalars['String'];
  reviewAttestationId: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  settled: Scalars['Boolean'];
  creationTx: Transaction;
  paymentTx?: Maybe<Transaction>;
  reviewTx?: Maybe<Transaction>;
  createdTimestamp: Scalars['BigInt'];
  settledTimestamp: Scalars['BigInt'];
  reviewedTimestamp: Scalars['BigInt'];
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum OrderStatus {
  UNSETTLED = 'UNSETTLED',
  UNREVIEWED = 'UNREVIEWED',
  REVIEWED = 'REVIEWED'
}

export type Order_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  merchant?: InputMaybe<Scalars['String']>;
  merchant_not?: InputMaybe<Scalars['String']>;
  merchant_gt?: InputMaybe<Scalars['String']>;
  merchant_lt?: InputMaybe<Scalars['String']>;
  merchant_gte?: InputMaybe<Scalars['String']>;
  merchant_lte?: InputMaybe<Scalars['String']>;
  merchant_in?: InputMaybe<Array<Scalars['String']>>;
  merchant_not_in?: InputMaybe<Array<Scalars['String']>>;
  merchant_contains?: InputMaybe<Scalars['String']>;
  merchant_contains_nocase?: InputMaybe<Scalars['String']>;
  merchant_not_contains?: InputMaybe<Scalars['String']>;
  merchant_not_contains_nocase?: InputMaybe<Scalars['String']>;
  merchant_starts_with?: InputMaybe<Scalars['String']>;
  merchant_starts_with_nocase?: InputMaybe<Scalars['String']>;
  merchant_not_starts_with?: InputMaybe<Scalars['String']>;
  merchant_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  merchant_ends_with?: InputMaybe<Scalars['String']>;
  merchant_ends_with_nocase?: InputMaybe<Scalars['String']>;
  merchant_not_ends_with?: InputMaybe<Scalars['String']>;
  merchant_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  payee?: InputMaybe<Scalars['String']>;
  payee_not?: InputMaybe<Scalars['String']>;
  payee_gt?: InputMaybe<Scalars['String']>;
  payee_lt?: InputMaybe<Scalars['String']>;
  payee_gte?: InputMaybe<Scalars['String']>;
  payee_lte?: InputMaybe<Scalars['String']>;
  payee_in?: InputMaybe<Array<Scalars['String']>>;
  payee_not_in?: InputMaybe<Array<Scalars['String']>>;
  payee_contains?: InputMaybe<Scalars['String']>;
  payee_contains_nocase?: InputMaybe<Scalars['String']>;
  payee_not_contains?: InputMaybe<Scalars['String']>;
  payee_not_contains_nocase?: InputMaybe<Scalars['String']>;
  payee_starts_with?: InputMaybe<Scalars['String']>;
  payee_starts_with_nocase?: InputMaybe<Scalars['String']>;
  payee_not_starts_with?: InputMaybe<Scalars['String']>;
  payee_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  payee_ends_with?: InputMaybe<Scalars['String']>;
  payee_ends_with_nocase?: InputMaybe<Scalars['String']>;
  payee_not_ends_with?: InputMaybe<Scalars['String']>;
  payee_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reviewAttestationId?: InputMaybe<Scalars['BigInt']>;
  reviewAttestationId_not?: InputMaybe<Scalars['BigInt']>;
  reviewAttestationId_gt?: InputMaybe<Scalars['BigInt']>;
  reviewAttestationId_lt?: InputMaybe<Scalars['BigInt']>;
  reviewAttestationId_gte?: InputMaybe<Scalars['BigInt']>;
  reviewAttestationId_lte?: InputMaybe<Scalars['BigInt']>;
  reviewAttestationId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewAttestationId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settled?: InputMaybe<Scalars['Boolean']>;
  settled_not?: InputMaybe<Scalars['Boolean']>;
  settled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  settled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  creationTx?: InputMaybe<Scalars['String']>;
  creationTx_not?: InputMaybe<Scalars['String']>;
  creationTx_gt?: InputMaybe<Scalars['String']>;
  creationTx_lt?: InputMaybe<Scalars['String']>;
  creationTx_gte?: InputMaybe<Scalars['String']>;
  creationTx_lte?: InputMaybe<Scalars['String']>;
  creationTx_in?: InputMaybe<Array<Scalars['String']>>;
  creationTx_not_in?: InputMaybe<Array<Scalars['String']>>;
  creationTx_contains?: InputMaybe<Scalars['String']>;
  creationTx_contains_nocase?: InputMaybe<Scalars['String']>;
  creationTx_not_contains?: InputMaybe<Scalars['String']>;
  creationTx_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creationTx_starts_with?: InputMaybe<Scalars['String']>;
  creationTx_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creationTx_not_starts_with?: InputMaybe<Scalars['String']>;
  creationTx_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creationTx_ends_with?: InputMaybe<Scalars['String']>;
  creationTx_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creationTx_not_ends_with?: InputMaybe<Scalars['String']>;
  creationTx_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creationTx_?: InputMaybe<Transaction_Filter>;
  paymentTx?: InputMaybe<Scalars['String']>;
  paymentTx_not?: InputMaybe<Scalars['String']>;
  paymentTx_gt?: InputMaybe<Scalars['String']>;
  paymentTx_lt?: InputMaybe<Scalars['String']>;
  paymentTx_gte?: InputMaybe<Scalars['String']>;
  paymentTx_lte?: InputMaybe<Scalars['String']>;
  paymentTx_in?: InputMaybe<Array<Scalars['String']>>;
  paymentTx_not_in?: InputMaybe<Array<Scalars['String']>>;
  paymentTx_contains?: InputMaybe<Scalars['String']>;
  paymentTx_contains_nocase?: InputMaybe<Scalars['String']>;
  paymentTx_not_contains?: InputMaybe<Scalars['String']>;
  paymentTx_not_contains_nocase?: InputMaybe<Scalars['String']>;
  paymentTx_starts_with?: InputMaybe<Scalars['String']>;
  paymentTx_starts_with_nocase?: InputMaybe<Scalars['String']>;
  paymentTx_not_starts_with?: InputMaybe<Scalars['String']>;
  paymentTx_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  paymentTx_ends_with?: InputMaybe<Scalars['String']>;
  paymentTx_ends_with_nocase?: InputMaybe<Scalars['String']>;
  paymentTx_not_ends_with?: InputMaybe<Scalars['String']>;
  paymentTx_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  paymentTx_?: InputMaybe<Transaction_Filter>;
  reviewTx?: InputMaybe<Scalars['String']>;
  reviewTx_not?: InputMaybe<Scalars['String']>;
  reviewTx_gt?: InputMaybe<Scalars['String']>;
  reviewTx_lt?: InputMaybe<Scalars['String']>;
  reviewTx_gte?: InputMaybe<Scalars['String']>;
  reviewTx_lte?: InputMaybe<Scalars['String']>;
  reviewTx_in?: InputMaybe<Array<Scalars['String']>>;
  reviewTx_not_in?: InputMaybe<Array<Scalars['String']>>;
  reviewTx_contains?: InputMaybe<Scalars['String']>;
  reviewTx_contains_nocase?: InputMaybe<Scalars['String']>;
  reviewTx_not_contains?: InputMaybe<Scalars['String']>;
  reviewTx_not_contains_nocase?: InputMaybe<Scalars['String']>;
  reviewTx_starts_with?: InputMaybe<Scalars['String']>;
  reviewTx_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reviewTx_not_starts_with?: InputMaybe<Scalars['String']>;
  reviewTx_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reviewTx_ends_with?: InputMaybe<Scalars['String']>;
  reviewTx_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reviewTx_not_ends_with?: InputMaybe<Scalars['String']>;
  reviewTx_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reviewTx_?: InputMaybe<Transaction_Filter>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settledTimestamp?: InputMaybe<Scalars['BigInt']>;
  settledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  settledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  settledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  settledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  settledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  settledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedTimestamp?: InputMaybe<Scalars['BigInt']>;
  reviewedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reviewedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reviewedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reviewedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reviewedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reviewedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Order_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<Order_Filter>>>;
};

export enum Order_OrderBy {
  ID = 'id',
  MERCHANT = 'merchant',
  PAYEE = 'payee',
  REVIEWATTESTATIONID = 'reviewAttestationId',
  AMOUNT = 'amount',
  SETTLED = 'settled',
  CREATIONTX = 'creationTx',
  CREATIONTX__ID = 'creationTx__id',
  CREATIONTX__BLOCKNUMBER = 'creationTx__blockNumber',
  CREATIONTX__TIMESTAMP = 'creationTx__timestamp',
  CREATIONTX__GASLIMIT = 'creationTx__gasLimit',
  CREATIONTX__GASPRICE = 'creationTx__gasPrice',
  CREATIONTX__FROM = 'creationTx__from',
  CREATIONTX__TO = 'creationTx__to',
  PAYMENTTX = 'paymentTx',
  PAYMENTTX__ID = 'paymentTx__id',
  PAYMENTTX__BLOCKNUMBER = 'paymentTx__blockNumber',
  PAYMENTTX__TIMESTAMP = 'paymentTx__timestamp',
  PAYMENTTX__GASLIMIT = 'paymentTx__gasLimit',
  PAYMENTTX__GASPRICE = 'paymentTx__gasPrice',
  PAYMENTTX__FROM = 'paymentTx__from',
  PAYMENTTX__TO = 'paymentTx__to',
  REVIEWTX = 'reviewTx',
  REVIEWTX__ID = 'reviewTx__id',
  REVIEWTX__BLOCKNUMBER = 'reviewTx__blockNumber',
  REVIEWTX__TIMESTAMP = 'reviewTx__timestamp',
  REVIEWTX__GASLIMIT = 'reviewTx__gasLimit',
  REVIEWTX__GASPRICE = 'reviewTx__gasPrice',
  REVIEWTX__FROM = 'reviewTx__from',
  REVIEWTX__TO = 'reviewTx__to',
  CREATEDTIMESTAMP = 'createdTimestamp',
  SETTLEDTIMESTAMP = 'settledTimestamp',
  REVIEWEDTIMESTAMP = 'reviewedTimestamp'
}

export type Payee = {
  __typename?: 'Payee';
  id: Scalars['ID'];
  user: User;
  volume: Scalars['BigInt'];
  settledOrderCount: Scalars['BigInt'];
  reviewedCount: Scalars['BigInt'];
};

export type Payee_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settledOrderCount?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_not?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_gt?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_lt?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_gte?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_lte?: InputMaybe<Scalars['BigInt']>;
  settledOrderCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settledOrderCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedCount?: InputMaybe<Scalars['BigInt']>;
  reviewedCount_not?: InputMaybe<Scalars['BigInt']>;
  reviewedCount_gt?: InputMaybe<Scalars['BigInt']>;
  reviewedCount_lt?: InputMaybe<Scalars['BigInt']>;
  reviewedCount_gte?: InputMaybe<Scalars['BigInt']>;
  reviewedCount_lte?: InputMaybe<Scalars['BigInt']>;
  reviewedCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Payee_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<Payee_Filter>>>;
};

export enum Payee_OrderBy {
  ID = 'id',
  USER = 'user',
  USER__ID = 'user__id',
  USER__TYPE = 'user__type',
  VOLUME = 'volume',
  SETTLEDORDERCOUNT = 'settledOrderCount',
  REVIEWEDCOUNT = 'reviewedCount'
}

export type Query = {
  __typename?: 'Query';
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  manager?: Maybe<Manager>;
  managers: Array<Manager>;
  merchant?: Maybe<Merchant>;
  merchants: Array<Merchant>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  payee?: Maybe<Payee>;
  payees: Array<Payee>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryBundleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBundlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bundle_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryManagerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryManagersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Manager_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Manager_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMerchantArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMerchantsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Merchant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Merchant_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOrdersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPayeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPayeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Payee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Payee_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type Subscription = {
  __typename?: 'Subscription';
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  manager?: Maybe<Manager>;
  managers: Array<Manager>;
  merchant?: Maybe<Merchant>;
  merchants: Array<Merchant>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  payee?: Maybe<Payee>;
  payees: Array<Payee>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionBundleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBundlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bundle_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionManagerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionManagersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Manager_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Manager_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMerchantArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMerchantsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Merchant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Merchant_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOrderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOrdersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPayeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPayeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Payee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Payee_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_Filter>;
  block?: InputMaybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['ID'];
  type: TokenType;
  name: Scalars['String'];
  symbol: Scalars['String'];
  decimals: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
};

export enum TokenType {
  ERC20 = 'ERC20',
  NATIVE = 'NATIVE'
}

export type Token_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<TokenType>;
  type_not?: InputMaybe<TokenType>;
  type_in?: InputMaybe<Array<TokenType>>;
  type_not_in?: InputMaybe<Array<TokenType>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
};

export enum Token_OrderBy {
  ID = 'id',
  TYPE = 'type',
  NAME = 'name',
  SYMBOL = 'symbol',
  DECIMALS = 'decimals',
  VOLUME = 'volume'
}

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  from: Scalars['Bytes'];
  to?: Maybe<Scalars['Bytes']>;
};

export type Transaction_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_gt?: InputMaybe<Scalars['Bytes']>;
  to_lt?: InputMaybe<Scalars['Bytes']>;
  to_gte?: InputMaybe<Scalars['Bytes']>;
  to_lte?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
};

export enum Transaction_OrderBy {
  ID = 'id',
  BLOCKNUMBER = 'blockNumber',
  TIMESTAMP = 'timestamp',
  GASLIMIT = 'gasLimit',
  GASPRICE = 'gasPrice',
  FROM = 'from',
  TO = 'to'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  type: UserType;
};

export enum UserType {
  MERCHANT = 'MERCHANT',
  PAYEE = 'PAYEE'
}

export type User_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<UserType>;
  type_not?: InputMaybe<UserType>;
  type_in?: InputMaybe<Array<UserType>>;
  type_not_in?: InputMaybe<Array<UserType>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
};

export enum User_OrderBy {
  ID = 'id',
  TYPE = 'type'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  ALLOW = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  DENY = 'deny'
}

export type MerchantsQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchantsQuery = { __typename?: 'Query', merchants: Array<{ __typename?: 'Merchant', id: string, revenue: any }> };

export type OrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string }> };

export type TransactionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', gasLimit: any, gasPrice: any, timestamp: any, from: any }> };


export const MerchantsDocument = gql`
    query Merchants {
  merchants {
    id
    revenue
  }
}
    `;

/**
 * __useMerchantsQuery__
 *
 * To run a query within a React component, call `useMerchantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMerchantsQuery(baseOptions?: Apollo.QueryHookOptions<MerchantsQuery, MerchantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MerchantsQuery, MerchantsQueryVariables>(MerchantsDocument, options);
      }
export function useMerchantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MerchantsQuery, MerchantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MerchantsQuery, MerchantsQueryVariables>(MerchantsDocument, options);
        }
export type MerchantsQueryHookResult = ReturnType<typeof useMerchantsQuery>;
export type MerchantsLazyQueryHookResult = ReturnType<typeof useMerchantsLazyQuery>;
export type MerchantsQueryResult = Apollo.QueryResult<MerchantsQuery, MerchantsQueryVariables>;
export const OrdersDocument = gql`
    query Orders {
  orders {
    id
  }
}
    `;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrdersQuery(baseOptions?: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const TransactionsDocument = gql`
    query Transactions($skip: Int, $first: Int) {
  transactions(skip: $skip, first: $first) {
    gasLimit
    gasPrice
    timestamp
    from
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;