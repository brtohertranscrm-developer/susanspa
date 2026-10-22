'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'

export interface SearchSource {
  collection: string
  titleField: string
  type: string
}

export interface Destination {
  label: string
  href: string
  group: string
}

interface Result {
  key: string
  title: string
  type: string
  href: string
}

const MAX_PER_SOURCE = 4
const noopSubscribe = () => () => {}

export function SearchBox({ sources, destinations }: { sources: SearchSource[]; destinations: Destination[] }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const listId = useId()
  // Server tidak tahu sistem operasi pengguna, jadi teks pintasan baru ditentukan di browser.
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const term = query.trim()
    if (term.length < 2) return
    const controller = new AbortController()
    // Tunggu sebentar setelah mengetik agar tidak mengirim permintaan di setiap huruf.
    const timer = window.setTimeout(async () => {
      const lower = term.toLowerCase()
      const pageMatches: Result[] = destinations
        .filter((item) => item.label.toLowerCase().includes(lower))
        .slice(0, MAX_PER_SOURCE)
        .map((item) => ({ key: item.href, title: item.label, type: item.group, href: item.href }))

      const contentMatches = await Promise.all(
        sources.map(async (source) => {
          const params = new URLSearchParams({
            [`where[${source.titleField}][like]`]: term,
            limit: String(MAX_PER_SOURCE),
            depth: '0',
            draft: 'true',
            locale: 'id',
            [`select[${source.titleField}]`]: 'true',
          })
          try {
            const response = await fetch(`/api/${source.collection}?${params}`, {
              credentials: 'include',
              signal: controller.signal,
            })
            if (!response.ok) return []
            const body = (await response.json()) as { docs: Record<string, unknown>[] }
            return body.docs.map((doc) => ({
              key: `${source.collection}-${doc.id}`,
              title: String(doc[source.titleField] || 'Tanpa judul'),
              type: source.type,
              href: `/cms/collections/${source.collection}/${doc.id}`,
            }))
          } catch {
            return []
          }
        }),
      )
      if (controller.signal.aborted) return
      setResults([...contentMatches.flat(), ...pageMatches])
      setHighlight(0)
      setLoading(false)
    }, 250)
    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [query, sources, destinations])

  const go = (href: string) => {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setHighlight((index) => Math.min(index + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && results[highlight]) {
      event.preventDefault()
      go(results[highlight].href)
    } else if (event.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const showPanel = open && query.trim().length >= 2

  return (
    <div className="susan-search">
      <Search size={18} className="susan-search__icon" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        className="susan-search__input"
        placeholder="Cari kamar, promo, artikel…"
        aria-label="Cari konten"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-activedescendant={showPanel && results[highlight] ? `${listId}-${highlight}` : undefined}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setLoading(event.target.value.trim().length >= 2)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
      />
      <kbd className="susan-search__kbd" aria-hidden="true">
        {isMac ? '⌘' : 'Ctrl'} K
      </kbd>
      {showPanel && (
        <ul id={listId} role="listbox" className="susan-search__results">
          {loading && results.length === 0 && <li className="susan-search__empty">Mencari…</li>}
          {!loading && results.length === 0 && (
            <li className="susan-search__empty">Tidak ada yang cocok dengan &ldquo;{query.trim()}&rdquo;.</li>
          )}
          {results.map((result, index) => (
            <li
              key={result.key}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === highlight}
              className={`susan-search__result ${index === highlight ? 'susan-search__result--active' : ''}`}
              onMouseDown={(event) => {
                event.preventDefault()
                go(result.href)
              }}
              onMouseEnter={() => setHighlight(index)}
            >
              <span className="susan-search__result-title">{result.title}</span>
              <span className="susan-search__result-type">{result.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
