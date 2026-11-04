// Skema konten halaman dipakai dua sisi: CMS membuat field dari sini, web memakai nilai bawaan dari sini
// saat CMS kosong atau tidak terjangkau. Teks bawaan juga menjadi isi awal formulir di CMS.

export interface TextField<N extends string = string> {
  kind: 'text'
  name: N
  label: string
  default: string
  multiline?: boolean
  description?: string
}

export interface ImageField<N extends string = string> {
  kind: 'image'
  name: N
  label: string
  /** URL foto yang dipakai web selama foto di CMS belum dipilih. */
  default: string
  description?: string
}

export interface VideoField<N extends string = string> {
  kind: 'video'
  name: N
  label: string
  default: string
  description?: string
}

export interface CheckboxField<N extends string = string> {
  kind: 'checkbox'
  name: N
  label: string
  default: boolean
  description?: string
}

export interface SelectField<N extends string = string, O extends string = string> {
  kind: 'select'
  name: N
  label: string
  options: readonly { label: string; value: O }[]
  default: O
  description?: string
}

export interface ListField<N extends string = string, F extends readonly ContentField[] = readonly ContentField[]> {
  kind: 'list'
  name: N
  label: string
  fields: F
  default: readonly ContentValues<F>[]
  /** Label satu baris, misalnya "Slide". */
  rowLabel?: string
  description?: string
}

export interface GroupField<N extends string = string, F extends readonly ContentField[] = readonly ContentField[]> {
  kind: 'group'
  name: N
  label: string
  fields: F
  description?: string
}

export type ContentField =
  | TextField
  | ImageField
  | VideoField
  | CheckboxField
  | SelectField
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ListField<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | GroupField<string, any>

type ValueOf<F> = F extends TextField | ImageField | VideoField
  ? string
  : F extends CheckboxField
    ? boolean
    : F extends SelectField<string, infer O>
      ? O
      : F extends ListField<string, infer S>
        ? ContentValues<S>[]
        : F extends GroupField<string, infer S>
          ? ContentValues<S>
          : never

export type ContentValues<S extends readonly ContentField[]> = {
  -readonly [F in S[number] as F['name']]: ValueOf<F>
}

type Options = { description?: string }

export const text = <N extends string>(name: N, label: string, value: string, options: Options = {}): TextField<N> => ({
  kind: 'text',
  name,
  label,
  default: value,
  ...options,
})

export const textarea = <N extends string>(name: N, label: string, value: string, options: Options = {}): TextField<N> => ({
  kind: 'text',
  name,
  label,
  default: value,
  multiline: true,
  ...options,
})

export const image = <N extends string>(name: N, label: string, fallback: string, options: Options = {}): ImageField<N> => ({
  kind: 'image',
  name,
  label,
  default: fallback,
  ...options,
})

export const video = <N extends string>(name: N, label: string, fallback: string, options: Options = {}): VideoField<N> => ({
  kind: 'video',
  name,
  label,
  default: fallback,
  ...options,
})

export const checkbox = <N extends string>(name: N, label: string, value: boolean, options: Options = {}): CheckboxField<N> => ({
  kind: 'checkbox',
  name,
  label,
  default: value,
  ...options,
})

export const select = <N extends string, const O extends string>(
  name: N,
  label: string,
  options: readonly { label: string; value: O }[],
  value: NoInfer<O>,
  extra: Options = {},
): SelectField<N, O> => ({ kind: 'select', name, label, options, default: value, ...extra })

export const list = <N extends string, const F extends readonly ContentField[]>(
  name: N,
  label: string,
  fields: F,
  value: readonly ContentValues<F>[],
  options: Options & { rowLabel?: string } = {},
): ListField<N, F> => ({ kind: 'list', name, label, fields, default: value, ...options })

export const group = <N extends string, const F extends readonly ContentField[]>(
  name: N,
  label: string,
  fields: F,
  options: Options = {},
): GroupField<N, F> => ({ kind: 'group', name, label, fields, ...options })

export interface ContentPage<S extends string = string, F extends readonly ContentField[] = readonly ContentField[]> {
  /** Slug global di CMS. */
  slug: S
  label: string
  description?: string
  fields: F
}

export const page = <S extends string, const F extends readonly ContentField[]>(
  slug: S,
  label: string,
  fields: F,
  description?: string,
): ContentPage<S, F> => ({ slug, label, fields, description })

export type PageContent<P extends ContentPage> = ContentValues<P['fields']>

/** Nilai bawaan lengkap sebuah daftar field, dipakai web sebagai fallback dan CMS sebagai isi awal. */
export function defaultsOf<S extends readonly ContentField[]>(fields: S): ContentValues<S> {
  const result: Record<string, unknown> = {}
  for (const field of fields) {
    result[field.name] = field.kind === 'group' ? defaultsOf(field.fields) : field.default
  }
  return result as ContentValues<S>
}

/** Mengganti penanda seperti {nama} dengan nilai sebenarnya. Penanda yang tidak dikenal dibiarkan. */
export function fillTemplate(template: string, values: Record<string, string | number | undefined | null>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key]
    return value === undefined || value === null ? match : String(value)
  })
}
