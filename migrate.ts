import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle as drizzlePostgresJs } from "drizzle-orm/postgres-js";

import postgres from "postgres";

const connectionString = process.env.DATABASE_CONNECTION_STRING;
if (!connectionString) {
  throw new Error("DATABASE_CONNECTION_STRING is not defined");
}

const client = postgres(connectionString, {
  prepare: false,
  idle_timeout: 20,
  max: 1,
});

export const db = drizzlePostgresJs(client);

const runMigrate = async () => {
  console.log("⏳ Running migrations...");

  const start = Date.now();
  await migrate(db as any, { migrationsFolder: "./packages/core/src/database/migrations" });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
