import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { merchantCarts } from "../model/merchant/carts.model";
import { merchantOrders } from "../model/merchant/orders.model";

export const MerchantSchema = {
  insertCarts: createInsertSchema(merchantCarts),
  selectCarts: createSelectSchema(merchantCarts),

  insertOrders: createInsertSchema(merchantOrders),
  selectOrders: createSelectSchema(merchantOrders),
};
