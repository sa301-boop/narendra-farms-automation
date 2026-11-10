import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Narendra Farms - Homepage Tests', () => {
  test('Verify homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.verifyHomePageLoaded();
  });

  test('Verify website branding and navigation', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.verifyBrandingAndNavigation();
  });

  test('Verify homepage headings and sections', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.verifyHomepageContent();
  });

  test('Verify product search and shopping cart', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.verifySearchAndCart();
  });
});
