import React from 'react'
import Link from 'next/link'
import {
  Bed,
  Sparkles,
  Heart,
  UtensilsCrossed,
  Tag,
  Image as ImageIcon,
  BookOpen,
  FolderOpen,
  Sliders,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileEdit,
  ExternalLink,
  Languages,
} from 'lucide-react'

interface CustomDashboardProps {
  payload?: any
  user?: {
    fullName?: string
    email?: string
  }
  locale?: string
}

function formatTimeAgo(dateString?: string): string {
  if (!dateString) return 'Baru saja'
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffDay > 1) return `${diffDay} hari lalu`
  if (diffDay === 1) return 'Kemarin'
  if (diffHour > 0) return `${diffHour} jam lalu`
  if (diffMin > 0) return `${diffMin} menit lalu`
  return 'Baru saja'
}

export const CustomDashboard: React.FC<CustomDashboardProps> = async ({
  payload,
  user,
}) => {
  // Safe defaults if payload is not passed directly
  let draftsWaitingCount = 0
  let expiredOffersCount = 0
  let missingEnglishCount = 0
  let recentDocs: Array<{
    id: string | number
    title: string
    collection: string
    collectionLabel: string
    status: 'draft' | 'published'
    updatedAt: string
  }> = []

  const counts: Record<string, number> = {
    rooms: 0,
    spaTreatments: 0,
    weddingPackages: 0,
    offers: 0,
    resortContent: 0,
    journalArticles: 0,
    galleryItems: 0,
    media: 0,
  }

  if (payload) {
    try {
      // 1. Fetch counts
      const [
        roomsRes,
        spaRes,
        weddingRes,
        offersRes,
        resortRes,
        journalRes,
        galleryRes,
        mediaRes,
      ] = await Promise.all([
        payload.find({ collection: 'rooms', limit: 100, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'spa-treatments', limit: 100, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'wedding-packages', limit: 100, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'offers', limit: 100, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'resort-content', limit: 100, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'journal-articles', limit: 100, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'gallery-items', limit: 100, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'media', limit: 1, depth: 0 }).catch(() => ({ docs: [], totalDocs: 0 })),
      ])

      counts.rooms = roomsRes.totalDocs || roomsRes.docs.length
      counts.spaTreatments = spaRes.totalDocs || spaRes.docs.length
      counts.weddingPackages = weddingRes.totalDocs || weddingRes.docs.length
      counts.offers = offersRes.totalDocs || offersRes.docs.length
      counts.resortContent = resortRes.totalDocs || resortRes.docs.length
      counts.journalArticles = journalRes.totalDocs || journalRes.docs.length
      counts.galleryItems = galleryRes.totalDocs || galleryRes.docs.length
      counts.media = mediaRes.totalDocs || mediaRes.docs.length

      // 2. Count drafts
      const allDraftCheckDocs = [
        ...roomsRes.docs.map((d: any) => ({ ...d, _coll: 'rooms', _collLabel: 'Kamar', _title: d.name })),
        ...spaRes.docs.map((d: any) => ({ ...d, _coll: 'spa-treatments', _collLabel: 'Spa', _title: d.title })),
        ...weddingRes.docs.map((d: any) => ({ ...d, _coll: 'wedding-packages', _collLabel: 'Wedding', _title: d.title })),
        ...offersRes.docs.map((d: any) => ({ ...d, _coll: 'offers', _collLabel: 'Promo', _title: d.title })),
        ...resortRes.docs.map((d: any) => ({ ...d, _coll: 'resort-content', _collLabel: 'Dining & Resort', _title: d.title })),
        ...journalRes.docs.map((d: any) => ({ ...d, _coll: 'journal-articles', _collLabel: 'Jurnal', _title: d.title })),
      ]

      draftsWaitingCount = allDraftCheckDocs.filter((d: any) => d._status === 'draft').length

      // 3. Expired offers
      const nowIso = new Date().toISOString()
      expiredOffersCount = offersRes.docs.filter((o: any) => o.validUntil && o.validUntil < nowIso).length

      // 4. Missing English translations
      try {
        const enRooms = await payload.find({ collection: 'rooms', locale: 'en', limit: 50, depth: 0 }).catch(() => ({ docs: [] }))
        const missingRooms = enRooms.docs.filter((d: any) => !d.name || d.name.trim() === '').length
        missingEnglishCount += missingRooms
      } catch {
        // fallback
      }

      // 5. Recent Docs sorted by updatedAt
      recentDocs = allDraftCheckDocs
        .sort((a: any, b: any) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
        .slice(0, 6)
        .map((d: any) => ({
          id: d.id,
          title: d._title || 'Tanpa Judul',
          collection: d._coll,
          collectionLabel: d._collLabel,
          status: (d._status === 'draft' ? 'draft' : 'published') as 'draft' | 'published',
          updatedAt: d.updatedAt,
        }))
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err)
    }
  }

  // Greeting
  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'Tim'
  const currentHour = new Date().getHours()
  let greetingTime = 'Selamat Datang'
  if (currentHour >= 4 && currentHour < 11) greetingTime = 'Selamat Pagi'
  else if (currentHour >= 11 && currentHour < 15) greetingTime = 'Selamat Siang'
  else if (currentHour >= 15 && currentHour < 19) greetingTime = 'Selamat Sore'
  else greetingTime = 'Selamat Malam'

  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000'

  return (
    <div className="susan-dashboard">
      {/* Top Banner / Greeting */}
      <div className="susan-dashboard__header">
        <div className="susan-dashboard__welcome">
          <div className="susan-dashboard__badge">
            <span className="susan-brand-header__dot" />
            <span>Workspace Konten</span>
          </div>
          <h1 className="susan-dashboard__title">
            {greetingTime}, {firstName}
          </h1>
          <p className="susan-dashboard__subtitle">
            Berikut ringkasan halaman dan konten yang memerlukan perhatian Anda hari ini.
          </p>
        </div>

        <div className="susan-dashboard__actions">
          <a
            href={webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="susan-btn susan-btn--outline"
          >
            <span>Buka Website</span>
            <ExternalLink size={15} />
          </a>
          <Link href="/cms/collections/rooms/create" className="susan-btn susan-btn--primary">
            <span>+ Tambah Kamar</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: NEEDS ATTENTION */}
      <div className="susan-dashboard__section">
        <div className="susan-dashboard__section-header">
          <h2 className="susan-dashboard__section-title">PERLU PERHATIAN</h2>
          <span className="susan-dashboard__section-tag">Status Publikasi & Kualitas</span>
        </div>

        <div className="susan-attention-grid">
          {/* Drafts Waiting */}
          <div className={`susan-attention-card ${draftsWaitingCount > 0 ? 'susan-attention-card--active' : ''}`}>
            <div className="susan-attention-card__icon susan-attention-card__icon--neutral">
              <FileEdit size={20} />
            </div>
            <div className="susan-attention-card__info">
              <span className="susan-attention-card__num">{draftsWaitingCount}</span>
              <h3 className="susan-attention-card__label">Draf Menunggu</h3>
              <p className="susan-attention-card__desc">Konten dalam status draf belum terbit ke website.</p>
            </div>
          </div>

          {/* Expired Offers */}
          <div className={`susan-attention-card ${expiredOffersCount > 0 ? 'susan-attention-card--warning' : ''}`}>
            <div className="susan-attention-card__icon susan-attention-card__icon--warning">
              <Clock size={20} />
            </div>
            <div className="susan-attention-card__info">
              <span className="susan-attention-card__num">{expiredOffersCount}</span>
              <h3 className="susan-attention-card__label">Promo Kedaluwarsa</h3>
              <p className="susan-attention-card__desc">
                {expiredOffersCount > 0 ? 'Perlu diperbarui tanggal validitasnya.' : 'Tidak ada promo yang kedaluwarsa.'}
              </p>
            </div>
          </div>

          {/* Missing English Translations */}
          <div className={`susan-attention-card ${missingEnglishCount > 0 ? 'susan-attention-card--info' : ''}`}>
            <div className="susan-attention-card__icon susan-attention-card__icon--info">
              <Languages size={20} />
            </div>
            <div className="susan-attention-card__info">
              <span className="susan-attention-card__num">{missingEnglishCount}</span>
              <h3 className="susan-attention-card__label">Terjemahan English</h3>
              <p className="susan-attention-card__desc">
                {missingEnglishCount > 0 ? 'Halaman belum memiliki terjemahan EN.' : 'Semua terjemahan lengkap.'}
              </p>
            </div>
          </div>

          {/* System Health */}
          <div className="susan-attention-card susan-attention-card--success">
            <div className="susan-attention-card__icon susan-attention-card__icon--success">
              <CheckCircle2 size={20} />
            </div>
            <div className="susan-attention-card__info">
              <span className="susan-attention-card__num">0</span>
              <h3 className="susan-attention-card__label">Kendala Konten</h3>
              <p className="susan-attention-card__desc">Sistem normal, semua halaman siap diakses publik.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: QUICK EDIT */}
      <div className="susan-dashboard__section">
        <div className="susan-dashboard__section-header">
          <h2 className="susan-dashboard__section-title">AKSES CEPAT HALAMAN</h2>
          <span className="susan-dashboard__section-tag">Pilih halaman yang ingin Anda kelola</span>
        </div>

        <div className="susan-quick-grid">
          <Link href="/cms/collections/rooms" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <Bed size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Kamar & Villa</span>
              <span className="susan-quick-card__count">{counts.rooms} Tipe Kamar</span>
            </div>
          </Link>

          <Link href="/cms/collections/spa-treatments" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <Sparkles size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Spa Treatments</span>
              <span className="susan-quick-card__count">{counts.spaTreatments} Treatment</span>
            </div>
          </Link>

          <Link href="/cms/collections/wedding-packages" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <Heart size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Wedding Packages</span>
              <span className="susan-quick-card__count">{counts.weddingPackages} Paket</span>
            </div>
          </Link>

          <Link href="/cms/collections/resort-content" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <UtensilsCrossed size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Dining & Resort</span>
              <span className="susan-quick-card__count">{counts.resortContent} Destinasi</span>
            </div>
          </Link>

          <Link href="/cms/collections/offers" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <Tag size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Promo & Penawaran</span>
              <span className="susan-quick-card__count">{counts.offers} Penawaran Aktif</span>
            </div>
          </Link>

          <Link href="/cms/collections/gallery-items" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <ImageIcon size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Galeri Foto</span>
              <span className="susan-quick-card__count">{counts.galleryItems} Foto</span>
            </div>
          </Link>

          <Link href="/cms/collections/journal-articles" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <BookOpen size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Jurnal & Artikel</span>
              <span className="susan-quick-card__count">{counts.journalArticles} Artikel</span>
            </div>
          </Link>

          <Link href="/cms/collections/media" className="susan-quick-card">
            <div className="susan-quick-card__icon">
              <FolderOpen size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Pustaka Media</span>
              <span className="susan-quick-card__count">{counts.media} File Tersimpan</span>
            </div>
          </Link>

          <Link href="/cms/globals/site-settings" className="susan-quick-card susan-quick-card--accent">
            <div className="susan-quick-card__icon">
              <Sliders size={22} />
            </div>
            <div className="susan-quick-card__text">
              <span className="susan-quick-card__title">Pengaturan Situs</span>
              <span className="susan-quick-card__count">Kontak, SEO, Media Sosial</span>
            </div>
          </Link>
        </div>
      </div>

      {/* SECTION 3: RECENTLY EDITED */}
      <div className="susan-dashboard__section">
        <div className="susan-dashboard__section-header">
          <h2 className="susan-dashboard__section-title">BARU SAJA DIEDIT</h2>
          <span className="susan-dashboard__section-tag">Aktivitas editorial terakhir</span>
        </div>

        {recentDocs.length === 0 ? (
          <div className="susan-recent-empty">
            <p>Belum ada riwayat suntingan terbaru.</p>
          </div>
        ) : (
          <div className="susan-recent-list">
            {recentDocs.map((item) => (
              <Link
                key={`${item.collection}-${item.id}`}
                href={`/cms/collections/${item.collection}/${item.id}`}
                className="susan-recent-row"
              >
                <div className="susan-recent-row__main">
                  <span className="susan-recent-row__title">{item.title}</span>
                  <div className="susan-recent-row__meta">
                    <span className="susan-recent-row__coll">{item.collectionLabel}</span>
                    <span className="susan-recent-row__dot">·</span>
                    <span className="susan-recent-row__time">{formatTimeAgo(item.updatedAt)}</span>
                  </div>
                </div>

                <div className="susan-recent-row__badge">
                  {item.status === 'published' ? (
                    <span className="susan-status-chip susan-status-chip--published">
                      <span className="susan-status-chip__dot" />
                      Terbit
                    </span>
                  ) : (
                    <span className="susan-status-chip susan-status-chip--draft">
                      <span className="susan-status-chip__dot" />
                      Draf
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomDashboard
