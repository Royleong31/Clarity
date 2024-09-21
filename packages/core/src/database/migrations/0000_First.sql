CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "clarity_orders" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"amount" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
