'use client'

import { EmailField, Form, FormSubmit, Link, useAuth, useConfig } from '@payloadcms/ui'
import { useState } from 'react'
import { passwordResetResponse } from '../../lib/passwordResetResponse'

export function ForgotPasswordView() {
  const { config } = useConfig()
  const { user } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const loginUrl = `${config.routes.admin}${config.admin.routes.login}`

  if (user) return <Link href={`${config.routes.admin}${config.admin.routes.account}`}>Ubah kata sandi di akun Anda</Link>

  return (
    <>
      {submitted ? (
        <div className="form-header" role="status">
          <h1>Periksa email Anda</h1>
          <p>Jika alamat email terkait dengan sebuah akun, instruksi pemulihan akan dikirim. Periksa juga folder spam.</p>
        </div>
      ) : (
        <Form
          action={`${config.routes.api}/${config.admin.user}/forgot-password`}
          method="POST"
          initialState={{ email: { initialValue: '', value: '', valid: true } }}
          handleResponse={async response => {
            const result = await passwordResetResponse(response)
            setError(result.ok ? '' : result.message)
            if (result.ok) setSubmitted(true)
          }}
        >
          <div className="form-header">
            <h1>Lupa kata sandi</h1>
            <p>Masukkan email akun Anda untuk meminta instruksi pemulihan kata sandi.</p>
          </div>
          {error && <p role="alert">{error}</p>}
          <EmailField
            field={{ name: 'email', label: 'Email', required: true, admin: { autoComplete: 'email' } }}
            path="email"
            validate={value => typeof value === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? true : 'Masukkan alamat email yang valid.'}
          />
          <FormSubmit>Kirim instruksi pemulihan</FormSubmit>
        </Form>
      )}
      <Link href={loginUrl} prefetch={false}>Kembali ke halaman masuk</Link>
    </>
  )
}
