import assert from 'node:assert/strict';
import test from 'node:test';

process.env.CMS_API_URL = 'https://cms.example.test';
process.env.CMS_PUBLIC_URL = 'https://media.example.test';
const cmsPromise = import('../src/lib/cms');

test('every collection bypasses cache and requests published content', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  const requests: URL[] = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    requests.push(url);
    assert.equal(init?.cache, 'no-store');
    assert.equal(url.searchParams.get('draft'), 'false');
    assert.equal(url.searchParams.get('where[_status][equals]'), 'published');
    return Response.json({ docs: [] });
  };
  try {
    await Promise.all([cms.getRooms(), cms.getSpaTreatments(), cms.getWeddingPackages(), cms.getDining(), cms.getFacilities(), cms.getGalleryItems(), cms.getOffers(), cms.getExperiences(), cms.getNearbyDestinations(), cms.getJournalArticles()]);
    assert.equal(requests.length, 10);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('published media maps consistently across all collections and gallery categories', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  const media = { url: '/media/latest.jpg', updatedAt: '2026-11-04T11:00:00Z', width: 1200, height: 800 };
  globalThis.fetch = async (input) => {
    const collection = new URL(String(input)).pathname.split('/').pop();
    const document = {
      id: 42, slug: 'new-content', title: 'Published content', name: 'Published room', category: 'Rooms',
      featuredImage: media, coverImage: media, image: media, images: [{ image: media }],
      kind: 'facility', content: { root: { children: [{ type: 'paragraph', children: [{ text: 'Published article' }] }] } },
    };
    const docs = collection === 'resort-content'
      ? ['facility', 'dining', 'experience', 'nearby'].map((kind) => ({ ...document, kind }))
      : [document];
    return Response.json({ docs });
  };
  try {
    const expected = 'https://media.example.test/media/latest.jpg?v=2026-11-04T11%3A00%3A00Z';
    assert.equal((await cms.getRooms()).find((room) => room.slug === 'new-content')?.images[0], expected);
    for (const getter of [cms.getSpaTreatments, cms.getWeddingPackages, cms.getDining, cms.getFacilities, cms.getGalleryItems, cms.getOffers, cms.getExperiences, cms.getNearbyDestinations]) {
      assert.equal((await getter())[0].image, expected);
    }
    assert.equal((await cms.getGalleryItems())[0].category, 'Kamar & Villa');
    assert.equal((await cms.getGalleryItems())[0].aspectRatio, 'wide');
    assert.equal((await cms.getJournalArticles())[0].coverImage, expected);
    assert.deepEqual((await cms.getJournalArticles())[0].content, ['Published article']);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('site image positions and social image use published versioned media', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    assert.equal(url.pathname, '/api/globals/site-settings');
    assert.equal(url.searchParams.get('draft'), 'false');
    assert.equal(init?.cache, 'no-store');
    return Response.json({
      websiteImages: { spaHero: { url: '/media/spa.jpg', alt: 'Spa terbaru', updatedAt: 'new' }, logoGold: 42 },
      defaultSeoImage: { url: '/media/social.jpg' },
    });
  };
  try {
    const images = await cms.getWebsiteImages();
    assert.equal(images.spaHero?.url, 'https://media.example.test/media/spa.jpg?v=new');
    assert.equal(images.spaHero?.alt, 'Spa terbaru');
    assert.equal(images.socialImage?.url, 'https://media.example.test/media/social.jpg');
    assert.equal(images.logoGold, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('CMS failure preserves existing images instead of empty image sources', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(null, { status: 503 });
  try {
    assert.ok((await cms.getSpaTreatments())[0].image);
    assert.deepEqual(await cms.getWebsiteImages(), {});
  } finally {
    globalThis.fetch = originalFetch;
  }
});
