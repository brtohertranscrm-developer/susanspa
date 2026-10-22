import { group, image, text, textarea } from './schema.js'

export const IMAGEKIT_BASE = 'https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/update%20konten%20susan%20spa'

export const hero = (values: { image: string; imageAlt: string; title: string; subtitle: string; scrollLabel: string }) =>
  group('hero', 'Header halaman', [
    image('image', 'Foto header', values.image, { description: 'Foto besar di bagian atas. Kosongkan untuk memakai foto bawaan.' }),
    text('imageAlt', 'Deskripsi foto header', values.imageAlt, { description: 'Dibaca pembaca layar. Jelaskan isi foto.' }),
    text('title', 'Judul besar', values.title),
    text('subtitle', 'Subjudul', values.subtitle),
    text('scrollLabel', 'Teks ajakan gulir ke bawah', values.scrollLabel),
  ])

/** Header sederhana tanpa foto, dipakai halaman jurnal, kontak, dan reservasi. */
export const simpleHero = (values: { eyebrow: string; title: string; intro: string }) =>
  group('hero', 'Header halaman', [
    text('eyebrow', 'Label kecil di atas judul', values.eyebrow),
    text('title', 'Judul besar', values.title),
    textarea('intro', 'Paragraf pembuka', values.intro),
  ])

export const seo = (values: { title: string; description: string }) =>
  group(
    'seo',
    'SEO halaman',
    [
      text('title', 'Judul di tab browser dan Google', values.title, {
        description: 'Nama resor ditambahkan otomatis di belakang judul. Kosongkan untuk memakai judul bawaan situs.',
      }),
      textarea('description', 'Deskripsi di hasil pencarian', values.description, {
        description: 'Ideal 140 sampai 160 karakter.',
      }),
    ],
  )

export const sectionHeading = <N extends string>(name: N, label: string, values: { eyebrow: string; title: string; intro?: string }) =>
  group(name, label, [
    text('eyebrow', 'Label kecil', values.eyebrow),
    text('title', 'Judul', values.title),
    textarea('intro', 'Paragraf', values.intro ?? ''),
  ])
