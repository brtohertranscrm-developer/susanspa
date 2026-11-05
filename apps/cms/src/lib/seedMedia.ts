import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Payload } from 'payload'
import sharp from 'sharp'

const publicDirectory = path.resolve(fileURLToPath(new URL('../../../web/public/', import.meta.url)))
const MAX_BYTES = 20 * 1024 * 1024

async function readSource(source: string): Promise<Buffer> {
  if (source.startsWith('/')) {
    const filename = path.resolve(publicDirectory, `.${source}`)
    if (!filename.startsWith(`${publicDirectory}${path.sep}`)) throw new Error('Seed media path escapes public directory')
    const data = await readFile(filename)
    if (data.length > MAX_BYTES) throw new Error('Seed image exceeds 20 MB')
    return data
  }
  const url = new URL(source)
  if (url.protocol !== 'https:') throw new Error('Seed image must use HTTPS')
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!response.ok || !response.body) throw new Error(`Seed image download failed: HTTP ${response.status}`)
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) break
      size += chunk.value.byteLength
      if (size > MAX_BYTES) throw new Error('Seed image exceeds 20 MB')
      chunks.push(chunk.value)
    }
  } finally {
    await reader.cancel()
  }
  return Buffer.concat(chunks)
}

export async function getOrCreateSeedMedia(payload: Payload, source: string, alt: string) {
  const existing = await payload.find({
    collection: 'media',
    where: { or: [{ seedSource: { equals: source } }, { url: { equals: source } }] },
    limit: 1,
    overrideAccess: true,
  })
  const previous = existing.docs[0]
  if (previous?.imagekitFileId && previous.url) return previous.id
  const data = await readSource(source)
  const metadata = await sharp(data).metadata()
  const format = metadata.format === 'heif' && metadata.compression === 'av1' ? 'avif' : metadata.format
  if (!format || !['jpeg', 'png', 'webp', 'avif', 'gif', 'tiff'].includes(format)) throw new Error('Unsupported seed image format')
  const file = {
    data,
    size: data.length,
    mimetype: `image/${format}`,
    name: `seed-${createHash('sha256').update(source).digest('hex').slice(0, 16)}.${format}`,
  }
  const input = { collection: 'media' as const, overrideAccess: true, data: { alt, seedSource: source }, file }
  const created = previous
    ? await payload.update({ ...input, id: previous.id })
    : await payload.create(input)
  return created.id
}
