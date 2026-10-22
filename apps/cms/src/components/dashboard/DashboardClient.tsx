'use client'

import { useNav } from '@payloadcms/ui'
import {
  Bell,
  ChevronRight,
  CircleCheck,
  Circle,
  CircleHelp,
  Clock,
  Filter,
  Menu,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import type { CollectionSummary, ContentStatus, StatusItem } from '../../lib/contentStatus'
import type { IconKey } from '../../lib/navigation'
import { Icon } from '../sidebar/Icon'
import { Popover } from './Popover'
import { SearchBox, type Destination, type SearchSource } from './SearchBox'

export interface CreateLink {
  label: string
  href: string
}

interface Props {
  greeting: string
  name: string
  today: string
  status: ContentStatus
  icons: Record<string, IconKey>
  searchSources: SearchSource[]
  destinations: Destination[]
  createLinks: CreateLink[]
}

type LanguageFilter = 'all' | 'missing-en' | 'has-en'

const COLUMN_LIMIT = 4

function timeAgo(value: string | null) {
  if (!value) return ''
  const minutes = Math.floor((Date.now() - Date.parse(value)) / 60000)
  if (minutes < 1) return 'Baru saja'
  if (minutes < 60) return `${minutes} menit lalu`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Kemarin'
  return `${days} hari lalu`
}

function Chips({ item, extra }: { item: StatusItem; extra?: React.ReactNode }) {
  return (
    <div className="susan-card__chips">
      <span className="susan-chip">{item.type}</span>
      {extra ?? <span className="susan-chip">{item.hasEnglish ? 'ID · EN' : 'ID'}</span>}
    </div>
  )
}

function DraftCard({ item, detailed }: { item: StatusItem; detailed: boolean }) {
  return (
    <article className={`susan-card susan-card--${item.tone}`}>
      <Chips item={item} />
      <Link href={item.href} className="susan-card__title">
        {item.title}
      </Link>
      {detailed && item.checks && (
        <ul className="susan-card__checks">
          {item.checks.map((check) => (
            <li key={check.label} className={check.done ? 'susan-card__check--done' : ''}>
              {check.done ? <CircleCheck size={18} aria-hidden="true" /> : <Circle size={18} aria-hidden="true" />}
              <span>{check.label}</span>
              <span className="susan-visually-hidden">{check.done ? 'sudah' : 'belum'}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="susan-card__progress">
        <div className="susan-card__progress-row">
          <span>Kelengkapan</span>
          <strong>{item.completeness}%</strong>
        </div>
        <div className="susan-bar" role="presentation">
          <div className="susan-bar__fill" style={{ width: `${item.completeness}%` }} />
        </div>
      </div>
      {!detailed && item.updatedAt && (
        <p className="susan-card__meta">
          <Clock size={14} aria-hidden="true" /> Diedit {timeAgo(item.updatedAt).toLowerCase()}
        </p>
      )}
    </article>
  )
}

function AttentionCard({ item }: { item: StatusItem }) {
  if (!item.issue) return null
  return (
    <article className={`susan-card susan-card--${item.tone}`}>
      <Chips item={item} extra={<span className="susan-chip susan-chip--issue">{item.issue.label}</span>} />
      <Link href={item.href} className="susan-card__title">
        {item.title}
      </Link>
      <p className="susan-card__text">{item.issue.message}</p>
      <Link href={item.issue.href} className="susan-card__action">
        {item.issue.action}
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </article>
  )
}

function RecentCard({ item, showImage }: { item: StatusItem; showImage: boolean }) {
  return (
    <article className={`susan-card susan-card--${item.tone}`}>
      <Chips item={item} />
      <Link href={item.href} className="susan-card__title">
        {item.title}
      </Link>
      {showImage && item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="susan-card__image" src={item.image} alt="" loading="lazy" />
      )}
      <p className="susan-card__live">
        <span className="susan-card__live-dot" aria-hidden="true" />
        <span>Tayang</span>
        <span className="susan-card__live-time">{timeAgo(item.updatedAt)}</span>
      </p>
    </article>
  )
}

function Column({
  title,
  count,
  empty,
  action,
  children,
}: {
  title: string
  count: number
  empty: string
  action?: React.ReactNode
  children: (limit: number) => React.ReactNode
}) {
  const [expanded, setExpanded] = useState(false)
  const limit = expanded ? Infinity : COLUMN_LIMIT
  return (
    <section className="susan-column" aria-label={`${title}, ${count} konten`}>
      <header className="susan-column__head">
        <h2 className="susan-column__title">
          {title} <span className="susan-column__count">{count}</span>
        </h2>
        {action}
      </header>
      {count === 0 ? <p className="susan-column__empty">{empty}</p> : <div className="susan-column__list">{children(limit)}</div>}
      {count > COLUMN_LIMIT && (
        <button type="button" className="susan-column__more" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Tampilkan lebih sedikit' : `Tampilkan semua (${count})`}
        </button>
      )}
    </section>
  )
}

function CreateMenuItems({ links, close }: { links: CreateLink[]; close: () => void }) {
  return (
    <ul className="susan-menu">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="susan-menu__item" onClick={close}>
            <Plus size={16} aria-hidden="true" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function QuickRow({ summary, icon }: { summary: CollectionSummary; icon: IconKey }) {
  const percent = summary.total > 0 ? Math.round((summary.published / summary.total) * 100) : 0
  return (
    <Link href={summary.href} className="susan-quick__row">
      <span className={`susan-quick__icon susan-quick__icon--${summary.tone}`}>
        <Icon name={icon} size={18} />
      </span>
      <span className="susan-quick__text">
        <span className="susan-quick__title">{summary.label}</span>
        <span className="susan-quick__count">{summary.countLabel}</span>
      </span>
      {summary.total > 0 ? (
        <span className="susan-quick__progress">
          <span className="susan-bar susan-bar--wide" role="presentation">
            <span className="susan-bar__fill" style={{ width: `${percent}%` }} />
          </span>
          <span className="susan-quick__progress-label">
            {summary.published === summary.total ? 'Semua tayang' : `${summary.published} dari ${summary.total} tayang`}
          </span>
        </span>
      ) : (
        <ChevronRight size={18} className="susan-quick__chevron" aria-hidden="true" />
      )}
    </Link>
  )
}

const TIPS = [
  'Konten berstatus draf belum tampil di website. Klik Terbitkan ke website untuk menayangkannya.',
  'Perubahan yang sudah terbit tampil di website paling lama 5 menit kemudian.',
  'Unggah foto sekali di Pustaka Media, lalu pilih foto itu di kamar, spa, atau artikel.',
  'Halaman baru dibuat di Halaman Utama, lalu tautannya ditambahkan di Header, Menu & Footer.',
]

export function DashboardClient({ greeting, name, today, status, icons, searchSources, destinations, createLinks }: Props) {
  const { setNavOpen } = useNav()
  const [type, setType] = useState('all')
  const [language, setLanguage] = useState<LanguageFilter>('all')

  const types = useMemo(() => status.summaries.map((summary) => summary.type), [status.summaries])
  const matches = (item: StatusItem) =>
    (type === 'all' || item.type === type) &&
    (language === 'all' || (language === 'has-en' ? item.hasEnglish : !item.hasEnglish))

  const drafts = status.drafts.filter(matches)
  const attention = status.attention.filter(matches)
  const recent = status.recent.filter(matches)
  const notifications = status.attention.slice(0, 6)

  return (
    <div className="susan-dash">
      <header className="susan-topbar">
        <button type="button" className="susan-icon-btn susan-topbar__menu" onClick={() => setNavOpen(true)} aria-label="Buka menu">
          <Menu size={20} aria-hidden="true" />
        </button>
        <div className="susan-topbar__greeting">
          <span>{greeting},</span>
          <strong>{name}</strong>
        </div>
        <SearchBox sources={searchSources} destinations={destinations} />
        <div className="susan-topbar__actions">
          <Popover
            trigger={<CircleHelp size={20} aria-hidden="true" />}
            triggerClassName="susan-icon-btn"
            triggerLabel="Bantuan"
            panelClassName="susan-popover__panel--wide"
          >
            {() => (
              <div className="susan-help">
                <p className="susan-help__title">Bantuan singkat</p>
                <ul>
                  {TIPS.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
                <p className="susan-help__note">Ada kendala lain? Hubungi admin konten.</p>
              </div>
            )}
          </Popover>
          <Popover
            trigger={
              <>
                <Bell size={20} aria-hidden="true" />
                {status.attention.length > 0 && <span className="susan-icon-btn__dot" aria-hidden="true" />}
              </>
            }
            triggerClassName="susan-icon-btn"
            triggerLabel={`Pemberitahuan, ${status.attention.length} perlu perhatian`}
            panelClassName="susan-popover__panel--wide"
          >
            {(close) => (
              <div className="susan-notify">
                <p className="susan-help__title">Perlu perhatian</p>
                {notifications.length === 0 ? (
                  <p className="susan-notify__empty">Tidak ada konten yang perlu ditindaklanjuti.</p>
                ) : (
                  <ul>
                    {notifications.map((item) => (
                      <li key={item.key}>
                        <Link href={item.issue?.href ?? item.href} onClick={close} className="susan-notify__item">
                          <span className="susan-notify__title">{item.title}</span>
                          <span className="susan-notify__issue">
                            {item.type} · {item.issue?.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Popover>
        </div>
      </header>

      <section className="susan-board-head">
        <div>
          <h1 className="susan-board-head__title">Status Konten</h1>
          <p className="susan-board-head__date">{today}</p>
        </div>
        <div className="susan-board-head__controls">
          <label className="susan-select">
            <span className="susan-visually-hidden">Jenis konten</span>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="all">Semua jenis konten</option>
              {types.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <Popover
            trigger={
              <>
                <Filter size={18} aria-hidden="true" />
                <span>Filter</span>
                {language !== 'all' && <span className="susan-btn__count">1</span>}
              </>
            }
            triggerClassName="susan-btn susan-btn--outline"
            align="end"
          >
            {(close) => (
              <fieldset className="susan-filter">
                <legend>Terjemahan English</legend>
                {(
                  [
                    ['all', 'Semua konten'],
                    ['missing-en', 'Belum ada English'],
                    ['has-en', 'Sudah ada English'],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className="susan-filter__option">
                    <input
                      type="radio"
                      name="language-filter"
                      checked={language === value}
                      onChange={() => {
                        setLanguage(value)
                        close()
                      }}
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
            )}
          </Popover>
          <Popover
            trigger={
              <>
                <Plus size={18} aria-hidden="true" />
                <span>Tambah konten</span>
              </>
            }
            triggerClassName="susan-btn susan-btn--primary"
          >
            {(close) => <CreateMenuItems links={createLinks} close={close} />}
          </Popover>
        </div>
      </section>

      <div className="susan-board">
        <Column
          title="Draf"
          count={drafts.length}
          empty="Tidak ada draf. Semua konten sudah tayang."
          action={
            <Popover trigger={<Plus size={18} aria-hidden="true" />} triggerClassName="susan-icon-btn susan-icon-btn--small" triggerLabel="Buat draf baru">
              {(close) => <CreateMenuItems links={createLinks} close={close} />}
            </Popover>
          }
        >
          {(limit) => drafts.slice(0, limit).map((item, index) => <DraftCard key={item.key} item={item} detailed={index === 0} />)}
        </Column>
        <Column title="Perlu perhatian" count={attention.length} empty="Tidak ada yang perlu diperbaiki.">
          {(limit) => attention.slice(0, limit).map((item) => <AttentionCard key={item.key} item={item} />)}
        </Column>
        <Column title="Baru tayang" count={recent.length} empty="Belum ada konten yang tayang dalam 30 hari terakhir.">
          {(limit) => recent.slice(0, limit).map((item, index) => <RecentCard key={item.key} item={item} showImage={index === 0} />)}
        </Column>
      </div>

      <section className="susan-quick" aria-labelledby="susan-quick-title">
        <h2 id="susan-quick-title" className="susan-quick__heading">
          Akses cepat
        </h2>
        <div className="susan-quick__list">
          {status.summaries.map((summary) => (
            <QuickRow key={summary.collection} summary={summary} icon={icons[summary.collection] ?? 'file'} />
          ))}
          <Link href="/cms/collections/media" className="susan-quick__row">
            <span className="susan-quick__icon susan-quick__icon--slate">
              <Icon name="folder" size={18} />
            </span>
            <span className="susan-quick__text">
              <span className="susan-quick__title">Pustaka Media</span>
              <span className="susan-quick__count">{status.mediaCount} file tersimpan</span>
            </span>
            <ChevronRight size={18} className="susan-quick__chevron" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}

