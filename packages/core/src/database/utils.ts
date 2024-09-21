import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const uuidGen = () => sql`uuid_generate_v4()`;
export const createdAndUpdatedAt = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const upsertStatus = sql<
  "inserted" | "updated"
>`CASE WHEN xmax = 0 THEN 'inserted' ELSE 'updated' END`;
