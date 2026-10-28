import { test, expect } from '@playwright/test';

const BASE = 'https://easywaresolutions.com';

test.beforeEach(async ({ page }) => {
  // Block third-party requests (e.g. the WebHostingPad banner) that stall page load
  await page.route('**/*', (route) => {
    const url = route.request().url();
    return url.startsWith(BASE) ? route.continue() : route.abort();
  });
});

test('Careers page shows job content instead of placeholder', async ({ page }) => {
  await page.goto(`${BASE}/easy-ware-careers.php`, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/easy-ware-careers\.php/);

  // Fails while the bug exists (placeholder text still on the page)
  await expect(page.getByText('Text will come here.')).toHaveCount(0);
});

test('Web Services page shows real content instead of placeholder', async ({ page }) => {
  await page.goto(`${BASE}/easy-ware-solutions-web-services.php`, { waitUntil: 'domcontentloaded' });

  // Fails while the bug exists
  await expect(page.getByText('Text will come here.')).toHaveCount(0);
});