import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "offers" ADD COLUMN "schedule_enabled" boolean DEFAULT false;
  ALTER TABLE "_offers_v" ADD COLUMN "version_schedule_enabled" boolean DEFAULT false;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "offers" DROP COLUMN "schedule_enabled";
  ALTER TABLE "_offers_v" DROP COLUMN "version_schedule_enabled";`)
}
