import { test as setup } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

const authFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../playwright/.auth/user.json'
);

setup('authenticate', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.fill('#input-0', process.env.USER_NAME as string);
  await page.fill('#input-2', process.env.PASSWORD as string);
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await page.waitForURL(process.env.APP_URL as string);
  await page.context().storageState({ path: authFile });
});
