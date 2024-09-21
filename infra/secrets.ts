/// <reference path="../.sst/platform/config.d.ts" />

export const DbUrl = new sst.Secret("DbUrl");
export const ClarityApiKey = new sst.Secret("ClarityApiKey"); // merchantApiKey
export const WebhookApiKey = new sst.Secret("WebhookApiKey"); // apiKeyForMerchant
export const InfuraApiKey = new sst.Secret("InfuraApiKey");
export const PrivateKey = new sst.Secret("PrivateKey");
export const ContractAddress = new sst.Secret("ContractAddress");
