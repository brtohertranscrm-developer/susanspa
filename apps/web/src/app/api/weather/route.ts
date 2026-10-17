import { NextResponse } from 'next/server';

// Koordinat Bandungan, Semarang. Cuacanya sama untuk semua pengunjung, jadi cukup diambil ulang tiap 30 menit.
const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-7.2185&longitude=110.3683&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m';

export async function GET() {
  try {
    const upstream = await fetch(WEATHER_URL, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(5_000),
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Data cuaca tidak tersedia.' }, { status: 502 });
    }
    return NextResponse.json(await upstream.json());
  } catch {
    return NextResponse.json({ error: 'Data cuaca tidak tersedia.' }, { status: 502 });
  }
}
