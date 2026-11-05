import assert from 'node:assert/strict';
import test from 'node:test';
import { imageKitImageUrl } from '@susan/contracts';
import { resolveCmsMedia } from '../src/lib/cms-media';
import { richTextParagraphs } from '../src/lib/cms-richtext';

test('relative CMS media resolves against the CMS and preserves transformations', () => {
  assert.equal(resolveCmsMedia({ url: '/media/foto.jpg?tr=w-800' }, '', 'https://cms.example.test'), 'https://cms.example.test/media/foto.jpg?tr=w-800');
});

test('replacing media changes its versioned URL even with the same filename', () => {
  const original = resolveCmsMedia({ url: 'https://ik.imagekit.io/resort/foto.jpg?tr=w-800', updatedAt: '2026-11-04T10:00:00Z' });
  const replacement = resolveCmsMedia({ url: 'https://ik.imagekit.io/resort/foto.jpg?tr=w-800', updatedAt: '2026-11-04T11:00:00Z' });
  assert.notEqual(original, replacement);
  assert.equal(new URL(replacement).searchParams.get('tr'), 'w-800');
  assert.equal(new URL(replacement).searchParams.get('v'), '2026-11-04T11:00:00Z');
});

test('invalid, unpopulated and unsafe media use the existing fallback', () => {
  for (const media of [null, undefined, 42, '42', {}, { url: '' }, { url: 'javascript:alert(1)' }, { url: '//untrusted.test/image.jpg' }]) {
    assert.equal(resolveCmsMedia(media, '/fallback.jpg', 'https://cms.example.test'), '/fallback.jpg');
  }
});

test('oversized ImageKit AVIF uses bounded delivery and retains media revision', () => {
  const url = 'https://ik.imagekit.io/ro8484nadw/susanspa/MNP_3585_copy_7Y6wLDF6m.avif';
  const resolved = new URL(resolveCmsMedia({ url, width: 8114, height: 5406, updatedAt: 'revision-2' }));
  assert.equal(resolved.searchParams.get('tr'), 'w-2560');
  assert.equal(resolved.searchParams.get('v'), 'revision-2');
  assert.equal(resolved.pathname, new URL(url).pathname);
  assert.equal(new URL(imageKitImageUrl(url, { width: 8114, height: 5406 }, 320)).searchParams.get('tr'), 'w-320');
});

test('ImageKit delivery preserves ordinary images, existing transforms and other origins', () => {
  const url = 'https://ik.imagekit.io/resort/photo.avif';
  assert.equal(imageKitImageUrl(url, { width: 5000, height: 5000 }), url);
  assert.equal(imageKitImageUrl(url), url);
  const oversized = { width: 8114, height: 5406 };
  for (const existing of [url + '?tr=w-1200', url.replace('/resort/', '/resort/tr:w-1200/')]) {
    assert.equal(imageKitImageUrl(existing, oversized), existing);
  }
  for (const unchanged of ['https://other.example/photo.avif', 'https://ik.imagekit.io.untrusted.example/photo.avif', '/photo.avif']) {
    assert.equal(imageKitImageUrl(unchanged, oversized, 320), unchanged);
  }
  const thumbnail = new URL(imageKitImageUrl(url + '?tr=w-2560&v=revision-3', oversized, 320));
  assert.equal(thumbnail.searchParams.get('tr'), 'w-320');
  assert.equal(thumbnail.searchParams.get('v'), 'revision-3');
  const video = 'https://ik.imagekit.io/resort/video.mp4';
  assert.equal(resolveCmsMedia({ url: video, mimeType: 'video/mp4', width: 8192, height: 4320 }), video);
});

test('published journal paragraphs preserve text, links and line breaks', () => {
  assert.deepEqual(richTextParagraphs({ root: { children: [
    { type: 'heading', children: [{ text: 'Judul' }] },
    { type: 'paragraph', children: [{ text: 'Teks ' }, { type: 'link', children: [{ text: 'tautan' }] }, { type: 'linebreak' }, { text: 'Baris kedua' }] },
    { type: 'list', children: [{ type: 'listitem', children: [{ text: 'Fasilitas' }] }] },
  ] } }), ['Judul', 'Teks tautan\nBaris kedua', 'Fasilitas']);
  assert.deepEqual(richTextParagraphs(null), []);
});
