// Keep a complete English HTML baseline for no-JS readers and search crawlers.
// Run after editing en.js or adding translation bindings to index.html.
import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(new URL('assets/i18n/en.js', root), 'utf8'), context);
const strings = context.window.SYNA_TRANSLATIONS.en;
const value = key => {
  const result = key.split('.').reduce((obj, part) => obj?.[part], strings);
  if (typeof result !== 'string') throw new Error(`Missing English key: ${key}`);
  return result;
};
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const path = new URL('index.html', root);
let html = fs.readFileSync(path, 'utf8');
html = html.replace(/<([a-z][\w-]*)\b([^>]*\bdata-i18n(?:-html)?="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g, (match, tag, attrs, key) => `<${tag}${attrs}>${attrs.includes('data-i18n-html=') ? value(key) : escape(value(key))}</${tag}>`);
html = html.replace(/<([a-z][\w-]*)\b([^>]*\bdata-i18n-attr="([^"]+)"[^>]*)>/g, (match, tag, attrs, bindings) => {
  for (const binding of bindings.split(',')) {
    const [attr, key] = binding.split(':');
    const pattern = new RegExp(`\\s${attr}="[^"]*"`, 'g');
    attrs = attrs.replace(pattern, '') + ` ${attr}="${escape(value(key))}"`;
  }
  return `<${tag}${attrs}>`;
});
// Version CSS and scripts together so returning visitors never mix old copy and new markup.
html = html.replace(/(src|href)="(assets\/(?:css|js|i18n)\/[^"?]+)(?:\?v=[^"]*)?"/g, (_, attr, asset) => {
  const digest = createHash('sha256').update(fs.readFileSync(new URL(asset, root))).digest('hex').slice(0, 10);
  return `${attr}="${asset}?v=${digest}"`;
});
fs.writeFileSync(path, html);
console.log('Rendered English fallback into index.html.');
