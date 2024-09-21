import handler from "@clarity/core/handler";

import { Resource } from "sst";
import { db } from "@clarity/core/database/client";
import { contract } from "src/contract";

const schema = contract.home;

export const main = handler(
  async (request) => {
    console.log("received request");

    return {
      statusCode: 200 as const,
      body: {
        body: "Hello from merchant backend",
      },
    };
  },
  { schema }
);
