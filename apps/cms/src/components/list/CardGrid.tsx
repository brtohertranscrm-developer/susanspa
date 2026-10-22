'use client'

import { Link, useListDrawerContext, useListQuery, useSelection } from '@payloadcms/ui'
import { ChevronDown, ImageOff } from 'lucide-react'
import type { ViewTypes } from 'payload'
import React, { useEffect, useRef } from 'react'

import { CARDS_PER_PAGE, type CardStatus, type ListCard } from '@/lib/listCards'

const STATUS: Record<CardStatus, { label: string; tone: string }> = {
  published: { label: 'Tayang', tone: 'success' },
  changed: { label: 'Tayang, ada draf baru', tone: 'warning' },
  draft: { label: 'Draf', tone: 'neutral' },
}

const relative = new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' })
const STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60],
  ['month', 30 * 24 * 60],
  ['week', 7 * 24 * 60],
  ['day', 24 * 60],
  ['hour', 60],
  ['minute', 1],
]

const timeAgo = (value: string) => {
  const minutes = (Date.parse(value) - Date.now()) / 60_000
  const [unit, size] = STEPS.find(([, size]) => Math.abs(minutes) >= size) ?? ['minute', 1]
  return relative.format(Math.round(minutes / size), unit)
}

export function CardGrid({
  cards,
  table,
  titleField,
  hasDrafts,
  enableSelection,
  viewType,
}: {
  cards: ListCard[]
  table: React.ReactNode
  titleField: string
  hasDrafts: boolean
  enableSelection: boolean
  viewType?: ViewTypes
}) {
  const { isInDrawer } = useListDrawerContext()
  const { data, query, isGroupingBy, handlePerPageChange, handleSortChange } = useListQuery()
  const { selected, setSelection, selectAll, toggleAll } = useSelection()

  // Pilihan jumlah baris lama (misalnya 25 atau 50) tersimpan per pengguna. Kembalikan ke ukuran kartu sekali.
  const limit = data?.limit
  const showCards = !isInDrawer && !isGroupingBy && viewType !== 'trash'
  // handlePerPageChange berganti di setiap render, jadi tanpa penanda ini efeknya terus terpanggil.
  const limitFixed = useRef(false)
  useEffect(() => {
    if (!showCards || !limit || limit === CARDS_PER_PAGE || limitFixed.current) return
    limitFixed.current = true
    void handlePerPageChange?.(CARDS_PER_PAGE)
  }, [showCards, limit, handlePerPageChange])

  const selectAllRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    // Sebagian terpilih tampil sebagai tanda strip. Klik berikutnya mengosongkan pilihan, sama seperti tabel Payload.
    if (selectAllRef.current) selectAllRef.current.indeterminate = selectAll === 'some'
  }, [selectAll])

  // Jendela pilih dokumen, tampilan per grup, dan Sampah tetap memakai tabel bawaan.
  if (!showCards) return <>{table}</>

  const sort = typeof query.sort === 'string' ? query.sort : ''
  const sortOptions = [
    { value: '-updatedAt', label: 'Terakhir diubah' },
    { value: 'updatedAt', label: 'Paling lama diubah' },
    { value: titleField, label: 'Judul A ke Z' },
    { value: `-${titleField}`, label: 'Judul Z ke A' },
  ]
  const first = data ? (data.page ? (data.page - 1) * data.limit : 0) + 1 : 1
  const last = first + cards.length - 1
  const allOnPage = selectAll === 'allInPage' || selectAll === 'allAvailable'

  return (
    <div className="susan-cards">
      <div className="susan-cards__toolbar">
        {enableSelection && (
          <label className="susan-cards__select-all">
            <input ref={selectAllRef} type="checkbox" checked={allOnPage} onChange={() => toggleAll()} />
            <span>Pilih semua di halaman ini</span>
          </label>
        )}
        <p className="susan-cards__count">
          {first}–{last} dari {data?.totalDocs ?? cards.length}
        </p>
        <label className="susan-cards__sort">
          <span>Urutkan</span>
          <span className="susan-cards__select">
            <select value={sort} onChange={(event) => void handleSortChange?.(event.target.value)}>
              {!sortOptions.some((option) => option.value === sort) && <option value={sort}>Bawaan</option>}
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </span>
        </label>
      </div>

      <ul className="susan-cards__grid">
        {cards.map((card) => {
          const isSelected = Boolean(selected.get(card.id))
          const status = hasDrafts && card.status ? STATUS[card.status] : null
          return (
            <li key={card.id} className={`susan-doc ${isSelected ? 'susan-doc--selected' : ''}`}>
              {enableSelection && (
                <label className="susan-doc__check">
                  <input type="checkbox" checked={isSelected} onChange={() => setSelection(card.id)} />
                  <span className="susan-visually-hidden">Pilih {card.title}</span>
                </label>
              )}
              <Link href={card.href} className="susan-doc__link" prefetch={false}>
                <div className="susan-doc__media">
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- thumbnail ImageKit sudah diperkecil
                    <img src={card.image} alt="" loading="lazy" />
                  ) : card.initials ? (
                    <span className="susan-doc__initials">{card.initials}</span>
                  ) : (
                    <span className="susan-doc__empty">
                      <ImageOff size={22} aria-hidden="true" />
                      Belum ada foto
                    </span>
                  )}
                  {status && (
                    <span className={`susan-doc__status susan-doc__status--${status.tone}`}>{status.label}</span>
                  )}
                </div>
                <div className="susan-doc__body">
                  <h3 className="susan-doc__title">{card.title}</h3>
                  {card.meta.length > 0 && <p className="susan-doc__meta">{card.meta.join(' · ')}</p>}
                  {card.updatedAt && (
                    // Waktu relatif dihitung ulang di browser, jadi selisih semenit dengan server wajar.
                    <p className="susan-doc__time" suppressHydrationWarning>
                      Diubah {timeAgo(card.updatedAt)}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
