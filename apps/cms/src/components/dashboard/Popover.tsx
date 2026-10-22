'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

interface PopoverProps {
  /** Isi tombol pemicu. */
  trigger: React.ReactNode
  triggerClassName: string
  triggerLabel?: string
  align?: 'start' | 'end'
  panelClassName?: string
  children: (close: () => void) => React.ReactNode
}

// Panel kecil yang terbuka di bawah tombol. Tertutup saat klik di luar atau menekan Escape.
export function Popover({ trigger, triggerClassName, triggerLabel, align = 'end', panelClassName = '', children }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="susan-popover" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={triggerLabel}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </button>
      {open && (
        <div id={panelId} className={`susan-popover__panel susan-popover__panel--${align} ${panelClassName}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}
