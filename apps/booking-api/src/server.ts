import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import {
  inquirySubmissionSchema,
  type ApiErrorResponse,
  type InquiryReceipt,
} from '@susan/contracts'
import Fastify from 'fastify'
import { config } from './config.js'
import { db } from './db.js'

const app = Fastify({
  logger: true,
  trustProxy: true,
  bodyLimit: 64 * 1024,
})

await app.register(cors, {
  origin: config.webOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
})

await app.register(rateLimit, {
  global: true,
  max: 100,
  timeWindow: '1 minute',
})

app.get('/health', async (_request, reply) => {
  try {
    await db.query('SELECT 1')
    return { service: 'booking-api', status: 'ok', database: 'connected' }
  } catch {
    return reply.code(503).send({ service: 'booking-api', status: 'degraded', database: 'unavailable' })
  }
})

app.post<{ Reply: InquiryReceipt | ApiErrorResponse }>(
  '/v1/inquiries',
  {
    config: {
      rateLimit: { max: 5, timeWindow: '15 minutes' },
    },
  },
  async (request, reply) => {
    const parsed = inquirySubmissionSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({
        error: 'Data inquiry belum valid.',
        details: parsed.error.flatten(),
      })
    }

    const inquiry = parsed.data
    const result = await db.query<{ id: string; created_at: Date }>(
      `INSERT INTO inquiries (
        inquiry_type, full_name, email, phone, check_in, check_out, guests,
        room_slug, target_date, venue_preference, treatment_preference, notes, source
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, created_at`,
      [
        inquiry.type,
        inquiry.fullName,
        inquiry.email.toLowerCase(),
        inquiry.phone,
        inquiry.checkIn || null,
        inquiry.checkOut || null,
        inquiry.guests || null,
        inquiry.roomSlug || null,
        inquiry.targetDate || null,
        inquiry.venuePreference || null,
        inquiry.treatmentPreference || null,
        inquiry.notes || null,
        inquiry.source,
      ],
    )

    const row = result.rows[0]
    return reply.code(201).send({
      id: row.id,
      status: 'received',
      createdAt: row.created_at.toISOString(),
    })
  },
)

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error)
  reply.code(500).send({ error: 'Layanan booking sedang mengalami gangguan.' })
})

const shutdown = async (signal: string) => {
  app.log.info({ signal }, 'Stopping booking API')
  await app.close()
  await db.end()
  process.exit(0)
}

process.on('SIGINT', () => void shutdown('SIGINT'))
process.on('SIGTERM', () => void shutdown('SIGTERM'))

try {
  await app.listen({ port: config.port, host: config.host })
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
