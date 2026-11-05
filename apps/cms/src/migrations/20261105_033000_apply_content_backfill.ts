import { type GlobalSlug } from 'payload'
import { type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const table = await db.execute(sql`SELECT to_regclass('public.cms_content_backfill') AS name`)
  if (!table.rows[0]?.name) return
  const pending = await db.execute(sql`SELECT "slug", "data" FROM "cms_content_backfill" ORDER BY "slug"`)
  for (const row of pending.rows) {
    await payload.updateGlobal({ slug: row.slug as GlobalSlug, data: row.data as Record<string, unknown>, locale: 'id', req })
  }
  await db.execute(sql`DROP TABLE "cms_content_backfill"`)
}

export async function down(): Promise<void> {}
