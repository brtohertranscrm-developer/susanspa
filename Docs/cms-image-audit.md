# Audit gambar CMS dan website

Tanggal: 4 November 2026. Cakupan: sumber gambar di seluruh route dan komponen website, pengambilan data CMS, media, serta banner dan logo. Desain, ukuran, dan susunan halaman dipertahankan.

## Masalah dan perbaikan

| Area | Temuan | Perbaikan |
| --- | --- | --- |
| Data CMS | Cache 5 menit menunda pembaruan | Permintaan konten dan pengaturan situs memakai `no-store` |
| Galeri | Halaman dan lightbox membaca array bawaan | Daftar, filter kategori, dan lightbox memakai galeri terbit dari CMS |
| Wedding | `/wedding` dan detail memakai paket bawaan | Daftar dan detail mengambil sumber CMS yang sama |
| Jurnal | Detail dan metadata memakai artikel bawaan | Sampul, isi, validasi slug, dan metadata mengikuti CMS |
| Wisata sekitar | Detail masih memakai destinasi bawaan | Daftar dan detail memakai CMS |
| Reservasi | Foto kamar berasal dari daftar bawaan | Foto dan pilihan kamar memakai katalog CMS |
| Beranda Best of | Empat foto ditulis langsung di komponen | Mengikuti foto konten spa, wedding, dining, dan promo; dapat diganti khusus di pengaturan situs |
| Banner dan logo | Belum memiliki kontrol CMS | Ditambahkan 20 posisi gambar di Pengaturan Situs |
| URL media | Sebagian mapper tidak menangani URL relatif | URL diselesaikan terhadap alamat publik CMS, bukan origin website |
| Cache gambar | URL sama berpotensi menampilkan gambar lama | URL media menyertakan versi `updatedAt`; transformasi ImageKit tetap dipertahankan |
| Media gagal | Fallback terjadi tanpa penjelasan | Fallback tetap tersedia; kegagalan permintaan dicatat di log server |
| Berbagi sosial | Gambar default statis | Open Graph, Twitter, dan gambar JSON-LD mengikuti Default SEO Image |
| Foto fallback wisata sekitar | Satu foto tambahan mengembalikan HTTP 404 | Tautan rusak dihapus; foto utama yang valid tetap dipakai |

## Peta pengelolaan

| Posisi website | Sumber CMS |
| --- | --- |
| Kartu, carousel, detail dan reservasi kamar | Kamar > Galeri Foto Kamar |
| Kartu spa | Spa Treatments > Foto Utama |
| Kartu dan detail wedding | Wedding Packages > Foto Utama |
| Dining, fasilitas, pengalaman, wisata sekitar | Dining & Resort > Foto Utama, sesuai kategori konten |
| Promo | Promo > Foto Utama |
| Galeri dan lightbox | Galeri > File Foto dan Kategori Galeri |
| Sampul daftar dan detail jurnal | Jurnal > Foto Sampul |
| Poster video beranda | Pengaturan Situs > Gambar Website > Beranda |
| Banner kamar, spa, dining, fasilitas, wedding, galeri, promo, pengalaman dan wisata sekitar | Pengaturan Situs > Gambar Website > banner halaman terkait |
| Banner tentang resort dan acara | Pengaturan Situs > Gambar Website > banner halaman terkait |
| Foto venue dan perayaan wedding | Pengaturan Situs > Gambar Website > Wedding |
| Empat kartu Best of beranda | Pengaturan Situs > Gambar Website > Beranda Best of |
| Logo header dan menu | Pengaturan Situs > Gambar Website > Logo |
| Open Graph, Twitter, gambar resort JSON-LD | Pengaturan Situs > Default SEO & Social Share > Default Open Graph Image |

Urutan sumber banner setelah penggabungan dengan main terbaru: pilihan khusus di Pengaturan Situs, lalu gambar pada editor halaman terkait, lalu gambar bawaan editor. Logo mengikuti Tata Letak Situs jika pilihan khusus kosong. Kartu Best of mengikuti daftar pada editor Beranda. Gambar Ballroom dan blok Halaman Tambahan mengikuti editor masing-masing. Semua jalur media memakai normalisasi URL dan versi berkas yang sama.

Foto kartu/detail tidak ditimpa pengaturan banner. Galeri kamar tetap memakai urutan foto kamar di CMS. Video utama beranda mengikuti editor Beranda, dengan `/videos/hero.mp4` sebagai bawaan. Pilihan khusus homePoster hanya mengganti poster, bukan video yang sedang diputar. Avatar testimoni belum ditampilkan di route aktif; komponen menerima data melalui props dan tidak ditambahkan ke halaman oleh perubahan ini.

## Cara mengganti gambar

1. Unggah atau ganti foto di Pustaka Media dan isi teks alternatifnya.
2. Pilih foto tersebut pada konten atau posisi banner yang sesuai.
3. Terbitkan konten/pengaturan, bukan hanya simpan draf.
4. Muat ulang halaman website. Tab yang sudah terbuka tidak menerima pembaruan langsung melalui koneksi live.
5. Jika foto masih bawaan, periksa log server untuk kegagalan CMS serta pastikan konten dan bahasa yang diedit benar.

Mengunggah foto baru tidak otomatis mengganti seluruh posisi yang memakai foto lama. Ganti relasi foto pada posisi yang dimaksud, atau ganti berkas pada record media lama bila semua pengguna record tersebut memang harus berubah.

## Rilis dan pemeriksaan

- Build `@susan/contracts` sebelum CMS dan website.
- Jalankan migrasi CMS `20261104_133116_website_images` melalui alur migrasi proyek sebelum menggunakan field banner baru di server tujuan. Migrasi menambah kolom nullable, relasi, dan indeks pada pengaturan situs beserta versi drafnya; tidak menghapus gambar/konten lama pada arah `up`.
- Migrasi tidak dijalankan otomatis terhadap database kerja atau produksi oleh pekerjaan audit ini.
- Atur `CMS_API_URL` untuk permintaan server. Jika alamat internal berbeda dari origin publik media relatif, atur juga `CMS_PUBLIC_URL` pada website. Origin ini dimasukkan ke allowlist gambar dan CSP; perubahan environment memerlukan build ulang.
- Deploy CMS dan website bersama setelah migrasi. Perubahan lokal saja tidak memperbarui website online.
- Jalankan `npm run test:rooms -w @susan/web`, `npm run test:cms -w @susan/web`, typecheck kedua aplikasi, dan build website.
- Setelah rilis, uji satu penggantian gambar terbit per jenis konten, penggantian berkas pada record media yang sama, banner khusus, filter/lightbox galeri, serta draf yang tidak boleh tampil publik.

Tes lokal dengan mock CMS membuktikan pemetaan dan kebijakan cache kode, bukan membuktikan deployment, konfigurasi CDN produksi, atau data editor di CMS aktif.

## Hasil validasi lokal sebelum penggabungan main

- 12 tes lulus: 4 tes katalog kamar dan 8 tes pemetaan media, cache, gambar pengaturan situs, kategori galeri, serta fallback CMS.
- Typecheck website dan CMS lulus. Build produksi website lulus.
- Browser produksi lokal dengan mock CMS: 17 halaman desktop merespons HTTP 200, lima halaman mobile tidak mengalami overflow horizontal, dan tidak ada error runtime browser pada pengujian tersebut.
- Penggantian versi media pada mock CMS muncul setelah refresh dan gambar hasil optimasi berhasil dimuat. Filter kategori, foto lightbox, dan tombol tutup galeri diuji pada mobile.
- Tujuh path gambar lokal yang ditemukan di kode tersedia. Dari 59 URL gambar eksternal unik yang diperiksa, 58 merespons HTTP 200 dan satu merespons 404; satu tautan fallback 404 tersebut dihapus, bukan diganti dengan gambar yang tidak terverifikasi.
- Lint website: tidak ada error, tersisa dua warning import tidak terpakai pada Header/Footer. Lint CMS masih menemukan 18 error dan dua warning pada `scripts/seed.ts` dan `src/components/dashboard/CustomDashboard.tsx`, yang tidak diubah dalam perbaikan gambar ini.
- Migrasi baru dibuat dan ditinjau, tetapi belum dieksekusi terhadap database. Deployment CMS/website dan uji editor pada CMS aktif belum dilakukan.

## Penggabungan main terbaru

Pembaruan editor halaman, Tata Letak Situs, teks formulir, SEO, visibilitas halaman, halaman Ballroom, Halaman Tambahan, dan tampilan CMS dari remote dipertahankan. Perbaikan cache no-store, draft=false, serta versi URL media diterapkan juga pada jalur editor baru. Migrasi gambar dijalankan setelah seluruh migrasi remote; snapshot skema mencakup tabel remote, bukan menggantinya dengan snapshot lama. Tes regresi mencakup blok gambar halaman tambahan, logo, video/poster, SEO, dan field detail jurnal/wedding dari editor terbaru. Validasi sebelum penggabungan di atas bukan bukti pengujian versi gabungan atau produksi.

Validasi versi gabungan:

- 14 tes lulus: 4 katalog kamar dan 10 media/CMS, termasuk dua regresi integrasi editor terbaru.
- Build contracts, website, dan CMS lulus; typecheck website/CMS lulus; lint website tanpa error maupun warning.
- Browser dengan mock CMS: 17 route desktop dan 10 pemeriksaan route mobile lulus tanpa overflow horizontal atau error runtime. Lima pemeriksaan mobile tambahan mencakup Ballroom, Contact, Privacy, Terms, dan satu Halaman Tambahan.
- Penggantian versi gambar pada record media yang sama tampil setelah refresh dan gambar teroptimasi berhasil dimuat.
- Pemeriksaan snapshot memastikan seluruh tabel, kolom, indeks, dan foreign key remote tetap utuh; hanya 40 kolom gambar ditambahkan pada pengaturan situs dan versi drafnya.
- Database kerja/produksi tidak disentuh oleh validasi ini. Push ke main memicu workflow deployment yang sudah ada; keberhasilan migrasi dan deployment produksi harus dikonfirmasi terpisah.

## Foto AVIF besar yang gagal, 5 November 2026

Foto `MNP_3585_copy_7Y6wLDF6m.avif` berukuran 8114 x 5406 piksel. Permintaan URL asli merespons HTTP 400 dengan header `ik-error: ELIMIT - Exceeds image resolution limit of 25.0 MP`. Permintaan berkas yang sama dengan `tr=w-320` dan `tr=w-2560` merespons HTTP 200. Kondisi thumbnail sebelumnya justru melewati resize untuk foto di atas 25 megapiksel dan mengirim URL asli yang gagal tersebut.

- Helper bersama membentuk thumbnail ImageKit 320 piksel dan URL tampilan 2560 piksel untuk foto besar yang belum memiliki transformasi. URL transformasi yang sudah dipilih tetap dipertahankan.
- Hook baca Media memperbaiki URL respons dan thumbnail pada record lama tanpa migrasi atau penggantian berkas. File asli dan ID ImageKit tidak dihapus.
- Normalisasi website juga menangani metadata foto besar dari respons CMS lama, mempertahankan versi URL, serta tidak menambahkan transformasi gambar ke video.
- Pemeriksaan baca-saja terhadap 11 record media publik menemukan 5 foto di atas 25 megapiksel. URL tampilan dan thumbnail yang dihasilkan untuk kelimanya merespons HTTP 200.
- Tes regresi mencakup foto yang dilaporkan, batas ukuran, transformasi lama, origin lain, versi URL, dan video. Perbaikan ini memerlukan rilis kode CMS dan website agar terlihat pada situs aktif; hasil HTTP di atas memverifikasi sumber gambar, bukan deployment.
