import React from 'react'

// Dipakai Payload di halaman login, lupa kata sandi, dan pembuatan akun pertama.
export function LoginBrand() {
  return (
    <div className="susan-login-brand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/login/logo.png" alt="Susan Spa & Resort" width={180} height={80} />
      <span className="susan-login-brand__label">Panel Konten Website</span>
    </div>
  )
}

export default LoginBrand
