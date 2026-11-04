import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_cta_button_action" AS ENUM('reserve', 'whatsapp', 'link');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_button_action" AS ENUM('reserve', 'whatsapp', 'link');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('id', 'en');
  CREATE TABLE "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_locales" (
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'right',
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_action" "enum_pages_blocks_cta_button_action" DEFAULT 'reserve',
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"whatsapp_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_locales" (
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_image_text_image_position" DEFAULT 'right',
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_cards_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_action" "enum__pages_v_blocks_cta_button_action" DEFAULT 'reserve',
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"whatsapp_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_hero_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "page_about" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_rooms" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_spa" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_dining" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_experiences" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_facilities" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_gallery" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_nearby" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_offers" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_wedding" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_ballroom" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_events" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_journal" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_contact" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_reserve" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_privacy" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "page_terms" ADD COLUMN "enabled" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_locales" ADD CONSTRAINT "pages_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_locales" ADD CONSTRAINT "pages_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images_locales" ADD CONSTRAINT "pages_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards" ADD CONSTRAINT "pages_blocks_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards" ADD CONSTRAINT "pages_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards_locales" ADD CONSTRAINT "pages_blocks_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards" ADD CONSTRAINT "pages_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_locales" ADD CONSTRAINT "pages_blocks_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_locales" ADD CONSTRAINT "_pages_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards_locales" ADD CONSTRAINT "_pages_v_blocks_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards" ADD CONSTRAINT "_pages_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_locales" ADD CONSTRAINT "_pages_v_blocks_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_text_locales_locale_parent_id_unique" ON "pages_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_image_text_locales_locale_parent_id_unique" ON "pages_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_images_locales_locale_parent_id_unique" ON "pages_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cards_cards_order_idx" ON "pages_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_cards_parent_id_idx" ON "pages_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_cards_image_idx" ON "pages_blocks_cards_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_cards_cards_locales_locale_parent_id_unique" ON "pages_blocks_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cards_order_idx" ON "pages_blocks_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_parent_id_idx" ON "pages_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_path_idx" ON "pages_blocks_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cards_locales_locale_parent_id_unique" ON "pages_blocks_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_images_locales_locale_parent_id_uniq" ON "_pages_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_locales_locale_parent_id_unique" ON "_pages_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_cards_order_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_cards_parent_id_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_cards_image_idx" ON "_pages_v_blocks_cards_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cards_cards_locales_locale_parent_id_unique" ON "_pages_v_blocks_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_order_idx" ON "_pages_v_blocks_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_parent_id_idx" ON "_pages_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_path_idx" ON "_pages_v_blocks_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cards_locales_locale_parent_id_unique" ON "_pages_v_blocks_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_text_locales" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_image_text_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_cards_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_cards" CASCADE;
  DROP TABLE "pages_blocks_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "page_about" DROP COLUMN "enabled";
  ALTER TABLE "page_rooms" DROP COLUMN "enabled";
  ALTER TABLE "page_spa" DROP COLUMN "enabled";
  ALTER TABLE "page_dining" DROP COLUMN "enabled";
  ALTER TABLE "page_experiences" DROP COLUMN "enabled";
  ALTER TABLE "page_facilities" DROP COLUMN "enabled";
  ALTER TABLE "page_gallery" DROP COLUMN "enabled";
  ALTER TABLE "page_nearby" DROP COLUMN "enabled";
  ALTER TABLE "page_offers" DROP COLUMN "enabled";
  ALTER TABLE "page_wedding" DROP COLUMN "enabled";
  ALTER TABLE "page_ballroom" DROP COLUMN "enabled";
  ALTER TABLE "page_events" DROP COLUMN "enabled";
  ALTER TABLE "page_journal" DROP COLUMN "enabled";
  ALTER TABLE "page_contact" DROP COLUMN "enabled";
  ALTER TABLE "page_reserve" DROP COLUMN "enabled";
  ALTER TABLE "page_privacy" DROP COLUMN "enabled";
  ALTER TABLE "page_terms" DROP COLUMN "enabled";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_cta_button_action";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_cta_button_action";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";`)
}
