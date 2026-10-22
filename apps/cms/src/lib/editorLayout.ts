import type { CollapsibleField, Field, Tab } from 'payload'

const isCollapsible = (field: Field): field is CollapsibleField => field.type === 'collapsible'

/**
 * Bagian lipat di level teratas editor diubah menjadi tab, agar editor tidak perlu menggulir melewati semua bagian.
 * Tab tanpa nama tidak menyimpan data sendiri, jadi struktur dokumen dan database tetap sama.
 * Field lain di level teratas (misalnya yang tampil di sidebar) tetap di tempatnya.
 */
export const collapsiblesToTabs = (fields: Field[]): Field[] => {
  const sections = fields.filter(isCollapsible)
  if (sections.length < 2) return fields

  const tabs: Tab[] = sections.map((section) => ({
    label: typeof section.label === 'string' ? section.label : 'Bagian',
    fields: section.fields,
  }))
  const tabsField: Field = { type: 'tabs', tabs }

  const firstIndex = fields.findIndex(isCollapsible)
  const rest = fields.filter((field) => !isCollapsible(field))
  return [...rest.slice(0, firstIndex), tabsField, ...rest.slice(firstIndex)]
}
