'use client'

import { TextField, useDocumentInfo, useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import { useEffect, useRef } from 'react'
import { slugify } from '../lib/slugify'

type Props = TextFieldClientProps & { source?: string }

export function SlugField({ source = 'title', ...props }: Props) {
  const { value, setValue } = useField<string>({ path: props.path ?? 'slug' })
  const sourceValue = useFormFields(([fields]) => fields[source]?.value)
  const { id } = useDocumentInfo()

  const lastGenerated = useRef<string>(value ?? '')
  const edited = useRef<boolean>(Boolean(id && value))

  useEffect(() => {
    if ((value ?? '') !== lastGenerated.current) edited.current = true
  }, [value])

  useEffect(() => {
    if (edited.current || typeof sourceValue !== 'string') return
    const next = slugify(sourceValue)
    if (next !== (value ?? '')) {
      lastGenerated.current = next
      setValue(next)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceValue])

  return <TextField {...props} />
}
