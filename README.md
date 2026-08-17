# Susan Spa & Resort Platform

Demo 1 kini memakai monorepo dengan frontend Next.js, Payload CMS, dan fondasi booking engine khusus. Database CMS dan database transaksi sengaja dipisahkan agar perubahan konten tidak dapat mengubah transaksi booking.

## Struktur aplikasi

```text
apps/
  web/          Next.js frontend publik (port 3000)
  cms/          Payload CMS dan admin panel (port 3001)
  booking-api/  API transaksi/inquiry khusus (port 4000)
packages/
  contracts/    Kontrak Zod dan tipe bersama frontend/API
docker-compose.yml
  cms-db        PostgreSQL CMS (host port 5433)
  booking-db    PostgreSQL transaksi (host port 5434)
```

Payload mengelola konten pemasaran: kamar, spa, paket wedding, promo, fasilitas, jurnal, testimoni, galeri, media, dan pengaturan situs. Booking API menjadi pemilik inquiry dan, pada fase selanjutnya, inventory, rate plan, reservasi, pembayaran, serta audit transaksi.

## Menjalankan secara lokal

Persyaratan: Node.js 20.9+, npm, dan Docker Desktop.

```bash
npm install
cp apps/web/.env.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env
cp apps/booking-api/.env.example apps/booking-api/.env
npm run db:up
npm run cms:migrate
npm run db:migrate:booking
npm run dev
```

- Website: `http://localhost:3000`
- Payload CMS: `http://localhost:3001/cms`
- Booking API health: `http://localhost:4000/health`

Saat pertama membuka CMS, buat akun administrator awal melalui layar Payload. Ganti seluruh secret dan password contoh sebelum deployment.

Frontend kamar membaca data terbit dari Payload. Selama CMS belum memiliki data atau tidak dapat dijangkau, data demo di `apps/web/src/data/rooms.ts` dipakai sebagai fallback sehingga Demo 1 tetap berjalan.

## Pemeriksaan kualitas

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

Sesudah mengubah collection Payload, jalankan:

```bash
npm run cms:generate:types
npm run cms:generate:importmap
```

Perubahan schema database harus disimpan sebagai migration dan dijalankan dengan `npm run cms:migrate`. Jangan memakai schema push otomatis untuk production.

## Batas Demo 1

- Inquiry dari form sudah divalidasi server, diberi rate limit, dan disimpan ke database transaksi.
- Availability real-time, reservasi, hold inventory, pembayaran, refund, invoice, PMS/channel manager, dan email operasional belum diimplementasikan.
- Harga pada CMS hanya harga display. Harga checkout dan ketersediaan nantinya wajib dihitung booking engine.
- Production memerlukan object storage media, email adapter, secret manager, backup terpisah, HTTPS, observability, dan pembatasan jaringan database.
