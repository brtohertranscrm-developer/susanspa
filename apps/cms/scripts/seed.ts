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

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })
  
  console.log('Payload initialized. Starting seed process...')

  try {
    // 1. Seed Rooms
    console.log('Seeding Rooms...')
    for (const room of ROOMS) {
      await payload.create({
        collection: 'rooms',
        data: {
          name: room.name,
          slug: room.slug,
          category: room.category === 'Superior' ? 'Deluxe' : room.category as any, // Superior is not in the schema, using Deluxe
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
        },
      })
    }

    // 2. Seed Spa Treatments
    console.log('Seeding Spa Treatments...')
    for (const spa of SPA_TREATMENTS) {
      await payload.create({
        collection: 'spa-treatments',
        data: {
          title: spa.title,
          slug: spa.slug,
          summary: spa.tagline,
          description: spa.description,
          durationMinutes: spa.durationMinutes,
          priceLabel: spa.priceIdr,
          benefits: spa.benefits.map((b: string) => ({ label: b })),
          _status: 'published',
        },
      })
    }

    // 3. Seed Wedding Packages
    console.log('Seeding Wedding Packages...')
    for (const wedding of WEDDING_PACKAGES) {
      await payload.create({
        collection: 'wedding-packages',
        data: {
          title: wedding.name,
          slug: wedding.slug,
          summary: wedding.tagline || '',
          description: wedding.description,
          venue: typeof wedding.venue === 'string' ? wedding.venue : (wedding.venue?.[0] || ''),
          capacity: parseInt(wedding.guestCapacity || wedding.capacity || '100', 10) || 100,
          priceLabel: wedding.priceStartingIdr || 0,
          inclusions: wedding.inclusions.map((i: string) => ({ label: i })),
          _status: 'published',
        },
      })
    }

    // 4. Seed Offers
    console.log('Seeding Offers...')
    for (const offer of OFFERS) {
      await payload.create({
        collection: 'offers',
        data: {
          title: offer.title,
          slug: offer.slug,
          summary: offer.description,
          description: offer.description,
          terms: offer.inclusions.join('\n'), // putting inclusions as terms for now
          _status: 'published',
        },
      })
    }

    // 5. Seed Resort Content (Facilities, Dining, Experiences, Nearby)
    console.log('Seeding Resort Content...')
    
    // Facilities
    for (const facility of FACILITIES) {
      await payload.create({
        collection: 'resort-content',
        data: {
          title: facility.title,
          slug: facility.id,
          kind: 'facility',
          description: facility.description,
          _status: 'published',
        },
      })
    }
    
    // Dining
    for (const dining of DINING_VENUES) {
      await payload.create({
        collection: 'resort-content',
        data: {
          title: dining.name,
          slug: dining.id,
          kind: 'dining',
          summary: dining.subtitle,
          description: dining.description,
          location: dining.cuisine,
          _status: 'published',
        },
      })
    }
    
    // Experiences
    for (const exp of EXPERIENCES) {
      await payload.create({
        collection: 'resort-content',
        data: {
          title: exp.title,
          slug: exp.slug,
          kind: 'experience',
          summary: exp.description,
          description: exp.description,
          location: exp.location,
          _status: 'published',
        },
      })
    }
    
    // Nearby
    for (const nearby of NEARBY_DESTINATIONS) {
      await payload.create({
        collection: 'resort-content',
        data: {
          title: nearby.name,
          slug: nearby.slug,
          kind: 'nearby',
          summary: nearby.description,
          description: nearby.description,
          distanceLabel: nearby.distance,
          _status: 'published',
        },
      })
    }

    // 6. Seed Journal Articles
    console.log('Seeding Journal Articles...')
    for (const article of JOURNAL_ARTICLES) {
      await payload.create({
        collection: 'journal-articles',
        data: {
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          category: article.category,
          publishedAt: article.publishedAt,
          // Content requires richText format (Lexical). For now we leave it empty or create a basic structure.
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
        },
      })
    }

    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }

  process.exit(0)
}

seed().catch(console.error)
