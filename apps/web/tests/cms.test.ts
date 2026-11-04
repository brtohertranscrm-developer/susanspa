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
