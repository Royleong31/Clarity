/// <reference path="../.sst/platform/config.d.ts" />
import "dotenv/config";

import { api as clarityApi } from "../clarity/api";
import { api as merchantApi } from "./api";

const region = aws.getRegionOutput().name;

const VITE_DYNAMIC_ENV_ID = process.env.VITE_DYNAMIC_ENV_ID;
const VITE_PAYMASTER_KEY = process.env.VITE_PAYMASTER_KEY;
const VITE_BUNDLER_KEY = process.env.VITE_BUNDLER_KEY;
const VITE_1INCH_KEY = process.env.VITE_1INCH_KEY;
const VITE_WID = process.env.VITE_WID;
const VITE_1INCH_URL = process.env.VITE_1INCH_URL;

if (!VITE_DYNAMIC_ENV_ID) {
  throw new Error("VITE_DYNAMIC_ENV_ID is required");
}
if (!VITE_PAYMASTER_KEY) {
  throw new Error("VITE_PAYMASTER_KEY is required");
}
if (!VITE_BUNDLER_KEY) {
  throw new Error("VITE_BUNDLER_KEY is required");
}
if (!VITE_1INCH_KEY) {
  throw new Error("VITE_1INCH_KEY is required");
}
if (!VITE_WID) {
  throw new Error("VITE_WID is required");
}
if (!VITE_1INCH_URL) {
  throw new Error("VITE_1INCH_URL is required");
}

export const frontend = new sst.aws.StaticSite("MerchantFrontend", {
  path: "packages/merchant-frontend",
  build: {
    command: "pnpm run build",
    output: "dist",
  },
  // NOTE: Disabling custom domains for now
  environment: {
    VITE_PUBLIC_REGION: region,
    VITE_PUBLIC_CLARITY_API_URL: clarityApi.url,
    VITE_PUBLIC_MERCHANT_API_URL: merchantApi.url,
    VITE_DYNAMIC_ENV_ID,
    VITE_PAYMASTER_KEY,
    VITE_BUNDLER_KEY,
    VITE_1INCH_KEY,
    VITE_WID,
    VITE_1INCH_URL,
  },
});
