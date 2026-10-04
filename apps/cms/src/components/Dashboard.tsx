import { getTranslation } from '@payloadcms/translations'
import { Gutter, Link } from '@payloadcms/ui'
import type { ServerProps } from 'payload'
import { formatAdminURL } from 'payload/shared'
import { webUrl } from '../lib/publicLinks'
import { type AreaStats, type DashboardData, type ListedDoc, loadDashboardData } from './dashboard/data'
import { formatDate, formatRelative, greeting } from './dashboard/format'

type AdminPath = `/${string}`

type Props = Pick<ServerProps, 'i18n' | 'payload' | 'permissions' | 'user'> & {
  visibleEntities?: { collections?: string[] }
}

export async function Dashboard({ i18n, payload, permissions, user, visibleEntities }: Props) {
  if (!user) return null

  const adminRoute = payload.config.routes.admin
  const visible = new Set(visibleEntities?.collections ?? [])
  const url = (path: AdminPath) => formatAdminURL({ adminRoute, path })
  const label = (slug: string) => {
    const labels = payload.collections[slug as keyof typeof payload.collections]?.config.labels
    return labels ? getTranslation(labels.plural, i18n) : slug
  }
  const canCreate = (slug: string) =>
    Boolean((permissions?.collections as Record<string, { create?: boolean }> | undefined)?.[slug]?.create)

  let data: DashboardData | null = null
  try {
    data = await loadDashboardData(payload, user, visible)
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Ringkasan konten gagal dimuat' })
  }

  const firstName = String((user as { fullName?: string }).fullName || user.email).split(/\s+/)[0]

  const docLink = (item: ListedDoc) => url(`/collections/${item.area.slug}/${item.id}`)

  return (
    <Gutter className="dash">
      <header className="dash__header">
        <div>
          <p className="dash__greeting">
            {greeting()}, {firstName}
          </p>
          <h1 className="dash__title">Ringkasan konten</h1>
        </div>
        <a className="dash__site-link" href={webUrl} target="_blank" rel="noopener noreferrer">
          Buka website<span className="sr-only"> (tab baru)</span>
        </a>
      </header>

      {!data ? (
        <section className="dash__panel dash__panel--message" role="alert">
          <h2 className="dash__panel-title">Ringkasan belum bisa dimuat</h2>
          <p>
            Data konten tidak terbaca saat ini. Muat ulang halaman. Menu di sebelah kiri tetap bisa dipakai
            untuk membuka dan mengedit konten.
          </p>
        </section>
      ) : (
        <div className="dash__grid">
          <Attention data={data} label={label} docLink={docLink} url={url} />
          <Areas
            stats={data.areas}
            mediaCount={data.mediaCount}
            showMedia={visible.has('media')}
            label={label}
            canCreate={canCreate}
            url={url}
          />
          <Recent items={data.recent} label={label} docLink={docLink} />
          <Publishing />
        </div>
      )}
    </Gutter>
  )
}

type Helpers = {
  label: (slug: string) => string
  docLink: (item: ListedDoc) => string
}

function Attention({ data, label, docLink, url }: { data: DashboardData; url: (path: AdminPath) => string } & Helpers) {
  const englishGaps = data.areas.filter((stats) => stats.missingEnglish > 0)
  const nothingToDo = data.pendingTotal === 0 && data.expiredOffers.length === 0 && data.emptyDrafts === 0

  return (
    <section className="dash__panel dash__panel--focus dash__attention" aria-labelledby="dash-attention">
      <h2 className="dash__panel-title" id="dash-attention">
        Perlu ditindaklanjuti
      </h2>

      {nothingToDo && (
        <div className="dash__block">
          <p className="dash__quiet">
            Tidak ada draf yang menunggu dan tidak ada promo yang sudah lewat masa berlaku. Semua konten yang
            dibuat sudah tayang di website.
          </p>
        </div>
      )}

      {data.pendingTotal > 0 && (
        <div className="dash__block">
          <h3 className="dash__block-title">
            Menunggu publikasi <span className="dash__count">{data.pendingTotal}</span>
          </h3>
          <p className="dash__hint">Perubahan ini belum tampil di website sampai Anda mempublikasikannya.</p>
          <ul className="dash__list">
            {data.pending.map((item) => (
              <DocRow key={`${item.area.slug}-${item.id}`} item={item} label={label} docLink={docLink} />
            ))}
          </ul>
          {data.pendingTotal > data.pending.length && (
            <p className="dash__more">
              Menampilkan {data.pending.length} yang terbaru dari {data.pendingTotal}. Buka daftar tiap jenis
              konten untuk melihat sisanya.
            </p>
          )}
        </div>
      )}

      {data.expiredOffers.length > 0 && (
        <div className="dash__block">
          <h3 className="dash__block-title">
            Promo sudah lewat masa berlaku <span className="dash__count">{data.expiredOffers.length}</span>
          </h3>
          <p className="dash__hint">Promo ini masih berstatus Diterbitkan. Ubah tanggalnya atau batalkan publikasinya.</p>
          <ul className="dash__list">
            {data.expiredOffers.map((item) => (
              <li key={item.id} className="dash__row">
                <Link className="dash__row-title" href={docLink(item)} prefetch={false}>
                  {item.title}
                </Link>
                <span className="dash__row-meta">
                  Berlaku sampai {item.validUntil ? formatDate(item.validUntil) : '-'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.emptyDrafts > 0 && (
        <div className="dash__block">
          <h3 className="dash__block-title">
            Draf tanpa judul <span className="dash__count">{data.emptyDrafts}</span>
          </h3>
          <p className="dash__hint">
            Terbentuk otomatis saat halaman Tambah dibuka lalu ditinggalkan tanpa diisi. Tidak tampil di
            website. Buka daftar kontennya, pilih yang tanpa judul, lalu hapus.
          </p>
        </div>
      )}

      {englishGaps.length > 0 && (
        <div className="dash__block">
          <h3 className="dash__block-title">Terjemahan Inggris belum diisi</h3>
          <p className="dash__hint">
            Selama kosong, versi English di website menampilkan teks Indonesia.
          </p>
          <ul className="dash__list">
            {englishGaps.map((stats) => (
              <li key={stats.area.slug} className="dash__row">
                <Link
                  className="dash__row-title"
                  href={`${url(`/collections/${stats.area.slug}`)}?locale=en`}
                  prefetch={false}
                >
                  {label(stats.area.slug)}
                </Link>
                <span className="dash__row-meta">
                  {stats.missingEnglish} dari {stats.published} konten belum diterjemahkan
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function Areas({
  stats,
  mediaCount,
  showMedia,
  label,
  canCreate,
  url,
}: {
  stats: AreaStats[]
  mediaCount: number
  showMedia: boolean
  label: (slug: string) => string
  canCreate: (slug: string) => boolean
  url: (path: AdminPath) => string
}) {
  return (
    <section className="dash__panel dash__areas" aria-labelledby="dash-areas">
      <h2 className="dash__panel-title" id="dash-areas">
        Isi website
      </h2>
      <ul className="dash__areas-list">
        {stats.map(({ area, published, pending }) => (
          <li key={area.slug} className="dash__area">
            <Link className="dash__area-name" href={url(`/collections/${area.slug}`)} prefetch={false}>
              {label(area.slug)}
            </Link>
            <span className="dash__area-figures">
              <span>{published} tayang</span>
              {pending > 0 && <span className="dash__area-pending">{pending} menunggu</span>}
            </span>
            {canCreate(area.slug) && (
              <Link
                className="dash__area-add"
                href={url(`/collections/${area.slug}/create`)}
                prefetch={false}
                aria-label={`Tambah ${label(area.slug)}`}
              >
                Tambah
              </Link>
            )}
          </li>
        ))}
        {showMedia && (
          <li className="dash__area">
            <Link className="dash__area-name" href={url('/collections/media')} prefetch={false}>
              Pustaka Media
            </Link>
            <span className="dash__area-figures">
              <span>{mediaCount} file</span>
            </span>
            <Link
              className="dash__area-add"
              href={url('/collections/media/create')}
              prefetch={false}
              aria-label="Unggah media"
            >
              Unggah
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}

function Recent({ items, label, docLink }: { items: ListedDoc[] } & Helpers) {
  return (
    <section className="dash__panel dash__recent" aria-labelledby="dash-recent">
      <h2 className="dash__panel-title" id="dash-recent">
        Terakhir diubah
      </h2>
      {items.length === 0 ? (
        <p className="dash__quiet">
          Belum ada konten. Buat yang pertama lewat tombol Tambah di daftar Isi website.
        </p>
      ) : (
        <ul className="dash__list">
          {items.map((item) => (
            <DocRow key={`${item.area.slug}-${item.id}`} item={item} label={label} docLink={docLink} showStatus />
          ))}
        </ul>
      )}
    </section>
  )
}

function DocRow({
  item,
  label,
  docLink,
  showStatus,
}: { item: ListedDoc; showStatus?: boolean } & Helpers) {
  return (
    <li className="dash__row">
      <Link className="dash__row-title" href={docLink(item)} prefetch={false}>
        {item.title}
      </Link>
      <span className="dash__row-meta">
        {label(item.area.slug)}
        {showStatus && item.status === 'draft' ? ' · Draf' : ''} · {formatRelative(item.updatedAt)}
      </span>
    </li>
  )
}

function Publishing() {
  return (
    <section className="dash__panel dash__help" aria-labelledby="dash-help">
      <h2 className="dash__panel-title" id="dash-help">
        Cara kerja publikasi
      </h2>
      <ul className="dash__notes">
        <li>Draf tidak tampil di website. Konten baru tayang setelah Anda menekan Publikasikan.</li>
        <li>Website memeriksa pembaruan tiap 5 menit, jadi perubahan bisa butuh beberapa menit untuk terlihat.</li>
        <li>Isi versi Indonesia lebih dulu. Versi English memakai teks Indonesia sampai terjemahannya diisi.</li>
      </ul>
    </section>
  )
}
