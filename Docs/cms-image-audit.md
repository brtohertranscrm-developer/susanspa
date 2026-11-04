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

Urutan sumber banner: pilihan khusus di Pengaturan Situs, lalu foto pertama dari daftar konten terbit yang terkait, lalu gambar bawaan. Banner About, Events, foto dekoratif wedding, logo, dan poster video tidak memiliki sumber daftar konten otomatis, sehingga tetap memakai gambar bawaan saat pengaturannya kosong.

Foto kartu/detail tidak ditimpa pengaturan banner. Galeri kamar tetap memakai urutan foto kamar di CMS. Video utama beranda tetap memakai `/videos/hero.mp4`: kontrol gambar hanya mengganti posternya, bukan video yang sedang diputar. Avatar testimoni belum ditampilkan di route aktif; komponen menerima data melalui props dan tidak ditambahkan ke halaman oleh perubahan ini.

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

## Hasil validasi lokal

- 12 tes lulus: 4 tes katalog kamar dan 8 tes pemetaan media, cache, gambar pengaturan situs, kategori galeri, serta fallback CMS.
- Typecheck website dan CMS lulus. Build produksi website lulus.
- Browser produksi lokal dengan mock CMS: 17 halaman desktop merespons HTTP 200, lima halaman mobile tidak mengalami overflow horizontal, dan tidak ada error runtime browser pada pengujian tersebut.
- Penggantian versi media pada mock CMS muncul setelah refresh dan gambar hasil optimasi berhasil dimuat. Filter kategori, foto lightbox, dan tombol tutup galeri diuji pada mobile.
- Tujuh path gambar lokal yang ditemukan di kode tersedia. Dari 59 URL gambar eksternal unik yang diperiksa, 58 merespons HTTP 200 dan satu merespons 404; satu tautan fallback 404 tersebut dihapus, bukan diganti dengan gambar yang tidak terverifikasi.
- Lint website: tidak ada error, tersisa dua warning import tidak terpakai pada Header/Footer. Lint CMS masih menemukan 18 error dan dua warning pada `scripts/seed.ts` dan `src/components/dashboard/CustomDashboard.tsx`, yang tidak diubah dalam perbaikan gambar ini.
- Migrasi baru dibuat dan ditinjau, tetapi belum dieksekusi terhadap database. Deployment CMS/website dan uji editor pada CMS aktif belum dilakukan.
