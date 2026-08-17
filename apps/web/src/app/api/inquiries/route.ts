import { inquirySubmissionSchema } from '@susan/contracts';
import { NextResponse } from 'next/server';

const bookingApiUrl = process.env.BOOKING_API_URL || 'http://localhost:4000';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Format permintaan tidak valid.' }, { status: 400 });
  }

  const parsed = inquirySubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Data inquiry belum lengkap.', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${bookingApiUrl}/v1/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-IP': request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown',
      },
      body: JSON.stringify(parsed.data),
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });

    const responseBody = await upstream.json().catch(() => ({ error: 'Respons layanan tidak valid.' }));
    return NextResponse.json(responseBody, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { error: 'Layanan inquiry sedang tidak tersedia. Silakan hubungi WhatsApp concierge.' },
      { status: 503 },
    );
  }
}
