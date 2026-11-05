import assert from 'node:assert/strict'
import test from 'node:test'
import type { BasePayload, Field, PayloadRequest } from 'payload'
import { publicPublishedOrEditor } from '../src/access'
import { SiteSettings } from '../src/globals/SiteSettings'
import { Media } from '../src/collections/Media'
import { getContentStatus } from '../src/lib/contentStatus'
import { createPagePreviewToken, pagePreviewEndpoint, pagePreviewUrl, verifyPagePreviewToken } from '../src/lib/pagePreview'

const request = (values: Record<string, unknown> = {}) => ({ user: null, ...values }) as unknown as PayloadRequest

test('anonymous reads constrain both published globals and collection draft queries', async () => {
  assert.equal(SiteSettings.access?.read, publicPublishedOrEditor)
  assert.deepEqual(await publicPublishedOrEditor({ req: request() }), { _status: { equals: 'published' } })
  assert.equal(await publicPublishedOrEditor({ req: request({ user: { id: 1, roles: ['content-editor'] } }) }), true)
  assert.deepEqual(await publicPublishedOrEditor({ req: request({ user: { id: 2, roles: [] } }) }), { _status: { equals: 'published' } })
})

test('technical media fields deny client writes for both editors and admins', async () => {
  const flatten = (fields: Field[]): Field[] => fields.flatMap(field => 'fields' in field ? flatten(field.fields) : [field])
  const fields = flatten(Media.fields).filter(field => 'name' in field && ['url', 'imagekitFileId'].includes(field.name))
  assert.equal(fields.length, 2)
  for (const field of fields) {
    if (!('access' in field)) assert.fail('Missing field access')
    for (const role of ['content-admin', 'content-editor']) {
      const args = { req: request({ user: { id: 1, roles: [role] } }), data: {}, siblingData: {} }
      assert.equal(await field.access?.create?.(args), false)
      assert.equal(await field.access?.update?.(args), false)
    }
  }
})

test('preview tokens expire, reject tampering, and are scoped to page and locale', () => {
  const now = 1_800_000_000_000
  const token = createPagePreviewToken('42', 'id', 'test-secret', now)
  assert.equal(verifyPagePreviewToken('42', 'id', token, 'test-secret', now), true)
  assert.equal(verifyPagePreviewToken('43', 'id', token, 'test-secret', now), false)
  assert.equal(verifyPagePreviewToken('42', 'en', token, 'test-secret', now), false)
  assert.equal(verifyPagePreviewToken('42', 'id', token, 'wrong-secret', now), false)
  assert.equal(verifyPagePreviewToken('42', 'id', token, 'test-secret', now + 300_000), false)
  assert.equal(verifyPagePreviewToken('42', 'id', `${token}x`, 'test-secret', now), false)
})

test('only an authenticated editor can generate a saved-page preview URL', async () => {
  assert.equal(await pagePreviewUrl({ id: 42 }, { req: request(), locale: 'id', token: null }), null)
  const req = request({ user: { id: 1, roles: ['content-editor'] }, payload: { secret: 'test-secret' } })
  assert.equal(await pagePreviewUrl({}, { req, locale: 'id', token: null }), null)
  const url = new URL((await pagePreviewUrl({ id: 42 }, { req, locale: 'en', token: null }))!)
  assert.equal(url.pathname, '/preview/pages/42')
  assert.equal(verifyPagePreviewToken('42', 'en', url.searchParams.get('token')!, 'test-secret'), true)
})

test('preview endpoint denies unsigned requests before reading any document', async () => {
  let read = false
  const req = request({ routeParams: { id: '42' }, query: {}, headers: new Headers(), payload: { secret: 'test-secret', findByID: async () => { read = true } } })
  const response = await pagePreviewEndpoint.handler(req)
  assert.equal(response.status, 403)
  assert.equal(read, false)
  assert.match(response.headers.get('Cache-Control')!, /no-store/)
})

test('preview endpoint reads a draft only with a valid scoped token', async () => {
  const token = createPagePreviewToken('42', 'id', 'test-secret')
  const req = request({ routeParams: { id: '42' }, query: { locale: 'id' }, headers: new Headers({ Authorization: `Bearer ${token}` }), payload: {
    secret: 'test-secret',
    findByID: async (options: Record<string, unknown>) => {
      assert.equal(options.id, '42')
      assert.equal(options.draft, true)
      assert.equal(options.collection, 'pages')
      return { id: 42, title: 'Unpublished draft' }
    },
  } })
  const response = await pagePreviewEndpoint.handler(req)
  assert.equal(response.status, 200)
  assert.equal((await response.json()).title, 'Unpublished draft')
})

test('dashboard counts all pages for both status and English completeness', async () => {
  const payload = {
    find: async ({ collection, limit, page, locale }: { collection: string; limit: number; page: number; locale: string }) => {
      const docs = collection === 'rooms' ? Array.from({ length: 201 }, (_, index) => ({ id: index + 1, name: `${locale} Room ${index + 1}`, _status: 'published', images: [], updatedAt: new Date().toISOString() })) : []
      return { docs: docs.slice((page - 1) * limit, page * limit), hasNextPage: page * limit < docs.length, nextPage: page + 1 }
    },
    count: async () => ({ totalDocs: 3 }),
  } as unknown as BasePayload
  const status = await getContentStatus(payload)
  assert.equal(status.summaries.find(source => source.collection === 'rooms')?.total, 201)
  assert.equal(status.summaries.find(source => source.collection === 'rooms')?.published, 201)
  assert.equal(status.attention.length, 201)
  assert.equal(status.attention.at(-1)?.hasEnglish, true)
})
