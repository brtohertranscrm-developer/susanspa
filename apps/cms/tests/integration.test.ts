import assert from 'node:assert/strict'
import test from 'node:test'
import sharp from 'sharp'
import type { PostgresAdapter } from '@payloadcms/db-postgres'

const databaseUrl = process.env.CMS_TEST_DATABASE_URL

test('isolated CMS REST permissions, publishing, localization, versions and media lifecycle', { skip: !databaseUrl }, async (suite) => {
  const database = new URL(databaseUrl!)
  assert.ok(['127.0.0.1', 'localhost'].includes(database.hostname))
  assert.match(database.pathname, /^\/susan_cms_test(?:_|$)/)
  process.env.DATABASE_URL = databaseUrl
  process.env.PAYLOAD_SECRET = 'isolated-integration-test-secret'
  process.env.IMAGEKIT_PRIVATE_KEY = 'isolated-fake-key'
  Object.assign(process.env, { NODE_ENV: 'test' })
  const originalFetch = globalThis.fetch
  const deletedFiles: string[] = []
  let uploadCount = 0
  let failUploads = false
  let failDeletes = false
  let seedImage: Buffer | undefined
  const suffix = `${Date.now()}`
  const fileId = (index: number) => `fake-${suffix}-${index}`
  globalThis.fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input))
    if (url.hostname === 'seed.example.test' && seedImage) return new Response(new Uint8Array(seedImage))
    assert.ok(['upload.imagekit.io', 'api.imagekit.io'].includes(url.hostname), `Unexpected network call: ${url.hostname}`)
    if (init?.method === 'DELETE') {
      if (url.pathname.endsWith('/already-missing')) return Response.json({ message: 'Not found' }, { status: 404 })
      if (failDeletes) return Response.json({ message: 'Isolated delete failure' }, { status: 400 })
      deletedFiles.push(url.pathname.split('/').at(-1)!)
      return new Response(null, { status: 204 })
    }
    if (failUploads) return Response.json({ message: 'Isolated provider failure' }, { status: 400 })
    uploadCount += 1
    return Response.json({ fileId: fileId(uploadCount), name: `test-${suffix}-${uploadCount}.png`, url: `https://ik.imagekit.io/test/test-${suffix}-${uploadCount}.png`, width: 2, height: 2, size: 100 })
  }
  const { getPayload, handleEndpoints } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const testConfig = await config
  testConfig.jobs.autoRun = []
  const sentEmails: Array<{ html: string; to: unknown }> = []
  testConfig.email = () => ({
    name: 'isolated-mailbox',
    defaultFromAddress: 'no-reply@example.test',
    defaultFromName: 'Test CMS',
    sendEmail: async message => { sentEmails.push({ html: String(message.html), to: message.to }) },
  })
  const createAdapter = testConfig.db.init
  testConfig.db.init = (args) => {
    const adapter = createAdapter(args) as PostgresAdapter
    adapter.pool = new adapter.pg!.Pool(adapter.poolOptions)
    return adapter
  }
  const payload = await getPayload({ config })
  const password = 'Isolated-test-password-3585!'
  const api = async (path: string, method = 'GET', data?: Record<string, unknown> | FormData, token?: string) => {
    const headers = new Headers()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (data && !(data instanceof FormData)) headers.set('Content-Type', 'application/json')
    return handleEndpoints({ config, request: new Request(`http://localhost:3001/api/${path}`, {
      method, headers, body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    }) })
  }
  try {
    const admin = await payload.create({ collection: 'users', data: { email: `admin-${suffix}@example.test`, password, fullName: 'Test Admin', roles: ['content-admin'] } })
    const editor = await payload.create({ collection: 'users', data: { email: `editor-${suffix}@example.test`, password, fullName: 'Test Editor', roles: ['content-editor'] } })
    const login = await api('users/login', 'POST', { email: editor.email, password })
    assert.equal(login.status, 200)
    const { token } = await login.json()

    await suite.test('anonymous and editor access cannot create users or escalate roles', async () => {
      const data = { email: `intruder-${suffix}@example.test`, password, fullName: 'Intruder', roles: ['content-admin'] }
      assert.equal((await api('users', 'POST', data)).status, 403)
      assert.equal((await api('users', 'POST', data, token)).status, 403)
      await api(`users/${editor.id}`, 'PATCH', { roles: ['content-admin'] }, token)
      const unchanged = await payload.findByID({ collection: 'users', id: editor.id })
      assert.deepEqual(unchanged.roles, ['content-editor'])
      assert.notEqual((await api(`users/${admin.id}`, 'GET', undefined, token)).status, 200)
      assert.equal((await api('payload-jobs', 'POST', { taskSlug: 'delete-imagekit-file', input: { fileId: 'attacker-id' } }, token)).status, 403)
    })

    await suite.test('published globals never expose subsequent drafts to anonymous readers', async () => {
      assert.equal((await api('globals/site-settings', 'POST', { resortName: 'Published Resort', address: 'Published address', _status: 'published' }, token)).status, 200)
      assert.equal((await api('globals/site-settings?draft=true', 'POST', { resortName: 'Secret Draft Resort', address: 'Secret draft address', _status: 'draft' }, token)).status, 200)
      for (const query of ['draft=false', 'draft=true']) {
        const response = await api(`globals/site-settings?${query}`)
        assert.equal(response.status, 200)
        assert.equal((await response.json()).resortName, 'Published Resort')
      }
      assert.equal((await (await api('globals/site-settings?draft=true', 'GET', undefined, token)).json()).resortName, 'Secret Draft Resort')
    })

    let pageId: number
    await suite.test('draft, locale, publish, version restore and unpublish respect public access', async () => {
      const draft = await api('pages?draft=true', 'POST', { title: 'Judul draf', slug: `test-${suffix}`, _status: 'draft' }, token)
      assert.equal(draft.status, 201)
      pageId = (await draft.json()).doc.id
      assert.notEqual((await api(`pages/${pageId}?draft=true`)).status, 200)
      assert.equal((await api(`pages/${pageId}?locale=en&draft=true`, 'PATCH', { title: 'English draft' }, token)).status, 200)
      assert.equal((await (await api(`pages/${pageId}?locale=id&draft=true`, 'GET', undefined, token)).json()).title, 'Judul draf')
      assert.equal((await (await api(`pages/${pageId}?locale=en&draft=true`, 'GET', undefined, token)).json()).title, 'English draft')
      assert.equal((await api(`pages/${pageId}`, 'PATCH', { _status: 'published' }, token)).status, 200)
      assert.equal((await api(`pages/${pageId}`)).status, 200)
      const versions = await payload.findVersions({ collection: 'pages', where: { parent: { equals: pageId } }, sort: '-createdAt' })
      const published = versions.docs.find(version => version.version._status === 'published')!
      assert.ok(published)
      await api(`pages/${pageId}`, 'PATCH', { title: 'Changed title', _status: 'published' }, token)
      const restore = await api(`pages/versions/${published.id}`, 'POST', {}, token)
      assert.equal(restore.status, 200)
      assert.equal((await (await api(`pages/${pageId}`)).json()).title, 'Judul draf')
      assert.equal((await api(`pages/${pageId}`, 'PATCH', { _status: 'draft' }, token)).status, 200)
      assert.notEqual((await api(`pages/${pageId}`)).status, 200)
      const publicPages = await (await api('pages?draft=true')).json()
      assert.ok(!publicPages.docs.some((page: { id: number }) => page.id === pageId))
    })

    await suite.test('preview endpoint accepts only signed page-scoped tokens', async () => {
      const { createPagePreviewToken } = await import('../src/lib/pagePreview')
      assert.equal((await api(`pages/${pageId}/preview`)).status, 403)
      const preview = createPagePreviewToken(String(pageId), 'en', payload.secret)
      const response = await api(`pages/${pageId}/preview?locale=en`, 'GET', undefined, preview)
      assert.equal(response.status, 200)
      assert.equal((await response.json()).title, 'English draft')
      assert.equal(response.headers.get('Cache-Control'), 'private, no-store')
      assert.equal((await api(`pages/${pageId}/preview?locale=id`, 'GET', undefined, preview)).status, 403)
    })

    await suite.test('media upload, replacement, tamper protection and delete use fake provider only', async () => {
      const image = await sharp({ create: { width: 2, height: 2, channels: 3, background: '#112233' } }).png().toBuffer()
      const upload = () => {
        const form = new FormData()
        form.set('_payload', JSON.stringify({ alt: 'Test image', url: 'https://attacker.test/image', imagekitFileId: 'attacker-id' }))
        form.set('file', new Blob([new Uint8Array(image)], { type: 'image/png' }), 'test.png')
        return form
      }
      assert.equal((await api('media', 'POST', upload())).status, 403)
      const response = await api('media', 'POST', upload(), token)
      assert.equal(response.status, 201)
      const { doc: media } = await response.json()
      assert.equal(media.imagekitFileId, fileId(1))
      assert.equal(media.url, `https://ik.imagekit.io/test/test-${suffix}-1.png`)
      const tamper = await api(`media/${media.id}`, 'PATCH', { url: 'https://attacker.test/image', imagekitFileId: 'attacker-id', alt: 'Updated alt' }, token)
      assert.equal(tamper.status, 200)
      const { doc: unchanged } = await tamper.json()
      assert.equal(unchanged.imagekitFileId, fileId(1))
      assert.equal(unchanged.url, media.url)
      assert.equal(unchanged.alt, 'Updated alt')
      failUploads = true
      assert.equal((await api(`media/${media.id}`, 'PATCH', upload(), token)).status, 502)
      failUploads = false
      const preserved = await payload.findByID({ collection: 'media', id: media.id })
      assert.equal(preserved.imagekitFileId, fileId(1))
      assert.equal(preserved.url, media.url)
      const replace = await api(`media/${media.id}`, 'PATCH', upload(), token)
      assert.equal(replace.status, 200)
      const { doc: replacement } = await replace.json()
      assert.equal(replacement.imagekitFileId, fileId(2))
      assert.notEqual(replacement.url, media.url)
      const makeDue = () => payload.update({ collection: 'payload-jobs', where: { queue: { equals: 'media-cleanup' } }, data: { waitUntil: new Date(0).toISOString() } })
      await makeDue()
      await payload.jobs.run({ queue: 'media-cleanup', limit: 100, silent: true })
      assert.ok(deletedFiles.includes(fileId(1)))
      assert.ok(!deletedFiles.includes(fileId(2)))

      const hooks = payload.collections.media.config.hooks.afterChange!
      const failureHook: typeof hooks[number] = () => { throw new Error('Isolated database operation failure') }
      hooks.push(failureHook)
      assert.equal((await api(`media/${media.id}`, 'PATCH', upload(), token)).status, 500)
      hooks.splice(hooks.indexOf(failureHook), 1)
      assert.equal((await payload.findByID({ collection: 'media', id: media.id })).imagekitFileId, fileId(2))
      await makeDue()
      await payload.jobs.run({ queue: 'media-cleanup', limit: 100, silent: true })
      assert.ok(deletedFiles.includes(fileId(3)))
      assert.ok(!deletedFiles.includes(fileId(2)))

      const originalQueue = payload.jobs.queue
      payload.jobs.queue = async () => { throw new Error('Isolated queue failure') }
      try {
        assert.equal((await api(`media/${media.id}`, 'DELETE', undefined, token)).status, 500)
        assert.equal((await payload.findByID({ collection: 'media', id: media.id })).imagekitFileId, fileId(2))
        const nextFile = fileId(uploadCount + 1)
        assert.equal((await api('media', 'POST', upload(), token)).status, 500)
        assert.ok(deletedFiles.includes(nextFile))
      } finally {
        payload.jobs.queue = originalQueue
      }
      const { queueMediaCleanup } = await import('../src/lib/mediaCleanup')
      const absent = await queueMediaCleanup(payload, 'already-missing')
      await makeDue()
      await payload.jobs.run({ queue: 'media-cleanup', limit: 100, silent: true })
      assert.equal((await payload.count({ collection: 'payload-jobs', where: { id: { equals: absent.id } } })).totalDocs, 0)

      assert.equal((await api(`media/${media.id}`, 'DELETE', undefined, token)).status, 200)
      assert.ok(!deletedFiles.includes(fileId(2)))
      failDeletes = true
      await makeDue()
      await payload.jobs.run({ queue: 'media-cleanup', limit: 100, silent: true })
      const pending = await payload.find({ collection: 'payload-jobs', where: { 'input.fileId': { equals: fileId(2) } } })
      assert.ok(pending.docs.some(job => !job.completedAt && (job.totalTried ?? 0) > 0))
      failDeletes = false
      await makeDue()
      await payload.jobs.run({ queue: 'media-cleanup', limit: 100, silent: true })
      assert.ok(deletedFiles.includes(fileId(2)))
      assert.ok(!deletedFiles.includes('attacker-id'))
    })

    await suite.test('seed imports a real local image once and protects its source key from clients', async () => {
      const { getOrCreateSeedMedia } = await import('../src/lib/seedMedia')
      const source = '/images/wedding/wedding-chapel-1.jpg'
      await payload.delete({ collection: 'media', where: { seedSource: { equals: source } } })
      const before = uploadCount
      const first = await getOrCreateSeedMedia(payload, source, 'Seed cover')
      const second = await getOrCreateSeedMedia(payload, source, 'Seed cover')
      assert.equal(first, second)
      assert.equal(uploadCount, before + 1)
      const media = await payload.findByID({ collection: 'media', id: first })
      assert.equal(media.seedSource, source)
      await api(`media/${first}`, 'PATCH', { seedSource: 'attacker-source' }, token)
      assert.equal((await payload.findByID({ collection: 'media', id: first })).seedSource, source)
      await payload.db.updateOne({ collection: 'media', id: first, data: { url: source, imagekitFileId: null, seedSource: null } })
      const beforeRepair = uploadCount
      assert.equal(await getOrCreateSeedMedia(payload, source, 'Repaired seed cover'), first)
      assert.equal(uploadCount, beforeRepair + 1)
      assert.equal((await payload.findByID({ collection: 'media', id: first })).seedSource, source)
      await assert.rejects(() => getOrCreateSeedMedia(payload, '/../secret.png', 'Unsafe path'), /escapes public directory/)
      seedImage = await sharp({ create: { width: 2, height: 2, channels: 3, background: '#112233' } }).avif().toBuffer()
      const remoteSource = `https://seed.example.test/${suffix}.avif`
      const remote = await getOrCreateSeedMedia(payload, remoteSource, 'Remote AVIF seed')
      assert.equal((await payload.findByID({ collection: 'media', id: remote })).mimeType, 'image/avif')
      assert.equal(await getOrCreateSeedMedia(payload, remoteSource, 'Remote AVIF seed'), remote)
    })

    await suite.test('password recovery sends a reset link and rejects expired or reused tokens', async () => {
      assert.equal((await api('users/forgot-password', 'POST', { email: editor.email })).status, 200)
      const message = sentEmails.at(-1)!
      assert.equal(message.to, editor.email)
      const link = new URL(message.html.match(/href="([^"]+)"/)![1])
      assert.equal(link.origin, 'http://localhost:3001')
      const resetToken = link.pathname.split('/').at(-1)!
      const nextPassword = 'Isolated-new-password-3585!'
      assert.equal((await api('users/reset-password', 'POST', { token: resetToken, password: nextPassword })).status, 200)
      assert.notEqual((await api('users/reset-password', 'POST', { token: resetToken, password })).status, 200)
      assert.notEqual((await api('users/login', 'POST', { email: editor.email, password })).status, 200)
      assert.equal((await api('users/login', 'POST', { email: editor.email, password: nextPassword })).status, 200)
      await api('users/forgot-password', 'POST', { email: editor.email })
      const expiredToken = new URL(sentEmails.at(-1)!.html.match(/href="([^"]+)"/)![1]).pathname.split('/').at(-1)!
      await payload.update({ collection: 'users', id: editor.id, data: { resetPasswordExpiration: new Date(0).toISOString() } })
      assert.notEqual((await api('users/reset-password', 'POST', { token: expiredToken, password })).status, 200)
      const count = sentEmails.length
      assert.equal((await api('users/forgot-password', 'POST', { email: `unknown-${suffix}@example.test` })).status, 200)
      assert.equal(sentEmails.length, count)
    })

    await suite.test('invalid scheduled offers are rejected without changing existing manual behavior', async () => {
      const data = { title: 'Scheduled offer', slug: `offer-${suffix}`, scheduleEnabled: true, validFrom: '2026-11-06T00:00:00Z', validUntil: '2026-11-05T00:00:00Z', _status: 'published' }
      assert.equal((await api('offers', 'POST', data, token)).status, 400)
      assert.equal((await api('offers', 'POST', { ...data, scheduleEnabled: false }, token)).status, 201)
    })
  } finally {
    await payload.destroy()
    await payload.db.pool.end()
    globalThis.fetch = originalFetch
  }
})
