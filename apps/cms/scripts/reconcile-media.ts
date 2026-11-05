import { postgresAdapter } from '@payloadcms/db-postgres'
import nextEnv from '@next/env'
import { getPayload } from 'payload'
import { applyMediaReconciliation, listImageKitMedia, planMediaReconciliation, type MediaReference } from '../src/lib/mediaReconciliation'
import { getImageKit } from '../src/lib/imagekit'

async function main() {
  nextEnv.loadEnvConfig(process.cwd())
  const args = process.argv.slice(2)
  if (args.some(arg => !['--apply', '--dry-run'].includes(arg)) || (args.includes('--apply') && args.includes('--dry-run'))) {
    throw new Error('Usage: npm run media:reconcile -w @susan/cms -- [--dry-run | --apply]')
  }
  const cmsUrl = process.env.CMS_PUBLIC_URL
  const endpoint = process.env.IMAGEKIT_URL_ENDPOINT
  if (!cmsUrl || !endpoint) throw new Error('CMS_PUBLIC_URL and IMAGEKIT_URL_ENDPOINT are required')
  const media: MediaReference[] = []
  for (let page = 1; ; page += 1) {
    const url = new URL('/api/media', cmsUrl)
    url.search = new URLSearchParams({ limit: '100', page: String(page), depth: '0', sort: 'id' }).toString()
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(15_000) })
    if (!response.ok) throw new Error(`CMS inventory failed: HTTP ${response.status}`)
    const result = await response.json()
    media.push(...result.docs)
    if (!result.hasNextPage) {
      if (media.length !== result.totalDocs) throw new Error('CMS inventory changed; run again')
      break
    }
    if (page >= 1000) throw new Error('CMS inventory exceeds reconciliation safety limit')
  }
  const client = getImageKit()
  const files = await listImageKitMedia(options => client.assets.list(options))
  const plan = planMediaReconciliation(files, media, endpoint)
  console.log(JSON.stringify({ mode: args.includes('--apply') ? 'apply' : 'dry-run', ...plan }, null, 2))
  if (!args.includes('--apply') || plan.candidates.length === 0) return
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) throw new Error('Apply requires explicit DATABASE_URL and PAYLOAD_SECRET for the target CMS')
  const { default: config } = await import('../src/payload.config')
  const isolatedConfig = await config
  isolatedConfig.jobs.autoRun = []
  isolatedConfig.db.init = postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL }, push: false }).init
  const collection = isolatedConfig.collections.find(collection => collection.slug === 'media')!
  collection.upload = { ...collection.upload, filesRequiredOnCreate: false }
  const payload = await getPayload({ config: isolatedConfig })
  try {
    const local = await payload.find({ collection: 'media', pagination: false, depth: 0, sort: 'id', overrideAccess: true })
    const identity = (docs: typeof media) => JSON.stringify(docs.map(doc => [doc.id, doc.imagekitFileId, doc.filename, doc.url?.split('?')[0]]))
    if (identity(local.docs) !== identity(media)) throw new Error('DATABASE_URL does not match the live CMS inventory; no media imported')
    const created = await applyMediaReconciliation(payload, plan)
    console.log(JSON.stringify({ imported: created.length, ids: created }))
  } finally {
    await payload.destroy()
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : 'Media reconciliation failed')
  process.exitCode = 1
})
