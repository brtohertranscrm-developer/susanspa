import assert from 'node:assert/strict'
import test from 'node:test'
import type { Payload } from 'payload'
import type { File as ImageKitFile } from '@imagekit/nodejs/resources/files/files'
import { en } from '@payloadcms/translations/languages/en'
import { applyMediaReconciliation, listImageKitMedia, planMediaReconciliation } from '../src/lib/mediaReconciliation'

const endpoint = 'https://ik.imagekit.io/test/'
const asset = (overrides: Partial<ImageKitFile> = {}): ImageKitFile => ({
  type: 'file', fileId: 'file-1', name: 'room.avif', filePath: '/SUSAN SPA/room.avif',
  url: `${endpoint}SUSAN%20SPA/room.avif`, isPrivateFile: false, isPublished: true,
  mime: 'image/avif', size: 2048, width: 8000, height: 6000, ...overrides,
})

test('inventory traverses every provider page, not only the first 100 files', async () => {
  const offsets: number[] = []
  const files = await listImageKitMedia(async ({ skip }) => {
    offsets.push(skip)
    return Array.from({ length: skip < 200 ? 100 : 6 }, (_, index) => asset({ fileId: `id-${skip + index}` }))
  })
  assert.deepEqual(offsets, [0, 100, 200])
  assert.equal(files.length, 206)
})

test('repeated provider pages abort rather than silently hiding files', async () => {
  await assert.rejects(listImageKitMedia(async () => Array.from({ length: 100 }, () => asset())), /duplicate IDs/)
})

test('planning preserves provider identity and original URLs without requiring image bytes', () => {
  const plan = planMediaReconciliation([asset()], [], endpoint)
  assert.equal(plan.candidates.length, 1)
  assert.equal(plan.candidates[0].imagekitFileId, 'file-1')
  assert.equal(plan.candidates[0].url, asset().url)
  assert.equal(plan.candidates[0].width, 8000)
  assert.equal(plan.candidates[0].mimeType, 'image/avif')
  assert.equal(plan.candidates[0].alt, 'room')
})

test('planning excludes samples, private assets, unpublished files, wrong hosts and unsupported formats', () => {
  const invalid = [
    asset({ filePath: '/default-image.jpg' }), asset({ isPrivateFile: true }), asset({ isPrivateFile: undefined }),
    asset({ isPublished: false }), asset({ url: 'https://example.test/room.avif' }),
    asset({ url: `${endpoint}susanspa/other.avif` }), asset({ mime: 'application/pdf' }),
    asset({ type: 'file-version' }), asset({ size: 0 }),
  ]
  const plan = planMediaReconciliation(invalid, [], endpoint)
  assert.equal(plan.candidates.length, 0)
  assert.equal(plan.skipped.length, invalid.length)
})

test('planning deduplicates IDs, transformed URLs, filenames and repeated inventory entries', () => {
  for (const existing of [
    { id: 7, imagekitFileId: 'file-1' },
    { id: 7, url: `${asset().url}?tr=w-2560` },
    { id: 7, filename: 'room.avif' },
  ]) assert.equal(planMediaReconciliation([asset()], [existing], endpoint).candidates.length, 0)
  assert.equal(planMediaReconciliation([asset(), asset()], [], endpoint).candidates.length, 1)
})

function fakePayload({ failCreate = false, pending = false, existing = 0, fileRequired = false } = {}) {
  const events: string[] = []
  const payload = {
    collections: { media: { config: { upload: { filesRequiredOnCreate: fileRequired } } } },
    db: {
      beginTransaction: async () => { events.push('begin'); return 'transaction' },
      commitTransaction: async () => { events.push('commit') },
      rollbackTransaction: async () => { events.push('rollback') },
    },
    count: async () => ({ totalDocs: existing }),
    find: async ({ collection }: { collection: string }) => ({ totalDocs: 0, docs: collection === 'payload-jobs' && pending ? [{ input: { fileId: 'file-1' } }] : [] }),
    create: async (options: { file?: unknown; data: Record<string, unknown>; req: { transactionID: string } }) => {
      assert.equal(options.file, undefined)
      assert.equal(options.req.transactionID, 'transaction')
      assert.equal(options.data.imagekitFileId, 'file-1')
      events.push('create')
      if (failCreate) throw new Error('isolated DB failure')
      return { id: 48 }
    },
    config: { localization: false, i18n: { fallbackLanguage: 'en', supportedLanguages: { en } }, routes: { api: '/api' }, serverURL: '', cookiePrefix: 'payload' },
    logger: { error: () => {} },
  } as unknown as Payload
  return { payload, events }
}

test('metadata-only import commits atomically and never supplies an upload file', async () => {
  const { payload, events } = fakePayload()
  assert.deepEqual(await applyMediaReconciliation(payload, planMediaReconciliation([asset()], [], endpoint)), [48])
  assert.deepEqual(events, ['begin', 'create', 'commit'])
})

test('failed import rolls back and pending deletion cannot be resurrected', async () => {
  for (const options of [{ failCreate: true }, { pending: true }, { existing: 1 }]) {
    const { payload, events } = fakePayload(options)
    await assert.rejects(applyMediaReconciliation(payload, planMediaReconciliation([asset()], [], endpoint)))
    assert.equal(events.at(-1), 'rollback')
    assert.equal(events.includes('commit'), false)
    if (options.pending || options.existing) assert.equal(events.includes('create'), false)
  }
})

test('normal application upload configuration is not relaxed for reconciliation', async () => {
  const { payload, events } = fakePayload({ fileRequired: true })
  await assert.rejects(applyMediaReconciliation(payload, planMediaReconciliation([asset()], [], endpoint)), /isolated reconciliation config/)
  assert.deepEqual(events, [])
})
