/// <reference path="../.sst/platform/config.d.ts" />

import { api as clarityApi } from "./api";
import { api as merchantApi } from "../merchant/api";

const region = aws.getRegionOutput().name;

export const frontend = new sst.aws.StaticSite("ClarityFrontend", {
  path: "packages/clarity-frontend",
  build: {
    command: "pnpm run build",
    output: "dist",
  },
  // NOTE: Disabling custom domains for now
  environment: {
    VITE_PUBLIC_REGION: region,
    VITE_PUBLIC_CLARITY_API_URL: clarityApi.url,
    VITE_PUBLIC_MERCHANT_API_URL: merchantApi.url,
  },
});
