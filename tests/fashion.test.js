const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080/');
});

test.describe('Homepage', () => {
    test('has title', async ({ page }) => {
        //await page.goto('http://localhost:8080/');

        await expect(page).toHaveTitle("Fashion Advisor");
    });
  
    test('discover your style', async ({ page }) => {
        //await page.goto('http://localhost:8080/');
  
        await page.getByRole('button', { name: 'Discover Your Style!' }).click();
  
        await expect(page.getByRole('heading', { name: 'Discover Your Style' })).toBeVisible();
    });
})