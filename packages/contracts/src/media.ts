export interface MediaDimensions {
  width?: number | null
  height?: number | null
}

export function imageKitImageUrl(url: string, dimensions: MediaDimensions = {}, thumbnailWidth?: number): string {
  try {
    const parsed = new URL(url)
    if (parsed.hostname !== 'ik.imagekit.io' || !['https:', 'http:'].includes(parsed.protocol)) return url

    if (thumbnailWidth) {
      parsed.searchParams.set('tr', `w-${thumbnailWidth}`)
      return parsed.toString()
    }

    const pixels = (dimensions.width || 0) * (dimensions.height || 0)
    if (pixels <= 25_000_000 || parsed.searchParams.has('tr') || parsed.pathname.includes('/tr:')) return url

    parsed.searchParams.set('tr', 'w-2560')
    return parsed.toString()
  } catch {
    return url
  }
}
