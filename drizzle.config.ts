import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./packages/core/src/database/model/**/*.model.ts",
  strict: true,
  verbose: true,
  out: "./packages/core/src/database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING!,
  },
});
