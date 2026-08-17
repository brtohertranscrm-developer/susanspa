const requiredDatabaseUrl = () =>
  process.env.DATABASE_URL ||
  'postgres://susan_booking:susan_booking_local@127.0.0.1:5434/susan_booking'

export const config = {
  port: Number(process.env.PORT || 4000),
  host: process.env.HOST || '127.0.0.1',
  databaseUrl: requiredDatabaseUrl(),
  webOrigins: (process.env.WEB_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
}
