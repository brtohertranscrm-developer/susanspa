import type { Room } from '@/types';

export function roomCapacity(room: Room): string {
  if (!room.capacityAdults) return 'Please confirm';
  // The villa description specifies eight people without an adult/child split.
  if (room.capacityChildren === null) return `${room.capacityAdults} guests`;
  return `${room.capacityAdults} adults${room.capacityChildren > 0 ? ` + ${room.capacityChildren} ${room.capacityChildren === 1 ? 'child' : 'children'}` : ''}`;
}

export function roomCategoryLabel(category: Room['category']): string {
  return category === 'Deluxe' ? 'Room' : category;
}
