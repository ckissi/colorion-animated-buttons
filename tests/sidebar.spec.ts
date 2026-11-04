import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://plausible.elerion.com/**', (route) => route.abort());
});

test('project links keep icons, referral tags, and the saved sidebar state', async ({ page }) => {
  await page.goto('/collections/fill-buttons/');
  const sidebar = page.getByRole('complementary', { name: 'Colorion projects' });
  const toggle = page.locator('#project-sidebar-toggle');
  const links = sidebar.getByRole('link');
  await expect(links).toHaveCount(11);
  for (const link of await links.all()) {
    const url = new URL((await link.getAttribute('href'))!);
    expect(url.searchParams.get('ref')).toBe('animatedbuttons.colorion.co');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link.locator('svg').first()).toBeVisible();
  }
  if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
  await expect(sidebar.locator('.project-sidebar-label').first()).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(sidebar.locator('.project-sidebar-label').first()).toBeHidden();
  await expect(sidebar.locator('.project-sidebar-icon').first()).toBeVisible();
  await expect(links.first()).toHaveAttribute('title', /Colorion/);
  await page.goto('/guides/');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.reload();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('mobile expansion overlays the page and closes with Escape or the backdrop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('#project-sidebar-toggle');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  const initialMargin = await page.locator('.site-shell').evaluate((shell) => getComputedStyle(shell).marginInlineStart);
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#project-sidebar-backdrop')).toBeVisible();
  expect(await page.locator('.site-shell').evaluate((shell) => getComputedStyle(shell).marginInlineStart)).toBe(initialMargin);
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('#project-sidebar-backdrop').click({ position: { x: 365, y: 400 } });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('the sidebar still toggles when storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
  });
  await page.goto('/');
  const toggle = page.locator('#project-sidebar-toggle');
  const expanded = await toggle.getAttribute('aria-expanded');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', expanded === 'true' ? 'false' : 'true');
});
