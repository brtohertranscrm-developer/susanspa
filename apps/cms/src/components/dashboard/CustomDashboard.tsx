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
  Clock,
  FileEdit,
  ExternalLink,
  Languages,
  LayoutTemplate,
  PanelsTopLeft,
} from 'lucide-react'

interface CustomDashboardProps {
  payload?: any
  user?: {
    fullName?: string
    email?: string
  }
  locale?: string
}

type CollectionKey =
  | 'rooms'
  | 'spaTreatments'
  | 'weddingPackages'
  | 'offers'
  | 'resortContent'
  | 'journalArticles'

interface PublishProgress {
  total: number
  published: number
  drafts: number
}

// Field _status hanya ada di koleksi yang memakai draf. Tanpa draf, dokumen dianggap tayang.
const toProgress = (docs: any[]): PublishProgress => {
  const drafts = docs.filter((d) => d._status === 'draft').length
  return { total: docs.length, published: docs.length - drafts, drafts }
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

interface AttentionCardProps {
  count: number
  label: string
  description: string
  icon: React.ReactNode
  tone: 'warning' | 'info'
}

function AttentionCard({ count, label, description, icon, tone }: AttentionCardProps) {
  const highlight = count > 0 ? ` susan-attention-card--${tone}` : ''
  return (
    <div className={`susan-attention-card${highlight}`}>
      <div className={`susan-attention-card__icon susan-attention-card__icon--${tone}`}>{icon}</div>
      <div className="susan-attention-card__info">
        <span className="susan-attention-card__num">{count}</span>
        <h3 className="susan-attention-card__label">{label}</h3>
        <p className="susan-attention-card__desc">{description}</p>
      </div>
    </div>
  )
}

function QuickProgress({ progress }: { progress: PublishProgress }) {
  if (progress.total === 0) {
    return (
      <div className="susan-quick-card__meta">
        <span className="susan-tag susan-tag--neutral">Belum ada isi</span>
      </div>
    )
  }

  const percent = Math.round((progress.published / progress.total) * 100)
  return (
    <div className="susan-quick-card__meta">
      <div className="susan-quick-card__meta-row">
        {progress.drafts > 0 ? (
          <span className="susan-tag susan-tag--warning">{progress.drafts} draf</span>
        ) : (
          <span className="susan-tag susan-tag--success">Semua tayang</span>
        )}
        <span>
          {progress.published} dari {progress.total} tayang
        </span>
      </div>
      <div className="susan-quick-card__bar" role="img" aria-label={`${percent}% tayang`}>
        <div className="susan-quick-card__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

interface QuickCardProps {
  href: string
  icon: React.ReactNode
  title: string
  count: string
  progress?: PublishProgress
}

function QuickCard({ href, icon, title, count, progress }: QuickCardProps) {
  return (
    <Link href={href} className="susan-quick-card">
      <div className="susan-quick-card__head">
        <div className="susan-quick-card__icon">{icon}</div>
        <div className="susan-quick-card__text">
          <span className="susan-quick-card__title">{title}</span>
          <span className="susan-quick-card__count">{count}</span>
        </div>
      </div>
      {progress && <QuickProgress progress={progress} />}
    </Link>
  )
}

export const CustomDashboard: React.FC<CustomDashboardProps> = async ({
  payload,
  user,
}) => {
  let draftsWaitingCount = 0
  let expiredOffersCount = 0
  let missingEnglishCount = 0
  let progress: Partial<Record<CollectionKey, PublishProgress>> = {}
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
        payload.find({ collection: 'rooms', limit: 100, depth: 0, draft: true }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'spa-treatments', limit: 100, depth: 0, draft: true }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'wedding-packages', limit: 100, depth: 0, draft: true }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'offers', limit: 100, depth: 0, draft: true }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'resort-content', limit: 100, depth: 0, draft: true }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'journal-articles', limit: 100, depth: 0, draft: true }).catch(() => ({ docs: [], totalDocs: 0 })),
        payload.find({ collection: 'gallery-items', limit: 100, depth: 0, draft: true }).catch(() => ({ docs: [], totalDocs: 0 })),
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

      progress = {
        rooms: toProgress(roomsRes.docs),
        spaTreatments: toProgress(spaRes.docs),
        weddingPackages: toProgress(weddingRes.docs),
        offers: toProgress(offersRes.docs),
        resortContent: toProgress(resortRes.docs),
        journalArticles: toProgress(journalRes.docs),
      }

      const allDraftCheckDocs = [
        ...roomsRes.docs.map((d: any) => ({ ...d, _coll: 'rooms', _collLabel: 'Kamar', _title: d.name })),
        ...spaRes.docs.map((d: any) => ({ ...d, _coll: 'spa-treatments', _collLabel: 'Spa', _title: d.title })),
        ...weddingRes.docs.map((d: any) => ({ ...d, _coll: 'wedding-packages', _collLabel: 'Wedding', _title: d.title })),
        ...offersRes.docs.map((d: any) => ({ ...d, _coll: 'offers', _collLabel: 'Promo', _title: d.title })),
        ...resortRes.docs.map((d: any) => ({ ...d, _coll: 'resort-content', _collLabel: 'Info Resort', _title: d.title })),
        ...journalRes.docs.map((d: any) => ({ ...d, _coll: 'journal-articles', _collLabel: 'Jurnal', _title: d.title })),
      ]

      // draft: true membaca versi terbaru, jadi perubahan yang belum diterbitkan ikut terhitung.
      draftsWaitingCount = Object.values(progress).reduce((sum, p) => sum + (p?.drafts ?? 0), 0)

      const nowIso = new Date().toISOString()
      expiredOffersCount = offersRes.docs.filter((o: any) => o.validUntil && o.validUntil < nowIso).length

      try {
        const enRooms = await payload.find({ collection: 'rooms', locale: 'en', limit: 50, depth: 0 }).catch(() => ({ docs: [] }))
        const missingRooms = enRooms.docs.filter((d: any) => !d.name || d.name.trim() === '').length
        missingEnglishCount += missingRooms
      } catch {
        // Terjemahan opsional. Jika gagal, angkanya tetap 0.
      }

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
      <div className="susan-dashboard__header">
        <div className="susan-dashboard__welcome">
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

      <section className="susan-dashboard__section">
        <div className="susan-dashboard__section-header">
          <h2 className="susan-dashboard__section-title">Perlu perhatian</h2>
          <span className="susan-dashboard__section-tag">Status publikasi dan kelengkapan</span>
        </div>

        <div className="susan-attention-grid">
          <AttentionCard
            count={draftsWaitingCount}
            label="Draf menunggu"
            description="Konten dalam status draf belum tayang di website."
            icon={<FileEdit size={20} />}
            tone="warning"
          />
          <AttentionCard
            count={expiredOffersCount}
            label="Promo kedaluwarsa"
            description={
              expiredOffersCount > 0
                ? 'Perlu diperbarui tanggal validitasnya.'
                : 'Tidak ada promo yang kedaluwarsa.'
            }
            icon={<Clock size={20} />}
            tone="warning"
          />
          <AttentionCard
            count={missingEnglishCount}
            label="Terjemahan English"
            description={
              missingEnglishCount > 0
                ? 'Halaman belum memiliki terjemahan EN.'
                : 'Semua terjemahan lengkap.'
            }
            icon={<Languages size={20} />}
            tone="info"
          />
        </div>
      </section>

      <section className="susan-dashboard__section">
        <div className="susan-dashboard__section-header">
          <h2 className="susan-dashboard__section-title">Akses cepat halaman</h2>
          <span className="susan-dashboard__section-tag">Pilih halaman yang ingin Anda kelola</span>
        </div>

        <div className="susan-quick-grid">
          <QuickCard
            href="/cms/collections/rooms"
            icon={<Bed size={20} />}
            title="Kamar & Villa"
            count={`${counts.rooms} tipe kamar`}
            progress={progress.rooms}
          />
          <QuickCard
            href="/cms/collections/spa-treatments"
            icon={<Sparkles size={20} />}
            title="Perawatan Spa"
            count={`${counts.spaTreatments} treatment`}
            progress={progress.spaTreatments}
          />
          <QuickCard
            href="/cms/collections/wedding-packages"
            icon={<Heart size={20} />}
            title="Paket Wedding"
            count={`${counts.weddingPackages} paket`}
            progress={progress.weddingPackages}
          />
          <QuickCard
            href="/cms/collections/resort-content"
            icon={<UtensilsCrossed size={20} />}
            title="Info Resort"
            count={`${counts.resortContent} item`}
            progress={progress.resortContent}
          />
          <QuickCard
            href="/cms/collections/offers"
            icon={<Tag size={20} />}
            title="Promo & Penawaran"
            count={`${counts.offers} penawaran`}
            progress={progress.offers}
          />
          <QuickCard
            href="/cms/collections/gallery-items"
            icon={<ImageIcon size={20} />}
            title="Galeri Foto"
            count={`${counts.galleryItems} foto`}
          />
          <QuickCard
            href="/cms/collections/journal-articles"
            icon={<BookOpen size={20} />}
            title="Jurnal & Artikel"
            count={`${counts.journalArticles} artikel`}
            progress={progress.journalArticles}
          />
          <QuickCard
            href="/cms/collections/media"
            icon={<FolderOpen size={20} />}
            title="Pustaka Media"
            count={`${counts.media} file tersimpan`}
          />
          <QuickCard
            href="/cms/globals/site-settings"
            icon={<Sliders size={20} />}
            title="Pengaturan Situs"
            count="Kontak, SEO, media sosial"
          />
          <QuickCard
            href="/cms/globals/page-home"
            icon={<LayoutTemplate size={20} />}
            title="Halaman Website"
            count="Judul, foto header, dan teks tiap halaman"
          />
          <QuickCard
            href="/cms/globals/site-layout"
            icon={<PanelsTopLeft size={20} />}
            title="Header, Menu & Footer"
            count="Logo, isi menu, footer"
          />
        </div>
      </section>

      <section className="susan-dashboard__section">
        <div className="susan-dashboard__section-header">
          <h2 className="susan-dashboard__section-title">Baru saja diedit</h2>
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
                    <span aria-hidden="true">·</span>
                    <span className="susan-recent-row__time">{formatTimeAgo(item.updatedAt)}</span>
                  </div>
                </div>

                <div className="susan-recent-row__badge">
                  {item.status === 'published' ? (
                    <span className="susan-status-chip susan-status-chip--published">
                      <span className="susan-status-chip__dot" />
                      Tayang
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
      </section>
    </div>
  )
}

export default CustomDashboard
