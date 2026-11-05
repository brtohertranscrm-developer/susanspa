# Rekonsiliasi Pustaka Media

## Temuan 5 November 2026

Pustaka Media membaca record koleksi `media`, bukan seluruh isi ImageKit.
Pemeriksaan read-only pada API CMS dan inventaris ImageKit menemukan:

- 47 record CMS, seluruh ID berkasnya masih ditemukan di ImageKit.
- 106 berkas di folder Susan Spa: 71 di `/susanspa`, 8 di `/SUSAN SPA`,
  dan 27 di `/SUSAN SPA/update konten susan spa`.
- 59 berkas belum terdaftar: 24 di folder upload dan 35 di folder lama.
- Dua berkas contoh di root ImageKit tidak termasuk kandidat impor.

Angka 47 bukan batas pagination. Asal 24 berkas upload tanpa record belum
terbukti; inventaris saja tidak membedakan upload gagal, penggantian, atau
penghapusan yang disengaja. Jangan menghapus berkas atau menganggap nama
mirip sebagai bukti bahwa isinya identik.

## Pemeriksaan Tanpa Penulisan

Jalankan dari root repository:

```sh
npm run media:reconcile -w @susan/cms -- --dry-run
```

Perintah ini membaca environment CMS, seluruh halaman API media, dan seluruh
halaman inventaris ImageKit. Tidak membuka koneksi database, mengunggah file,
mengubah CMS, atau menghapus file. Hasil berisi metadata publik kandidat dan
alasan setiap berkas dilewati. Pastikan `CMS_PUBLIC_URL`,
`IMAGEKIT_URL_ENDPOINT`, dan `IMAGEKIT_PRIVATE_KEY` menunjuk akun yang benar.

## Menerapkan Impor

Jalankan hanya pada host yang memiliki akses database target, dengan
`DATABASE_URL` dan `PAYLOAD_SECRET` target dimuat ke environment. Hentikan
sementara kegiatan upload/edit/delete selama rekonsiliasi. Simpan backup
database menurut prosedur operasional sebelum menerapkan perubahan.

```sh
npm run media:reconcile -w @susan/cms -- --apply
```

Perintah memeriksa kecocokan ID, filename, ID ImageKit, dan URL antara
database target dan API CMS. Jika berbeda, impor berhenti. Auto schema push
dan worker cleanup dimatikan pada proses alat ini, bukan pada CMS berjalan.

Impor hanya membuat record metadata untuk berkas publik dengan MIME yang
didukung di kedua folder Susan Spa. Berkas privat, belum dipublikasikan,
URL tidak sesuai endpoint, konflik filename, dan berkas contoh tidak diimpor.
Pemeriksaan ID serta URL mengabaikan parameter transformasi untuk mencegah
pendaftaran ulang media yang sudah ada. Alt awal memakai deskripsi provider
atau nama berkas; tim konten dapat memperjelasnya setelah impor.

Semua record baru berada dalam satu transaksi. Konflik, error database,
atau kandidat yang memiliki job cleanup belum selesai membatalkan seluruh
impor. Job cleanup harus ditinjau sebelum mencoba lagi; jangan membatalkan
job hanya agar berkas yang sengaja dihapus dapat diimpor. Tidak ada upload
ulang, pemindahan berkas, perubahan relasi, atau pembaruan record lama.
Pengulangan setelah impor berhasil tidak membuat salinan record lagi.

Sesudah apply, jalankan dry-run lagi dan cocokkan jumlah pada `/api/media`
dan Pustaka Media. Jika inventaris tetap sama dan tidak ada penghalang,
47 + 59 menghasilkan 106 record. Angka tersebut bukan jaminan hasil sebelum
pemeriksaan job cleanup di database target.

## Batas Bukti

Dry-run live berhasil membaca 47 record dan 59 kandidat. Uji unit memeriksa
paging, deduplikasi, penyaringan, commit/rollback, dan job cleanup. Uji
integrasi PostgreSQL sementara memeriksa metadata-only create, thumbnail,
fallback locale, pengulangan tanpa duplikat, pelestarian record lama, dan
rollback setelah sebagian record dibuat. Provider dan email pada uji
integrasi dipalsukan.

Apply produksi belum dijalankan. Menambahkan alat ini, menjalankan tes,
push Git, atau deployment kode tidak otomatis mendaftarkan 59 berkas tersebut.
