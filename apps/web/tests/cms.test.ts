import assert from 'node:assert/strict';
import test from 'node:test';

process.env.CMS_API_URL = 'https://cms.example.test';
process.env.CMS_PUBLIC_URL = 'https://media.example.test';
const cmsPromise = import('../src/lib/cms');

test('offers loader excludes future and expired scheduled offers but preserves manual offers', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ docs: [
    { id: 1, slug: 'future', title: 'Future', scheduleEnabled: true, validFrom: '2099-01-01T00:00:00Z' },
    { id: 2, slug: 'expired', title: 'Expired', scheduleEnabled: true, validUntil: '2000-01-01T00:00:00Z' },
    { id: 3, slug: 'manual', title: 'Manual', scheduleEnabled: false, validUntil: '2000-01-01T00:00:00Z' },
    { id: 4, slug: 'active', title: 'Active', scheduleEnabled: true },
  ] });
  try {
    assert.deepEqual((await cms.getOffers()).map(offer => offer.slug), ['manual', 'active']);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('offer scheduling is opt-in and respects exact time boundaries', async () => {
  const { offerIsVisible } = await import('../src/lib/offer-schedule');
  const start = '2026-11-05T08:00:00+07:00';
  const end = '2026-11-05T09:00:00+07:00';
  const offer = { scheduleEnabled: true, validFrom: start, validUntil: end };
  assert.equal(offerIsVisible(offer, Date.parse(start) - 1), false);
  assert.equal(offerIsVisible(offer, Date.parse(start)), true);
  assert.equal(offerIsVisible(offer, Date.parse(end)), true);
  assert.equal(offerIsVisible(offer, Date.parse(end) + 1), false);
  assert.equal(offerIsVisible({ ...offer, scheduleEnabled: false }, Date.parse(end) + 1), true);
  assert.equal(offerIsVisible({ scheduleEnabled: true }), true);
  assert.equal(offerIsVisible({ scheduleEnabled: true, validFrom: 'invalid' }), false);
});

test('sitemap is dynamic, excludes disabled pages and uses published CMS catalogs', async () => {
  const { default: sitemap, dynamic } = await import('../src/app/sitemap');
  assert.equal(dynamic, 'force-dynamic');
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    assert.equal(init?.cache, 'no-store');
    assert.equal(url.searchParams.get('draft'), 'false');
    if (url.pathname.includes('/globals/')) {
      return Response.json({ enabled: url.pathname !== '/api/globals/page-spa' });
    }
    assert.equal(url.searchParams.get('where[_status][equals]'), 'published');
    if (url.pathname === '/api/pages') return Response.json({ docs: [{ slug: 'published-custom', updatedAt: '2026-11-05T00:00:00Z' }] });
    return Response.json({ docs: [] });
  };
  try {
    const entries = await sitemap();
    const urls = entries.map(entry => entry.url);
    assert.ok(urls.includes('https://www.susansparesort.com'));
    assert.ok(urls.includes('https://www.susansparesort.com/rooms'));
    assert.ok(urls.includes('https://www.susansparesort.com/published-custom'));
    assert.ok(!urls.includes('https://www.susansparesort.com/spa'));
    assert.ok(!urls.some(url => url.includes('/rooms/') || url.includes('/journal/') || url.includes('/preview/')));
    assert.equal(entries.find(entry => entry.url.endsWith('/published-custom'))?.lastModified?.toString(), new Date('2026-11-05T00:00:00Z').toString());
  } finally {
    globalThis.fetch = originalFetch;
  }
});

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

test('successful empty published collections stay empty rather than resurrecting defaults', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ docs: [] });
  try {
    for (const getter of [cms.getRooms, cms.getSpaTreatments, cms.getWeddingPackages, cms.getOffers, cms.getFacilities, cms.getDining, cms.getExperiences, cms.getNearbyDestinations, cms.getGalleryItems, cms.getJournalArticles]) {
      assert.deepEqual(await getter(), []);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('collection pagination returns all pages and never returns a partial catalog after a failure', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  const pages: number[] = [];
  globalThis.fetch = async (input) => {
    const page = Number(new URL(String(input)).searchParams.get('page'));
    pages.push(page);
    return Response.json({ docs: [{ id: page }], hasNextPage: page < 3, nextPage: page < 3 ? page + 1 : null });
  };
  try {
    assert.deepEqual(await cms.getCmsCollection('offers', []), [{ id: 1 }, { id: 2 }, { id: 3 }]);
    assert.deepEqual(pages, [1, 2, 3]);
    globalThis.fetch = async (input) => Number(new URL(String(input)).searchParams.get('page')) === 1
      ? Response.json({ docs: [{ id: 1 }], hasNextPage: true, nextPage: 2 })
      : new Response(null, { status: 503 });
    assert.equal(await cms.getCmsCollection('offers', null), null);
    globalThis.fetch = async () => Response.json({ docs: [], hasNextPage: true, nextPage: 1 });
    assert.equal(await cms.getCmsCollection('offers', null), null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('journal mapping preserves the original rich-text tree', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  const content = { root: { children: [
    { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Heading' }] },
    { type: 'paragraph', children: [{ type: 'link', fields: { url: 'https://example.test' }, children: [{ type: 'text', text: 'Link', format: 1 }] }] },
  ] } };
  globalThis.fetch = async () => Response.json({ docs: [{ id: 1, slug: 'article', title: 'Article', content }] });
  try {
    assert.deepEqual((await cms.getJournalArticles())[0].richText, content);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('custom page sitemap follows pagination and preview forwards only its scoped bearer token', async () => {
  const { getCustomPageSlugs, getCustomPagePreview } = await import('../src/lib/custom-pages');
  const originalFetch = globalThis.fetch;
  const token = `1900000000.${'a'.repeat(43)}`;
  let calls = 0;
  globalThis.fetch = async (input, init) => {
    calls += 1;
    const url = new URL(String(input));
    assert.equal(init?.cache, 'no-store');
    if (url.pathname.endsWith('/preview')) {
      assert.equal(url.pathname, '/api/pages/42/preview');
      assert.equal(new Headers(init?.headers).get('authorization'), `Bearer ${token}`);
      assert.equal(url.searchParams.has('token'), false);
      return Response.json({ slug: 'draft-page', title: 'Draft title', sections: [] });
    }
    const page = Number(url.searchParams.get('page') || 1);
    assert.equal(url.searchParams.get('draft'), 'false');
    return Response.json({ docs: [{ slug: `page-${page}` }], hasNextPage: page === 1, nextPage: page === 1 ? 2 : null });
  };
  try {
    assert.deepEqual((await getCustomPageSlugs()).map(page => page.slug), ['page-1', 'page-2']);
    assert.equal((await getCustomPagePreview('42', token))?.title, 'Draft title');
    assert.equal(await getCustomPagePreview('42', 'invalid-token'), null);
    assert.equal(calls, 3);
    globalThis.fetch = async () => new Response(null, { status: 403 });
    assert.equal(await getCustomPagePreview('42', token), null);
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

test('merged CMS catalog retains editable detail fields and versions secondary images', async () => {
  const cms = await cmsPromise;
  const originalFetch = globalThis.fetch;
  const media = { url: '/media/detail.jpg', updatedAt: 'revision-2' };
  globalThis.fetch = async () => Response.json({ docs: [{
    id: 88, slug: 'editable-detail', title: 'Editable detail', category: 'Weddings',
    featuredImage: media, coverImage: media, gallery: [{ image: media }],
    schedule: [{ label: 'Ceremony' }], quote: 'Editorial quote', readTime: '7 min',
    seoTitle: 'CMS SEO title', seoDescription: 'CMS SEO description',
    authorName: 'Editor', authorRole: 'Writer', authorAvatar: media,
    content: { root: { children: [{ type: 'paragraph', children: [{ text: 'Article content' }] }] } },
  }] });
  try {
    const expected = 'https://media.example.test/media/detail.jpg?v=revision-2';
    const wedding = (await cms.getWeddingPackages())[0];
    assert.deepEqual(wedding.schedule, ['Ceremony']);
    assert.deepEqual(wedding.images, [expected, expected]);
    const article = (await cms.getJournalArticles())[0];
    assert.equal(article.seoTitle, 'CMS SEO title');
    assert.equal(article.quote, 'Editorial quote');
    assert.equal(article.author.avatar, expected);
    assert.equal(article.readTime, '7 min');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('page editor, layout, social images and custom page blocks bypass cache and version media', async () => {
  const { getPageContent, getLayoutContent } = await import('../src/lib/content');
  const { getSiteSettings } = await import('../src/lib/site-config');
  const { getCustomPage, getCustomPageSlugs } = await import('../src/lib/custom-pages');
  const { homePage } = await import('@susan/contracts/content');
  const originalFetch = globalThis.fetch;
  const media = { url: '/media/editor.jpg', alt: 'Editor photo', updatedAt: 'revision-3' };
  const requests: URL[] = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    requests.push(url);
    assert.equal(init?.cache, 'no-store');
    assert.equal(url.searchParams.get('draft'), 'false');
    if (url.pathname === '/api/pages') {
      assert.equal(url.searchParams.get('where[_status][equals]'), 'published');
      return Response.json({ docs: [{ slug: 'custom', heroImage: media, sections: [
        { blockType: 'imageText', image: media },
        { blockType: 'gallery', images: [{ image: media }] },
        { blockType: 'cards', cards: [{ image: media }] },
      ] }] });
    }
    return Response.json({ hero: { poster: media, video: media }, logos: { header: media, menu: media }, defaultSeoImage: media });
  };
  try {
    const expected = 'https://media.example.test/media/editor.jpg?v=revision-3';
    const content = await getPageContent(homePage);
    assert.equal(content.hero.poster, expected);
    assert.equal(content.hero.video, expected);
    assert.equal((await getLayoutContent()).logos.header, expected);
    assert.equal((await getSiteSettings()).seo.imageUrl, expected);
    const page = await getCustomPage('custom');
    assert.equal(page?.heroImage?.url, expected);
    assert.equal(page?.sections[0].blockType === 'imageText' && page.sections[0].image?.url, expected);
    assert.equal(page?.sections[1].blockType === 'gallery' && page.sections[1].images[0].image?.url, expected);
    assert.equal(page?.sections[2].blockType === 'cards' && page.sections[2].cards[0].image?.url, expected);
    assert.deepEqual(await getCustomPageSlugs(), [{ slug: 'custom', updatedAt: undefined }]);
    assert.equal(requests.length, 5);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
