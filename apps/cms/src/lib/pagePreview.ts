import { createHmac, timingSafeEqual } from 'node:crypto'
import type { Endpoint, GeneratePreviewURL } from 'payload'
import { canManageContent } from '../access'
import { webUrl } from './publicLinks'

const PREVIEW_SECONDS = 300
const signatureFor = (id: string, locale: string, expires: string, secret: string) =>
  createHmac('sha256', secret).update(`pages:${id}:${locale}:${expires}`).digest('base64url')

export function createPagePreviewToken(id: string, locale: string, secret: string, now = Date.now()): string {
  const expires = String(Math.floor(now / 1000) + PREVIEW_SECONDS)
  return `${expires}.${signatureFor(id, locale, expires, secret)}`
}

export function verifyPagePreviewToken(id: string, locale: string, token: string, secret: string, now = Date.now()): boolean {
  const match = /^(\d+)\.([A-Za-z0-9_-]{43})$/.exec(token)
  if (!match || Number(match[1]) <= Math.floor(now / 1000)) return false
  const expected = Buffer.from(signatureFor(id, locale, match[1], secret))
  const actual = Buffer.from(match[2])
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export const pagePreviewUrl: GeneratePreviewURL = async (doc, { req, locale }) => {
  if (!doc.id || !await canManageContent({ req })) return null
  const language = locale === 'en' ? 'en' : 'id'
  const id = String(doc.id)
  const query = new URLSearchParams({ token: createPagePreviewToken(id, language, req.payload.secret), locale: language })
  return `${webUrl}/preview/pages/${encodeURIComponent(id)}?${query}`
}

export const pagePreviewEndpoint: Endpoint = {
  path: '/:id/preview',
  method: 'get',
  handler: async (req) => {
    const id = String(req.routeParams?.id ?? '')
    const locale = req.query.locale === 'en' ? 'en' : 'id'
    const authorization = req.headers.get('authorization') ?? ''
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
    const headers = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer' }
    if (!/^\d+$/.test(id) || !verifyPagePreviewToken(id, locale, token, req.payload.secret)) {
      return Response.json({ error: 'Pratinjau tidak valid atau sudah kedaluwarsa.' }, { status: 403, headers })
    }
    try {
      const doc = await req.payload.findByID({ collection: 'pages', id, locale, draft: true, depth: 1, overrideAccess: true, req })
      return Response.json(doc, { headers })
    } catch {
      return Response.json({ error: 'Halaman tidak ditemukan.' }, { status: 404, headers })
    }
  },
}
