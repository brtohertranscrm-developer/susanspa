import assert from 'node:assert/strict'
import test from 'node:test'
import type { Payload } from 'payload'
import { cmsEmail } from '../src/lib/email'
import { passwordResetResponse } from '../src/lib/passwordResetResponse'

test('password recovery UI accepts only successful JSON responses', async () => {
  assert.deepEqual(await passwordResetResponse(Response.json({ message: 'Accepted' })), { ok: true })
  assert.deepEqual(await passwordResetResponse(Response.json({ errors: [{ message: 'Email belum dikonfigurasi' }] }, { status: 503 })), { ok: false, message: 'Email belum dikonfigurasi' })
  assert.equal((await passwordResetResponse(new Response('Bad gateway', { status: 502 }))).ok, false)
  assert.equal((await passwordResetResponse(new Response('Malformed success'))).ok, false)
})

test('unconfigured email fails explicitly instead of pretending a reset email was delivered', async () => {
  const adapter = await cmsEmail({})
  await assert.rejects(() => adapter({ payload: {} as Payload }).sendEmail({ to: 'test@example.test', subject: 'Reset' }), error => error instanceof Error && 'status' in error && error.status === 503)
})

test('SMTP configuration requires a sender and paired credentials', () => {
  assert.throws(() => cmsEmail({ SMTP_HOST: 'smtp.example.test' }), /SMTP_FROM_ADDRESS/)
  assert.throws(() => cmsEmail({ SMTP_HOST: 'smtp.example.test', SMTP_FROM_ADDRESS: 'cms@example.test', SMTP_USER: 'user' }), /berpasangan/)
  assert.throws(() => cmsEmail({ SMTP_HOST: 'smtp.example.test', SMTP_PORT: '0' }), /SMTP_PORT/)
})

test('SMTP uses encryption and never creates an external test email account', async () => {
  let called = false
  await cmsEmail({ SMTP_HOST: 'smtp.example.test', SMTP_FROM_ADDRESS: 'cms@example.test', SMTP_USER: 'user', SMTP_PASS: 'test-only' }, async options => {
    called = true
    assert.equal(options?.skipVerify, true)
    assert.equal(options?.transportOptions?.host, 'smtp.example.test')
    assert.equal(options?.transportOptions?.port, 587)
    assert.equal(options?.transportOptions?.requireTLS, true)
    assert.deepEqual(options?.transportOptions?.auth, { user: 'user', pass: 'test-only' })
    return () => ({ name: 'test', defaultFromAddress: 'cms@example.test', defaultFromName: 'CMS Test', sendEmail: async () => ({}) })
  })
  assert.equal(called, true)
})
