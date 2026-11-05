export async function passwordResetResponse(response: Response): Promise<{ ok: true } | { ok: false; message: string }> {
  const fallback = 'Permintaan pemulihan gagal. Coba lagi atau hubungi admin konten.'
  try {
    const body = await response.json()
    if (response.ok && body && typeof body === 'object') return { ok: true }
    const message = body?.errors?.[0]?.message
    return { ok: false, message: typeof message === 'string' ? message : fallback }
  } catch {
    return { ok: false, message: fallback }
  }
}
