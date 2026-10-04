const TIME_ZONE = 'Asia/Jakarta'

const dateTime = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: TIME_ZONE,
})

const dateOnly = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: TIME_ZONE,
})

const relative = new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' })

export const formatDateTime = (iso: string) => dateTime.format(new Date(iso))

export const formatDate = (iso: string) => dateOnly.format(new Date(iso))

export const formatRelative = (iso: string, now = Date.now()) => {
  const diffSeconds = Math.round((new Date(iso).getTime() - now) / 1000)
  const abs = Math.abs(diffSeconds)
  if (abs < 60) return 'baru saja'
  if (abs < 3600) return relative.format(Math.round(diffSeconds / 60), 'minute')
  if (abs < 86400) return relative.format(Math.round(diffSeconds / 3600), 'hour')
  if (abs < 86400 * 7) return relative.format(Math.round(diffSeconds / 86400), 'day')
  return formatDate(iso)
}

export const greeting = (now = new Date()) => {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone: TIME_ZONE }).format(now),
  )
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 18) return 'Selamat sore'
  return 'Selamat malam'
}

/** Awal hari ini di Jakarta dalam ISO UTC, untuk membandingkan tanggal berlaku promo. */
export const startOfTodayJakarta = (now = new Date()) => {
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(now)
  return new Date(`${ymd}T00:00:00+07:00`).toISOString()
}
