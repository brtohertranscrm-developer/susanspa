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

## Panel konten (CMS)

Panel di `http://localhost:3001/cms` ditujukan untuk tim admin yang mengelola isi website. Tampilannya Bahasa Indonesia, mengikuti token warna dan huruf di `DESIGN.md`, dan punya tema terang serta gelap yang dipilih per akun di halaman Akun.

- **Ringkasan** (halaman awal) menampilkan data nyata dari database: konten yang menunggu publikasi, promo yang sudah lewat masa berlaku tetapi masih diterbitkan, konten yang belum punya terjemahan Inggris, jumlah konten tayang per jenis, dan konten yang terakhir diubah.
- **Peran**: Admin konten mengelola semua konten dan akun. Editor konten mengelola konten dan hanya bisa mengubah akunnya sendiri.
- **Draf dan publikasi**: draf tidak tampil di website. Website membaca konten terbit dengan cache 5 menit (`revalidate` di `apps/web/src/lib/cms.ts`), jadi perubahan bisa butuh beberapa menit untuk terlihat. Tombol Pratinjau hanya muncul untuk konten yang sudah terbit.
- **Bahasa konten**: isi versi Indonesia lebih dulu. Selama versi English kosong, website menampilkan teks Indonesia.
- **Slug** terisi otomatis dari judul saat membuat konten baru dan tidak berubah sendiri sesudahnya.
- Teks logo di panel masih placeholder (`apps/cms/src/components/BrandLogo.tsx`) sampai file logo resmi tersedia.

Catatan untuk pengembang:

- Setelah menambah atau mengubah komponen admin di `payload.config.ts`, jalankan `npm run cms:generate:importmap`.
- Perubahan label, deskripsi, kolom daftar, tab, dan urutan field tidak mengubah schema database. Menambah field atau mengubah `index`, `unique`, dan `autosave` butuh migration.
- Payload 3.88 membuat draf kosong setiap kali halaman Tambah dibuka pada koleksi dengan autosave (Kamar, Artikel Jurnal). Draf itu tidak tampil di website. Ringkasan menghitungnya terpisah sebagai "Draf tanpa judul".
- `20261004_120000_add_media_imagekit_file_id` menambah kolom `media.imagekit_file_id` yang dipakai kode tetapi tidak ada di migration awal.
- Unggah foto memakai ImageKit. Isi `IMAGEKIT_PRIVATE_KEY` dan `IMAGEKIT_URL_ENDPOINT` di environment CMS (lokal di `apps/cms/.env`, produksi di `/etc/susanspa/cms.env`). Tanpa kunci, CMS tetap berjalan tetapi unggah foto menampilkan pesan error yang jelas.

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
