import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "website_images_home_poster_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_rooms_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_spa_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_dining_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_facilities_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_wedding_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_wedding_venue_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_wedding_celebration_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_gallery_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_offers_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_experiences_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_nearby_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_about_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_events_hero_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_showcase_spa_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_showcase_wedding_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_showcase_dining_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_showcase_offers_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_logo_gold_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "website_images_logo_dark_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_home_poster_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_rooms_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_spa_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_dining_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_facilities_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_wedding_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_wedding_venue_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_wedding_celebration_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_gallery_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_offers_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_experiences_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_nearby_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_about_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_events_hero_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_showcase_spa_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_showcase_wedding_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_showcase_dining_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_showcase_offers_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_logo_gold_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_website_images_logo_dark_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_home_poster_id_media_id_fk" FOREIGN KEY ("website_images_home_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_rooms_hero_id_media_id_fk" FOREIGN KEY ("website_images_rooms_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_spa_hero_id_media_id_fk" FOREIGN KEY ("website_images_spa_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_dining_hero_id_media_id_fk" FOREIGN KEY ("website_images_dining_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_facilities_hero_id_media_id_fk" FOREIGN KEY ("website_images_facilities_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_wedding_hero_id_media_id_fk" FOREIGN KEY ("website_images_wedding_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_wedding_venue_id_media_id_fk" FOREIGN KEY ("website_images_wedding_venue_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_wedding_celebration_id_media_id_fk" FOREIGN KEY ("website_images_wedding_celebration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_gallery_hero_id_media_id_fk" FOREIGN KEY ("website_images_gallery_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_offers_hero_id_media_id_fk" FOREIGN KEY ("website_images_offers_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_experiences_hero_id_media_id_fk" FOREIGN KEY ("website_images_experiences_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_nearby_hero_id_media_id_fk" FOREIGN KEY ("website_images_nearby_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_about_hero_id_media_id_fk" FOREIGN KEY ("website_images_about_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_events_hero_id_media_id_fk" FOREIGN KEY ("website_images_events_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_showcase_spa_id_media_id_fk" FOREIGN KEY ("website_images_showcase_spa_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_showcase_wedding_id_media_id_fk" FOREIGN KEY ("website_images_showcase_wedding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_showcase_dining_id_media_id_fk" FOREIGN KEY ("website_images_showcase_dining_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_showcase_offers_id_media_id_fk" FOREIGN KEY ("website_images_showcase_offers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_logo_gold_id_media_id_fk" FOREIGN KEY ("website_images_logo_gold_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_website_images_logo_dark_id_media_id_fk" FOREIGN KEY ("website_images_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_home_poster_id_media_id_fk" FOREIGN KEY ("version_website_images_home_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_rooms_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_rooms_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_spa_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_spa_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_dining_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_dining_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_facilities_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_facilities_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_wedding_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_wedding_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_wedding_venue_id_media_id_fk" FOREIGN KEY ("version_website_images_wedding_venue_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_wedding_celebration_id_media_id_fk" FOREIGN KEY ("version_website_images_wedding_celebration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_gallery_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_gallery_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_offers_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_offers_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_experiences_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_experiences_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_nearby_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_nearby_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_about_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_about_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_events_hero_id_media_id_fk" FOREIGN KEY ("version_website_images_events_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_showcase_spa_id_media_id_fk" FOREIGN KEY ("version_website_images_showcase_spa_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_showcase_wedding_id_media_id_fk" FOREIGN KEY ("version_website_images_showcase_wedding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_showcase_dining_id_media_id_fk" FOREIGN KEY ("version_website_images_showcase_dining_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_showcase_offers_id_media_id_fk" FOREIGN KEY ("version_website_images_showcase_offers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_logo_gold_id_media_id_fk" FOREIGN KEY ("version_website_images_logo_gold_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_website_images_logo_dark_id_media_id_fk" FOREIGN KEY ("version_website_images_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_website_images_website_images_home_poster_idx" ON "site_settings" USING btree ("website_images_home_poster_id");
  CREATE INDEX "site_settings_website_images_website_images_rooms_hero_idx" ON "site_settings" USING btree ("website_images_rooms_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_spa_hero_idx" ON "site_settings" USING btree ("website_images_spa_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_dining_hero_idx" ON "site_settings" USING btree ("website_images_dining_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_facilities_h_idx" ON "site_settings" USING btree ("website_images_facilities_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_wedding_hero_idx" ON "site_settings" USING btree ("website_images_wedding_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_wedding_venu_idx" ON "site_settings" USING btree ("website_images_wedding_venue_id");
  CREATE INDEX "site_settings_website_images_website_images_wedding_cele_idx" ON "site_settings" USING btree ("website_images_wedding_celebration_id");
  CREATE INDEX "site_settings_website_images_website_images_gallery_hero_idx" ON "site_settings" USING btree ("website_images_gallery_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_offers_hero_idx" ON "site_settings" USING btree ("website_images_offers_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_experiences__idx" ON "site_settings" USING btree ("website_images_experiences_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_nearby_hero_idx" ON "site_settings" USING btree ("website_images_nearby_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_about_hero_idx" ON "site_settings" USING btree ("website_images_about_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_events_hero_idx" ON "site_settings" USING btree ("website_images_events_hero_id");
  CREATE INDEX "site_settings_website_images_website_images_showcase_spa_idx" ON "site_settings" USING btree ("website_images_showcase_spa_id");
  CREATE INDEX "site_settings_website_images_website_images_showcase_wed_idx" ON "site_settings" USING btree ("website_images_showcase_wedding_id");
  CREATE INDEX "site_settings_website_images_website_images_showcase_din_idx" ON "site_settings" USING btree ("website_images_showcase_dining_id");
  CREATE INDEX "site_settings_website_images_website_images_showcase_off_idx" ON "site_settings" USING btree ("website_images_showcase_offers_id");
  CREATE INDEX "site_settings_website_images_website_images_logo_gold_idx" ON "site_settings" USING btree ("website_images_logo_gold_id");
  CREATE INDEX "site_settings_website_images_website_images_logo_dark_idx" ON "site_settings" USING btree ("website_images_logo_dark_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_website__idx" ON "_site_settings_v" USING btree ("version_website_images_home_poster_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_1_idx" ON "_site_settings_v" USING btree ("version_website_images_rooms_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_2_idx" ON "_site_settings_v" USING btree ("version_website_images_spa_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_3_idx" ON "_site_settings_v" USING btree ("version_website_images_dining_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_4_idx" ON "_site_settings_v" USING btree ("version_website_images_facilities_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_5_idx" ON "_site_settings_v" USING btree ("version_website_images_wedding_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_6_idx" ON "_site_settings_v" USING btree ("version_website_images_wedding_venue_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_7_idx" ON "_site_settings_v" USING btree ("version_website_images_wedding_celebration_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_8_idx" ON "_site_settings_v" USING btree ("version_website_images_gallery_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websit_9_idx" ON "_site_settings_v" USING btree ("version_website_images_offers_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_10_idx" ON "_site_settings_v" USING btree ("version_website_images_experiences_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_11_idx" ON "_site_settings_v" USING btree ("version_website_images_nearby_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_12_idx" ON "_site_settings_v" USING btree ("version_website_images_about_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_13_idx" ON "_site_settings_v" USING btree ("version_website_images_events_hero_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_14_idx" ON "_site_settings_v" USING btree ("version_website_images_showcase_spa_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_15_idx" ON "_site_settings_v" USING btree ("version_website_images_showcase_wedding_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_16_idx" ON "_site_settings_v" USING btree ("version_website_images_showcase_dining_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_17_idx" ON "_site_settings_v" USING btree ("version_website_images_showcase_offers_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_18_idx" ON "_site_settings_v" USING btree ("version_website_images_logo_gold_id");
  CREATE INDEX "_site_settings_v_version_website_images_version_websi_19_idx" ON "_site_settings_v" USING btree ("version_website_images_logo_dark_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_home_poster_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_rooms_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_spa_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_dining_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_facilities_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_wedding_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_wedding_venue_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_wedding_celebration_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_gallery_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_offers_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_experiences_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_nearby_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_about_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_events_hero_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_showcase_spa_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_showcase_wedding_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_showcase_dining_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_showcase_offers_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_logo_gold_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_website_images_logo_dark_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_home_poster_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_rooms_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_spa_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_dining_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_facilities_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_wedding_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_wedding_venue_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_wedding_celebration_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_gallery_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_offers_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_experiences_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_nearby_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_about_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_events_hero_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_showcase_spa_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_showcase_wedding_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_showcase_dining_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_showcase_offers_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_logo_gold_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_website_images_logo_dark_id_media_id_fk";
  
  DROP INDEX "site_settings_website_images_website_images_home_poster_idx";
  DROP INDEX "site_settings_website_images_website_images_rooms_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_spa_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_dining_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_facilities_h_idx";
  DROP INDEX "site_settings_website_images_website_images_wedding_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_wedding_venu_idx";
  DROP INDEX "site_settings_website_images_website_images_wedding_cele_idx";
  DROP INDEX "site_settings_website_images_website_images_gallery_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_offers_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_experiences__idx";
  DROP INDEX "site_settings_website_images_website_images_nearby_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_about_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_events_hero_idx";
  DROP INDEX "site_settings_website_images_website_images_showcase_spa_idx";
  DROP INDEX "site_settings_website_images_website_images_showcase_wed_idx";
  DROP INDEX "site_settings_website_images_website_images_showcase_din_idx";
  DROP INDEX "site_settings_website_images_website_images_showcase_off_idx";
  DROP INDEX "site_settings_website_images_website_images_logo_gold_idx";
  DROP INDEX "site_settings_website_images_website_images_logo_dark_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_website__idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_1_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_2_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_3_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_4_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_5_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_6_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_7_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_8_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websit_9_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_10_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_11_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_12_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_13_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_14_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_15_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_16_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_17_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_18_idx";
  DROP INDEX "_site_settings_v_version_website_images_version_websi_19_idx";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_home_poster_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_rooms_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_spa_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_dining_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_facilities_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_wedding_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_wedding_venue_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_wedding_celebration_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_gallery_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_offers_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_experiences_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_nearby_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_about_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_events_hero_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_showcase_spa_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_showcase_wedding_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_showcase_dining_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_showcase_offers_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_logo_gold_id";
  ALTER TABLE "site_settings" DROP COLUMN "website_images_logo_dark_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_home_poster_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_rooms_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_spa_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_dining_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_facilities_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_wedding_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_wedding_venue_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_wedding_celebration_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_gallery_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_offers_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_experiences_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_nearby_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_about_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_events_hero_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_showcase_spa_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_showcase_wedding_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_showcase_dining_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_showcase_offers_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_logo_gold_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_website_images_logo_dark_id";`)
}
