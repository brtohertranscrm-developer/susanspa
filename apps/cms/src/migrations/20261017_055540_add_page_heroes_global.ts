import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_heroes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about_id" integer,
  	"events_id" integer,
  	"ballroom_id" integer,
  	"dining_id" integer,
  	"experiences_id" integer,
  	"facilities_id" integer,
  	"gallery_id" integer,
  	"nearby_id" integer,
  	"offers_id" integer,
  	"rooms_id" integer,
  	"spa_id" integer,
  	"wedding_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_about_id_media_id_fk" FOREIGN KEY ("about_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_events_id_media_id_fk" FOREIGN KEY ("events_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_ballroom_id_media_id_fk" FOREIGN KEY ("ballroom_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_dining_id_media_id_fk" FOREIGN KEY ("dining_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_experiences_id_media_id_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_facilities_id_media_id_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_gallery_id_media_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_nearby_id_media_id_fk" FOREIGN KEY ("nearby_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_offers_id_media_id_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_rooms_id_media_id_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_spa_id_media_id_fk" FOREIGN KEY ("spa_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_wedding_id_media_id_fk" FOREIGN KEY ("wedding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_heroes_about_idx" ON "page_heroes" USING btree ("about_id");
  CREATE INDEX "page_heroes_events_idx" ON "page_heroes" USING btree ("events_id");
  CREATE INDEX "page_heroes_ballroom_idx" ON "page_heroes" USING btree ("ballroom_id");
  CREATE INDEX "page_heroes_dining_idx" ON "page_heroes" USING btree ("dining_id");
  CREATE INDEX "page_heroes_experiences_idx" ON "page_heroes" USING btree ("experiences_id");
  CREATE INDEX "page_heroes_facilities_idx" ON "page_heroes" USING btree ("facilities_id");
  CREATE INDEX "page_heroes_gallery_idx" ON "page_heroes" USING btree ("gallery_id");
  CREATE INDEX "page_heroes_nearby_idx" ON "page_heroes" USING btree ("nearby_id");
  CREATE INDEX "page_heroes_offers_idx" ON "page_heroes" USING btree ("offers_id");
  CREATE INDEX "page_heroes_rooms_idx" ON "page_heroes" USING btree ("rooms_id");
  CREATE INDEX "page_heroes_spa_idx" ON "page_heroes" USING btree ("spa_id");
  CREATE INDEX "page_heroes_wedding_idx" ON "page_heroes" USING btree ("wedding_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "page_heroes" CASCADE;`)
}
