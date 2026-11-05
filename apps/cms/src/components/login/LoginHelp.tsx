import React from 'react'
import { webUrl } from '../../lib/publicLinks'

export function LoginHelp() {
  return (
    <div className="susan-login-help">
      <div className="susan-login-help__box">
        <p className="susan-login-help__title">Lupa kata sandi atau akun terkunci?</p>
        <p className="susan-login-help__text">
          Gunakan tautan lupa kata sandi untuk meminta email pemulihan. Jika layanan email belum tersedia,
          hubungi admin konten untuk mengatur ulang kata sandi di menu Pengguna. Setelah 5 kali salah memasukkan
          kata sandi, akun dikunci selama 15 menit.
        </p>
      </div>
      <a className="susan-login-help__back" href={webUrl}>
        Kembali ke website
      </a>
    </div>
  )
}

export default LoginHelp
