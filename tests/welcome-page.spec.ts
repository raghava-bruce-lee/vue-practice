import { expect, test } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

test.use({
  storageState: path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../playwright/.auth/user.json'
  )
});

test.describe('Welcome page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(await page.locator('h1').innerText()).toContain('In progress...');
  });
});
