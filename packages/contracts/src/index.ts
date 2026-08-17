import { z } from 'zod'

export const inquiryTypes = ['room', 'spa', 'wedding', 'event', 'general'] as const

export const inquirySubmissionSchema = z
  .object({
    type: z.enum(inquiryTypes),
    fullName: z.string().trim().min(2).max(150),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(8).max(50),
    checkIn: z.iso.date().optional(),
    checkOut: z.iso.date().optional(),
    guests: z.number().int().min(1).max(1000).optional(),
    roomSlug: z.string().trim().max(100).optional(),
    targetDate: z.iso.date().optional(),
    venuePreference: z.string().trim().max(150).optional(),
    treatmentPreference: z.string().trim().max(150).optional(),
    notes: z.string().trim().max(3000).optional(),
    source: z.string().trim().max(100).default('website'),
  })
  .superRefine((value, context) => {
    if (value.type === 'room' && (!value.checkIn || !value.checkOut)) {
      context.addIssue({
        code: 'custom',
        message: 'Check-in dan check-out wajib untuk inquiry kamar.',
        path: ['checkIn'],
      })
    }

    if (value.checkIn && value.checkOut && value.checkOut <= value.checkIn) {
      context.addIssue({
        code: 'custom',
        message: 'Check-out harus setelah check-in.',
        path: ['checkOut'],
      })
    }
  })

export type InquirySubmission = z.infer<typeof inquirySubmissionSchema>

export interface InquiryReceipt {
  id: string
  status: 'received'
  createdAt: string
}

export interface ApiErrorResponse {
  error: string
  details?: unknown
}
