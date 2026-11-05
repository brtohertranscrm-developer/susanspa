import ImageKit from '@imagekit/nodejs'
import { APIError } from 'payload'

let imagekit: ImageKit | null = null

export function getImageKit() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  if (!privateKey) throw new APIError('IMAGEKIT_PRIVATE_KEY belum diatur di server.', 500, undefined, true)
  imagekit ??= new ImageKit({ privateKey })
  return imagekit
}
