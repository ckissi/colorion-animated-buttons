import { test, expect } from '@playwright/test';
import { getCss, getMarkup, getReact } from '../src/data/buttons';
import { effectPages } from '../src/data/catalog';
import ts from 'typescript';
import { readFile } from 'node:fs/promises';

test.beforeEach(async ({ page }) => {
  await page.route('https://plausible.elerion.com/**', (route) => route.abort());
});

test('gallery links, search, and native modal support keyboard use', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#button-grid > article')).toHaveCount(99);
  await page.getByLabel('Find a button by name').fill('glow');
  await expect(page.locator('#button-grid > article:visible')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Glow', exact: true })).toHaveAttribute('href', '/effects/glow/#effect-14');
  const trigger = page.getByRole('button', { name: 'Glow: view code', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#modal-code')).toContainText('prefers-reduced-motion');
  await expect(page.locator('#modal-copy')).toBeEnabled();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByLabel('Find a button by name').fill('no-example-with-this-name');
  await expect(page.locator('#search-empty')).toBeVisible();
});

test('modal reports a failed fetch and allows a retry', async ({ page }) => {
  let requests = 0;
  await page.route('**/button-data.json', async (route) => {
    requests++;
    if (requests === 1) await route.fulfill({ status: 503, body: 'Unavailable' });
    else await route.continue();
  });
  await page.goto('/collections/glow-buttons/');
  const trigger = page.getByRole('button', { name: 'Glow: view code', exact: true });
  await trigger.click();
  await expect(page.locator('#modal-code')).toContainText('could not load');
  await expect(page.locator('#modal-copy')).toBeDisabled();
  await page.getByRole('button', { name: 'Close code preview' }).click();
  await trigger.click();
  await expect(page.locator('#modal-copy')).toBeEnabled();
  await expect(page.locator('#modal-code')).toContainText('prefers-reduced-motion');
});

test('gallery and implementation content work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('#button-grid article')).toHaveCount(99);
  await expect(page.locator('#gallery-tools')).toBeHidden();
  await page.getByRole('link', { name: 'Glow', exact: true }).click();
  await expect(page.locator('#css-14')).toContainText('prefers-reduced-motion');
  await expect(page.locator('#html-14')).toContainText('type="button"');
  await context.close();
});

test('generator changes, shares, restores, and downloads complete code', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (text: string) => { (window as typeof window & { sharedUrl: string }).sharedUrl = text; } }, configurable: true });
  });
  await page.goto('/tools/button-generator/');
  await page.getByLabel('Effect', { exact: true }).selectOption('1');
  await expect(page.locator('#generator-status')).toContainText('Ready');
  await page.getByLabel('Button label', { exact: true }).fill('Save <draft> & continue');
  await page.getByLabel('Show the effect without hover').check();
  await expect(page.locator('#generated-button')).toHaveAttribute('data-preview', '');
  await expect(page.locator('#generator-html-code')).toContainText('Save &lt;draft&gt; &amp; continue');
  await expect(page.locator('#generator-css-code')).toContainText('prefers-reduced-motion');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download HTML', exact: true }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('colorion-button.html');
  const document = await readFile((await file.path())!, 'utf8');
  expect(document).toContain('Save &lt;draft&gt; &amp; continue');
  expect(document).toContain('prefers-reduced-motion: reduce');
  await page.getByRole('button', { name: 'Copy share link', exact: true }).click();
  const shared = await page.evaluate(() => (window as typeof window & { sharedUrl: string }).sharedUrl);
  expect(new URL(shared).hash).toContain('effect=1');
  await page.goto(shared);
  await expect(page.locator('#generated-button .btn-label')).toHaveText('Save <draft> & continue');
  await page.goto('/tools/button-generator/#effect=48&label=Try+this&accent=%23ff6600&radius=32&duration=700');
  await expect(page.locator('#generated-button')).toHaveClass('btn fx-48');
  await expect(page.locator('#generated-button .btn-label')).toHaveText('Try this');
  await expect(page.locator('#generator-css-code')).toContainText('--primary: #ff6600');
  await expect(page.locator('#generator-css-code')).toContainText('border-radius: 32px');
  await expect(page.locator('#generator-css-code')).toContainText('700ms');
  await page.getByRole('button', { name: 'Reset settings' }).click();
  await expect(page.locator('#generated-button')).toHaveClass('btn fx-14');
});

test('malformed generator settings cannot inject styles or markup', async ({ page }) => {
  await page.goto('/tools/button-generator/#effect=999&accent=red%3B%7Dbody%7Bdisplay%3Anone&radius=-300&label=%3Cimg+src%3Dx+onerror%3Dalert(1)%3E');
  await expect(page.locator('#generated-button')).toHaveClass('btn fx-14');
  await expect(page.locator('#generator-css-code')).toContainText('--primary: #f4ff2b');
  await expect(page.locator('#generator-css-code')).toContainText('border-radius: 0px');
  await expect(page.locator('#generated-button img')).toHaveCount(0);
  await expect(page.locator('#generator-html-code')).toContainText('&lt;img');
});

test('copied code matches the visible source and records a successful copy', async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as typeof window & { copiedText?: string; copyEvents?: unknown[] };
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (text: string) => { state.copiedText = text; } }, configurable: true });
    state.copyEvents = [];
    Object.defineProperty(window, 'plausible', { value: (event: string, options?: unknown) => { state.copyEvents!.push({ event, options }); }, writable: true, configurable: true });
  });
  await page.goto('/effects/glow/');
  await page.getByRole('button', { name: 'Copy CSS', exact: true }).click();
  expect(await page.evaluate(() => (window as typeof window & { copiedText: string }).copiedText)).toBe(await page.locator('#css-14').textContent());
  expect(await page.evaluate(() => (window as typeof window & { copyEvents: { event: string }[] }).copyEvents.filter((event) => event.event === 'Code Copied').length)).toBe(1);
});

test('reduced motion also stops a pseudo-element animation in an isolated export', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setContent(`<style>${getCss([63])}</style>${getMarkup(63)}`);
  await page.locator('button').focus();
  const state = await page.locator('button').evaluate((button) => ({
    animation: getComputedStyle(button, '::after').animationName,
    outline: getComputedStyle(button).outlineStyle,
    transition: getComputedStyle(button, '::after').transitionDuration,
  }));
  expect(state.animation).toBe('none');
  expect(state.outline).toBe('solid');
  expect(parseFloat(state.transition)).toBeLessThan(.001);
});

test('React exports parse as real JSX', async () => {
  for (const id of effectPages.flatMap((page) => page.ids)) {
    const output = ts.transpileModule(getReact(id), { fileName: 'button.jsx', compilerOptions: { jsx: ts.JsxEmit.ReactJSX, allowJs: true }, reportDiagnostics: true });
    expect(output.diagnostics?.filter((item) => item.category === ts.DiagnosticCategory.Error)).toEqual([]);
  }
});

for (const route of ['/', '/collections/fill-buttons/', '/effects/sliding-fill/', '/guides/accessible-button-animations/', '/tools/button-generator/', '/about/']) {
  test(`page has no horizontal overflow or runtime errors: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('robots, sitemap, and nonexistent pages return the right content', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('User-agent: *');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('<urlset');
  const missing = await request.get('/effects/does-not-exist/');
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain('That page is not here.');
});
