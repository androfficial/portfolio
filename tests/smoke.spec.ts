import { expect, test } from '@playwright/test';

test('loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

test('keeps keyboard focus inside the open menu', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'The menu button only shows below the desktop breakpoint');

  await page.goto('./');
  const menuButton = page.getByRole('button', { name: 'Menu' });
  const firstLink = page.locator('#mobile-menu').getByRole('link', { name: /Work/ });
  await menuButton.click();
  await expect(firstLink).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menuButton).toBeFocused();

  await menuButton.click();
  await expect(firstLink).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  const focusLeftMenu = await page.evaluate(() => {
    const active = document.activeElement;
    return Boolean(active && active !== document.body && !document.getElementById('mobile-menu')?.contains(active));
  });
  expect(focusLeftMenu).toBe(false);
});

test('lands case studies right below the header like sections', async ({ page }) => {
  await page.goto('./');
  const readCase = page.locator('a[href="#case-posbox"]');
  await readCase.scrollIntoViewIfNeeded();
  await readCase.click();

  const study = page.locator('#case-posbox');
  await expect(study).toBeFocused();
  const top = await study.evaluate((element) => element.getBoundingClientRect().top);
  const headerBottom = await page
    .locator('[data-header]')
    .evaluate((element) => element.getBoundingClientRect().bottom);
  expect(top).toBeGreaterThanOrEqual(headerBottom);
  expect(top).toBeLessThanOrEqual(113);
});

test('remembers the paused animations choice', async ({ page }) => {
  await page.goto('./');
  const toggle = page.locator('[data-motion-toggle]');
  await expect(toggle).toHaveAccessibleName('Pause animations');

  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused');
  await expect(toggle).toHaveAccessibleName('Play animations');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused');
  await expect(toggle).toHaveAccessibleName('Play animations');
});

test('tracks scroll progress without restyling the root element', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));

  const progress = page.locator('[data-scroll-progress]');
  await expect
    .poll(() => progress.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).a))
    .toBeGreaterThan(0.3);
  expect(await page.evaluate(() => document.documentElement.style.getPropertyValue('--progress'))).toBe('');
});

test('serves a 404 page that links back home', async ({ page }) => {
  await page.goto('./missing/');
  await expect(page.getByRole('heading', { level: 1, name: 'This page does not exist.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to the portfolio' })).toHaveAttribute('href', '/portfolio/');
});
