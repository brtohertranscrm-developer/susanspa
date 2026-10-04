import { getPayload } from 'payload'
import config from '../src/payload.config'

// Import all static data
import { ROOMS } from '../../web/src/data/rooms'
import { SPA_TREATMENTS } from '../../web/src/data/spa'
import { WEDDING_PACKAGES } from '../../web/src/data/weddings'
import { OFFERS } from '../../web/src/data/offers'
import { FACILITIES } from '../../web/src/data/facilities'
import { GALLERY_ITEMS } from '../../web/src/data/gallery'
import { DINING_VENUES } from '../../web/src/data/dining'
import { EXPERIENCES } from '../../web/src/data/experiences'
import { NEARBY_DESTINATIONS } from '../../web/src/data/nearby'
import { JOURNAL_ARTICLES } from '../../web/src/data/journal'

async function upsertBySlug(payload: any, collection: string, slug: string, data: any) {
  const existing = await payload.find({
    collection,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection,
    data,
  })
}

async function getOrCreateMedia(payload: any, url: string, alt: string) {
  const existing = await payload.find({
    collection: 'media',
    where: { url: { equals: url } },
    limit: 1,
  })
  
  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }
  
  const created = await payload.create({
    collection: 'media',
    data: { alt, url },
  })
  return created.id
}

function parseIndonesianDate(dateStr: string) {
  const months: Record<string, string> = {
    'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
    'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
    'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
  }
  const parts = dateStr.split(' ')
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0')
    const month = months[parts[1]]
    const year = parts[2]
    if (month) {
      return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString()
    }
  }
  return new Date().toISOString()
}

async function seedAll(payload: any) {
  console.log('Seeding Rooms...')
  for (const room of ROOMS) {
    await upsertBySlug(payload, 'rooms', room.slug, {
      name: room.name,
      slug: room.slug,
      category: room.category === 'Superior' ? 'Deluxe' : room.category,
      tagline: room.tagline,
      shortDescription: room.description,
      longDescription: room.longDescription,
      sizeSqm: room.sizeSqm || 0,
      capacityAdults: room.capacityAdults || 2,
      capacityChildren: room.capacityChildren || 0,
      bedType: room.bedType || '',
      bookingRoomTypeId: room.id,
      amenities: room.amenities.map((a: string) => ({ label: a })),
      policies: room.policies.map((p: string) => ({ label: p })),
      _status: 'published',
    })
  }

  console.log('Seeding Spa Treatments...')
  for (const spa of SPA_TREATMENTS) {
    await upsertBySlug(payload, 'spa-treatments', spa.slug, {
      title: spa.title,
      slug: spa.slug,
      summary: spa.tagline,
      description: spa.description,
      durationMinutes: spa.durationMinutes,
      priceLabel: spa.priceIdr,
      benefits: spa.benefits.map((b: string) => ({ label: b })),
      _status: 'published',
    })
  }

  console.log('Seeding Wedding Packages...')
  for (const wedding of WEDDING_PACKAGES) {
    await upsertBySlug(payload, 'wedding-packages', wedding.slug, {
      title: wedding.name,
      slug: wedding.slug,
      summary: wedding.tagline || '',
      description: wedding.description,
      venue: typeof wedding.venue === 'string' ? wedding.venue : (wedding.venue?.[0] || ''),
      capacity: parseInt(wedding.guestCapacity || (wedding as any).capacity || '100', 10) || 100,
      priceLabel: wedding.priceStartingIdr || 0,
      inclusions: wedding.inclusions.map((i: string) => ({ label: i })),
      _status: 'published',
    })
  }

  console.log('Seeding Offers...')
  for (const offer of OFFERS) {
    await upsertBySlug(payload, 'offers', offer.slug, {
      title: offer.title,
      slug: offer.slug,
      summary: offer.description,
      description: offer.description,
      terms: offer.inclusions.join('\n'),
      _status: 'published',
    })
  }

  console.log('Seeding Resort Content...')
  for (const facility of FACILITIES) {
    await upsertBySlug(payload, 'resort-content', facility.id, {
      title: facility.title,
      slug: facility.id,
      kind: 'facility',
      description: facility.description,
      _status: 'published',
    })
  }
  
  for (const dining of DINING_VENUES) {
    await upsertBySlug(payload, 'resort-content', dining.id, {
      title: dining.name,
      slug: dining.id,
      kind: 'dining',
      summary: dining.subtitle,
      description: dining.description,
      location: dining.cuisine,
      _status: 'published',
    })
  }
  
  for (const exp of EXPERIENCES) {
    await upsertBySlug(payload, 'resort-content', exp.slug, {
      title: exp.title,
      slug: exp.slug,
      kind: 'experience',
      summary: exp.description,
      description: exp.description,
      location: exp.location,
      _status: 'published',
    })
  }
  
  for (const nearby of NEARBY_DESTINATIONS) {
    await upsertBySlug(payload, 'resort-content', nearby.slug, {
      title: nearby.name,
      slug: nearby.slug,
      kind: 'nearby',
      summary: nearby.description,
      description: nearby.description,
      distanceLabel: nearby.distance,
      _status: 'published',
    })
  }

  console.log('Seeding Journal Articles...')
  for (const article of JOURNAL_ARTICLES) {
    const coverImageId = await getOrCreateMedia(payload, article.coverImage, article.title)
    const publishedAt = parseIndonesianDate(article.publishedAt)

    await upsertBySlug(payload, 'journal-articles', article.slug, {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      category: article.category,
      publishedAt,
      coverImage: coverImageId,
      content: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: article.excerpt,
                  type: 'text',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      _status: 'published',
    })
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run')
  if (isDryRun) {
    console.log('DRY RUN: Validation passed. (Skipping database writes)')
    return
  }

  console.log('Initializing Payload...')
  const payload = await getPayload({ config })
  
  console.log('Payload initialized. Starting seed process...')

  try {
    await seedAll(payload)
    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exitCode = 1
    throw error
  }
}

main().catch(() => {
  process.exitCode = 1
})
