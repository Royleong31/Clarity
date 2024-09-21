CREATE TABLE IF NOT EXISTS "clarity_merchants" (
	"id" serial PRIMARY KEY NOT NULL,
	"merchant_api_key" text NOT NULL,
	"api_key_for_merchant" text NOT NULL,
	"webhook_url" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"ethereum_address" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "clarity_merchants_merchant_api_key_unique" UNIQUE("merchant_api_key"),
	CONSTRAINT "clarity_merchants_api_key_for_merchant_unique" UNIQUE("api_key_for_merchant"),
	CONSTRAINT "clarity_merchants_name_unique" UNIQUE("name"),
	CONSTRAINT "clarity_merchants_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "merchant_carts" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "merchant_orders" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"cart_id" uuid NOT NULL,
	"amount" numeric NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clarity_orders" ADD COLUMN "merchant_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "clarity_orders" ADD COLUMN "status" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "merchant_orders" ADD CONSTRAINT "merchant_orders_cart_id_merchant_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."merchant_carts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clarity_orders" ADD CONSTRAINT "clarity_orders_merchant_id_clarity_merchants_id_fk" FOREIGN KEY ("merchant_id") REFERENCES "public"."clarity_merchants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
