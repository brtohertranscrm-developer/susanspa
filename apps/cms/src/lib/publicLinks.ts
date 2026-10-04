const webUrl = (process.env.WEB_URL || 'http://localhost:3000').replace(/\/$/, '')

type Doc = Record<string, unknown>

const paths: Record<string, (doc: Doc) => string | null> = {
  rooms: (doc) => `/rooms/${doc.slug}`,
  'spa-treatments': () => '/spa',
  'wedding-packages': () => '/wedding',
  offers: () => '/offers',
  'journal-articles': () => '/journal',
  'gallery-items': () => '/gallery',
  'resort-content': (doc) => {
    switch (doc.kind) {
      case 'facility':
        return '/facilities'
      case 'dining':
        return '/dining'
      case 'experience':
        return '/experiences'
      case 'nearby':
        return '/nearby'
      default:
        return null
    }
  },
}

// Website hanya menampilkan konten berstatus terbit, jadi tombol pratinjau hanya muncul untuk konten yang sudah terbit.
export const previewUrl =
  (collection: string) =>
  (doc: Doc): string | null => {
    if (doc._status !== 'published') return null
    const path = paths[collection]?.(doc)
    return path ? `${webUrl}${path}` : null
  }

export { webUrl }
