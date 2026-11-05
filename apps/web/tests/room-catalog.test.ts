import assert from 'node:assert/strict';
import test from 'node:test';
import { ROOMS } from '../src/data/rooms';
import { resolveRoomCatalog, type CmsRoom } from '../src/lib/room-catalog';
import { roomCapacity } from '../src/lib/room-display';

test('unavailable CMS preserves the official fallback without invented rates or capacities', () => {
  const rooms = resolveRoomCatalog(null);
  assert.equal(rooms.length, 11);
  assert.equal(new Set(rooms.map((room) => room.slug)).size, 11);
  assert.ok(rooms.every((room) => room.startingPriceIdr === null));
  assert.equal(roomCapacity(rooms.find((room) => room.slug === 'aurora-junior-suite')!), 'Please confirm');
  assert.equal(roomCapacity(rooms.find((room) => room.slug === 'villa-1-big-room')!), '8 guests');
  assert.equal(roomCapacity(rooms.find((room) => room.slug === 'family-room')!), '4 adults + 1 child');
  assert.equal(roomCapacity(rooms.find((room) => room.slug === 'villa-4-bedrooms')!), '9 guests');
});

test('successful CMS is authoritative and retains matching room details without restoring unpublished rooms', () => {
  const override: CmsRoom = {
    id: 42, slug: 'family-room', name: 'Family Room', category: 'Family',
    shortDescription: 'Updated by the resort', startingPriceLabel: 1500000,
    capacityChildren: 0, images: [{ image: { url: '/media/family.jpg' } }],
  };
  const rooms = resolveRoomCatalog([override], 'https://cms.example.test/');
  const room = rooms.find((entry) => entry.slug === 'family-room')!;
  assert.equal(rooms.length, 1);
  assert.equal(room.id, '42');
  assert.equal(room.description, 'Updated by the resort');
  assert.equal(room.startingPriceIdr, 1500000);
  assert.equal(room.capacityChildren, 0);
  assert.equal(room.sizeSqm, 33);
  assert.deepEqual(room.images, ['https://cms.example.test/media/family.jpg']);
  assert.deepEqual(rooms.map((entry) => entry.slug), ['family-room']);
});

test('known demo entries are retired while other CMS rooms remain available without fabricated specs', () => {
  const rooms = resolveRoomCatalog([
    { id: 1, slug: 'grand-villa', name: 'Grand Mountain Villa', category: 'Villa' },
    { id: 2, slug: 'new-resort-room', name: 'New Resort Room', category: 'Deluxe' },
  ]);
  assert.equal(rooms.length, 1);
  assert.ok(!rooms.some((room) => room.slug === 'grand-villa'));
  const extra = rooms.find((room) => room.slug === 'new-resort-room')!;
  assert.equal(extra.capacityAdults, null);
  assert.equal(extra.sizeSqm, null);
  assert.equal(extra.startingPriceIdr, null);
});

test('empty published catalog stays empty and CMS order is preserved for official and new rooms', () => {
  assert.deepEqual(resolveRoomCatalog([]), []);
  const rooms = resolveRoomCatalog([
    { id: 9, slug: 'new-room', name: 'New', category: 'Family', sortOrder: -1 },
    { id: 2, slug: 'family-room', name: 'Family', category: 'Family', sortOrder: 0 },
    { id: 1, slug: 'aurora-junior-suite', name: 'Aurora', category: 'Suite', sortOrder: 99 },
  ]);
  assert.deepEqual(rooms.map((room) => room.slug), ['new-room', 'family-room', 'aurora-junior-suite']);
});

test('zero occupancy never becomes a zero-guest booking claim', () => {
  assert.equal(roomCapacity({ ...ROOMS[0], capacityAdults: 0, capacityChildren: 0 }), 'Please confirm');
});
