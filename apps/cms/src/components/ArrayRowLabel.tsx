'use client'

import { useRowLabel } from '@payloadcms/ui'

const LABEL_KEYS = ['title', 'label', 'slug', 'heading', 'body']

// Judul baris diambil dari isi baris itu sendiri agar daftar yang tertutup tetap mudah dikenali.
export function ArrayRowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const key = LABEL_KEYS.find((name) => typeof data?.[name] === 'string' && (data[name] as string).trim())
  const value = key ? (data[key] as string).trim() : ''
  const number = (rowNumber ?? 0) + 1
  return <span>{value ? `${number}. ${value.length > 70 ? `${value.slice(0, 70)}…` : value}` : `Baris ${number}`}</span>
}
