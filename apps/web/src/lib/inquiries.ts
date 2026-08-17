import type { InquiryReceipt, InquirySubmission } from '@susan/contracts';

export async function submitInquiry(inquiry: InquirySubmission): Promise<InquiryReceipt> {
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry),
  });
  const body = (await response.json()) as InquiryReceipt | { error?: string };
  if (!response.ok || !('id' in body)) {
    throw new Error('error' in body ? body.error : 'Inquiry belum dapat dikirim.');
  }
  return body;
}
