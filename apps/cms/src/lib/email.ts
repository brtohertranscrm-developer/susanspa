import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { APIError, type EmailAdapter } from 'payload'

export function cmsEmail(env: Record<string, string | undefined> = process.env, factory = nodemailerAdapter): EmailAdapter | Promise<EmailAdapter> {
  if (!env.SMTP_HOST) {
    return () => ({
      name: 'email-not-configured',
      defaultFromAddress: 'no-reply@susansparesort.com',
      defaultFromName: 'Susan Spa & Resort',
      sendEmail: async () => {
        throw new APIError('Email pemulihan belum dikonfigurasi. Hubungi administrator.', 503, undefined, true)
      },
    })
  }
  const secure = env.SMTP_SECURE === 'true'
  const port = Number(env.SMTP_PORT || (secure ? 465 : 587))
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('SMTP_PORT tidak valid')
  if (!env.SMTP_FROM_ADDRESS) throw new Error('SMTP_FROM_ADDRESS wajib diisi jika SMTP_HOST diatur')
  if (Boolean(env.SMTP_USER) !== Boolean(env.SMTP_PASS)) throw new Error('SMTP_USER dan SMTP_PASS harus diisi berpasangan')
  return factory({
    defaultFromAddress: env.SMTP_FROM_ADDRESS,
    defaultFromName: env.SMTP_FROM_NAME || 'Susan Spa & Resort',
    skipVerify: true,
    transportOptions: {
      host: env.SMTP_HOST,
      port,
      secure,
      requireTLS: !secure,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS! } : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    },
  })
}
