import React from 'react';

interface RichTextNode {
  type?: string;
  tag?: string;
  listType?: 'bullet' | 'number' | 'check';
  text?: string;
  format?: number | string;
  url?: string;
  fields?: { url?: string; newTab?: boolean; linkType?: string };
  children?: RichTextNode[];
}

export interface RichTextRoot {
  root?: { children?: RichTextNode[] };
}

// Bit format teks dari editor Lexical di CMS.
const BOLD = 1;
const ITALIC = 2;
const STRIKETHROUGH = 4;
const UNDERLINE = 8;

function renderText(node: RichTextNode, key: React.Key) {
  const format = typeof node.format === 'number' ? node.format : 0;
  let content: React.ReactNode = node.text ?? '';
  if (format & BOLD) content = <strong>{content}</strong>;
  if (format & ITALIC) content = <em>{content}</em>;
  if (format & UNDERLINE) content = <u>{content}</u>;
  if (format & STRIKETHROUGH) content = <s>{content}</s>;
  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function renderChildren(nodes: RichTextNode[] = []): React.ReactNode[] {
  return nodes.map((node, index) => renderNode(node, index));
}

function renderNode(node: RichTextNode, key: React.Key): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key);
    case 'linebreak':
      return <br key={key} />;
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>;
    case 'heading': {
      // Judul halaman memakai h1, jadi judul di dalam isi mulai dari h2.
      const Tag = (['h2', 'h3', 'h4'].includes(node.tag ?? '') ? node.tag : 'h2') as 'h2' | 'h3' | 'h4';
      return <Tag key={key}>{renderChildren(node.children)}</Tag>;
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul';
      return <Tag key={key}>{renderChildren(node.children)}</Tag>;
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>;
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>;
    case 'link':
    case 'autolink': {
      const href = node.fields?.url ?? node.url ?? '#';
      const newTab = node.fields?.newTab || /^https?:\/\//.test(href);
      return (
        <a key={key} href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {renderChildren(node.children)}
        </a>
      );
    }
    default:
      return node.children ? <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment> : null;
  }
}

export function RichText({ content, className }: { content?: RichTextRoot | null; className?: string }) {
  const nodes = content?.root?.children ?? [];
  if (nodes.length === 0) return null;
  return <div className={className}>{renderChildren(nodes)}</div>;
}
