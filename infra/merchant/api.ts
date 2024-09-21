/// <reference path="../.sst/platform/config.d.ts" />

import { ClarityApiKey, DbUrl, WebhookApiKey } from "../secrets";
import { api as clarityApi } from "../clarity/api";

import { getAllPaths } from "../../packages/core/src/infra/getAllPaths";
import { contract } from "../../packages/merchant-backend/src/contract";

// Create the API
export const api = new sst.aws.ApiGatewayV2("MerchantApi", {
  transform: {
    route: {},
  },
  cors: {
    allowOrigins: ["*"],
    allowHeaders: ["content-type"],
    allowMethods: ["*"],
    maxAge: "30 seconds",
  },
});

const rootPath = "packages/merchant-backend/src/api";

function createRoutes() {
  const paths = getAllPaths(rootPath, contract, "", [
    DbUrl,
    api,
    ClarityApiKey,
    WebhookApiKey,
    clarityApi,
  ]);

  for (const path of paths) {
    api.route(path.path, {
      handler: path.handler,
      link: path.link,
    });
  }
}

createRoutes();
