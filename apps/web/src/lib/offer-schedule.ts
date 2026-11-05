export function offerIsVisible(offer: { scheduleEnabled?: boolean | null; validFrom?: string | null; validUntil?: string | null }, now = Date.now()): boolean {
  if (!offer.scheduleEnabled) return true;
  const start = offer.validFrom ? Date.parse(offer.validFrom) : -Infinity;
  const end = offer.validUntil ? Date.parse(offer.validUntil) : Infinity;
  return !Number.isNaN(start) && !Number.isNaN(end) && start <= now && now <= end;
}
