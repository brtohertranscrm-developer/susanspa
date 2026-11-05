import type { File as ImageKitFile } from '@imagekit/nodejs/resources/files/files'
import { createLocalReq, type Payload } from 'payload'

export type MediaReference = { id: string | number; imagekitFileId?: string | null; url?: string | null; filename?: string | null }
type MediaData = {
  alt: string
  imagekitFileId: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  focalX: number
  focalY: number
  width?: number
  height?: number
}

export type MediaReconciliationPlan = {
  existing: number
  candidates: MediaData[]
  skipped: Array<{ fileId?: string; name?: string; reason: string }>
}

const FOLDERS = ['/susanspa/', '/SUSAN SPA/']
const MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/tiff', 'image/svg+xml', 'video/mp4', 'video/webm'])

function canonicalUrl(value?: string | null) {
  if (!value) return ''
  const url = new URL(value)
  return `${url.origin}${decodeURIComponent(url.pathname)}`
}

export async function listImageKitMedia(list: (options: { type: 'file'; limit: number; skip: number; sort: 'ASC_CREATED' }) => Promise<ImageKitFile[]>) {
  const files: ImageKitFile[] = []
  const seen = new Set<string>()
  for (let skip = 0; ; skip += 100) {
    const page = await list({ type: 'file', limit: 100, skip, sort: 'ASC_CREATED' })
    for (const file of page) {
      if (!file.fileId || seen.has(file.fileId)) throw new Error('ImageKit inventory changed or contains duplicate IDs; run again')
      seen.add(file.fileId)
      files.push(file)
    }
    if (page.length < 100) return files
    if (skip >= 99_900) throw new Error('ImageKit inventory exceeds reconciliation safety limit')
  }
}

export function planMediaReconciliation(files: ImageKitFile[], media: MediaReference[], endpoint: string): MediaReconciliationPlan {
  const base = new URL(endpoint)
  if (base.protocol !== 'https:' || base.username || base.password) throw new Error('ImageKit endpoint must be a public HTTPS URL')
  const prefix = decodeURIComponent(base.pathname).replace(/\/$/, '')
  const ids = new Set(media.map(doc => doc.imagekitFileId).filter(Boolean))
  const urls = new Set(media.map(doc => canonicalUrl(doc.url)).filter(Boolean))
  const names = new Set(media.map(doc => doc.filename).filter(Boolean))
  const plan: MediaReconciliationPlan = { existing: media.length, candidates: [], skipped: [] }
  for (const file of files) {
    const skip = (reason: string) => plan.skipped.push({ fileId: file.fileId, name: file.name, reason })
    if (!file.filePath || !FOLDERS.some(folder => file.filePath!.startsWith(folder))) { skip('outside-susan-folders'); continue }
    if (file.type !== 'file' || file.isPrivateFile !== false || file.isPublished !== true) { skip('not-public-file'); continue }
    if (!file.fileId || !file.name || !file.url || !file.mime || !MIME_TYPES.has(file.mime) || !Number.isFinite(file.size) || file.size! <= 0) { skip('invalid-metadata'); continue }
    const url = new URL(file.url)
    if (url.protocol !== 'https:' || url.origin !== base.origin || url.username || url.password || decodeURIComponent(url.pathname) !== `${prefix}${file.filePath}`) { skip('unexpected-url'); continue }
    if (ids.has(file.fileId) || urls.has(canonicalUrl(file.url))) { skip('already-registered'); continue }
    if (names.has(file.name)) { skip('filename-conflict'); continue }
    const data: MediaData = {
      alt: file.description?.trim() || file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
      imagekitFileId: file.fileId,
      url: file.url,
      filename: file.name,
      mimeType: file.mime,
      filesize: file.size!,
      focalX: 50,
      focalY: 50,
    }
    if (Number.isFinite(file.width) && file.width! > 0) data.width = file.width
    if (Number.isFinite(file.height) && file.height! > 0) data.height = file.height
    plan.candidates.push(data)
    ids.add(file.fileId)
    urls.add(canonicalUrl(file.url))
    names.add(file.name)
  }
  return plan
}

export async function applyMediaReconciliation(payload: Payload, plan: MediaReconciliationPlan) {
  const upload = payload.collections.media.config.upload
  if (!upload || upload.filesRequiredOnCreate !== false) throw new Error('Use the isolated reconciliation config; normal media uploads must still require files')
  const req = await createLocalReq({}, payload)
  const transactionID = await payload.db.beginTransaction()
  if (!transactionID) throw new Error('Media reconciliation requires database transactions')
  req.transactionID = transactionID
  const created: Array<string | number> = []
  try {
    const current = await payload.count({ collection: 'media', overrideAccess: true, req })
    if (current.totalDocs !== plan.existing) throw new Error('CMS inventory changed; generate a new plan')
    const cleanup = await payload.find({ collection: 'payload-jobs', overrideAccess: true, req, pagination: false, depth: 0,
      where: { and: [{ taskSlug: { equals: 'delete-imagekit-file' } }, { completedAt: { exists: false } }] },
    })
    const pendingDeletion = new Set(cleanup.docs.map(job => (job.input as { fileId?: string } | undefined)?.fileId))
    for (const data of plan.candidates) {
      if (pendingDeletion.has(data.imagekitFileId)) throw new Error(`Pending cleanup for ${data.filename}; review before importing`)
      const matches = await payload.find({ collection: 'media', overrideAccess: true, req, limit: 1, depth: 0,
        where: { or: [{ imagekitFileId: { equals: data.imagekitFileId } }, { url: { equals: data.url } }, { filename: { equals: data.filename } }] },
      })
      if (matches.totalDocs > 0) throw new Error(`Media conflict for ${data.filename}; generate a new plan`)
      const doc = await payload.create({ collection: 'media', overrideAccess: true, req, locale: 'id', data })
      created.push(doc.id)
    }
    await payload.db.commitTransaction(transactionID)
    return created
  } catch (error) {
    await payload.db.rollbackTransaction(transactionID)
    throw error
  }
}
