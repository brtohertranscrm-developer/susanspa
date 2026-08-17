import { db } from './db.js'

const migration = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(100) PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type VARCHAR(30) NOT NULL CHECK (inquiry_type IN ('room', 'spa', 'wedding', 'event', 'general')),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  check_in DATE,
  check_out DATE,
  guests INTEGER CHECK (guests IS NULL OR guests > 0),
  room_slug VARCHAR(100),
  target_date DATE,
  venue_preference VARCHAR(150),
  treatment_preference VARCHAR(150),
  notes TEXT,
  source VARCHAR(100) NOT NULL DEFAULT 'website',
  status VARCHAR(30) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'contacted', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT room_dates_required CHECK (
    inquiry_type <> 'room' OR (check_in IS NOT NULL AND check_out IS NOT NULL AND check_out > check_in)
  )
);

CREATE INDEX IF NOT EXISTS inquiries_status_created_at_idx ON inquiries (status, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries (email);
`

async function migrate() {
  const client = await db.connect()
  try {
    await client.query('BEGIN')
    await client.query(migration)
    await client.query(
      `INSERT INTO schema_migrations (version)
       VALUES ($1)
       ON CONFLICT (version) DO NOTHING`,
      ['001_inquiries'],
    )
    await client.query('COMMIT')
    console.log('Booking database migrations completed.')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
    await db.end()
  }
}

migrate().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
