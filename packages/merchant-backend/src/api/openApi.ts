import handler from "@clarity/core/handler";
const status = "everything is fine";
import { contract } from "../contract";
import { generateOpenApi } from "@ts-rest/open-api";
import { Resource } from "sst";

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Posts API",
    version: "1.0.0",
  },
  servers: [{ url: Resource.MerchantApi.url }],
});

export const main = handler(
  async (request) => {
    return {
      statusCode: 200 as const,
      body: openApiDocument,
    };
  },
  { schema: contract.openApi, withAuth: false }
);
