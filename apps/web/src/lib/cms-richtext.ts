interface RichTextNode {
  type?: string;
  text?: string;
  children?: RichTextNode[];
}

export function richTextParagraphs(content: { root?: RichTextNode } | null | undefined): string[] {
  function textContent(node: RichTextNode): string {
    if (node.type === 'linebreak') return '\n';
    return node.text || (node.children || []).map(textContent).join('');
  }
  function paragraphs(node: RichTextNode): string[] {
    if (['paragraph', 'heading', 'listitem', 'quote'].includes(node.type || '')) {
      const text = textContent(node).trim();
      return text ? [text] : [];
    }
    return (node.children || []).flatMap(paragraphs);
  }
  return content?.root ? paragraphs(content.root) : [];
}
