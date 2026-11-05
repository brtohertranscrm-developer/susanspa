import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RichText } from '../src/components/ui/RichText';

test('journal rich text renders headings, formatting, links, lists, and quotes', () => {
  const html = renderToStaticMarkup(<RichText content={{ root: { children: [
    { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Heading' }] },
    { type: 'paragraph', children: [{ type: 'text', text: 'Bold', format: 1 }, { type: 'linebreak' }, { type: 'text', text: 'Italic', format: 2 }, { type: 'link', fields: { url: 'https://example.test' }, children: [{ type: 'text', text: 'Link' }] }] },
    { type: 'list', listType: 'number', children: [{ type: 'listitem', children: [{ type: 'text', text: 'First' }] }] },
    { type: 'quote', children: [{ type: 'text', text: 'Quote' }] },
  ] } }} />);
  assert.match(html, /<h2>Heading<\/h2>/);
  assert.match(html, /<strong>Bold<\/strong>/);
  assert.match(html, /<em>Italic<\/em>/);
  assert.match(html, /href="https:\/\/example.test"/);
  assert.match(html, /<ol><li>First<\/li><\/ol>/);
  assert.match(html, /<blockquote>Quote<\/blockquote>/);
});

test('rich text escapes HTML and blocks executable link schemes', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', '//untrusted.example']) {
    const html = renderToStaticMarkup(<RichText content={{ root: { children: [
      { type: 'paragraph', children: [{ type: 'link', fields: { url }, children: [{ type: 'text', text: '<script>not markup</script>' }] }] },
    ] } }} />);
    assert.match(html, /href="#"/);
    assert.ok(!html.includes('<script>'));
  }
});
