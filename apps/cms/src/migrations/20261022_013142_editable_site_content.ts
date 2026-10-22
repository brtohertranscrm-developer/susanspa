import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import { contentGlobals } from '@susan/contracts/content'
import { initialData } from '../lib/contentFields'

const OLD_HERO_KEYS = ['about', 'events', 'ballroom', 'dining', 'experiences', 'facilities', 'gallery', 'nearby', 'offers', 'rooms', 'spa', 'wedding']

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Foto hero yang sudah dipilih di global lama dipindahkan ke header halaman yang baru.
  const oldHeroes = await db.execute(sql`SELECT * FROM "page_heroes" LIMIT 1`)
  const oldHero = (oldHeroes.rows[0] ?? {}) as Record<string, number | null>

  await db.execute(sql`
   CREATE TYPE "public"."enum_resort_content_facility_category" AS ENUM('Wellness', 'Dining', 'Family & Recreation', 'Events', 'Guest Services');
  CREATE TYPE "public"."enum__resort_content_v_version_facility_category" AS ENUM('Wellness', 'Dining', 'Family & Recreation', 'Events', 'Guest Services');
  CREATE TYPE "public"."enum_site_layout_menu_properties_icon" AS ENUM('hotel', 'church', 'dining', 'pool', 'park', 'spa');
  CREATE TYPE "public"."enum_page_about_pillars_icon" AS ENUM('compass', 'letter', 'heart', 'leaf', 'mountain');
  CREATE TYPE "public"."enum_page_facilities_groups_category" AS ENUM('Wellness', 'Dining', 'Family & Recreation', 'Events', 'Guest Services');
  CREATE TYPE "public"."enum_page_wedding_venue_list_icon" AS ENUM('church', 'users', 'map');
  CREATE TABLE "wedding_packages_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "wedding_packages_schedule_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "wedding_packages_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "_wedding_packages_v_version_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_wedding_packages_v_version_schedule_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_wedding_packages_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "resort_content_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "resort_content_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_resort_content_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_resort_content_v_version_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "offers_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "offers_inclusions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_offers_v_version_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offers_v_version_inclusions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_categories_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_categories_links_locales" (
  	"label" varchar DEFAULT '',
  	"href" varchar DEFAULT '/',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_categories_locales" (
  	"label" varchar DEFAULT '',
  	"href" varchar DEFAULT '/',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_quick_links_locales" (
  	"label" varchar DEFAULT '',
  	"href" varchar DEFAULT '/',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_properties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_layout_menu_properties_icon" DEFAULT 'hotel' NOT NULL
  );
  
  CREATE TABLE "site_layout_menu_properties_locales" (
  	"label" varchar DEFAULT '',
  	"href" varchar DEFAULT '/',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_layout_footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_layout_footer_legal_links_locales" (
  	"label" varchar DEFAULT '',
  	"href" varchar DEFAULT '/',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_layout" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logos_header_id" integer,
  	"logos_header_white" boolean DEFAULT true,
  	"logos_menu_id" integer,
  	"logos_favicon_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_layout_locales" (
  	"header_menu_label" varchar DEFAULT 'Resort',
  	"header_reserve_label" varchar DEFAULT 'Reserve',
  	"menu_close_label" varchar DEFAULT 'Close',
  	"menu_view_page_label" varchar DEFAULT 'Lihat Halaman Utama ›',
  	"menu_empty_category_text" varchar DEFAULT 'Temukan informasi lengkap mengenai {nama} di Susan Spa & Resort.',
  	"menu_visit_page_label" varchar DEFAULT 'Kunjungi Halaman',
  	"menu_whatsapp_message" varchar DEFAULT 'Halo Susan Spa & Resort, saya ingin bertanya seputar reservasi.',
  	"menu_weather_location" varchar DEFAULT 'BANDUNGAN, KAB. SEMARANG',
  	"menu_altitude" varchar DEFAULT '(1.100 mdpl)',
  	"menu_property_heading" varchar DEFAULT 'SUSAN SPA & RESORT',
  	"menu_front_desk_heading" varchar DEFAULT 'KONTAK DARURAT & FRONT DESK',
  	"menu_front_desk_label" varchar DEFAULT 'Front Office (24 Jam):',
  	"menu_service_heading" varchar DEFAULT 'LAYANAN INFORMASI & RESERVASI',
  	"menu_service_hours" varchar DEFAULT 'Layanan Tamu: Setiap Hari 07:00 - 22:00 WIB',
  	"menu_properties_heading" varchar DEFAULT 'FASILITAS & DESTINASI KAMI',
  	"footer_copyright" varchar DEFAULT 'Susan Spa & Resort is a registered trademark. © {tahun}. All rights reserved.',
  	"footer_contact_label" varchar DEFAULT 'Contact Us',
  	"footer_contact_href" varchar DEFAULT '/contact',
  	"footer_directions_label" varchar DEFAULT 'Getting Here',
  	"footer_share_label" varchar DEFAULT 'Share',
  	"footer_share_copied_label" varchar DEFAULT 'Tautan disalin',
  	"whatsapp_label" varchar DEFAULT 'WhatsApp Concierge',
  	"whatsapp_message" varchar DEFAULT 'Halo Susan Spa & Resort, perkenalkan saya ingin menanyakan ketersediaan kamar dan paket reservasi. Mohon informasinya, terima kasih.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ui_text" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ui_text_locales" (
  	"common_scroll_hint" varchar DEFAULT 'Explore Below',
  	"room_card_fallback_description" varchar DEFAULT 'Kenyamanan eksklusif di dataran tinggi Bandungan.',
  	"room_card_size_label" varchar DEFAULT 'Luas Kamar',
  	"room_card_capacity_label" varchar DEFAULT 'Kapasitas',
  	"room_card_bed_label" varchar DEFAULT 'Tipe Kasur',
  	"room_card_amenities_label" varchar DEFAULT 'Fasilitas Kamar',
  	"room_card_detail_button" varchar DEFAULT 'Detail Kamar',
  	"room_detail_back" varchar DEFAULT 'Kembali ke Semua Kamar',
  	"room_detail_breadcrumb" varchar DEFAULT 'Kamar',
  	"room_detail_fallback_description" varchar DEFAULT 'Pilihan akomodasi eksklusif di Susan Spa & Resort.',
  	"room_detail_availability_eyebrow" varchar DEFAULT 'Ketersediaan & Reservasi',
  	"room_detail_reserve_button" varchar DEFAULT 'Reservasi Kamar Ini',
  	"room_detail_capacity_label" varchar DEFAULT 'Kapasitas Tamu',
  	"room_detail_size_label" varchar DEFAULT 'Luas Kamar',
  	"room_detail_bed_label" varchar DEFAULT 'Tipe Kasur',
  	"room_detail_view_label" varchar DEFAULT 'Pemandangan',
  	"room_detail_unknown_value" varchar DEFAULT 'Sesuai konfirmasi',
  	"room_detail_default_view" varchar DEFAULT 'Pegunungan & Lembah Asri',
  	"room_detail_description_heading" varchar DEFAULT 'Deskripsi Kamar',
  	"room_detail_fallback_long_description" varchar DEFAULT 'Silakan hubungi tim reservasi kami untuk informasi lebih lengkap mengenai tipe kamar ini.',
  	"room_detail_amenities_heading" varchar DEFAULT 'Fasilitas Kamar',
  	"room_detail_amenities_empty" varchar DEFAULT 'Data fasilitas kamar sedang diperbarui oleh tim hotel. Silakan hubungi reservasi kami untuk detail lengkap.',
  	"room_detail_check_eyebrow" varchar DEFAULT 'CEK KETERSEDIAAN',
  	"room_detail_check_title" varchar DEFAULT 'Rencanakan Menginap Anda',
  	"room_detail_check_in_label" varchar DEFAULT 'Tanggal Check-In',
  	"room_detail_check_out_label" varchar DEFAULT 'Tanggal Check-Out',
  	"room_detail_check_button" varchar DEFAULT 'Cek Ketersediaan Kamar',
  	"room_detail_whatsapp_button" varchar DEFAULT 'Konsultasi via WhatsApp',
  	"room_detail_whatsapp_message" varchar DEFAULT 'Halo Susan Spa & Resort, saya ingin reservasi untuk kamar {nama}.',
  	"room_detail_policy_note" varchar DEFAULT 'Konfirmasi ketersediaan dan ketentuan reservasi akan dibantu langsung oleh tim reservasi kami.',
  	"room_detail_related_eyebrow" varchar DEFAULT 'PILIHAN LAINNYA',
  	"room_detail_related_title" varchar DEFAULT 'Pilihan Kamar Terkait',
  	"room_detail_view_all" varchar DEFAULT 'Lihat Semua Kamar',
  	"treatment_card_duration" varchar DEFAULT '{menit} Menit Perawatan',
  	"treatment_card_benefits_heading" varchar DEFAULT 'Manfaat Utama',
  	"treatment_card_book_button" varchar DEFAULT 'Reservasi Perawatan',
  	"wedding_detail_back" varchar DEFAULT 'Kembali ke Pilihan Paket Pernikahan',
  	"wedding_detail_breadcrumb" varchar DEFAULT 'Pernikahan',
  	"wedding_detail_eyebrow" varchar DEFAULT 'PERNIKAHAN & PERAYAAN SAKRAL',
  	"wedding_detail_consult_eyebrow" varchar DEFAULT 'KONSULTASI PERNIKAHAN',
  	"wedding_detail_consult_button" varchar DEFAULT 'Konsultasi Pernikahan',
  	"wedding_detail_capacity_label" varchar DEFAULT 'Kapasitas Tamu',
  	"wedding_detail_capacity_fallback" varchar DEFAULT 'Sesuai reservasi',
  	"wedding_detail_venue_label" varchar DEFAULT 'Venue Utama',
  	"wedding_detail_venue_fallback" varchar DEFAULT 'La Kana Chapel',
  	"wedding_detail_schedule_label" varchar DEFAULT 'Jadwal & Sesi Acara',
  	"wedding_detail_schedule_fallback" varchar DEFAULT 'Pagi / Sore',
  	"wedding_detail_description_heading" varchar DEFAULT 'Deskripsi Paket',
  	"wedding_detail_inclusions_heading" varchar DEFAULT 'Fasilitas & Inklusi Paket',
  	"wedding_detail_cta_title" varchar DEFAULT 'Rencanakan Momen Bahagia Anda',
  	"wedding_detail_cta_body" varchar DEFAULT 'Konsultasikan konsep pernikahan impian Anda bersama tim wedding coordinator Susan Spa & Resort.',
  	"wedding_detail_proposal_button" varchar DEFAULT 'Ajukan Konsultasi & Proposal',
  	"wedding_detail_whatsapp_button" varchar DEFAULT 'Chat WhatsApp Wedding Specialist',
  	"wedding_detail_whatsapp_message" varchar DEFAULT 'Halo Susan Spa & Resort, saya tertarik berkonsultasi mengenai {nama}.',
  	"nearby_distance_card" varchar DEFAULT '{jarak} dari Resort',
  	"nearby_detail_button" varchar DEFAULT 'Lihat Detail',
  	"nearby_directions_button" varchar DEFAULT 'Petunjuk Arah',
  	"nearby_back" varchar DEFAULT 'Kembali ke Wisata Sekitar',
  	"nearby_breadcrumb" varchar DEFAULT 'Wisata Bandungan',
  	"nearby_distance_badge" varchar DEFAULT '{jarak} dari Susan Spa & Resort',
  	"nearby_maps_button" varchar DEFAULT 'Petunjuk Arah (Google Maps)',
  	"nearby_stay_button" varchar DEFAULT 'Menginap di Susan Spa & Resort',
  	"nearby_about_heading" varchar DEFAULT 'Tentang {nama}',
  	"nearby_tips_heading" varchar DEFAULT 'Tips Kunjungan & Kenyamanan',
  	"nearby_info_eyebrow" varchar DEFAULT 'INFORMASI DESTINASI',
  	"nearby_distance_label" varchar DEFAULT 'Jarak Tempuh',
  	"nearby_address_label" varchar DEFAULT 'Alamat Lokasi',
  	"nearby_open_maps_button" varchar DEFAULT 'Buka Petunjuk Arah',
  	"nearby_banner_eyebrow" varchar DEFAULT 'LIBURAN PEGUNUNGAN NYAMAN',
  	"nearby_banner_title" varchar DEFAULT 'Istirahat Nyaman di Susan Spa & Resort',
  	"nearby_banner_body" varchar DEFAULT 'Jadikan Susan Spa & Resort sebagai tempat peristirahatan sempurna setelah seharian menjelajahi keindahan Bandungan.',
  	"nearby_banner_button" varchar DEFAULT 'Pilihan Kamar & Villa',
  	"journal_detail_back" varchar DEFAULT 'Kembali ke Jurnal',
  	"journal_detail_not_found" varchar DEFAULT 'Artikel Tidak Ditemukan',
  	"journal_detail_byline" varchar DEFAULT 'Oleh {nama} ({peran})',
  	"reservation_modal_eyebrow" varchar DEFAULT 'Layanan Reservasi & Informasi',
  	"reservation_modal_title" varchar DEFAULT 'Rencanakan Kunjungan Istimewa Anda',
  	"reservation_modal_intro" varchar DEFAULT 'Silakan lengkapi formulir di bawah ini. Tim concierge kami akan dengan senang hati memeriksa ketersediaan dan menghubungi Anda secara pribadi.',
  	"reservation_modal_success_title" varchar DEFAULT 'Permintaan Reservasi Telah Diterima',
  	"reservation_modal_success_body" varchar DEFAULT 'Tim concierge Susan Spa & Resort akan segera menghubungi Anda melalui WhatsApp atau email untuk konfirmasi ketersediaan kamar dan panduan pembayaran.',
  	"reservation_modal_whatsapp_button" varchar DEFAULT 'Hubungi WhatsApp Concierge',
  	"reservation_modal_close_button" varchar DEFAULT 'Tutup Jendela',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_home_featured_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_home_featured_rooms_locales" (
  	"slug" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_home_best_of" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "page_home_best_of_locales" (
  	"title" varchar DEFAULT '',
  	"href" varchar DEFAULT '/',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_video_id" integer,
  	"hero_poster_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_home_locales" (
  	"hero_title" varchar DEFAULT 'Susan Spa & Resort',
  	"hero_subtitle" varchar DEFAULT 'Ketenangan Alam. Kenyamanan Berkelas.',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi Resort',
  	"intro_eyebrow" varchar DEFAULT 'SELAMAT DATANG DI BANDUNGAN',
  	"intro_title" varchar DEFAULT 'Ketenangan di Atas Awan, Ketinggian 1.100 Meter',
  	"intro_intro" varchar DEFAULT 'Susan Spa & Resort merupakan destinasi peristirahatan dan pemulihan jiwa di lereng Gunung Ungaran, Bandungan. Dikelilingi udara pegunungan yang senantiasa sejuk dan panorama lembah hijau yang membentang luas, kami menyambut kehadiran Anda untuk menikmati perpaduan kenyamanan akomodasi modern serta ketenangan alam yang bersahaja.
  
  Setiap sudut resort dirancang secara cermat guna memberikan ruang bernapas yang leluasa: melepas kepenatan rutinitas harian, menikmati ritual herbal luhur di Spa on the Sky, dan merayakan momen berharga bersama keluarga.',
  	"intro_link_label" varchar DEFAULT 'Jelajahi Seluruh Fasilitas Resort',
  	"intro_link_url" varchar DEFAULT '/facilities',
  	"rooms_title" varchar DEFAULT 'The Villas',
  	"rooms_intro" varchar DEFAULT 'Dari peristirahatan romantis pasangan hingga hunian luas villa keluarga, setiap akomodasi di Susan Spa & Resort menghadirkan suaka privat dengan ketenangan dan karakter tersendiri.',
  	"rooms_card_label" varchar DEFAULT 'SUSAN SPA & RESORT',
  	"rooms_button_label" varchar DEFAULT 'VIEW ALL VILLAS',
  	"best_of_title" varchar DEFAULT 'The Best of Susan Spa',
  	"location_eyebrow" varchar DEFAULT 'LOKASI & AKSES RESORT',
  	"location_title" varchar DEFAULT 'Kunjungi Susan Spa & Resort di Bandungan',
  	"location_intro" varchar DEFAULT '{alamat}. Berada di ketinggian ±1.100 mdpl lereng Gunung Ungaran dengan udara sejuk dan pemandangan asri.',
  	"maps_button_label" varchar DEFAULT 'Buka Google Maps',
  	"directions_button_label" varchar DEFAULT 'Chat Petunjuk Arah',
  	"directions_message" varchar DEFAULT 'Halo Susan Spa & Resort, mohon panduan arah menuju lokasi resort.',
  	"seo_title" varchar DEFAULT '',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_about_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_page_about_pillars_icon" DEFAULT 'compass' NOT NULL
  );
  
  CREATE TABLE "page_about_pillars_locales" (
  	"title" varchar DEFAULT '',
  	"body" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_about_locales" (
  	"hero_image_alt" varchar DEFAULT 'Suasana Susan Spa & Resort',
  	"hero_title" varchar DEFAULT 'Peristirahatan Sejuk di Atas Bandungan',
  	"hero_subtitle" varchar DEFAULT 'KISAH & FILOSOFI KAMI',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi',
  	"story_title" varchar DEFAULT 'Kesejukan Alami & Keramahan Penuh Ketulusan',
  	"story_body" varchar DEFAULT 'Dihadirkan sebagai tempat rehat yang menenangkan dari padatnya ritme perkotaan, Susan Spa & Resort memadukan keramahtamahan tradisi Jawa dengan fasilitas kenyamanan modern. Dikelilingi udara pegunungan yang bersih, rimbunnya pepohonan lereng bukit, dan panorama lembah yang membentang luas.',
  	"seo_title" varchar DEFAULT 'Tentang Kami',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_rooms_locales" (
  	"hero_image_alt" varchar DEFAULT 'Kamar dan suite Susan Spa & Resort',
  	"hero_title" varchar DEFAULT 'Koleksi Kamar & Villa',
  	"hero_subtitle" varchar DEFAULT 'PILIHAN AKOMODASI RESORT',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi Kamar',
  	"all_filter_label" varchar DEFAULT 'Semua Kamar ({jumlah})',
  	"seo_title" varchar DEFAULT 'Kamar, Suite & Villa',
  	"seo_description" varchar DEFAULT 'Kenyamanan, kehangatan, dan ketenangan lereng pegunungan Bandungan. Jelajahi 11 pilihan suite, villa, dan kamar keluarga kami.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_spa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_spa_locales" (
  	"hero_image_alt" varchar DEFAULT 'Ruang perawatan Susan Spa',
  	"hero_title" varchar DEFAULT 'Ritual Spa Tradisional',
  	"hero_subtitle" varchar DEFAULT 'KESEGARAN & KETENANGAN ALAMI',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi Perawatan',
  	"menu_eyebrow" varchar DEFAULT 'PILIHAN PERAWATAN SPA',
  	"menu_title" varchar DEFAULT 'Pengalaman Relaksasi Menyeluruh',
  	"menu_intro" varchar DEFAULT '',
  	"seo_title" varchar DEFAULT 'Spa & Wellness Sanctuary',
  	"seo_description" varchar DEFAULT 'Rasakan kesegaran ritual lulur rempah tradisional Jawa, terapi batu basal hangat Gunung Ungaran, dan hidroterapi di Susan Spa & Resort.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_dining" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_dining_locales" (
  	"hero_image_alt" varchar DEFAULT 'Sky Garden Restaurant',
  	"hero_title" varchar DEFAULT 'Restoran & Kuliner Pilihan',
  	"hero_subtitle" varchar DEFAULT 'PENGALAMAN KULINER PEGUNUNGAN',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi',
  	"menu_heading" varchar DEFAULT 'Menu Pilihan',
  	"reserve_button_label" varchar DEFAULT 'Reservasi Meja Restoran',
  	"reserve_message" varchar DEFAULT 'Halo Tim Restoran Susan Spa & Resort, saya ingin reservasi meja di {nama}.',
  	"whatsapp_message" varchar DEFAULT 'Halo Concierge Restoran Susan Spa, saya ingin menanyakan reservasi meja di Sky Garden Restaurant.',
  	"seo_title" varchar DEFAULT 'Restoran & Kafe',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_experiences_locales" (
  	"hero_image_alt" varchar DEFAULT 'Aktivitas di sekitar resort',
  	"hero_title" varchar DEFAULT 'Pengalaman Berkesan di Dataran Tinggi',
  	"hero_subtitle" varchar DEFAULT 'AKTIVITAS & EKSPLORASI RESORT',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi',
  	"reserve_button_label" varchar DEFAULT 'Reservasi Aktivitas',
  	"seo_title" varchar DEFAULT 'Pengalaman',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_facilities_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" "enum_page_facilities_groups_category" DEFAULT 'Wellness' NOT NULL
  );
  
  CREATE TABLE "page_facilities_groups_locales" (
  	"label" varchar DEFAULT '',
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_facilities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_facilities_locales" (
  	"hero_image_alt" varchar DEFAULT 'Fasilitas Susan Spa & Resort',
  	"hero_title" varchar DEFAULT 'Fasilitas Resort',
  	"hero_subtitle" varchar DEFAULT 'FASILITAS & PENGALAMAN RESORT',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi Fasilitas',
  	"all_filter_label" varchar DEFAULT 'Semua Fasilitas',
  	"cta_eyebrow" varchar DEFAULT 'PERISTIRAHATAN MENENANGKAN DI BANDUNGAN',
  	"cta_title" varchar DEFAULT 'Nikmati Pengalaman Menenangkan Bersama Kami',
  	"cta_intro" varchar DEFAULT 'Kami mengundang Bapak/Ibu untuk menikmati seluruh fasilitas unggulan Susan Spa & Resort dalam suasana pegunungan yang asri dan sejuk.',
  	"cta_button_label" varchar DEFAULT 'Reservasi Kamar Sekarang',
  	"seo_title" varchar DEFAULT 'Fasilitas',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_gallery_locales" (
  	"hero_image_alt" varchar DEFAULT 'Galeri Susan Spa & Resort',
  	"hero_title" varchar DEFAULT 'Galeri Susan Spa',
  	"hero_subtitle" varchar DEFAULT 'MOMEN & KEINDAHAN RESORT',
  	"hero_scroll_label" varchar DEFAULT 'Lihat Galeri',
  	"seo_title" varchar DEFAULT 'Galeri',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_nearby" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_nearby_locales" (
  	"hero_image_alt" varchar DEFAULT 'Pemandangan Bandungan',
  	"hero_title" varchar DEFAULT 'Wisata Sekitar',
  	"hero_subtitle" varchar DEFAULT 'PANDUAN DESTINASI',
  	"hero_scroll_label" varchar DEFAULT 'Lihat Destinasi',
  	"seo_title" varchar DEFAULT 'Wisata Sekitar',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_offers_locales" (
  	"hero_image_alt" varchar DEFAULT 'Paket menginap Susan Spa & Resort',
  	"hero_title" varchar DEFAULT 'Paket Menginap Pilihan',
  	"hero_subtitle" varchar DEFAULT 'PENAWARAN SPESIAL',
  	"hero_scroll_label" varchar DEFAULT 'Lihat Paket',
  	"inclusions_heading" varchar DEFAULT 'Inklusi Paket',
  	"reserve_button_label" varchar DEFAULT 'Tanya Ketersediaan Paket',
  	"seo_title" varchar DEFAULT 'Promo & Paket',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_wedding_venue_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" "enum_page_wedding_venue_list_icon" DEFAULT 'church' NOT NULL
  );
  
  CREATE TABLE "page_wedding_venue_list_locales" (
  	"label" varchar DEFAULT '',
  	"title" varchar DEFAULT '',
  	"body" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_wedding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_wedding_locales" (
  	"hero_image_alt" varchar DEFAULT 'La Kana Chapel Susan Spa & Resort',
  	"hero_title" varchar DEFAULT 'Tempat Pernikahan Termewah Impian Anda',
  	"hero_subtitle" varchar DEFAULT 'Perayaan Cinta Berlatar Keindahan Gunung Ungaran',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi Paket',
  	"packages_eyebrow" varchar DEFAULT 'PILIHAN PAKET PERNIKAHAN',
  	"packages_title" varchar DEFAULT 'Paket Pernikahan Pilihan',
  	"packages_intro" varchar DEFAULT 'Pilihan paket pernikahan terpadu di Kapel Kaca La Kana, didukung jamuan prasmanan istimewa serta pendampingan wedding coordinator profesional.',
  	"inclusions_heading" varchar DEFAULT 'Fasilitas & Inklusi Utama:',
  	"detail_button_label" varchar DEFAULT 'Detail Paket',
  	"consult_button_label" varchar DEFAULT 'Konsultasi',
  	"venues_eyebrow" varchar DEFAULT 'VENUE PERNIKAHAN IKONIK',
  	"venues_title" varchar DEFAULT 'Pilihan Venue Pernikahan Ikonik',
  	"venues_intro" varchar DEFAULT '',
  	"seo_title" varchar DEFAULT 'Wedding La Kana Chapel',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_ballroom_spaces_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_ballroom_spaces_features_locales" (
  	"label" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_ballroom_spaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "page_ballroom_spaces_locales" (
  	"image_alt" varchar DEFAULT '',
  	"eyebrow" varchar DEFAULT '',
  	"title" varchar DEFAULT '',
  	"body" varchar DEFAULT '',
  	"button_label" varchar DEFAULT 'Konsultasi Acara',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_ballroom" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_ballroom_locales" (
  	"hero_image_alt" varchar DEFAULT 'Ballroom Susan Spa & Resort dengan meja bundar berhias kain emas dan panggung di bagian belakang',
  	"hero_title" varchar DEFAULT 'Ballroom & Meeting Room',
  	"hero_subtitle" varchar DEFAULT 'Resepsi, Seminar & Pertemuan Bisnis',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi',
  	"whatsapp_message" varchar DEFAULT 'Halo Tim Acara Susan Spa & Resort, saya ingin berkonsultasi mengenai penggunaan ballroom dan ruang meeting.',
  	"seo_title" varchar DEFAULT 'Ballroom & Meeting Room',
  	"seo_description" varchar DEFAULT 'Ballroom luas berfasilitas audio-visual modern untuk resepsi, jamuan, dan seminar, serta ruang meeting dengan proyektor dan layanan rehat kopi.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_events_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_events_cards_locales" (
  	"eyebrow" varchar DEFAULT '',
  	"title" varchar DEFAULT '',
  	"body" varchar DEFAULT '',
  	"button_label" varchar DEFAULT 'Konsultasi Acara',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_events_locales" (
  	"hero_image_alt" varchar DEFAULT 'Ruang acara Susan Spa & Resort',
  	"hero_title" varchar DEFAULT 'Ruang Pertemuan & Acara Privat',
  	"hero_subtitle" varchar DEFAULT 'PERTEMUAN BISNIS & GATHERING',
  	"hero_scroll_label" varchar DEFAULT 'Jelajahi',
  	"whatsapp_message" varchar DEFAULT 'Halo Tim Acara Susan Spa & Resort, saya ingin berkonsultasi mengenai penyelenggaraan meeting/gathering.',
  	"seo_title" varchar DEFAULT 'Ruang Pertemuan & Acara Privat',
  	"seo_description" varchar DEFAULT 'Penyelenggaraan retreat perusahaan, rapat kerja strategis, dan acara gathering keluarga di sejuknya lereng Bandungan.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_journal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_journal_locales" (
  	"hero_eyebrow" varchar DEFAULT 'ARTIKEL & INSPIRASI',
  	"hero_title" varchar DEFAULT 'Jurnal Susan Spa & Resort',
  	"hero_intro" varchar DEFAULT 'Inspirasi kebugaran alami, panduan pernikahan impian, dan kisah perjalanan di lereng pegunungan Bandungan.',
  	"read_more_label" varchar DEFAULT 'Baca Selengkapnya',
  	"seo_title" varchar DEFAULT 'Jurnal & Inspirasi',
  	"seo_description" varchar DEFAULT 'Inspirasi kebugaran alami, panduan pernikahan sakral, dan kisah perjalanan di lereng pegunungan Bandungan.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_contact_locales" (
  	"hero_eyebrow" varchar DEFAULT 'HUBUNGI KAMI',
  	"hero_title" varchar DEFAULT 'Kontak & Lokasi Resort',
  	"hero_intro" varchar DEFAULT 'Kami siap melayani kebutuhan informasi, reservasi kamar, jadwal spa, hingga konsultasi pernikahan Anda di Susan Spa & Resort.',
  	"location_eyebrow" varchar DEFAULT 'ALAMAT RESMI & LAYANAN CONCIERGE',
  	"location_title" varchar DEFAULT 'Lokasi di Dataran Tinggi Bandungan',
  	"location_intro" varchar DEFAULT 'Susan Spa & Resort terletak di dataran tinggi lereng Gunung Ungaran (~1.100 mdpl) dengan suasana sejuk dan pemandangan lembah yang memukau.',
  	"address_card_title" varchar DEFAULT 'Alamat Susan Spa & Resort',
  	"whatsapp_eyebrow" varchar DEFAULT 'Respon Cepat',
  	"whatsapp_title" varchar DEFAULT 'WhatsApp Concierge',
  	"whatsapp_body" varchar DEFAULT 'Konsultasi cepat dan ramah bersama staf reservasi kami.',
  	"whatsapp_message" varchar DEFAULT 'Halo Susan Spa & Resort, saya ingin bertanya tentang informasi reservasi.',
  	"form_eyebrow" varchar DEFAULT 'FORMULIR PERTANYAAN & RESERVASI',
  	"form_title" varchar DEFAULT 'Kirim Pesan Kepada Kami',
  	"form_intro" varchar DEFAULT 'Silakan sampaikan pertanyaan atau rencana kunjungan Anda, tim concierge kami akan segera merespons dengan senang hati.',
  	"success_title" varchar DEFAULT 'Terima Kasih',
  	"success_body" varchar DEFAULT 'Pesan Anda telah berhasil kami terima. Tim reservasi kami akan merespons melalui Email atau WhatsApp segera.',
  	"map_eyebrow" varchar DEFAULT 'PETA LOKASI INTERAKTIF',
  	"map_title" varchar DEFAULT 'Petunjuk Arah Google Maps',
  	"map_intro" varchar DEFAULT '',
  	"map_button_label" varchar DEFAULT 'Buka Rute Perjalanan',
  	"seo_title" varchar DEFAULT 'Kontak & Lokasi',
  	"seo_description" varchar DEFAULT 'Hubungi concierge Susan Spa & Resort Bandungan untuk reservasi kamar, perawatan spa, paket pernikahan, dan acara pertemuan.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_reserve_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_reserve_benefits_locales" (
  	"label" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_reserve" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_reserve_locales" (
  	"hero_eyebrow" varchar DEFAULT 'LAYANAN RESERVASI RESMI',
  	"hero_title" varchar DEFAULT 'Rencanakan Kunjungan Anda di Susan Spa & Resort',
  	"hero_intro" varchar DEFAULT 'Ketinggian ±1.100 mdpl lereng Gunung Ungaran, Bandungan. Silakan lengkapi formulir reservasi di bawah ini atau hubungi tim reservasi kami secara langsung via WhatsApp.',
  	"success_title" varchar DEFAULT 'Permintaan Reservasi Berhasil Diterima',
  	"help_title" varchar DEFAULT 'Butuh Bantuan Cepat?',
  	"help_subtitle" varchar DEFAULT 'Hubungi langsung staf concierge Susan Spa',
  	"help_body" varchar DEFAULT 'Untuk pertanyaan ketersediaan tanggal, promo grup, atau pengaturan pernikahan di La Kana, tim kami aktif melayani setiap hari:',
  	"help_hours" varchar DEFAULT 'Pelayanan Chat: 07.00 - 22.00 WIB',
  	"help_button_label" varchar DEFAULT 'Chat WhatsApp Resmi',
  	"help_message" varchar DEFAULT 'Halo Susan Spa & Resort, saya ingin bertanya mengenai ketersediaan reservasi penginapan.',
  	"benefits_title" varchar DEFAULT 'Keuntungan Reservasi Langsung',
  	"seo_title" varchar DEFAULT 'Reservasi',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_privacy_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_privacy_sections_locales" (
  	"heading" varchar DEFAULT '',
  	"body" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_privacy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_privacy_locales" (
  	"title" varchar DEFAULT 'Kebijakan Privasi',
  	"updated" varchar DEFAULT 'Pembaruan Terakhir: Agustus 2026',
  	"seo_title" varchar DEFAULT 'Kebijakan Privasi',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_terms_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_terms_sections_locales" (
  	"heading" varchar DEFAULT '',
  	"body" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_terms_locales" (
  	"title" varchar DEFAULT 'Syarat & Ketentuan',
  	"updated" varchar DEFAULT 'Pembaruan Terakhir: Agustus 2026',
  	"seo_title" varchar DEFAULT 'Syarat & Ketentuan',
  	"seo_description" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "page_heroes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_heroes" CASCADE;
  ALTER TABLE "spa_treatments_locales" ADD COLUMN "category_label" varchar DEFAULT 'Spa';
  ALTER TABLE "_spa_treatments_v_locales" ADD COLUMN "version_category_label" varchar DEFAULT 'Spa';
  ALTER TABLE "wedding_packages_locales" ADD COLUMN "category" varchar;
  ALTER TABLE "_wedding_packages_v_locales" ADD COLUMN "version_category" varchar;
  ALTER TABLE "resort_content" ADD COLUMN "facility_category" "enum_resort_content_facility_category" DEFAULT 'Wellness';
  ALTER TABLE "resort_content" ADD COLUMN "map_url" varchar;
  ALTER TABLE "resort_content_locales" ADD COLUMN "category_label" varchar;
  ALTER TABLE "resort_content_locales" ADD COLUMN "operating_hours" varchar;
  ALTER TABLE "resort_content_locales" ADD COLUMN "duration" varchar;
  ALTER TABLE "resort_content_locales" ADD COLUMN "address" varchar;
  ALTER TABLE "resort_content_locales" ADD COLUMN "tips" varchar;
  ALTER TABLE "_resort_content_v" ADD COLUMN "version_facility_category" "enum__resort_content_v_version_facility_category" DEFAULT 'Wellness';
  ALTER TABLE "_resort_content_v" ADD COLUMN "version_map_url" varchar;
  ALTER TABLE "_resort_content_v_locales" ADD COLUMN "version_category_label" varchar;
  ALTER TABLE "_resort_content_v_locales" ADD COLUMN "version_operating_hours" varchar;
  ALTER TABLE "_resort_content_v_locales" ADD COLUMN "version_duration" varchar;
  ALTER TABLE "_resort_content_v_locales" ADD COLUMN "version_address" varchar;
  ALTER TABLE "_resort_content_v_locales" ADD COLUMN "version_tips" varchar;
  ALTER TABLE "journal_articles" ADD COLUMN "author_name" varchar;
  ALTER TABLE "journal_articles" ADD COLUMN "author_avatar_id" integer;
  ALTER TABLE "journal_articles_locales" ADD COLUMN "quote" varchar;
  ALTER TABLE "journal_articles_locales" ADD COLUMN "author_role" varchar;
  ALTER TABLE "journal_articles_locales" ADD COLUMN "read_time" varchar;
  ALTER TABLE "_journal_articles_v" ADD COLUMN "version_author_name" varchar;
  ALTER TABLE "_journal_articles_v" ADD COLUMN "version_author_avatar_id" integer;
  ALTER TABLE "_journal_articles_v_locales" ADD COLUMN "version_quote" varchar;
  ALTER TABLE "_journal_articles_v_locales" ADD COLUMN "version_author_role" varchar;
  ALTER TABLE "_journal_articles_v_locales" ADD COLUMN "version_read_time" varchar;
  ALTER TABLE "offers_locales" ADD COLUMN "badge" varchar DEFAULT 'Special Offer';
  ALTER TABLE "offers_locales" ADD COLUMN "validity_label" varchar;
  ALTER TABLE "_offers_v_locales" ADD COLUMN "version_badge" varchar DEFAULT 'Special Offer';
  ALTER TABLE "_offers_v_locales" ADD COLUMN "version_validity_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "google_maps_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "map_embed_url" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_google_maps_url" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_map_embed_url" varchar;
  ALTER TABLE "wedding_packages_schedule" ADD CONSTRAINT "wedding_packages_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wedding_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wedding_packages_schedule_locales" ADD CONSTRAINT "wedding_packages_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wedding_packages_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wedding_packages_gallery" ADD CONSTRAINT "wedding_packages_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wedding_packages_gallery" ADD CONSTRAINT "wedding_packages_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wedding_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v_version_schedule" ADD CONSTRAINT "_wedding_packages_v_version_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wedding_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v_version_schedule_locales" ADD CONSTRAINT "_wedding_packages_v_version_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wedding_packages_v_version_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v_version_gallery" ADD CONSTRAINT "_wedding_packages_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wedding_packages_v_version_gallery" ADD CONSTRAINT "_wedding_packages_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wedding_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resort_content_highlights" ADD CONSTRAINT "resort_content_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resort_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resort_content_highlights_locales" ADD CONSTRAINT "resort_content_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resort_content_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resort_content_v_version_highlights" ADD CONSTRAINT "_resort_content_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_resort_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resort_content_v_version_highlights_locales" ADD CONSTRAINT "_resort_content_v_version_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_resort_content_v_version_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_inclusions" ADD CONSTRAINT "offers_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_inclusions_locales" ADD CONSTRAINT "offers_inclusions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers_inclusions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_version_inclusions" ADD CONSTRAINT "_offers_v_version_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_version_inclusions_locales" ADD CONSTRAINT "_offers_v_version_inclusions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v_version_inclusions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_categories_links" ADD CONSTRAINT "site_layout_menu_categories_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout_menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_categories_links_locales" ADD CONSTRAINT "site_layout_menu_categories_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout_menu_categories_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_categories" ADD CONSTRAINT "site_layout_menu_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_categories_locales" ADD CONSTRAINT "site_layout_menu_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout_menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_quick_links" ADD CONSTRAINT "site_layout_menu_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_quick_links_locales" ADD CONSTRAINT "site_layout_menu_quick_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout_menu_quick_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_properties" ADD CONSTRAINT "site_layout_menu_properties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_menu_properties_locales" ADD CONSTRAINT "site_layout_menu_properties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout_menu_properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_footer_legal_links" ADD CONSTRAINT "site_layout_footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout_footer_legal_links_locales" ADD CONSTRAINT "site_layout_footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout_footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_layout" ADD CONSTRAINT "site_layout_logos_header_id_media_id_fk" FOREIGN KEY ("logos_header_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_layout" ADD CONSTRAINT "site_layout_logos_menu_id_media_id_fk" FOREIGN KEY ("logos_menu_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_layout" ADD CONSTRAINT "site_layout_logos_favicon_id_media_id_fk" FOREIGN KEY ("logos_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_layout_locales" ADD CONSTRAINT "site_layout_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ui_text_locales" ADD CONSTRAINT "ui_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ui_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_featured_rooms" ADD CONSTRAINT "page_home_featured_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_featured_rooms_locales" ADD CONSTRAINT "page_home_featured_rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_featured_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_best_of" ADD CONSTRAINT "page_home_best_of_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_home_best_of" ADD CONSTRAINT "page_home_best_of_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_best_of_locales" ADD CONSTRAINT "page_home_best_of_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_best_of"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home" ADD CONSTRAINT "page_home_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_home" ADD CONSTRAINT "page_home_hero_poster_id_media_id_fk" FOREIGN KEY ("hero_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_home_locales" ADD CONSTRAINT "page_home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_about_pillars" ADD CONSTRAINT "page_about_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_about_pillars_locales" ADD CONSTRAINT "page_about_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_about" ADD CONSTRAINT "page_about_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_about_locales" ADD CONSTRAINT "page_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_rooms" ADD CONSTRAINT "page_rooms_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_rooms_locales" ADD CONSTRAINT "page_rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_spa" ADD CONSTRAINT "page_spa_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_spa_locales" ADD CONSTRAINT "page_spa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_spa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_dining" ADD CONSTRAINT "page_dining_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_dining_locales" ADD CONSTRAINT "page_dining_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_dining"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_experiences" ADD CONSTRAINT "page_experiences_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_experiences_locales" ADD CONSTRAINT "page_experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_facilities_groups" ADD CONSTRAINT "page_facilities_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_facilities_groups_locales" ADD CONSTRAINT "page_facilities_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_facilities_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_facilities" ADD CONSTRAINT "page_facilities_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_facilities_locales" ADD CONSTRAINT "page_facilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_gallery" ADD CONSTRAINT "page_gallery_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_gallery_locales" ADD CONSTRAINT "page_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_nearby" ADD CONSTRAINT "page_nearby_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_nearby_locales" ADD CONSTRAINT "page_nearby_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_nearby"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_offers" ADD CONSTRAINT "page_offers_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_offers_locales" ADD CONSTRAINT "page_offers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_wedding_venue_list" ADD CONSTRAINT "page_wedding_venue_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_wedding_venue_list" ADD CONSTRAINT "page_wedding_venue_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_wedding"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_wedding_venue_list_locales" ADD CONSTRAINT "page_wedding_venue_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_wedding_venue_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_wedding" ADD CONSTRAINT "page_wedding_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_wedding_locales" ADD CONSTRAINT "page_wedding_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_wedding"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_ballroom_spaces_features" ADD CONSTRAINT "page_ballroom_spaces_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_ballroom_spaces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_ballroom_spaces_features_locales" ADD CONSTRAINT "page_ballroom_spaces_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_ballroom_spaces_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_ballroom_spaces" ADD CONSTRAINT "page_ballroom_spaces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_ballroom_spaces" ADD CONSTRAINT "page_ballroom_spaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_ballroom"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_ballroom_spaces_locales" ADD CONSTRAINT "page_ballroom_spaces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_ballroom_spaces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_ballroom" ADD CONSTRAINT "page_ballroom_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_ballroom_locales" ADD CONSTRAINT "page_ballroom_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_ballroom"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_events_cards" ADD CONSTRAINT "page_events_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_events_cards_locales" ADD CONSTRAINT "page_events_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_events_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_events" ADD CONSTRAINT "page_events_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_events_locales" ADD CONSTRAINT "page_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_journal_locales" ADD CONSTRAINT "page_journal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_contact_locales" ADD CONSTRAINT "page_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_reserve_benefits" ADD CONSTRAINT "page_reserve_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_reserve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_reserve_benefits_locales" ADD CONSTRAINT "page_reserve_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_reserve_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_reserve_locales" ADD CONSTRAINT "page_reserve_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_reserve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_privacy_sections" ADD CONSTRAINT "page_privacy_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_privacy_sections_locales" ADD CONSTRAINT "page_privacy_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_privacy_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_privacy_locales" ADD CONSTRAINT "page_privacy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_terms_sections" ADD CONSTRAINT "page_terms_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_terms_sections_locales" ADD CONSTRAINT "page_terms_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_terms_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_terms_locales" ADD CONSTRAINT "page_terms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_terms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "wedding_packages_schedule_order_idx" ON "wedding_packages_schedule" USING btree ("_order");
  CREATE INDEX "wedding_packages_schedule_parent_id_idx" ON "wedding_packages_schedule" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "wedding_packages_schedule_locales_locale_parent_id_unique" ON "wedding_packages_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "wedding_packages_gallery_order_idx" ON "wedding_packages_gallery" USING btree ("_order");
  CREATE INDEX "wedding_packages_gallery_parent_id_idx" ON "wedding_packages_gallery" USING btree ("_parent_id");
  CREATE INDEX "wedding_packages_gallery_image_idx" ON "wedding_packages_gallery" USING btree ("image_id");
  CREATE INDEX "_wedding_packages_v_version_schedule_order_idx" ON "_wedding_packages_v_version_schedule" USING btree ("_order");
  CREATE INDEX "_wedding_packages_v_version_schedule_parent_id_idx" ON "_wedding_packages_v_version_schedule" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_wedding_packages_v_version_schedule_locales_locale_parent_i" ON "_wedding_packages_v_version_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_wedding_packages_v_version_gallery_order_idx" ON "_wedding_packages_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_wedding_packages_v_version_gallery_parent_id_idx" ON "_wedding_packages_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_wedding_packages_v_version_gallery_image_idx" ON "_wedding_packages_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "resort_content_highlights_order_idx" ON "resort_content_highlights" USING btree ("_order");
  CREATE INDEX "resort_content_highlights_parent_id_idx" ON "resort_content_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "resort_content_highlights_locales_locale_parent_id_unique" ON "resort_content_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_resort_content_v_version_highlights_order_idx" ON "_resort_content_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_resort_content_v_version_highlights_parent_id_idx" ON "_resort_content_v_version_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_resort_content_v_version_highlights_locales_locale_parent_i" ON "_resort_content_v_version_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "offers_inclusions_order_idx" ON "offers_inclusions" USING btree ("_order");
  CREATE INDEX "offers_inclusions_parent_id_idx" ON "offers_inclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "offers_inclusions_locales_locale_parent_id_unique" ON "offers_inclusions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_offers_v_version_inclusions_order_idx" ON "_offers_v_version_inclusions" USING btree ("_order");
  CREATE INDEX "_offers_v_version_inclusions_parent_id_idx" ON "_offers_v_version_inclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_offers_v_version_inclusions_locales_locale_parent_id_unique" ON "_offers_v_version_inclusions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_layout_menu_categories_links_order_idx" ON "site_layout_menu_categories_links" USING btree ("_order");
  CREATE INDEX "site_layout_menu_categories_links_parent_id_idx" ON "site_layout_menu_categories_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_layout_menu_categories_links_locales_locale_parent_id_u" ON "site_layout_menu_categories_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_layout_menu_categories_order_idx" ON "site_layout_menu_categories" USING btree ("_order");
  CREATE INDEX "site_layout_menu_categories_parent_id_idx" ON "site_layout_menu_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_layout_menu_categories_locales_locale_parent_id_unique" ON "site_layout_menu_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_layout_menu_quick_links_order_idx" ON "site_layout_menu_quick_links" USING btree ("_order");
  CREATE INDEX "site_layout_menu_quick_links_parent_id_idx" ON "site_layout_menu_quick_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_layout_menu_quick_links_locales_locale_parent_id_unique" ON "site_layout_menu_quick_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_layout_menu_properties_order_idx" ON "site_layout_menu_properties" USING btree ("_order");
  CREATE INDEX "site_layout_menu_properties_parent_id_idx" ON "site_layout_menu_properties" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_layout_menu_properties_locales_locale_parent_id_unique" ON "site_layout_menu_properties_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_layout_footer_legal_links_order_idx" ON "site_layout_footer_legal_links" USING btree ("_order");
  CREATE INDEX "site_layout_footer_legal_links_parent_id_idx" ON "site_layout_footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_layout_footer_legal_links_locales_locale_parent_id_uniq" ON "site_layout_footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_layout_logos_logos_header_idx" ON "site_layout" USING btree ("logos_header_id");
  CREATE INDEX "site_layout_logos_logos_menu_idx" ON "site_layout" USING btree ("logos_menu_id");
  CREATE INDEX "site_layout_logos_logos_favicon_idx" ON "site_layout" USING btree ("logos_favicon_id");
  CREATE UNIQUE INDEX "site_layout_locales_locale_parent_id_unique" ON "site_layout_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "ui_text_locales_locale_parent_id_unique" ON "ui_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_featured_rooms_order_idx" ON "page_home_featured_rooms" USING btree ("_order");
  CREATE INDEX "page_home_featured_rooms_parent_id_idx" ON "page_home_featured_rooms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_home_featured_rooms_locales_locale_parent_id_unique" ON "page_home_featured_rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_best_of_order_idx" ON "page_home_best_of" USING btree ("_order");
  CREATE INDEX "page_home_best_of_parent_id_idx" ON "page_home_best_of" USING btree ("_parent_id");
  CREATE INDEX "page_home_best_of_image_idx" ON "page_home_best_of" USING btree ("image_id");
  CREATE UNIQUE INDEX "page_home_best_of_locales_locale_parent_id_unique" ON "page_home_best_of_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_hero_hero_video_idx" ON "page_home" USING btree ("hero_video_id");
  CREATE INDEX "page_home_hero_hero_poster_idx" ON "page_home" USING btree ("hero_poster_id");
  CREATE UNIQUE INDEX "page_home_locales_locale_parent_id_unique" ON "page_home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_about_pillars_order_idx" ON "page_about_pillars" USING btree ("_order");
  CREATE INDEX "page_about_pillars_parent_id_idx" ON "page_about_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_about_pillars_locales_locale_parent_id_unique" ON "page_about_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_about_hero_hero_image_idx" ON "page_about" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_about_locales_locale_parent_id_unique" ON "page_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_rooms_hero_hero_image_idx" ON "page_rooms" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_rooms_locales_locale_parent_id_unique" ON "page_rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_spa_hero_hero_image_idx" ON "page_spa" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_spa_locales_locale_parent_id_unique" ON "page_spa_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_dining_hero_hero_image_idx" ON "page_dining" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_dining_locales_locale_parent_id_unique" ON "page_dining_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_experiences_hero_hero_image_idx" ON "page_experiences" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_experiences_locales_locale_parent_id_unique" ON "page_experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_facilities_groups_order_idx" ON "page_facilities_groups" USING btree ("_order");
  CREATE INDEX "page_facilities_groups_parent_id_idx" ON "page_facilities_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_facilities_groups_locales_locale_parent_id_unique" ON "page_facilities_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_facilities_hero_hero_image_idx" ON "page_facilities" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_facilities_locales_locale_parent_id_unique" ON "page_facilities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_gallery_hero_hero_image_idx" ON "page_gallery" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_gallery_locales_locale_parent_id_unique" ON "page_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_nearby_hero_hero_image_idx" ON "page_nearby" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_nearby_locales_locale_parent_id_unique" ON "page_nearby_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_offers_hero_hero_image_idx" ON "page_offers" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_offers_locales_locale_parent_id_unique" ON "page_offers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_wedding_venue_list_order_idx" ON "page_wedding_venue_list" USING btree ("_order");
  CREATE INDEX "page_wedding_venue_list_parent_id_idx" ON "page_wedding_venue_list" USING btree ("_parent_id");
  CREATE INDEX "page_wedding_venue_list_image_idx" ON "page_wedding_venue_list" USING btree ("image_id");
  CREATE UNIQUE INDEX "page_wedding_venue_list_locales_locale_parent_id_unique" ON "page_wedding_venue_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_wedding_hero_hero_image_idx" ON "page_wedding" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_wedding_locales_locale_parent_id_unique" ON "page_wedding_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_ballroom_spaces_features_order_idx" ON "page_ballroom_spaces_features" USING btree ("_order");
  CREATE INDEX "page_ballroom_spaces_features_parent_id_idx" ON "page_ballroom_spaces_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_ballroom_spaces_features_locales_locale_parent_id_uniqu" ON "page_ballroom_spaces_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_ballroom_spaces_order_idx" ON "page_ballroom_spaces" USING btree ("_order");
  CREATE INDEX "page_ballroom_spaces_parent_id_idx" ON "page_ballroom_spaces" USING btree ("_parent_id");
  CREATE INDEX "page_ballroom_spaces_image_idx" ON "page_ballroom_spaces" USING btree ("image_id");
  CREATE UNIQUE INDEX "page_ballroom_spaces_locales_locale_parent_id_unique" ON "page_ballroom_spaces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_ballroom_hero_hero_image_idx" ON "page_ballroom" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_ballroom_locales_locale_parent_id_unique" ON "page_ballroom_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_events_cards_order_idx" ON "page_events_cards" USING btree ("_order");
  CREATE INDEX "page_events_cards_parent_id_idx" ON "page_events_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_events_cards_locales_locale_parent_id_unique" ON "page_events_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_events_hero_hero_image_idx" ON "page_events" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "page_events_locales_locale_parent_id_unique" ON "page_events_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_journal_locales_locale_parent_id_unique" ON "page_journal_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_contact_locales_locale_parent_id_unique" ON "page_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_reserve_benefits_order_idx" ON "page_reserve_benefits" USING btree ("_order");
  CREATE INDEX "page_reserve_benefits_parent_id_idx" ON "page_reserve_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_reserve_benefits_locales_locale_parent_id_unique" ON "page_reserve_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_reserve_locales_locale_parent_id_unique" ON "page_reserve_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_privacy_sections_order_idx" ON "page_privacy_sections" USING btree ("_order");
  CREATE INDEX "page_privacy_sections_parent_id_idx" ON "page_privacy_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_privacy_sections_locales_locale_parent_id_unique" ON "page_privacy_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_privacy_locales_locale_parent_id_unique" ON "page_privacy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_terms_sections_order_idx" ON "page_terms_sections" USING btree ("_order");
  CREATE INDEX "page_terms_sections_parent_id_idx" ON "page_terms_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_terms_sections_locales_locale_parent_id_unique" ON "page_terms_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "page_terms_locales_locale_parent_id_unique" ON "page_terms_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "journal_articles" ADD CONSTRAINT "journal_articles_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_articles_v" ADD CONSTRAINT "_journal_articles_v_version_author_avatar_id_media_id_fk" FOREIGN KEY ("version_author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "journal_articles_author_avatar_idx" ON "journal_articles" USING btree ("author_avatar_id");
  CREATE INDEX "_journal_articles_v_version_version_author_avatar_idx" ON "_journal_articles_v" USING btree ("version_author_avatar_id");`)

  // Teks yang sekarang tampil di website diisikan ke CMS agar editor langsung melihat dan bisa mengubahnya.
  for (const spec of contentGlobals) {
    const data = initialData(spec.fields)
    const key = spec.slug.replace(/^page-/, '')
    const heroImage = OLD_HERO_KEYS.includes(key) ? oldHero[`${key}_id`] : null
    if (heroImage) (data.hero as Record<string, unknown>).image = heroImage
    await payload.updateGlobal({ slug: spec.slug as never, data: data as never, locale: 'id', req })
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_heroes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about_id" integer,
  	"events_id" integer,
  	"ballroom_id" integer,
  	"dining_id" integer,
  	"experiences_id" integer,
  	"facilities_id" integer,
  	"gallery_id" integer,
  	"nearby_id" integer,
  	"offers_id" integer,
  	"rooms_id" integer,
  	"spa_id" integer,
  	"wedding_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "wedding_packages_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "wedding_packages_schedule_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "wedding_packages_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_wedding_packages_v_version_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_wedding_packages_v_version_schedule_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_wedding_packages_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resort_content_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resort_content_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_resort_content_v_version_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_resort_content_v_version_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers_inclusions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offers_v_version_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offers_v_version_inclusions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_categories_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_categories_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_quick_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_quick_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_properties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_menu_properties_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_footer_legal_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_layout_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ui_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ui_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_featured_rooms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_featured_rooms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_best_of" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_best_of_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_about_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_about_pillars_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_about_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_rooms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_rooms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_spa" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_spa_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_dining" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_dining_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_experiences_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_facilities_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_facilities_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_facilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_facilities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_nearby" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_nearby_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_offers_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_wedding_venue_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_wedding_venue_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_wedding" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_wedding_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_ballroom_spaces_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_ballroom_spaces_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_ballroom_spaces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_ballroom_spaces_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_ballroom" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_ballroom_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_events_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_events_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_events_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_journal" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_journal_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_reserve_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_reserve_benefits_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_reserve" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_reserve_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_privacy_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_privacy_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_privacy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_privacy_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_terms_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_terms_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_terms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_terms_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "wedding_packages_schedule" CASCADE;
  DROP TABLE "wedding_packages_schedule_locales" CASCADE;
  DROP TABLE "wedding_packages_gallery" CASCADE;
  DROP TABLE "_wedding_packages_v_version_schedule" CASCADE;
  DROP TABLE "_wedding_packages_v_version_schedule_locales" CASCADE;
  DROP TABLE "_wedding_packages_v_version_gallery" CASCADE;
  DROP TABLE "resort_content_highlights" CASCADE;
  DROP TABLE "resort_content_highlights_locales" CASCADE;
  DROP TABLE "_resort_content_v_version_highlights" CASCADE;
  DROP TABLE "_resort_content_v_version_highlights_locales" CASCADE;
  DROP TABLE "offers_inclusions" CASCADE;
  DROP TABLE "offers_inclusions_locales" CASCADE;
  DROP TABLE "_offers_v_version_inclusions" CASCADE;
  DROP TABLE "_offers_v_version_inclusions_locales" CASCADE;
  DROP TABLE "site_layout_menu_categories_links" CASCADE;
  DROP TABLE "site_layout_menu_categories_links_locales" CASCADE;
  DROP TABLE "site_layout_menu_categories" CASCADE;
  DROP TABLE "site_layout_menu_categories_locales" CASCADE;
  DROP TABLE "site_layout_menu_quick_links" CASCADE;
  DROP TABLE "site_layout_menu_quick_links_locales" CASCADE;
  DROP TABLE "site_layout_menu_properties" CASCADE;
  DROP TABLE "site_layout_menu_properties_locales" CASCADE;
  DROP TABLE "site_layout_footer_legal_links" CASCADE;
  DROP TABLE "site_layout_footer_legal_links_locales" CASCADE;
  DROP TABLE "site_layout" CASCADE;
  DROP TABLE "site_layout_locales" CASCADE;
  DROP TABLE "ui_text" CASCADE;
  DROP TABLE "ui_text_locales" CASCADE;
  DROP TABLE "page_home_featured_rooms" CASCADE;
  DROP TABLE "page_home_featured_rooms_locales" CASCADE;
  DROP TABLE "page_home_best_of" CASCADE;
  DROP TABLE "page_home_best_of_locales" CASCADE;
  DROP TABLE "page_home" CASCADE;
  DROP TABLE "page_home_locales" CASCADE;
  DROP TABLE "page_about_pillars" CASCADE;
  DROP TABLE "page_about_pillars_locales" CASCADE;
  DROP TABLE "page_about" CASCADE;
  DROP TABLE "page_about_locales" CASCADE;
  DROP TABLE "page_rooms" CASCADE;
  DROP TABLE "page_rooms_locales" CASCADE;
  DROP TABLE "page_spa" CASCADE;
  DROP TABLE "page_spa_locales" CASCADE;
  DROP TABLE "page_dining" CASCADE;
  DROP TABLE "page_dining_locales" CASCADE;
  DROP TABLE "page_experiences" CASCADE;
  DROP TABLE "page_experiences_locales" CASCADE;
  DROP TABLE "page_facilities_groups" CASCADE;
  DROP TABLE "page_facilities_groups_locales" CASCADE;
  DROP TABLE "page_facilities" CASCADE;
  DROP TABLE "page_facilities_locales" CASCADE;
  DROP TABLE "page_gallery" CASCADE;
  DROP TABLE "page_gallery_locales" CASCADE;
  DROP TABLE "page_nearby" CASCADE;
  DROP TABLE "page_nearby_locales" CASCADE;
  DROP TABLE "page_offers" CASCADE;
  DROP TABLE "page_offers_locales" CASCADE;
  DROP TABLE "page_wedding_venue_list" CASCADE;
  DROP TABLE "page_wedding_venue_list_locales" CASCADE;
  DROP TABLE "page_wedding" CASCADE;
  DROP TABLE "page_wedding_locales" CASCADE;
  DROP TABLE "page_ballroom_spaces_features" CASCADE;
  DROP TABLE "page_ballroom_spaces_features_locales" CASCADE;
  DROP TABLE "page_ballroom_spaces" CASCADE;
  DROP TABLE "page_ballroom_spaces_locales" CASCADE;
  DROP TABLE "page_ballroom" CASCADE;
  DROP TABLE "page_ballroom_locales" CASCADE;
  DROP TABLE "page_events_cards" CASCADE;
  DROP TABLE "page_events_cards_locales" CASCADE;
  DROP TABLE "page_events" CASCADE;
  DROP TABLE "page_events_locales" CASCADE;
  DROP TABLE "page_journal" CASCADE;
  DROP TABLE "page_journal_locales" CASCADE;
  DROP TABLE "page_contact" CASCADE;
  DROP TABLE "page_contact_locales" CASCADE;
  DROP TABLE "page_reserve_benefits" CASCADE;
  DROP TABLE "page_reserve_benefits_locales" CASCADE;
  DROP TABLE "page_reserve" CASCADE;
  DROP TABLE "page_reserve_locales" CASCADE;
  DROP TABLE "page_privacy_sections" CASCADE;
  DROP TABLE "page_privacy_sections_locales" CASCADE;
  DROP TABLE "page_privacy" CASCADE;
  DROP TABLE "page_privacy_locales" CASCADE;
  DROP TABLE "page_terms_sections" CASCADE;
  DROP TABLE "page_terms_sections_locales" CASCADE;
  DROP TABLE "page_terms" CASCADE;
  DROP TABLE "page_terms_locales" CASCADE;
  ALTER TABLE "journal_articles" DROP CONSTRAINT "journal_articles_author_avatar_id_media_id_fk";
  
  ALTER TABLE "_journal_articles_v" DROP CONSTRAINT "_journal_articles_v_version_author_avatar_id_media_id_fk";
  
  DROP INDEX "journal_articles_author_avatar_idx";
  DROP INDEX "_journal_articles_v_version_version_author_avatar_idx";
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_about_id_media_id_fk" FOREIGN KEY ("about_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_events_id_media_id_fk" FOREIGN KEY ("events_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_ballroom_id_media_id_fk" FOREIGN KEY ("ballroom_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_dining_id_media_id_fk" FOREIGN KEY ("dining_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_experiences_id_media_id_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_facilities_id_media_id_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_gallery_id_media_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_nearby_id_media_id_fk" FOREIGN KEY ("nearby_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_offers_id_media_id_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_rooms_id_media_id_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_spa_id_media_id_fk" FOREIGN KEY ("spa_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_heroes" ADD CONSTRAINT "page_heroes_wedding_id_media_id_fk" FOREIGN KEY ("wedding_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_heroes_about_idx" ON "page_heroes" USING btree ("about_id");
  CREATE INDEX "page_heroes_events_idx" ON "page_heroes" USING btree ("events_id");
  CREATE INDEX "page_heroes_ballroom_idx" ON "page_heroes" USING btree ("ballroom_id");
  CREATE INDEX "page_heroes_dining_idx" ON "page_heroes" USING btree ("dining_id");
  CREATE INDEX "page_heroes_experiences_idx" ON "page_heroes" USING btree ("experiences_id");
  CREATE INDEX "page_heroes_facilities_idx" ON "page_heroes" USING btree ("facilities_id");
  CREATE INDEX "page_heroes_gallery_idx" ON "page_heroes" USING btree ("gallery_id");
  CREATE INDEX "page_heroes_nearby_idx" ON "page_heroes" USING btree ("nearby_id");
  CREATE INDEX "page_heroes_offers_idx" ON "page_heroes" USING btree ("offers_id");
  CREATE INDEX "page_heroes_rooms_idx" ON "page_heroes" USING btree ("rooms_id");
  CREATE INDEX "page_heroes_spa_idx" ON "page_heroes" USING btree ("spa_id");
  CREATE INDEX "page_heroes_wedding_idx" ON "page_heroes" USING btree ("wedding_id");
  ALTER TABLE "spa_treatments_locales" DROP COLUMN "category_label";
  ALTER TABLE "_spa_treatments_v_locales" DROP COLUMN "version_category_label";
  ALTER TABLE "wedding_packages_locales" DROP COLUMN "category";
  ALTER TABLE "_wedding_packages_v_locales" DROP COLUMN "version_category";
  ALTER TABLE "resort_content" DROP COLUMN "facility_category";
  ALTER TABLE "resort_content" DROP COLUMN "map_url";
  ALTER TABLE "resort_content_locales" DROP COLUMN "category_label";
  ALTER TABLE "resort_content_locales" DROP COLUMN "operating_hours";
  ALTER TABLE "resort_content_locales" DROP COLUMN "duration";
  ALTER TABLE "resort_content_locales" DROP COLUMN "address";
  ALTER TABLE "resort_content_locales" DROP COLUMN "tips";
  ALTER TABLE "_resort_content_v" DROP COLUMN "version_facility_category";
  ALTER TABLE "_resort_content_v" DROP COLUMN "version_map_url";
  ALTER TABLE "_resort_content_v_locales" DROP COLUMN "version_category_label";
  ALTER TABLE "_resort_content_v_locales" DROP COLUMN "version_operating_hours";
  ALTER TABLE "_resort_content_v_locales" DROP COLUMN "version_duration";
  ALTER TABLE "_resort_content_v_locales" DROP COLUMN "version_address";
  ALTER TABLE "_resort_content_v_locales" DROP COLUMN "version_tips";
  ALTER TABLE "journal_articles" DROP COLUMN "author_name";
  ALTER TABLE "journal_articles" DROP COLUMN "author_avatar_id";
  ALTER TABLE "journal_articles_locales" DROP COLUMN "quote";
  ALTER TABLE "journal_articles_locales" DROP COLUMN "author_role";
  ALTER TABLE "journal_articles_locales" DROP COLUMN "read_time";
  ALTER TABLE "_journal_articles_v" DROP COLUMN "version_author_name";
  ALTER TABLE "_journal_articles_v" DROP COLUMN "version_author_avatar_id";
  ALTER TABLE "_journal_articles_v_locales" DROP COLUMN "version_quote";
  ALTER TABLE "_journal_articles_v_locales" DROP COLUMN "version_author_role";
  ALTER TABLE "_journal_articles_v_locales" DROP COLUMN "version_read_time";
  ALTER TABLE "offers_locales" DROP COLUMN "badge";
  ALTER TABLE "offers_locales" DROP COLUMN "validity_label";
  ALTER TABLE "_offers_v_locales" DROP COLUMN "version_badge";
  ALTER TABLE "_offers_v_locales" DROP COLUMN "version_validity_label";
  ALTER TABLE "site_settings" DROP COLUMN "google_maps_url";
  ALTER TABLE "site_settings" DROP COLUMN "map_embed_url";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_google_maps_url";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_map_embed_url";
  DROP TYPE "public"."enum_resort_content_facility_category";
  DROP TYPE "public"."enum__resort_content_v_version_facility_category";
  DROP TYPE "public"."enum_site_layout_menu_properties_icon";
  DROP TYPE "public"."enum_page_about_pillars_icon";
  DROP TYPE "public"."enum_page_facilities_groups_category";
  DROP TYPE "public"."enum_page_wedding_venue_list_icon";`)
}
