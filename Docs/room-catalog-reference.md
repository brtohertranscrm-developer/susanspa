# Katalog kamar resmi Susan Spa & Resort

Referensi: https://www.susansparesort.com/rooms, diperiksa 13 September 2026.
Detail dan galeri mengikuti `/room/<slug>` pada situs tersebut. Deskripsi ditulis ulang
secara ringkas; foto memakai URL galeri resmi (40 foto), bukan foto stok.

| Jenis kamar | Slug | Luas | Kapasitas dari sumber | Tempat tidur |
| --- | --- | --- | --- | --- |
| Aurora Junior Suite | aurora-junior-suite | 26 m² | Perlu konfirmasi | Double bed |
| Family Room | family-room | 33 m² | 4 dewasa, 1 anak | 2 Queen beds |
| Family Suite Room | family-suite-room | 44 m² | 4 dewasa, 2 anak | King + 2 Single beds |
| Grand Deluxe | grand-deluxe | Belum tersedia | 2 dewasa, 0 anak | Belum tersedia |
| Grand Suite | grand-suite | 55 m² | Perlu konfirmasi | King bed |
| President Suite | president-suite | 77 m² | Perlu konfirmasi | King bed |
| Prime Room | prime-room | Belum tersedia | 2 dewasa, 0 anak | Belum tersedia |
| Prince Suite | prince-suite | 45 m² | 2 dewasa, 1 anak | King bed |
| Princess Suite | princess-suite | 45 m² | 2 dewasa, 1 anak | King bed |
| Villa 1 Big Room | villa-1-big-room | 66 m² | 8 orang, dari deskripsi | 4 Double beds |

## Penanganan informasi yang belum pasti

- Situs menampilkan `0 Adults / 0 Childs` untuk Aurora Junior Suite, Grand Suite,
  President Suite, dan Villa 1 Big Room. Nilai tersebut bukan kapasitas operasional.
  Untuk villa, deskripsi eksplisit menyebut delapan orang; pembagian dewasa/anak
  tidak diperkirakan. Suite lainnya menampilkan `Please confirm`.
- Deskripsi Family Room dan Family Suite Room menyebut empat orang; batas anak
  ditampilkan terpisah mengikuti field sumber. Kebijakan anak/extra bed perlu
  dikonfirmasi saat reservasi.
- Tidak ada harga, ketentuan pembatalan, atau jam check-in yang terverifikasi pada
  halaman kamar. Harga demo diganti `Contact for rates`; detail kosong memakai
  `null`, bukan harga Rp0 atau ukuran 0 m².
- Grand Deluxe dan Prime Room memakai kelompok internal CMS `Deluxe` yang sudah
  ada, dengan label publik `Room` / `Rooms`. Tidak diperlukan perubahan skema DB.
- Fasilitas kamar diringkas dari daftar sumber. Fasilitas umum resort seperti
  restoran dan parkir tidak dinyatakan sebagai fasilitas privat kamar.

## Integrasi

- Halaman tetap memakai rute proyek `/stay` dan `/stay/<slug>`.
- Beranda, menu, filter, pilihan inquiry, metadata, sitemap dan galeri menggunakan
  katalog baru. Halaman lain yang tidak menerima data CMS memakai katalog lokal.
- Dokumen CMS dengan slug resmi dapat mengganti konten katalog lokal. Jika CMS
  terisi sebagian, tipe resmi yang belum ada tetap memakai data referensi.
- Lima slug demo lama (`grand-villa`, `royal-suite`, `jacuzzi-villa`, `family-suite`,
  `deluxe-mountain`) tidak ditampilkan. Dokumen CMS tambahan lainnya tetap tampil.
  Data CMS dan riwayat inquiry tidak dihapus atau dimigrasikan.
- Foto berasal dari CDN resmi; ketersediaannya tetap bergantung pada CDN tersebut.
- Paket promo, wedding dan testimoni di luar katalog kamar masih merupakan konten
  demo lama dan perlu audit terpisah sebelum publikasi sebagai penawaran resmi.

## Validasi

Jalankan `npm run test:rooms -w @susan/web`, lint, typecheck, dan `npm run build:vercel`.
Periksa daftar 10 kamar, filter, halaman detail, foto galeri, pemilihan kamar pada
modal, serta metadata/sitemap. Pengujian UI tidak perlu mengirim inquiry nyata.
Perubahan ini tidak menjalankan migrasi CMS, commit, push, atau deployment.
