import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'a',
  'h1',
  'h2',
  'h3',
  'ul',
  'ol',
  'li',
  'blockquote',
  'code',
  'pre',
  'span',
];

const ALLOWED_ATTR = ['href', 'target', 'rel'];

export function sanitizeHtml(dirtyHtml = '') {
  return DOMPurify.sanitize(dirtyHtml, { ALLOWED_TAGS, ALLOWED_ATTR });
}

export function htmlToPlainText(dirtyHtml = '') {
  return DOMPurify.sanitize(dirtyHtml, { ALLOWED_TAGS: [] })
    .replace(/\s+/g, ' ')
    .trim();
}

export default sanitizeHtml;
