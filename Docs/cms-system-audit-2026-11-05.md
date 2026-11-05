# Audit sistem CMS - 5 November 2026

## Status perbaikan lokal

Ketujuh temuan di bawah sudah ditangani di kode lokal, diikuti perbaikan lanjutan yang dicatat berikut. Bagian temuan menyimpan kondisi saat audit, bukan status aplikasi setelah perbaikan. Belum ada commit, push, migrasi database kerja/produksi, atau deployment untuk perubahan ini. Migrasi telah dijalankan hanya pada database uji sementara.

### Putaran lanjutan: lifecycle media, jadwal promo, dan pemulihan akun

- Penghapusan file ImageKit memakai antrean Payload yang disimpan di PostgreSQL, bukan mengabaikan kegagalan provider. Delete record dan enqueue penghapusan berada dalam transaksi yang sama; kegagalan enqueue membatalkan delete record.
- Replace menjadwalkan penghapusan file lama. Setiap upload baru juga mendapat kandidat cleanup sebelum penyimpanan record, di luar transaksi penyimpanan tersebut. Task menunggu 15 menit dan memeriksa ulang apakah ID file masih dipakai record media. File yang masih dipakai tidak dihapus. Upload yang gagal disimpan akan dibersihkan; bila enqueue gagal, server mencoba menghapus upload tersebut sebagai kompensasi.
- Provider 404 dianggap selesai. Kegagalan lain dicoba ulang sampai 10 kali dengan exponential backoff; pekerjaan gagal tetap tersimpan untuk diperiksa admin di `/cms/collections/payload-jobs`. Pekerjaan sukses dihapus oleh perilaku default Payload. Editor/pengunjung tidak dapat membuat atau mengubah input pekerjaan melalui REST.
- Worker otomatis memeriksa antrean tiap menit pada proses CMS Node yang terus hidup, setelah request menginisialisasi Payload. Runtime serverless atau proses yang tidak terus hidup memerlukan runner antrean terpisah. Antrean dan log harus dipantau; retry tidak menjamin provider selalu pulih.
- Masih ada celah crash antara respons upload provider dan penyimpanan kandidat cleanup, atau kegagalan bersamaan database/provider. Kegagalan kompensasi mencatat ID file untuk penanganan manual. Perbaikan ini bukan pemindaian/penghapusan otomatis seluruh orphan historis di akun ImageKit.
- Seed mengirim berkas gambar nyata, memvalidasi format/ukuran, membatasi sumber ke direktori public lokal atau HTTPS, dan mendeduplikasi sumber dengan `seedSource` unik. Record lama yang hanya berisi URL sumber diperbaiki pada ID yang sama sehingga relasi konten tetap terjaga. Script seed penuh tidak dijalankan pada data kerja; helper diuji dengan database sementara dan provider palsu.
- Promo mempunyai opsi `Batasi tayang sesuai jadwal`, default nonaktif agar perilaku manual lama tidak berubah. Saat aktif, website memfilter menurut waktu mulai/selesai; batas tepat waktu termasuk dalam jendela tayang. Salah satu batas boleh kosong. Waktu akhir sebelum waktu mulai ditolak server. Opsi ini mengatur penampilan website, bukan otomatis mengubah status draft/published.
- Pemulihan password memakai adapter SMTP terenkripsi, tanpa membuat akun uji eksternal atau mencetak tautan reset seolah email sudah terkirim. Tanpa SMTP, pengiriman gagal dengan pesan 503 yang jelas. Tautan lupa password bawaan yang sebelumnya disembunyikan dipulihkan; panduan login tetap menyediakan jalur bantuan admin.
- Pengaturan SMTP ada di `apps/cms/.env.example`: host, port, secure, pasangan user/password, serta alamat/nama pengirim. Pengiriman email sungguhan masih membutuhkan konfigurasi deployment dan verifikasi penerimaan. Uji memakai mailbox palsu, termasuk token sekali pakai, kedaluwarsa, dan login dengan password baru.
- Uji migrasi database kosong menemukan migrasi konten lama memanggil Local API sebelum kolom dari migrasi berikutnya tersedia. Data awal sekarang ditampung sementara lalu diterapkan setelah migrasi struktural selesai. Instalasi yang telah mencatat migrasi lama tidak diisi ulang. Backfill Local API harus tetap mengikuti seluruh migrasi struktural yang diperlukan konfigurasi rilis; CI menjalankan migrasi database kosong sebelum integrasi untuk mendeteksi regresi ini.
- Migrasi baru `20261105_030403_media_cleanup`, `20261105_031146_offer_schedule`, dan `20261105_033000_apply_content_backfill` harus diterapkan sebelum CMS versi ini dijalankan pada lingkungan rilis. Jangan memakai schema push development sebagai pengganti migrasi produksi.

Validasi putaran lanjutan:

- Unit/regresi CMS: 11 lulus, integrasi dilewati bila URL database uji tidak diberikan. Website CMS/media/sitemap: 19 lulus; katalog kamar: 5 lulus; rich-text: 2 lulus. Total 37 regresi tanpa database.
- Integrasi REST PostgreSQL: 8 skenario lulus (9 tes termasuk parent suite), termasuk rollback saat enqueue gagal, kompensasi upload, retry delete, provider 404, perlindungan file yang masih dipakai, pemulihan seed lama, validasi jadwal, dan reset password.
- Seluruh rantai migrasi berjalan pada database kosong sementara, kemudian suite REST yang sama lulus di schema hasil migrasi.
- Browser admin pada database terisolasi: login, dasbor, pembuatan/publikasi halaman, locale ID/EN, daftar versi, konfirmasi pemulihan versi, opsi jadwal promo, serta upload foto dan thumbnail dengan provider palsu telah diperiksa. Browser menemukan form lupa password bawaan menganggap JSON HTTP 503 sebagai sukses; view diganti agar hanya respons sukses yang menampilkan konfirmasi. Helper respons juga diuji dengan HTTP 503/502 dan body tidak valid. Tidak menggunakan akun atau data produksi.
- Uji ulang browser form pemulihan: HTTP 503 SMTP yang belum dikonfigurasi menampilkan pesan error dan mempertahankan form; respons HTTP 200 tiruan menampilkan konfirmasi generik. Lebar 375 px tidak mengalami overflow horizontal. Respons sukses tiruan bukan bukti email sungguhan terkirim.
- Typecheck seluruh workspace, typecheck seed, lint seluruh workspace, build website dan CMS, serta `git diff --check` diperiksa kembali. Integrasi ImageKit/SMTP nyata dan produksi tetap di luar bukti pengujian ini.

- Akses Pengaturan Situs sekarang membatasi pengunjung ke `_status=published`, termasuk saat pembacaan meminta draft. Editor/admin tetap dapat membaca draft.
- URL dan ID ImageKit menolak penulisan dari klien pada create/update. Hook upload server tetap mengisi metadata dari hasil ImageKit; trusted Local API dengan overrideAccess tetap dapat dipakai oleh script internal.
- Hasil CMS yang berhasil dibaca menjadi sumber katalog yang otoritatif, termasuk daftar kosong. Kamar yang tidak ada dalam hasil publik tidak dimasukkan kembali. Fallback bawaan hanya dipakai jika CMS tidak dikonfigurasi/tidak dapat dibaca, sedangkan rincian bawaan per kamar yang masih terbit tetap dapat melengkapi field kosong. Tidak ada record yang dihapus oleh perubahan ini.
- Urutan kamar mengikuti hasil `sortOrder` CMS, termasuk kamar tambahan. Pagination website, daftar slug halaman tambahan, dan dasbor mengikuti halaman lanjutan. Kegagalan di tengah pembacaan katalog tidak mengembalikan katalog parsial.
- Pratinjau halaman tambahan memakai token HMAC berumur lima menit, terikat ID halaman dan locale. Hanya editor/admin yang dapat membuat tautan. Website meneruskan token ke endpoint CMS melalui Authorization header; endpoint memvalidasi sebelum membaca draft. Tidak perlu secret tambahan di website. Halaman preview bersifat dinamis, noindex, private/no-store, dan no-referrer. Simpan draft terlebih dahulu; tautan yang kedaluwarsa perlu dibuat ulang dari CMS.
- Jurnal mempertahankan tree Lexical dan memakai renderer rich-text untuk heading, format teks, tautan, daftar, dan kutipan. URL berskema executable ditolak; konten teks tetap di-escape oleh React.

Validasi setelah perbaikan:

- CMS: 7 tes regresi lulus.
- Workflow deployment menjalankan suite regresi setelah build contracts, sebelum build aplikasi dan upload ke VPS.
- Website CMS/media/sitemap: 17 tes lulus; katalog kamar: 5 tes lulus; renderer rich-text: 2 tes lulus. Total 31 tes regresi lulus.
- Build contracts, CMS, dan website lulus; typecheck dan lint penuh CMS/website lulus.
- Lima error dan satu warning seed dibersihkan dengan tipe Payload, pembatasan koleksi seed, dan penghapusan import/cast yang tidak diperlukan. Script seed juga diperiksa dengan TypeScript secara terpisah karena folder scripts tidak masuk typecheck aplikasi; script tidak dieksekusi atau dipakai menulis data.
- Smoke test server website hasil production build dengan CMS fixture read-only: draft tampil melalui preview valid, token tidak valid menghasilkan 404, slug publik draft menghasilkan 404, dan header private cache/noindex/no-referrer benar.
- Lima skenario integrasi REST lulus pada database PostgreSQL sementara: login/role, isolasi draft global, publikasi/EN/restore versi/unpublish halaman, preview bertoken, dan upload/replace/delete media. Ini menggunakan `handleEndpoints` Payload asli dan PostgreSQL asli, bukan mock database. Layanan ImageKit sengaja memakai transport palsu; tidak ada file akun ImageKit yang diunggah/dihapus. Kegagalan provider saat mengganti gambar menghasilkan HTTP 502 dan mempertahankan URL/ID gambar sebelumnya.
- Sitemap memakai `force-dynamic`. Build website tidak lagi mencatat dynamic-server-usage dari sitemap. Tes memastikan halaman yang dinonaktifkan tidak masuk, query konten meminta versi published, katalog kosong tidak diisi fallback, serta halaman preview tidak dimasukkan.
- Workflow deployment menyediakan PostgreSQL sementara untuk uji REST, memakai database bernama `susan_cms_test`. `tsx` dinyatakan langsung sebagai dev dependency CMS. Suite integrasi terpisah dari suite tanpa database.

## Status dan batas pemeriksaan

Audit kode dan uji reproduksi terisolasi pada checkout lokal. Penulisan uji hanya ke PostgreSQL sementara. Tidak ada penulisan ke database kerja atau produksi, upload/penghapusan file ImageKit sungguhan, commit, atau push dalam audit ini. Perbaikan AVIF dari pekerjaan sebelumnya tetap berada di working tree dan belum dirilis.

Pemeriksaan mencakup akses koleksi dan global, field media, publikasi, pemetaan CMS ke website, urutan dan pagination, pratinjau halaman tambahan, format jurnal, serta validasi otomatis yang tersedia. Ini bukan sertifikasi bahwa semua fitur bebas bug.

Docker daemon lokal tidak aktif, sehingga PostgreSQL dijalankan dari paket embedded di direktori `/tmp`, port 55439, tanpa mengubah instalasi PostgreSQL global. Test menolak URL database selain localhost/127.0.0.1 dan nama berawalan `susan_cms_test`. Pool database uji dimiliki harness agar dapat ditutup sesudah pengujian; CRUD, validasi, hook, transaksi, dan akses REST tetap memakai implementasi Payload. Temuan berikut menyimpan kondisi saat audit awal dan membedakannya dari pengamatan produksi.

Untuk mengulang integrasi, buat database PostgreSQL kosong khusus pengujian bernama `susan_cms_test` atau `susan_cms_test_*`, lalu jalankan `CMS_TEST_DATABASE_URL=postgres://USER:PASSWORD@127.0.0.1:PORT/susan_cms_test npm run test:integration -w @susan/cms`. Suite membuat schema serta data uji dan tidak boleh diarahkan ke database kerja/produksi. Suite tanpa variabel ini melewati integrasi. CI menggunakan service PostgreSQL yang dibuang setelah job selesai.

## Temuan

### 1. [P1] Draft Pengaturan Situs dapat terbaca tanpa login

- Lokasi: `apps/cms/src/globals/SiteSettings.ts:11`.
- Global mengaktifkan `versions.drafts`, tetapi `access.read` selalu mengembalikan `true`, termasuk ketika pemanggil anonim meminta `draft=true`.
- Implementasi Payload yang terpasang menjalankan akses baca yang sama sebelum mengganti dokumen dengan draft; tidak ada pemeriksaan pengguna tambahan dalam penggantian tersebut.
- Reproduksi: jalankan fungsi akses dengan `req.user=null`, lalu jalankan `replaceWithDraftIfAvailable` dari Payload dengan database fixture berisi versi draft. Hasilnya mengembalikan isi draft yang belum diterbitkan.
- Pemeriksaan produksi read-only: permintaan anonim untuk `draft=false` dan `draft=true` sama-sama HTTP 200, tetapi keduanya mengembalikan objek default yang sama dengan `updatedAt=null`. Tidak ada bukti bahwa draft tersimpan tertentu sudah bocor di produksi; jalur akses yang tidak membatasi draft terbukti pada kode dan fixture.
- Perbaikan: batasi pembacaan draft untuk editor/admin di server, sambil mempertahankan pembacaan versi terbit untuk pengunjung. Terapkan konsisten pada REST dan GraphQL; jangan hanya mengandalkan website mengirim `draft=false`.

### 2. [P1] Unpublish/hapus dapat memunculkan kembali konten bawaan

- Lokasi: `apps/web/src/lib/cms.ts:147`, `apps/web/src/lib/cms.ts:195`, `apps/web/src/lib/room-catalog.ts:65`.
- Koleksi yang berhasil dibaca tetapi kosong disamakan dengan kondisi CMS tidak tersedia. Getter menggantinya dengan data bawaan. Untuk kamar resmi, setiap slug yang tidak ada dalam hasil CMS selalu dimasukkan kembali dari `ROOMS`.
- Reproduksi: mock API berhasil dengan `docs:[]`; getter mengembalikan 5 spa, 3 wedding, 3 promo, 19 fasilitas, 2 dining, 22 galeri, 3 pengalaman, 4 destinasi sekitar, dan 3 artikel jurnal bawaan. Fixture kamar parsial juga mengembalikan kamar resmi yang sengaja tidak ada dalam hasil publik.
- Dampak: menarik semua item dari publikasi tidak mengosongkan website; kamar resmi yang ditarik dapat tetap memiliki kartu dan halaman detail dengan data lama.
- Perbaikan: bedakan keberhasilan dengan hasil kosong dari kegagalan koneksi. Untuk kamar, aturan fallback resmi memang disengaja di implementasi sebelumnya, tetapi memerlukan penanda penarikan/visibilitas eksplisit agar fallback tidak membatalkan unpublish. API publik saja tidak dapat membedakan slug yang belum pernah diisi dengan slug yang sengaja ditarik.

### 3. [P2] Field teknis media hanya read-only di UI, bukan di API

- Lokasi: `apps/cms/src/collections/Media.ts:97`, `apps/cms/src/collections/Media.ts:120`, `apps/cms/src/collections/Media.ts:158`.
- `url` dan `imagekitFileId` tidak mempunyai field-level access. Editor boleh mengupdate media; `admin.readOnly` dan kondisi tampilan admin tidak melindungi request API.
- Reproduksi: periksa schema dan panggil hook `beforeChange` tanpa `req.file` dengan nilai teknis buatan. Hook mempertahankan URL dan ID kiriman klien. Tidak ada request update atau delete ke layanan nyata yang dilakukan.
- Dampak: editor dapat mengubah sumber gambar melalui API; hook hapus kemudian memakai ID file yang tersimpan tersebut. Jika ID file ImageKit lain diketahui dan diterima, penghapusan dapat menargetkan file yang tidak sesuai dengan record asal.
- Perbaikan: tolak input teknis dari klien di server; set URL dan ID hanya dari hasil upload tepercaya. Pertahankan identitas file asli saat menghapus dan tambahkan uji akses field melalui REST pada database sementara.

### 4. [P2] Urutan kamar dari CMS tidak dipertahankan

- Lokasi: `apps/web/src/lib/room-catalog.ts:65`.
- API meminta urutan `sortOrder`, tetapi hasil akhir dibangun ulang mengikuti urutan array `ROOMS`; kamar tambahan selalu ditempatkan sesudah kamar resmi.
- Reproduksi: kirim Family Room sebagai urutan 0 dan Aurora sebagai urutan 99. Hasil tetap menempatkan Aurora sebelum Family Room.
- Perbaikan: tentukan urutan akhir dari nilai CMS, termasuk posisi kamar tambahan, dengan aturan fallback yang eksplisit.

### 5. [P2] Konten dan hitungan terpotong saat melewati batas satu halaman

- Lokasi: `apps/web/src/lib/cms.ts:115`, `apps/cms/src/lib/contentStatus.ts:201`, `apps/cms/src/lib/contentStatus.ts:296`.
- Website mengambil maksimal 100 item tanpa mengikuti `nextPage`; dasbor mengambil 200 item dan menghitung total dari `docs.length`, bukan total koleksi. Fasilitas, dining, pengalaman, dan nearby berbagi kuota request `resort-content` yang sama.
- Reproduksi website: response dengan `hasNextPage:true` dan `nextPage:2` tidak menghasilkan request lanjutan. Reproduksi dasbor: fixture dengan `totalDocs:201` menghasilkan ringkasan hanya 200.
- Dampak: konten terbit di luar halaman pertama tidak tampil; hitungan, daftar draft, dan peringatan dasbor tidak lengkap.
- Perbaikan: iterasi pagination sampai selesai atau gunakan query terpisah untuk total dan status. Jangan menganggap menaikkan limit sebagai penyelesaian permanen.

### 6. [P2] Pratinjau halaman tambahan tidak menampilkan draft

- Lokasi: `apps/cms/src/collections/Pages.ts:133`, `apps/web/src/lib/custom-pages.ts`.
- Callback pratinjau hanya menuju URL publik. Pembacaan website meminta versi terbit, tanpa mekanisme preview yang terautentikasi.
- Reproduksi: callback untuk dokumen `_status:'draft'` menghasilkan URL publik biasa. Draft halaman baru tidak tersedia melalui jalur publik itu; pada halaman yang sudah terbit, perubahan draft tidak terbaca oleh loader tersebut.
- Dampak: tombol pratinjau halaman baru dapat berakhir 404; draft perubahan pada halaman lama memperlihatkan versi terbit, bukan isi yang sedang diperiksa editor.
- Perbaikan: tambahkan jalur preview terautentikasi yang membaca draft tanpa membukanya untuk pengunjung, atau nonaktifkan tombol untuk draft dan jelaskan batasnya.

### 7. [P2] Format rich-text jurnal hilang di website

- Lokasi: `apps/web/src/lib/cms-richtext.ts:7`, `apps/web/src/app/journal/[slug]/JournalDetailClient.tsx:71`.
- Konversi Lexical menghasilkan array string; template merender semuanya sebagai paragraf. Jenis heading, URL link, bold, dan struktur daftar tidak dipertahankan.
- Reproduksi: fixture berisi heading H2, link beralamat, dan teks bold berubah menjadi dua string biasa. Alamat link serta metadata format hilang.
- Dampak: format yang berhasil disimpan di editor tidak sesuai dengan hasil publik; tautan artikel tidak dapat diklik.
- Perbaikan: gunakan renderer rich-text dengan node dan URL yang divalidasi, bukan meratakan semua node menjadi teks.

## Validasi otomatis saat audit awal

- `npm run test:cms -w @susan/web`: 12/12 lulus.
- `npm run test:rooms -w @susan/web`: 4/4 lulus.
- `npm run typecheck -w @susan/cms`: lulus.
- `npm run lint -w @susan/cms`: gagal pada `apps/cms/scripts/seed.ts`, 5 error `no-explicit-any` dan 1 warning unused import. Ini terpisah dari reproduksi bug runtime di atas.
- `git diff --check`: lulus sebelum penulisan laporan; diperiksa kembali setelah laporan dibuat.
- Reproduksi tambahan memakai mock fetch, mock payload/database, dan pemanggilan fungsi lokal. Kelulusan 16 tes yang sudah ada tidak mencakup seluruh skenario temuan audit.

## Catatan perilaku saat audit awal (ditindaklanjuti di atas)

- `validFrom` promo belum dipakai dalam pemetaan/filter website; fixture promo tahun 2099 tetap dikembalikan sekarang. Dasbor memang meminta editor menarik promo kedaluwarsa secara manual. Putuskan apakah tanggal hanya informasi atau harus mengatur tayang otomatis sebelum mengubah perilaku.
- Perbaikan AVIF besar dari pekerjaan sebelumnya belum dipush; bukan temuan baru dalam audit ini.
- Alur simpan/publish/restore versi, upload/replace/delete, locale EN, login dan role sudah diuji lewat REST pada database sementara, tetapi belum melalui interaksi browser admin end-to-end. Pengiriman ImageKit sungguhan, email reset password, serta deployment produksi terbaru belum diverifikasi dalam tahap ini.
- Jadwal otomatis promo masih memerlukan keputusan produk tentang arti tanggal; tidak diaktifkan diam-diam. Tidak ada klaim bahwa seluruh sistem bebas bug.
