import type { Payload, PayloadRequest, TaskConfig } from 'payload'
import { getImageKit } from './imagekit'

export const MEDIA_CLEANUP_QUEUE = 'media-cleanup'
const CLEANUP_DELAY_MS = 15 * 60 * 1000

export async function queueMediaCleanup(payload: Payload, fileId: string, req?: PayloadRequest) {
  return payload.jobs.queue({
    task: 'delete-imagekit-file',
    queue: MEDIA_CLEANUP_QUEUE,
    input: { fileId },
    waitUntil: new Date(Date.now() + CLEANUP_DELAY_MS),
    req,
  })
}

export const deleteImageKitFile: TaskConfig<{ input: { fileId: string }; output: Record<string, never> }> = {
  slug: 'delete-imagekit-file',
  inputSchema: [{ name: 'fileId', type: 'text', required: true }],
  retries: { attempts: 10, backoff: { type: 'exponential', delay: 60_000 } },
  handler: async ({ input, req }) => {
    const references = await req.payload.count({ collection: 'media', where: { imagekitFileId: { equals: input.fileId } }, overrideAccess: true })
    if (references.totalDocs > 0) return { output: {} }
    try {
      await getImageKit().files.delete(input.fileId)
    } catch (error) {
      if (!(error instanceof Error && 'status' in error && error.status === 404)) throw error
    }
    return { output: {} }
  },
}
