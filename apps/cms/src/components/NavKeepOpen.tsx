'use client'

import { useNav } from '@payloadcms/ui'
import { useEffect } from 'react'

let applied = false

// Payload menutup sidebar sampai lebar 1440 px. Dibuka sekali per muat halaman setelah breakpoint dihitung,
// jadi menutupnya secara manual tetap dihormati.
export function NavKeepOpen() {
  const { shouldAnimate, setNavOpen } = useNav()

  useEffect(() => {
    if (applied || !shouldAnimate) return
    applied = true
    if (window.matchMedia('(min-width: 1025px)').matches) setNavOpen(true)
  }, [shouldAnimate, setNavOpen])

  return null
}
