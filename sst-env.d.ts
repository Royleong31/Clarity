/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "ClarityApi": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "ClarityApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ClarityFrontend": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
    "ContractAddress": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "DbUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "InfuraApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "MerchantApi": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "MerchantFrontend": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
    "PrivateKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "WebhookApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
  }
}
export {}
