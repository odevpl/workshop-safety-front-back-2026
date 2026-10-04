import DOMPurify from 'dompurify';

const options = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
};

export function SafeHtml({ html }) {
  const safeHtml = DOMPurify.sanitize(html, options);

  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
