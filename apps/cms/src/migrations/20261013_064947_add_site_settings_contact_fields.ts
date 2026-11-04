import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "reservation_email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "tiktok_url" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_reservation_email" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_tiktok_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "reservation_email";
  ALTER TABLE "site_settings" DROP COLUMN "tiktok_url";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_reservation_email";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_tiktok_url";`)
}
