/// <reference path="../.sst/platform/config.d.ts" />

import {
  DbUrl,
  ClarityApiKey,
  InfuraApiKey,
  PrivateKey,
  WebhookApiKey,
  ContractAddress,
} from "../secrets";
import { api as merchantApi } from "../merchant/api";

import { getAllPaths } from "../../packages/core/src/infra/getAllPaths";
import { contract } from "../../packages/clarity-backend/src/contract";

// Create the API
export const api = new sst.aws.ApiGatewayV2("ClarityApi", {
  transform: {
    route: {},
  },
  cors: {
    allowOrigins: ["*"],
    allowHeaders: ["content-type", "authorization"],
    allowMethods: ["*"],
    maxAge: "30 seconds",
  },
});

const rootPath = "packages/clarity-backend/src/api";

function createRoutes() {
  const paths = getAllPaths(rootPath, contract, "", [
    DbUrl,
    api,
    InfuraApiKey,
    PrivateKey,
    ContractAddress,
  ]);

  for (const path of paths) {
    api.route(path.path, {
      handler: path.handler,
      link: path.link,
    });
  }
}

createRoutes();
