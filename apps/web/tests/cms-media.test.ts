import assert from 'node:assert/strict';
import test from 'node:test';
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

test('published journal paragraphs preserve text, links and line breaks', () => {
  assert.deepEqual(richTextParagraphs({ root: { children: [
    { type: 'heading', children: [{ text: 'Judul' }] },
    { type: 'paragraph', children: [{ text: 'Teks ' }, { type: 'link', children: [{ text: 'tautan' }] }, { type: 'linebreak' }, { text: 'Baris kedua' }] },
    { type: 'list', children: [{ type: 'listitem', children: [{ text: 'Fasilitas' }] }] },
  ] } }), ['Judul', 'Teks tautan\nBaris kedua', 'Fasilitas']);
  assert.deepEqual(richTextParagraphs(null), []);
});
