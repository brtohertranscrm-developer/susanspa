import type { BasePayload, SanitizedPermissions, TypedUser, VisibleEntities } from 'payload'
import React from 'react'
import { getContentStatus } from '../../lib/contentStatus'
import { ENTITY_ICONS, SIDEBAR, type IconKey } from '../../lib/navigation'
import { webUrl } from '../../lib/publicLinks'
import { SidebarClient, type SidebarEntry } from './SidebarClient'

interface Props {
  payload: BasePayload
  permissions: SanitizedPermissions
  user?: TypedUser | null
  visibleEntities: VisibleEntities
}

const labelOf = (value: unknown, fallback: string) => (typeof value === 'string' ? value : fallback)

// Pengganti sidebar bawaan Payload. Susunan grupnya dari SIDEBAR di lib/navigation.ts.
export async function SidebarNav({ payload, permissions, user, visibleEntities }: Props) {
  const entitiesByGroup = new Map<string, SidebarEntry['children']>()
  const add = (group: unknown, child: SidebarEntry['children'][number]) => {
    if (typeof group !== 'string') return
    entitiesByGroup.set(group, [...(entitiesByGroup.get(group) ?? []), child])
  }

  for (const collection of payload.config.collections) {
    if (!visibleEntities.collections.includes(collection.slug)) continue
    if (!permissions?.collections?.[collection.slug]?.read) continue
    add(collection.admin?.group, {
      label: labelOf(collection.labels?.plural, collection.slug),
      href: `/cms/collections/${collection.slug}`,
      icon: (ENTITY_ICONS[collection.slug] ?? 'file') as IconKey,
    })
  }
  for (const global of payload.config.globals) {
    if (!visibleEntities.globals.includes(global.slug)) continue
    if (!permissions?.globals?.[global.slug]?.read) continue
    add(global.admin?.group, {
      label: labelOf(global.label, global.slug),
      href: `/cms/globals/${global.slug}`,
      icon: (ENTITY_ICONS[global.slug] ?? 'file') as IconKey,
    })
  }

  const toEntry = ({ group, label, icon }: (typeof SIDEBAR.top)[number]): SidebarEntry | null => {
    const children = entitiesByGroup.get(group) ?? []
    return children.length > 0 ? { label, icon, children } : null
  }

  const status = await getContentStatus(payload)
  const fullName = labelOf((user as { fullName?: unknown } | null)?.fullName, '')
  const email = labelOf((user as { email?: unknown } | null)?.email, '')

  return (
    <SidebarClient
      top={SIDEBAR.top.map(toEntry).filter((entry): entry is SidebarEntry => Boolean(entry))}
      sections={SIDEBAR.sections
        .map((section) => ({
          title: section.title,
          entries: section.groups.map(toEntry).filter((entry): entry is SidebarEntry => Boolean(entry)),
        }))
        .filter((section) => section.entries.length > 0)}
      badge={status.drafts.length + status.attention.length}
      user={{ name: fullName || email, email }}
      webUrl={webUrl}
    />
  )
}

export default SidebarNav
