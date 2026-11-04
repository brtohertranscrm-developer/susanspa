import { DefaultListView } from '@payloadcms/ui'
import type { CollectionSlug, ListViewClientProps, ListViewServerProps } from 'payload'
import React from 'react'

import { buildListCards } from '@/lib/listCards'
import { CardGrid } from './CardGrid'

const SERVER_ONLY = new Set([
  'collectionConfig',
  'data',
  'i18n',
  'limit',
  'listPreferences',
  'listSearchableFields',
  'locale',
  'params',
  'payload',
  'permissions',
  'searchParams',
  'user',
])

/** Daftar koleksi sebagai kartu bergambar. Cari, filter, hapus massal, dan pagination tetap milik Payload. */
export async function CardListView(props: ListViewServerProps) {
  const { collectionConfig, data, locale, payload, user } = props
  // Hanya props klien yang boleh diteruskan ke DefaultListView. Objek server seperti payload tidak bisa diserialisasi.
  const clientProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !SERVER_ONLY.has(key)),
  ) as ListViewClientProps

  const cards = await buildListCards({
    payload,
    collection: collectionConfig.slug as CollectionSlug,
    docs: data.docs,
    locale: locale?.code,
    user: user ?? null,
    adminRoute: payload.config.routes.admin,
  })

  return (
    <DefaultListView
      {...clientProps}
      Table={
        <CardGrid
          cards={cards}
          table={clientProps.Table}
          titleField={collectionConfig.admin.useAsTitle ?? 'id'}
          hasDrafts={Boolean(collectionConfig.versions?.drafts)}
          enableSelection={Boolean(clientProps.enableRowSelections)}
          viewType={clientProps.viewType}
        />
      }
    />
  )
}
