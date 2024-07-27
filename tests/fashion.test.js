const { test, expect } = require('@playwright/test');


test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('discover your style', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Discover Your Style!' }).click();
  
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Discover Your Style' })).toBeVisible();
  });