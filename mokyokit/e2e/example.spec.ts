import { test, expect } from '@playwright/test';

test.describe('Cron form tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should set cron schedule 1-10 5-10 * * 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Ustaw harmonogram', exact: true }).click();

    await page.getByLabel(/co minutę między/i).click();

    await page.waitForSelector('button[name="minuteBetweenFrom"]');

    await page.locator('button[name="minuteBetweenFrom"]').click();
    const option1 = page.getByRole('option', { name: '1' }).first();
    await option1.click();

    await page.locator('button[name="minuteBetweenTo"]').click();
    const option10 = page.getByRole('option', { name: '10' }).first();
    await option10.click();

    await page.getByLabel(/co godzinę między/i).click();

    await page.waitForSelector('button[name="hourBetweenFrom"]');

    await page.locator('button[name="hourBetweenFrom"]').click();
    const option5 = page.getByRole('option', { name: '5' }).first();
    await option5.click();

    await page.locator('button[name="hourBetweenTo"]').click();
    const hour10 = page.getByRole('option', { name: '10' }).first();
    await hour10.click();

    await page.getByLabel(/określony dzień tygodnia/i).click();

    await page.waitForSelector('button[name="certainDayOfWeek"]');

    await page.locator('button[name="certainDayOfWeek"]').click();
    await page.getByRole('option', { name: 'Poniedziałek' }).first().click();

    await expect(page.getByTestId('cron-value-header')).toContainText('1-10 5-10 * * 1');

    await page.getByRole('button', { name: 'Ustaw', exact: true }).click();

    await expect(page.locator('input[name="schedule"]')).toHaveValue('1-10 5-10 * * 1');
  });
});
