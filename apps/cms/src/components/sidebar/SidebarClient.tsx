'use client'

import { useNav } from '@payloadcms/ui'
import { ChevronDown, ExternalLink, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useSyncExternalStore } from 'react'
import type { IconKey } from '../../lib/navigation'
import { Icon } from './Icon'

export interface SidebarEntry {
  label: string
  icon: IconKey
  children: { label: string; href: string; icon: IconKey }[]
}

interface Props {
  top: SidebarEntry[]
  sections: { title: string; entries: SidebarEntry[] }[]
  badge: number
  user: { name: string; email: string }
  webUrl: string
}

const COLLAPSED_KEY = 'susan-sidebar-collapsed'
const COLLAPSED_EVENT = 'susan-sidebar-collapsed-change'

// Pilihan ciutkan sidebar disimpan di browser ini saja. Server selalu merender sidebar terbuka.
function subscribeCollapsed(callback: () => void) {
  window.addEventListener(COLLAPSED_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(COLLAPSED_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

function readCollapsed() {
  try {
    return window.localStorage.getItem(COLLAPSED_KEY) === '1'
  } catch {
    return false
  }
}

function writeCollapsed(value: boolean) {
  try {
    window.localStorage.setItem(COLLAPSED_KEY, value ? '1' : '0')
  } catch {
    // Browser menolak penyimpanan. Sidebar tetap berfungsi, hanya pilihannya tidak diingat.
  }
  window.dispatchEvent(new Event(COLLAPSED_EVENT))
}

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`)

function initials(name: string) {
  const parts = name
    .replace(/@.*/, '')
    .split(/[\s._-]+/)
    .filter(Boolean)
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : (parts[0] ?? '?').slice(0, 2)).toUpperCase()
}

function Entry({ entry, pathname, collapsed }: { entry: SidebarEntry; pathname: string; collapsed: boolean }) {
  const containsActive = entry.children.some((child) => isActive(pathname, child.href))
  const [open, setOpen] = useState(containsActive)
  const id = `sidebar-${entry.label.replace(/\W+/g, '-').toLowerCase()}`

  // Grup berisi satu menu langsung menjadi tautan, tanpa perlu dibuka.
  if (entry.children.length === 1) {
    const child = entry.children[0]
    return (
      <Link
        href={child.href}
        className={`susan-side__item ${containsActive ? 'susan-side__item--active' : ''}`}
        aria-current={containsActive ? 'page' : undefined}
        title={collapsed ? entry.label : undefined}
      >
        <Icon name={entry.icon} />
        <span>{entry.label}</span>
      </Link>
    )
  }

  return (
    <div className="susan-side__group">
      <button
        type="button"
        className={`susan-side__item ${containsActive && !open ? 'susan-side__item--active' : ''}`}
        aria-expanded={open && !collapsed}
        aria-controls={id}
        title={collapsed ? entry.label : undefined}
        onClick={() => {
          // Di mode ikon, klik grup membuka sidebar sekaligus grupnya.
          if (collapsed) {
            writeCollapsed(false)
            setOpen(true)
          } else {
            setOpen((value) => !value)
          }
        }}
      >
        <Icon name={entry.icon} />
        <span>{entry.label}</span>
        <ChevronDown
          size={16}
          className={`susan-side__chevron ${open ? 'susan-side__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && !collapsed && (
        <ul id={id} className="susan-side__children">
          {entry.children.map((child) => {
            const active = isActive(pathname, child.href)
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`susan-side__child ${active ? 'susan-side__child--active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon name={child.icon} size={16} />
                  <span>{child.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function SidebarClient({ top, sections, badge, user, webUrl }: Props) {
  const pathname = usePathname() ?? ''
  // navOpen dari Payload hanya dipakai untuk laci menu di ponsel. Di desktop sidebar selalu tampil.
  const { navOpen, setNavOpen } = useNav()
  const collapsed = useSyncExternalStore(subscribeCollapsed, readCollapsed, () => false)
  const onDashboard = pathname === '/cms' || pathname === '/cms/'

  const toggle = () => {
    if (window.matchMedia('(max-width: 768px)').matches) setNavOpen(false)
    else writeCollapsed(!collapsed)
  }

  return (
    <>
      {navOpen && (
        <button
          type="button"
          className="susan-aside__backdrop"
          aria-label="Tutup menu"
          onClick={() => setNavOpen(false)}
        />
      )}
      <aside
        className={`susan-aside ${navOpen ? 'susan-aside--mobile-open' : ''} ${collapsed ? 'susan-aside--collapsed' : ''}`}
      >
        <div className="susan-side">
          <div className="susan-side__brand">
            <span className="susan-side__mark" aria-hidden="true">
              S
            </span>
            <span className="susan-side__name">Susan Spa</span>
            <button
              type="button"
              className="susan-side__collapse"
              onClick={toggle}
              aria-label={collapsed ? 'Lebarkan menu' : 'Ciutkan menu'}
              aria-pressed={collapsed}
            >
              {collapsed ? (
                <PanelLeftOpen size={18} aria-hidden="true" />
              ) : (
                <PanelLeftClose size={18} aria-hidden="true" />
              )}
            </button>
          </div>

          <nav className="susan-side__nav" aria-label="Menu panel konten">
            <Link
              href="/cms"
              className={`susan-side__item ${onDashboard ? 'susan-side__item--active' : ''}`}
              aria-current={onDashboard ? 'page' : undefined}
              title={collapsed ? 'Dasbor' : undefined}
            >
              <Icon name="dashboard" />
              <span>Dasbor</span>
              {badge > 0 && (
                <span className="susan-side__badge" aria-label={`${badge} konten perlu ditindaklanjuti`}>
                  {badge}
                </span>
              )}
            </Link>
            {top.map((entry) => (
              <Entry key={entry.label} entry={entry} pathname={pathname} collapsed={collapsed} />
            ))}

            {sections.map((section) => (
              <div key={section.title} className="susan-side__section">
                <p className="susan-side__section-title">{section.title}</p>
                {section.entries.map((entry) => (
                  <Entry key={entry.label} entry={entry} pathname={pathname} collapsed={collapsed} />
                ))}
              </div>
            ))}
          </nav>

          <div className="susan-side__footer">
            <a
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="susan-side__website"
              title={collapsed ? 'Buka Website' : undefined}
            >
              <span>Buka Website</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <Link href="/cms/account" className="susan-side__user" title={collapsed ? user.name : undefined}>
              <span className="susan-side__avatar" aria-hidden="true">
                {initials(user.name)}
              </span>
              <span className="susan-side__user-text">
                <span className="susan-side__user-name">{user.name}</span>
                {user.email && user.email !== user.name && <span className="susan-side__user-email">{user.email}</span>}
              </span>
            </Link>
            <Link href="/cms/logout" className="susan-side__logout" title={collapsed ? 'Keluar' : undefined}>
              <LogOut size={16} aria-hidden="true" />
              <span>Keluar</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
