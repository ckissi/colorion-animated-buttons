import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = 'https://animatedbuttons.colorion.co';
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const files = await walk(root);
const pages = new Map();
for (const file of files.filter((file) => file.endsWith('.html'))) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '/' : relative.endsWith('/index.html') ? `/${relative.slice(0, -10)}` : `/${relative}`;
  pages.set(route, await readFile(file, 'utf8'));
}
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const indexable = [...pages.keys()].filter((route) => route !== '/404.html');
assert.equal(locations.length, indexable.length, 'Sitemap must list every indexable page exactly once');
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap entries');
const titles = new Set();
let links = 0;
for (const [route, html] of pages) {
  assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, `${route}: expected one H1`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate element IDs`);
  if (route === '/404.html') {
    assert.match(html, /name="robots" content="noindex, follow"/);
    assert.doesNotMatch(html, /rel="canonical"/);
  } else {
    assert.ok(locations.includes(origin + route), `${route}: missing from sitemap`);
    assert.ok(html.includes(`rel="canonical" href="${origin}${route}"`), `${route}: wrong canonical`);
    assert.ok(html.includes(`property="og:url" content="${origin}${route}"`), `${route}: wrong social URL`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `${route}: missing or duplicate title`);
    titles.add(title);
    assert.match(html, /name="description" content="[^"]+"/, `${route}: missing description`);
    assert.doesNotMatch(html, /name="robots" content="noindex/, `${route}: unexpectedly excluded`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const target = new URL(match[1].replaceAll('&amp;', '&'), origin + route);
    if (target.origin !== origin && (target.hostname === 'colorion.co' || target.hostname.endsWith('.colorion.co'))) {
      assert.equal(target.searchParams.get('ref'), 'animatedbuttons.colorion.co', `${route}: missing Colorion referral on ${target.href}`);
    }
    if (target.origin !== origin) continue;
    links++;
    const destination = pages.get(target.pathname);
    if (destination !== undefined) {
      if (target.hash) assert.ok(destination.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${route}: missing anchor ${target.href}`);
    } else {
      const asset = path.join(root, decodeURIComponent(target.pathname));
      assert.ok((await stat(asset).catch(() => null))?.isFile(), `${route}: broken local link ${target.href}`);
    }
  }
}
const home = pages.get('/');
assert.equal([...home.matchAll(/data-effect-id="\d+"/g)].length, 99, 'Homepage must retain all 99 examples');
const data = JSON.parse(await readFile(path.join(root, 'button-data.json'), 'utf8'));
assert.equal(Object.keys(data.snippets).length, 99);
for (const [id, snippet] of Object.entries(data.snippets)) {
  assert.match(snippet, /type="button"/, `${id}: missing native button type`);
  assert.match(snippet, /:focus-visible/, `${id}: missing focus behavior`);
  assert.match(snippet, /prefers-reduced-motion: reduce/, `${id}: missing motion guard`);
  assert.match(snippet, /\.btn::before, \.btn::after/, `${id}: pseudo-elements need the motion guard`);
  assert.match(data.prompts[id], /prefers-reduced-motion: reduce/, `${id}: incomplete prompt`);
}
for (const [route, html] of pages) {
  if (route.startsWith('/effects/')) {
    assert.match(html, /id="html-\d+"/, `${route}: HTML export missing from source`);
    assert.match(html, /id="css-\d+"/, `${route}: CSS export missing from source`);
    assert.match(html, /id="react-\d+"/, `${route}: React export missing from source`);
  }
}
assert.equal((await readFile(path.join(root, 'robots.txt'), 'utf8')).trim(), 'User-agent: *\nAllow: /\n\nSitemap: https://animatedbuttons.colorion.co/sitemap-index.xml');
assert.match(await readFile(path.join(root, '_redirects'), 'utf8'), /^\/\* \/404.html 404$/m);
assert.match(await readFile(path.join(root, '_headers'), 'utf8'), /\/_astro\/\*\n  Cache-Control: public, max-age=31536000, immutable/);
assert.equal(await readFile(path.join(root, 'license.txt'), 'utf8'), await readFile(new URL('../LICENSE', import.meta.url), 'utf8'));
console.log(`SEO checks passed: ${indexable.length} indexable pages, ${links} local links, 99 complete exports, valid sitemap and 404 rule.`);
