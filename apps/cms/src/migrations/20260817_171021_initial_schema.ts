import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('content-admin', 'content-editor');
  CREATE TYPE "public"."enum_rooms_category" AS ENUM('Villa', 'Suite', 'Deluxe', 'Family');
  CREATE TYPE "public"."enum_rooms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_version_category" AS ENUM('Villa', 'Suite', 'Deluxe', 'Family');
  CREATE TYPE "public"."enum__rooms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_spa_treatments_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__spa_treatments_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__spa_treatments_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_wedding_packages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__wedding_packages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__wedding_packages_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_offers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offers_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_resort_content_kind" AS ENUM('facility', 'dining', 'experience', 'nearby');
  CREATE TYPE "public"."enum_resort_content_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__resort_content_v_version_kind" AS ENUM('facility', 'dining', 'experience', 'nearby');
  CREATE TYPE "public"."enum__resort_content_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__resort_content_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_journal_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journal_articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journal_articles_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_gallery_items_category" AS ENUM('Rooms', 'Spa', 'Weddings', 'La Kana Chapel', 'Dining', 'Grounds');
  CREATE TYPE "public"."enum_gallery_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_items_v_version_category" AS ENUM('Rooms', 'Spa', 'Weddings', 'La Kana Chapel', 'Dining', 'Grounds');
  CREATE TYPE "public"."enum__gallery_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_items_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_published_locale" AS ENUM('id', 'en');
  CREATE TABLE "users_roles" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_users_roles",
	"id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT 0,
	"lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_hero_url" varchar,
	"sizes_hero_width" numeric,
	"sizes_hero_height" numeric,
	"sizes_hero_mime_type" varchar,
	"sizes_hero_filesize" numeric,
	"sizes_hero_filename" varchar
  );

  CREATE TABLE "media_locales" (
	"alt" varchar NOT NULL,
	"caption" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "rooms_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer
  );

  CREATE TABLE "rooms_amenities" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "rooms_amenities_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "rooms_policies" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "rooms_policies_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"category" "enum_rooms_category",
	"booking_room_type_id" varchar,
	"starting_price_label" numeric,
	"size_sqm" numeric,
	"capacity_adults" numeric DEFAULT 2,
	"capacity_children" numeric DEFAULT 0,
	"sort_order" numeric DEFAULT 0,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_rooms_status" DEFAULT 'draft'
  );

  CREATE TABLE "rooms_locales" (
	"name" varchar,
	"tagline" varchar,
	"short_description" varchar,
	"long_description" varchar,
	"bed_type" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_rooms_v_version_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"_uuid" varchar
  );

  CREATE TABLE "_rooms_v_version_amenities" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
  );

  CREATE TABLE "_rooms_v_version_amenities_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_rooms_v_version_policies" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
  );

  CREATE TABLE "_rooms_v_version_policies_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_rooms_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_slug" varchar,
	"version_category" "enum__rooms_v_version_category",
	"version_booking_room_type_id" varchar,
	"version_starting_price_label" numeric,
	"version_size_sqm" numeric,
	"version_capacity_adults" numeric DEFAULT 2,
	"version_capacity_children" numeric DEFAULT 0,
	"version_sort_order" numeric DEFAULT 0,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__rooms_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__rooms_v_published_locale",
	"latest" boolean,
	"autosave" boolean
  );

  CREATE TABLE "_rooms_v_locales" (
	"version_name" varchar,
	"version_tagline" varchar,
	"version_short_description" varchar,
	"version_long_description" varchar,
	"version_bed_type" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "spa_treatments_benefits" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "spa_treatments_benefits_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "spa_treatments" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"featured_image_id" integer,
	"sort_order" numeric DEFAULT 0,
	"duration_minutes" numeric,
	"price_label" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_spa_treatments_status" DEFAULT 'draft'
  );

  CREATE TABLE "spa_treatments_locales" (
	"title" varchar,
	"summary" varchar,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_spa_treatments_v_version_benefits" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
  );

  CREATE TABLE "_spa_treatments_v_version_benefits_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_spa_treatments_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_slug" varchar,
	"version_featured_image_id" integer,
	"version_sort_order" numeric DEFAULT 0,
	"version_duration_minutes" numeric,
	"version_price_label" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__spa_treatments_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__spa_treatments_v_published_locale",
	"latest" boolean
  );

  CREATE TABLE "_spa_treatments_v_locales" (
	"version_title" varchar,
	"version_summary" varchar,
	"version_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "wedding_packages_inclusions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "wedding_packages_inclusions_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "wedding_packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"featured_image_id" integer,
	"sort_order" numeric DEFAULT 0,
	"capacity" numeric,
	"price_label" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_wedding_packages_status" DEFAULT 'draft'
  );

  CREATE TABLE "wedding_packages_locales" (
	"title" varchar,
	"summary" varchar,
	"description" varchar,
	"venue" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_wedding_packages_v_version_inclusions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
  );

  CREATE TABLE "_wedding_packages_v_version_inclusions_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_wedding_packages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_slug" varchar,
	"version_featured_image_id" integer,
	"version_sort_order" numeric DEFAULT 0,
	"version_capacity" numeric,
	"version_price_label" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__wedding_packages_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__wedding_packages_v_published_locale",
	"latest" boolean
  );

  CREATE TABLE "_wedding_packages_v_locales" (
	"version_title" varchar,
	"version_summary" varchar,
	"version_description" varchar,
	"version_venue" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"featured_image_id" integer,
	"sort_order" numeric DEFAULT 0,
	"valid_from" timestamp(3) with time zone,
	"valid_until" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_offers_status" DEFAULT 'draft'
  );

  CREATE TABLE "offers_locales" (
	"title" varchar,
	"summary" varchar,
	"description" varchar,
	"terms" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_offers_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_slug" varchar,
	"version_featured_image_id" integer,
	"version_sort_order" numeric DEFAULT 0,
	"version_valid_from" timestamp(3) with time zone,
	"version_valid_until" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__offers_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__offers_v_published_locale",
	"latest" boolean
  );

  CREATE TABLE "_offers_v_locales" (
	"version_title" varchar,
	"version_summary" varchar,
	"version_description" varchar,
	"version_terms" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "resort_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"featured_image_id" integer,
	"sort_order" numeric DEFAULT 0,
	"kind" "enum_resort_content_kind",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_resort_content_status" DEFAULT 'draft'
  );

  CREATE TABLE "resort_content_locales" (
	"title" varchar,
	"summary" varchar,
	"description" varchar,
	"location" varchar,
	"distance_label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_resort_content_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_slug" varchar,
	"version_featured_image_id" integer,
	"version_sort_order" numeric DEFAULT 0,
	"version_kind" "enum__resort_content_v_version_kind",
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__resort_content_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__resort_content_v_published_locale",
	"latest" boolean
  );

  CREATE TABLE "_resort_content_v_locales" (
	"version_title" varchar,
	"version_summary" varchar,
	"version_description" varchar,
	"version_location" varchar,
	"version_distance_label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "journal_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"cover_image_id" integer,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_journal_articles_status" DEFAULT 'draft'
  );

  CREATE TABLE "journal_articles_locales" (
	"title" varchar,
	"excerpt" varchar,
	"content" jsonb,
	"category" varchar,
	"seo_title" varchar,
	"seo_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_journal_articles_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_slug" varchar,
	"version_cover_image_id" integer,
	"version_published_at" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__journal_articles_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__journal_articles_v_published_locale",
	"latest" boolean,
	"autosave" boolean
  );

  CREATE TABLE "_journal_articles_v_locales" (
	"version_title" varchar,
	"version_excerpt" varchar,
	"version_content" jsonb,
	"version_category" varchar,
	"version_seo_title" varchar,
	"version_seo_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"guest_name" varchar,
	"rating" numeric DEFAULT 5,
	"avatar_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );

  CREATE TABLE "testimonials_locales" (
	"quote" varchar,
	"stay_category" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_testimonials_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_guest_name" varchar,
	"version_rating" numeric DEFAULT 5,
	"version_avatar_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__testimonials_v_published_locale",
	"latest" boolean
  );

  CREATE TABLE "_testimonials_v_locales" (
	"version_quote" varchar,
	"version_stay_category" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"category" "enum_gallery_items_category",
	"sort_order" numeric DEFAULT 0,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_gallery_items_status" DEFAULT 'draft'
  );

  CREATE TABLE "gallery_items_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_gallery_items_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_image_id" integer,
	"version_category" "enum__gallery_items_v_version_category",
	"version_sort_order" numeric DEFAULT 0,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__gallery_items_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__gallery_items_v_published_locale",
	"latest" boolean
  );

  CREATE TABLE "_gallery_items_v_locales" (
	"version_title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "payload_kv" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
  );

  CREATE TABLE "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"media_id" integer,
	"rooms_id" integer,
	"spa_treatments_id" integer,
	"wedding_packages_id" integer,
	"offers_id" integer,
	"resort_content_id" integer,
	"journal_articles_id" integer,
	"testimonials_id" integer,
	"gallery_items_id" integer
  );

  CREATE TABLE "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
  );

  CREATE TABLE "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"resort_name" varchar DEFAULT 'Susan Spa & Resort',
	"phone" varchar,
	"whatsapp" varchar,
	"email" varchar,
	"instagram_url" varchar,
	"facebook_url" varchar,
	"default_seo_image_id" integer,
	"_status" "enum_site_settings_status" DEFAULT 'draft',
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "site_settings_locales" (
	"address" varchar,
	"default_seo_title" varchar,
	"default_seo_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_site_settings_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_resort_name" varchar DEFAULT 'Susan Spa & Resort',
	"version_phone" varchar,
	"version_whatsapp" varchar,
	"version_email" varchar,
	"version_instagram_url" varchar,
	"version_facebook_url" varchar,
	"version_default_seo_image_id" integer,
	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"snapshot" boolean,
	"published_locale" "enum__site_settings_v_published_locale",
	"latest" boolean
  );

  CREATE TABLE "_site_settings_v_locales" (
	"version_address" varchar,
	"version_default_seo_title" varchar,
	"version_default_seo_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_images" ADD CONSTRAINT "rooms_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_images" ADD CONSTRAINT "rooms_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities" ADD CONSTRAINT "rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities_locales" ADD CONSTRAINT "rooms_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_policies" ADD CONSTRAINT "rooms_policies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_policies_locales" ADD CONSTRAINT "rooms_policies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_locales" ADD CONSTRAINT "rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_images" ADD CONSTRAINT "_rooms_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_images" ADD CONSTRAINT "_rooms_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_amenities" ADD CONSTRAINT "_rooms_v_version_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_amenities_locales" ADD CONSTRAINT "_rooms_v_version_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v_version_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_policies" ADD CONSTRAINT "_rooms_v_version_policies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_policies_locales" ADD CONSTRAINT "_rooms_v_version_policies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v_version_policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_parent_id_rooms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_locales" ADD CONSTRAINT "_rooms_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spa_treatments_benefits" ADD CONSTRAINT "spa_treatments_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spa_treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spa_treatments_benefits_locales" ADD CONSTRAINT "spa_treatments_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spa_treatments_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spa_treatments" ADD CONSTRAINT "spa_treatments_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spa_treatments_locales" ADD CONSTRAINT "spa_treatments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spa_treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spa_treatments_v_version_benefits" ADD CONSTRAINT "_spa_treatments_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spa_treatments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spa_treatments_v_version_benefits_locales" ADD CONSTRAINT "_spa_treatments_v_version_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spa_treatments_v_version_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spa_treatments_v" ADD CONSTRAINT "_spa_treatments_v_parent_id_spa_treatments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."spa_treatments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spa_treatments_v" ADD CONSTRAINT "_spa_treatments_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spa_treatments_v_locales" ADD CONSTRAINT "_spa_treatments_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spa_treatments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wedding_packages_inclusions" ADD CONSTRAINT "wedding_packages_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wedding_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wedding_packages_inclusions_locales" ADD CONSTRAINT "wedding_packages_inclusions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wedding_packages_inclusions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wedding_packages" ADD CONSTRAINT "wedding_packages_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wedding_packages_locales" ADD CONSTRAINT "wedding_packages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wedding_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v_version_inclusions" ADD CONSTRAINT "_wedding_packages_v_version_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wedding_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v_version_inclusions_locales" ADD CONSTRAINT "_wedding_packages_v_version_inclusions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wedding_packages_v_version_inclusions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v" ADD CONSTRAINT "_wedding_packages_v_parent_id_wedding_packages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."wedding_packages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v" ADD CONSTRAINT "_wedding_packages_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v_locales" ADD CONSTRAINT "_wedding_packages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wedding_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers_locales" ADD CONSTRAINT "offers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_parent_id_offers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."offers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v_locales" ADD CONSTRAINT "_offers_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resort_content" ADD CONSTRAINT "resort_content_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resort_content_locales" ADD CONSTRAINT "resort_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resort_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resort_content_v" ADD CONSTRAINT "_resort_content_v_parent_id_resort_content_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resort_content"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resort_content_v" ADD CONSTRAINT "_resort_content_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resort_content_v_locales" ADD CONSTRAINT "_resort_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_resort_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_articles" ADD CONSTRAINT "journal_articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_articles_locales" ADD CONSTRAINT "journal_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_articles_v" ADD CONSTRAINT "_journal_articles_v_parent_id_journal_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journal_articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_articles_v" ADD CONSTRAINT "_journal_articles_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_articles_v_locales" ADD CONSTRAINT "_journal_articles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journal_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_avatar_id_media_id_fk" FOREIGN KEY ("version_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v_locales" ADD CONSTRAINT "_testimonials_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testimonials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items_locales" ADD CONSTRAINT "gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_items_v" ADD CONSTRAINT "_gallery_items_v_parent_id_gallery_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_items_v" ADD CONSTRAINT "_gallery_items_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_items_v_locales" ADD CONSTRAINT "_gallery_items_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_spa_treatments_fk" FOREIGN KEY ("spa_treatments_id") REFERENCES "public"."spa_treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wedding_packages_fk" FOREIGN KEY ("wedding_packages_id") REFERENCES "public"."wedding_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resort_content_fk" FOREIGN KEY ("resort_content_id") REFERENCES "public"."resort_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journal_articles_fk" FOREIGN KEY ("journal_articles_id") REFERENCES "public"."journal_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_items_fk" FOREIGN KEY ("gallery_items_id") REFERENCES "public"."gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_seo_image_id_media_id_fk" FOREIGN KEY ("version_default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rooms_images_order_idx" ON "rooms_images" USING btree ("_order");
  CREATE INDEX "rooms_images_parent_id_idx" ON "rooms_images" USING btree ("_parent_id");
  CREATE INDEX "rooms_images_image_idx" ON "rooms_images" USING btree ("image_id");
  CREATE INDEX "rooms_amenities_order_idx" ON "rooms_amenities" USING btree ("_order");
  CREATE INDEX "rooms_amenities_parent_id_idx" ON "rooms_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "rooms_amenities_locales_locale_parent_id_unique" ON "rooms_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rooms_policies_order_idx" ON "rooms_policies" USING btree ("_order");
  CREATE INDEX "rooms_policies_parent_id_idx" ON "rooms_policies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "rooms_policies_locales_locale_parent_id_unique" ON "rooms_policies_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "rooms_slug_idx" ON "rooms" USING btree ("slug");
  CREATE UNIQUE INDEX "rooms_booking_room_type_id_idx" ON "rooms" USING btree ("booking_room_type_id");
  CREATE INDEX "rooms_sort_order_idx" ON "rooms" USING btree ("sort_order");
  CREATE INDEX "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
  CREATE INDEX "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
  CREATE INDEX "rooms__status_idx" ON "rooms" USING btree ("_status");
  CREATE UNIQUE INDEX "rooms_locales_locale_parent_id_unique" ON "rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_version_images_order_idx" ON "_rooms_v_version_images" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_images_parent_id_idx" ON "_rooms_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_images_image_idx" ON "_rooms_v_version_images" USING btree ("image_id");
  CREATE INDEX "_rooms_v_version_amenities_order_idx" ON "_rooms_v_version_amenities" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_amenities_parent_id_idx" ON "_rooms_v_version_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_rooms_v_version_amenities_locales_locale_parent_id_unique" ON "_rooms_v_version_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_version_policies_order_idx" ON "_rooms_v_version_policies" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_policies_parent_id_idx" ON "_rooms_v_version_policies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_rooms_v_version_policies_locales_locale_parent_id_unique" ON "_rooms_v_version_policies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_parent_idx" ON "_rooms_v" USING btree ("parent_id");
  CREATE INDEX "_rooms_v_version_version_slug_idx" ON "_rooms_v" USING btree ("version_slug");
  CREATE INDEX "_rooms_v_version_version_booking_room_type_id_idx" ON "_rooms_v" USING btree ("version_booking_room_type_id");
  CREATE INDEX "_rooms_v_version_version_sort_order_idx" ON "_rooms_v" USING btree ("version_sort_order");
  CREATE INDEX "_rooms_v_version_version_updated_at_idx" ON "_rooms_v" USING btree ("version_updated_at");
  CREATE INDEX "_rooms_v_version_version_created_at_idx" ON "_rooms_v" USING btree ("version_created_at");
  CREATE INDEX "_rooms_v_version_version__status_idx" ON "_rooms_v" USING btree ("version__status");
  CREATE INDEX "_rooms_v_created_at_idx" ON "_rooms_v" USING btree ("created_at");
  CREATE INDEX "_rooms_v_updated_at_idx" ON "_rooms_v" USING btree ("updated_at");
  CREATE INDEX "_rooms_v_snapshot_idx" ON "_rooms_v" USING btree ("snapshot");
  CREATE INDEX "_rooms_v_published_locale_idx" ON "_rooms_v" USING btree ("published_locale");
  CREATE INDEX "_rooms_v_latest_idx" ON "_rooms_v" USING btree ("latest");
  CREATE INDEX "_rooms_v_autosave_idx" ON "_rooms_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_rooms_v_locales_locale_parent_id_unique" ON "_rooms_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spa_treatments_benefits_order_idx" ON "spa_treatments_benefits" USING btree ("_order");
  CREATE INDEX "spa_treatments_benefits_parent_id_idx" ON "spa_treatments_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "spa_treatments_benefits_locales_locale_parent_id_unique" ON "spa_treatments_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "spa_treatments_slug_idx" ON "spa_treatments" USING btree ("slug");
  CREATE INDEX "spa_treatments_featured_image_idx" ON "spa_treatments" USING btree ("featured_image_id");
  CREATE INDEX "spa_treatments_sort_order_idx" ON "spa_treatments" USING btree ("sort_order");
  CREATE INDEX "spa_treatments_updated_at_idx" ON "spa_treatments" USING btree ("updated_at");
  CREATE INDEX "spa_treatments_created_at_idx" ON "spa_treatments" USING btree ("created_at");
  CREATE INDEX "spa_treatments__status_idx" ON "spa_treatments" USING btree ("_status");
  CREATE UNIQUE INDEX "spa_treatments_locales_locale_parent_id_unique" ON "spa_treatments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spa_treatments_v_version_benefits_order_idx" ON "_spa_treatments_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_spa_treatments_v_version_benefits_parent_id_idx" ON "_spa_treatments_v_version_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_spa_treatments_v_version_benefits_locales_locale_parent_id_" ON "_spa_treatments_v_version_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spa_treatments_v_parent_idx" ON "_spa_treatments_v" USING btree ("parent_id");
  CREATE INDEX "_spa_treatments_v_version_version_slug_idx" ON "_spa_treatments_v" USING btree ("version_slug");
  CREATE INDEX "_spa_treatments_v_version_version_featured_image_idx" ON "_spa_treatments_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_spa_treatments_v_version_version_sort_order_idx" ON "_spa_treatments_v" USING btree ("version_sort_order");
  CREATE INDEX "_spa_treatments_v_version_version_updated_at_idx" ON "_spa_treatments_v" USING btree ("version_updated_at");
  CREATE INDEX "_spa_treatments_v_version_version_created_at_idx" ON "_spa_treatments_v" USING btree ("version_created_at");
  CREATE INDEX "_spa_treatments_v_version_version__status_idx" ON "_spa_treatments_v" USING btree ("version__status");
  CREATE INDEX "_spa_treatments_v_created_at_idx" ON "_spa_treatments_v" USING btree ("created_at");
  CREATE INDEX "_spa_treatments_v_updated_at_idx" ON "_spa_treatments_v" USING btree ("updated_at");
  CREATE INDEX "_spa_treatments_v_snapshot_idx" ON "_spa_treatments_v" USING btree ("snapshot");
  CREATE INDEX "_spa_treatments_v_published_locale_idx" ON "_spa_treatments_v" USING btree ("published_locale");
  CREATE INDEX "_spa_treatments_v_latest_idx" ON "_spa_treatments_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_spa_treatments_v_locales_locale_parent_id_unique" ON "_spa_treatments_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "wedding_packages_inclusions_order_idx" ON "wedding_packages_inclusions" USING btree ("_order");
  CREATE INDEX "wedding_packages_inclusions_parent_id_idx" ON "wedding_packages_inclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "wedding_packages_inclusions_locales_locale_parent_id_unique" ON "wedding_packages_inclusions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "wedding_packages_slug_idx" ON "wedding_packages" USING btree ("slug");
  CREATE INDEX "wedding_packages_featured_image_idx" ON "wedding_packages" USING btree ("featured_image_id");
  CREATE INDEX "wedding_packages_sort_order_idx" ON "wedding_packages" USING btree ("sort_order");
  CREATE INDEX "wedding_packages_updated_at_idx" ON "wedding_packages" USING btree ("updated_at");
  CREATE INDEX "wedding_packages_created_at_idx" ON "wedding_packages" USING btree ("created_at");
  CREATE INDEX "wedding_packages__status_idx" ON "wedding_packages" USING btree ("_status");
  CREATE UNIQUE INDEX "wedding_packages_locales_locale_parent_id_unique" ON "wedding_packages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_wedding_packages_v_version_inclusions_order_idx" ON "_wedding_packages_v_version_inclusions" USING btree ("_order");
  CREATE INDEX "_wedding_packages_v_version_inclusions_parent_id_idx" ON "_wedding_packages_v_version_inclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_wedding_packages_v_version_inclusions_locales_locale_parent" ON "_wedding_packages_v_version_inclusions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_wedding_packages_v_parent_idx" ON "_wedding_packages_v" USING btree ("parent_id");
  CREATE INDEX "_wedding_packages_v_version_version_slug_idx" ON "_wedding_packages_v" USING btree ("version_slug");
  CREATE INDEX "_wedding_packages_v_version_version_featured_image_idx" ON "_wedding_packages_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_wedding_packages_v_version_version_sort_order_idx" ON "_wedding_packages_v" USING btree ("version_sort_order");
  CREATE INDEX "_wedding_packages_v_version_version_updated_at_idx" ON "_wedding_packages_v" USING btree ("version_updated_at");
  CREATE INDEX "_wedding_packages_v_version_version_created_at_idx" ON "_wedding_packages_v" USING btree ("version_created_at");
  CREATE INDEX "_wedding_packages_v_version_version__status_idx" ON "_wedding_packages_v" USING btree ("version__status");
  CREATE INDEX "_wedding_packages_v_created_at_idx" ON "_wedding_packages_v" USING btree ("created_at");
  CREATE INDEX "_wedding_packages_v_updated_at_idx" ON "_wedding_packages_v" USING btree ("updated_at");
  CREATE INDEX "_wedding_packages_v_snapshot_idx" ON "_wedding_packages_v" USING btree ("snapshot");
  CREATE INDEX "_wedding_packages_v_published_locale_idx" ON "_wedding_packages_v" USING btree ("published_locale");
  CREATE INDEX "_wedding_packages_v_latest_idx" ON "_wedding_packages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_wedding_packages_v_locales_locale_parent_id_unique" ON "_wedding_packages_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "offers_slug_idx" ON "offers" USING btree ("slug");
  CREATE INDEX "offers_featured_image_idx" ON "offers" USING btree ("featured_image_id");
  CREATE INDEX "offers_sort_order_idx" ON "offers" USING btree ("sort_order");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "offers__status_idx" ON "offers" USING btree ("_status");
  CREATE UNIQUE INDEX "offers_locales_locale_parent_id_unique" ON "offers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_offers_v_parent_idx" ON "_offers_v" USING btree ("parent_id");
  CREATE INDEX "_offers_v_version_version_slug_idx" ON "_offers_v" USING btree ("version_slug");
  CREATE INDEX "_offers_v_version_version_featured_image_idx" ON "_offers_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_offers_v_version_version_sort_order_idx" ON "_offers_v" USING btree ("version_sort_order");
  CREATE INDEX "_offers_v_version_version_updated_at_idx" ON "_offers_v" USING btree ("version_updated_at");
  CREATE INDEX "_offers_v_version_version_created_at_idx" ON "_offers_v" USING btree ("version_created_at");
  CREATE INDEX "_offers_v_version_version__status_idx" ON "_offers_v" USING btree ("version__status");
  CREATE INDEX "_offers_v_created_at_idx" ON "_offers_v" USING btree ("created_at");
  CREATE INDEX "_offers_v_updated_at_idx" ON "_offers_v" USING btree ("updated_at");
  CREATE INDEX "_offers_v_snapshot_idx" ON "_offers_v" USING btree ("snapshot");
  CREATE INDEX "_offers_v_published_locale_idx" ON "_offers_v" USING btree ("published_locale");
  CREATE INDEX "_offers_v_latest_idx" ON "_offers_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_offers_v_locales_locale_parent_id_unique" ON "_offers_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "resort_content_slug_idx" ON "resort_content" USING btree ("slug");
  CREATE INDEX "resort_content_featured_image_idx" ON "resort_content" USING btree ("featured_image_id");
  CREATE INDEX "resort_content_sort_order_idx" ON "resort_content" USING btree ("sort_order");
  CREATE INDEX "resort_content_kind_idx" ON "resort_content" USING btree ("kind");
  CREATE INDEX "resort_content_updated_at_idx" ON "resort_content" USING btree ("updated_at");
  CREATE INDEX "resort_content_created_at_idx" ON "resort_content" USING btree ("created_at");
  CREATE INDEX "resort_content__status_idx" ON "resort_content" USING btree ("_status");
  CREATE UNIQUE INDEX "resort_content_locales_locale_parent_id_unique" ON "resort_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_resort_content_v_parent_idx" ON "_resort_content_v" USING btree ("parent_id");
  CREATE INDEX "_resort_content_v_version_version_slug_idx" ON "_resort_content_v" USING btree ("version_slug");
  CREATE INDEX "_resort_content_v_version_version_featured_image_idx" ON "_resort_content_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_resort_content_v_version_version_sort_order_idx" ON "_resort_content_v" USING btree ("version_sort_order");
  CREATE INDEX "_resort_content_v_version_version_kind_idx" ON "_resort_content_v" USING btree ("version_kind");
  CREATE INDEX "_resort_content_v_version_version_updated_at_idx" ON "_resort_content_v" USING btree ("version_updated_at");
  CREATE INDEX "_resort_content_v_version_version_created_at_idx" ON "_resort_content_v" USING btree ("version_created_at");
  CREATE INDEX "_resort_content_v_version_version__status_idx" ON "_resort_content_v" USING btree ("version__status");
  CREATE INDEX "_resort_content_v_created_at_idx" ON "_resort_content_v" USING btree ("created_at");
  CREATE INDEX "_resort_content_v_updated_at_idx" ON "_resort_content_v" USING btree ("updated_at");
  CREATE INDEX "_resort_content_v_snapshot_idx" ON "_resort_content_v" USING btree ("snapshot");
  CREATE INDEX "_resort_content_v_published_locale_idx" ON "_resort_content_v" USING btree ("published_locale");
  CREATE INDEX "_resort_content_v_latest_idx" ON "_resort_content_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_resort_content_v_locales_locale_parent_id_unique" ON "_resort_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "journal_articles_slug_idx" ON "journal_articles" USING btree ("slug");
  CREATE INDEX "journal_articles_cover_image_idx" ON "journal_articles" USING btree ("cover_image_id");
  CREATE INDEX "journal_articles_published_at_idx" ON "journal_articles" USING btree ("published_at");
  CREATE INDEX "journal_articles_updated_at_idx" ON "journal_articles" USING btree ("updated_at");
  CREATE INDEX "journal_articles_created_at_idx" ON "journal_articles" USING btree ("created_at");
  CREATE INDEX "journal_articles__status_idx" ON "journal_articles" USING btree ("_status");
  CREATE UNIQUE INDEX "journal_articles_locales_locale_parent_id_unique" ON "journal_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_journal_articles_v_parent_idx" ON "_journal_articles_v" USING btree ("parent_id");
  CREATE INDEX "_journal_articles_v_version_version_slug_idx" ON "_journal_articles_v" USING btree ("version_slug");
  CREATE INDEX "_journal_articles_v_version_version_cover_image_idx" ON "_journal_articles_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_journal_articles_v_version_version_published_at_idx" ON "_journal_articles_v" USING btree ("version_published_at");
  CREATE INDEX "_journal_articles_v_version_version_updated_at_idx" ON "_journal_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_journal_articles_v_version_version_created_at_idx" ON "_journal_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_journal_articles_v_version_version__status_idx" ON "_journal_articles_v" USING btree ("version__status");
  CREATE INDEX "_journal_articles_v_created_at_idx" ON "_journal_articles_v" USING btree ("created_at");
  CREATE INDEX "_journal_articles_v_updated_at_idx" ON "_journal_articles_v" USING btree ("updated_at");
  CREATE INDEX "_journal_articles_v_snapshot_idx" ON "_journal_articles_v" USING btree ("snapshot");
  CREATE INDEX "_journal_articles_v_published_locale_idx" ON "_journal_articles_v" USING btree ("published_locale");
  CREATE INDEX "_journal_articles_v_latest_idx" ON "_journal_articles_v" USING btree ("latest");
  CREATE INDEX "_journal_articles_v_autosave_idx" ON "_journal_articles_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_journal_articles_v_locales_locale_parent_id_unique" ON "_journal_articles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_avatar_idx" ON "_testimonials_v" USING btree ("version_avatar_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_snapshot_idx" ON "_testimonials_v" USING btree ("snapshot");
  CREATE INDEX "_testimonials_v_published_locale_idx" ON "_testimonials_v" USING btree ("published_locale");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_testimonials_v_locales_locale_parent_id_unique" ON "_testimonials_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");
  CREATE INDEX "gallery_items_updated_at_idx" ON "gallery_items" USING btree ("updated_at");
  CREATE INDEX "gallery_items_created_at_idx" ON "gallery_items" USING btree ("created_at");
  CREATE INDEX "gallery_items__status_idx" ON "gallery_items" USING btree ("_status");
  CREATE UNIQUE INDEX "gallery_items_locales_locale_parent_id_unique" ON "gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_gallery_items_v_parent_idx" ON "_gallery_items_v" USING btree ("parent_id");
  CREATE INDEX "_gallery_items_v_version_version_image_idx" ON "_gallery_items_v" USING btree ("version_image_id");
  CREATE INDEX "_gallery_items_v_version_version_updated_at_idx" ON "_gallery_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_gallery_items_v_version_version_created_at_idx" ON "_gallery_items_v" USING btree ("version_created_at");
  CREATE INDEX "_gallery_items_v_version_version__status_idx" ON "_gallery_items_v" USING btree ("version__status");
  CREATE INDEX "_gallery_items_v_created_at_idx" ON "_gallery_items_v" USING btree ("created_at");
  CREATE INDEX "_gallery_items_v_updated_at_idx" ON "_gallery_items_v" USING btree ("updated_at");
  CREATE INDEX "_gallery_items_v_snapshot_idx" ON "_gallery_items_v" USING btree ("snapshot");
  CREATE INDEX "_gallery_items_v_published_locale_idx" ON "_gallery_items_v" USING btree ("published_locale");
  CREATE INDEX "_gallery_items_v_latest_idx" ON "_gallery_items_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_gallery_items_v_locales_locale_parent_id_unique" ON "_gallery_items_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
  CREATE INDEX "payload_locked_documents_rels_spa_treatments_id_idx" ON "payload_locked_documents_rels" USING btree ("spa_treatments_id");
  CREATE INDEX "payload_locked_documents_rels_wedding_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("wedding_packages_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_resort_content_id_idx" ON "payload_locked_documents_rels" USING btree ("resort_content_id");
  CREATE INDEX "payload_locked_documents_rels_journal_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("journal_articles_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_items_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_items_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_default_seo_image_idx" ON "site_settings" USING btree ("default_seo_image_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_version_default_seo_image_idx" ON "_site_settings_v" USING btree ("version_default_seo_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "rooms_images" CASCADE;
  DROP TABLE "rooms_amenities" CASCADE;
  DROP TABLE "rooms_amenities_locales" CASCADE;
  DROP TABLE "rooms_policies" CASCADE;
  DROP TABLE "rooms_policies_locales" CASCADE;
  DROP TABLE "rooms" CASCADE;
  DROP TABLE "rooms_locales" CASCADE;
  DROP TABLE "_rooms_v_version_images" CASCADE;
  DROP TABLE "_rooms_v_version_amenities" CASCADE;
  DROP TABLE "_rooms_v_version_amenities_locales" CASCADE;
  DROP TABLE "_rooms_v_version_policies" CASCADE;
  DROP TABLE "_rooms_v_version_policies_locales" CASCADE;
  DROP TABLE "_rooms_v" CASCADE;
  DROP TABLE "_rooms_v_locales" CASCADE;
  DROP TABLE "spa_treatments_benefits" CASCADE;
  DROP TABLE "spa_treatments_benefits_locales" CASCADE;
  DROP TABLE "spa_treatments" CASCADE;
  DROP TABLE "spa_treatments_locales" CASCADE;
  DROP TABLE "_spa_treatments_v_version_benefits" CASCADE;
  DROP TABLE "_spa_treatments_v_version_benefits_locales" CASCADE;
  DROP TABLE "_spa_treatments_v" CASCADE;
  DROP TABLE "_spa_treatments_v_locales" CASCADE;
  DROP TABLE "wedding_packages_inclusions" CASCADE;
  DROP TABLE "wedding_packages_inclusions_locales" CASCADE;
  DROP TABLE "wedding_packages" CASCADE;
  DROP TABLE "wedding_packages_locales" CASCADE;
  DROP TABLE "_wedding_packages_v_version_inclusions" CASCADE;
  DROP TABLE "_wedding_packages_v_version_inclusions_locales" CASCADE;
  DROP TABLE "_wedding_packages_v" CASCADE;
  DROP TABLE "_wedding_packages_v_locales" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "offers_locales" CASCADE;
  DROP TABLE "_offers_v" CASCADE;
  DROP TABLE "_offers_v_locales" CASCADE;
  DROP TABLE "resort_content" CASCADE;
  DROP TABLE "resort_content_locales" CASCADE;
  DROP TABLE "_resort_content_v" CASCADE;
  DROP TABLE "_resort_content_v_locales" CASCADE;
  DROP TABLE "journal_articles" CASCADE;
  DROP TABLE "journal_articles_locales" CASCADE;
  DROP TABLE "_journal_articles_v" CASCADE;
  DROP TABLE "_journal_articles_v_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "_testimonials_v_locales" CASCADE;
  DROP TABLE "gallery_items" CASCADE;
  DROP TABLE "gallery_items_locales" CASCADE;
  DROP TABLE "_gallery_items_v" CASCADE;
  DROP TABLE "_gallery_items_v_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_rooms_category";
  DROP TYPE "public"."enum_rooms_status";
  DROP TYPE "public"."enum__rooms_v_version_category";
  DROP TYPE "public"."enum__rooms_v_version_status";
  DROP TYPE "public"."enum__rooms_v_published_locale";
  DROP TYPE "public"."enum_spa_treatments_status";
  DROP TYPE "public"."enum__spa_treatments_v_version_status";
  DROP TYPE "public"."enum__spa_treatments_v_published_locale";
  DROP TYPE "public"."enum_wedding_packages_status";
  DROP TYPE "public"."enum__wedding_packages_v_version_status";
  DROP TYPE "public"."enum__wedding_packages_v_published_locale";
  DROP TYPE "public"."enum_offers_status";
  DROP TYPE "public"."enum__offers_v_version_status";
  DROP TYPE "public"."enum__offers_v_published_locale";
  DROP TYPE "public"."enum_resort_content_kind";
  DROP TYPE "public"."enum_resort_content_status";
  DROP TYPE "public"."enum__resort_content_v_version_kind";
  DROP TYPE "public"."enum__resort_content_v_version_status";
  DROP TYPE "public"."enum__resort_content_v_published_locale";
  DROP TYPE "public"."enum_journal_articles_status";
  DROP TYPE "public"."enum__journal_articles_v_version_status";
  DROP TYPE "public"."enum__journal_articles_v_published_locale";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum__testimonials_v_published_locale";
  DROP TYPE "public"."enum_gallery_items_category";
  DROP TYPE "public"."enum_gallery_items_status";
  DROP TYPE "public"."enum__gallery_items_v_version_category";
  DROP TYPE "public"."enum__gallery_items_v_version_status";
  DROP TYPE "public"."enum__gallery_items_v_published_locale";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum__site_settings_v_published_locale";`)
}
