import "dotenv/config";

import { drizzle as drizzlePostgresJs } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Resource } from "sst";
import * as clarityOrders from "./model/clarity/orders.model";
import * as clarityMerchant from "./model/clarity/merchants.model";
import * as merchantOrders from "./model/merchant/orders.model";
import * as merchantCarts from "./model/merchant/carts.model";

const config = {
  schema: {
    ...clarityOrders,
    ...clarityMerchant,
    ...merchantOrders,
    ...merchantCarts
  },
};

const client = postgres(Resource.DbUrl.value, {
  prepare: false,
  idle_timeout: 20,
  max: 1,
});

export const db = drizzlePostgresJs(client, config);
