// Terjemahan Indonesia untuk editor teks (Lexical). Paket Payload belum menyediakannya,
// sehingga placeholder dan label toolbar tampil sebagai kunci mentah seperti "lexical:general:placeholder".
export const lexicalId = {
  general: {
    placeholder: "Mulai mengetik, atau tekan '/' untuk perintah...",
    slashMenuBasicGroupLabel: 'Dasar',
    slashMenuListGroupLabel: 'Daftar',
    toolbarItemsActive: '{{count}} aktif',
  },
  heading: { label: 'Judul {{headingLevel}}' },
  align: {
    alignCenterLabel: 'Rata tengah',
    alignJustifyLabel: 'Rata kiri dan kanan',
    alignLeftLabel: 'Rata kiri',
    alignRightLabel: 'Rata kanan',
  },
  blockquote: { label: 'Kutipan' },
  paragraph: { label: 'Paragraf', label2: 'Teks biasa' },
  relationship: { label: 'Relasi' },
  upload: { label: 'Unggah' },
  textState: { defaultStyle: 'Gaya bawaan' },
  link: { label: 'Tautan', loadingWithEllipsis: 'Memuat...' },
  checklist: { label: 'Daftar centang' },
  orderedList: { label: 'Daftar bernomor' },
  unorderedList: { label: 'Daftar poin' },
  blocks: {
    label: 'Blok',
    inlineBlocks: {
      create: 'Buat {{label}}',
      edit: 'Ubah {{label}}',
      label: 'Blok sebaris',
      remove: 'Hapus {{label}}',
    },
  },
  horizontalRule: { label: 'Garis pemisah' },
  indent: { decreaseLabel: 'Kurangi indentasi', increaseLabel: 'Tambah indentasi' },
}
