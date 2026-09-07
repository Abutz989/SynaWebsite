// Dependency-free content, asset, navigation and bilingual integrity checks.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const root = new URL('../', import.meta.url);
const html = fs.readFileSync(new URL('index.html', root), 'utf8');
const context = {window:{}};
for (const lang of ['en', 'he']) vm.runInNewContext(fs.readFileSync(new URL(`assets/i18n/${lang}.js`, root),'utf8'), context);
const dictionaries = context.window.SYNA_TRANSLATIONS;
const flatten = (obj, prefix='') => Object.entries(obj).flatMap(([key,value]) => typeof value === 'string' ? [[prefix+key,value]] : flatten(value,prefix+key+'.'));
const en = new Map(flatten(dictionaries.en));
const he = new Map(flatten(dictionaries.he));
assert.deepEqual([...en.keys()].sort(), [...he.keys()].sort(), 'Translation keys differ');
for (const [lang, entries] of [['en',en],['he',he]]) {
  for (const [key,value] of entries) {
    assert.ok(value.trim(), `${lang}: empty ${key}`);
    assert.ok(!/html5\s*up|html5up\.net/i.test(value), `${lang}: template credit`);
  }
}
for (const match of html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)) assert.ok(en.has(match[1]), `Missing text ${match[1]}`);
for (const match of html.matchAll(/data-i18n-attr="([^"]+)"/g)) for (const binding of match[1].split(',')) assert.ok(en.has(binding.split(':')[1]), `Missing attribute ${binding}`);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const path = match[1];
  if (path.startsWith('#')) assert.ok(ids.includes(path.slice(1)), `Missing anchor ${path}`);
  else if (!/^(https?:|mailto:|tel:)/.test(path)) {
    const [asset,query] = path.split('?');
    assert.ok(fs.existsSync(new URL(asset,root)), `Missing asset ${asset}`);
    if (query?.startsWith('v=')) assert.equal(query.slice(2), createHash('sha256').update(fs.readFileSync(new URL(asset,root))).digest('hex').slice(0,10), `Stale asset version: ${asset}`);
  }
}
for (const match of html.matchAll(/<a\b[^>]*>/g)) assert.match(match[0], /\bhref="[^"]+"/, 'Link lacks a fallback href');
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.ok(!/<(?:h[1-6]|p|span|button|title)\b[^>]*data-i18n[^>]*>\s*<\//.test(html), 'Empty static text');
assert.ok(!/html5\s*up|html5up\.net/i.test(html), 'Template credit in homepage');
assert.equal(en.get('contact.phoneHref'), he.get('contact.phoneHref'));
assert.equal(en.get('contact.meetingHref'), he.get('contact.meetingHref'));
for (const lang of [en,he]) {
  assert.match(lang.get('contact.phoneHref'), /^tel:\+\d+$/);
  assert.match(lang.get('contact.emailHref'), /^mailto:[^@]+@[^@]+$/);
  assert.match(lang.get('contact.meetingHref'), /^https:\/\/calendar\.app\.google\//);
}
console.log(`PASS: ${en.size} matching translation keys, complete English HTML, unique IDs, local assets, cache versions, anchors and contact URLs.`);
