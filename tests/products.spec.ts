import { test, expect } from '@playwright/test';

test.describe('Narendra Farms - Product Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.product-card').first()).toBeVisible();
  });

  test('Search should display matching product', async ({ page }) => {
    await page.getByPlaceholder('Search products...').fill('Little Millet');

    const productCards = page.locator('.product-card');

    await expect(productCards).toHaveCount(1);
    await expect(productCards.first()).toContainText('Little Millet');
  });

  test('Search should return no products for invalid search', async ({ page }) => {
    await page.getByPlaceholder('Search products...').fill('Invalid Product XYZ');

    await expect(page.locator('.product-card')).toHaveCount(0);
  });

  test('Category filter should display only selected category products', async ({ page }) => {
    await page.getByRole('button', { name: 'Spices', exact: true }).click();

    const productCards = page.locator('.product-card');
    const productCount = await productCards.count();

    expect(productCount).toBeGreaterThan(0);

    const categories = await page.locator('.product-category').allTextContents();

    expect(
      categories.every(category => category.trim().toLowerCase() === 'spices')
    ).toBeTruthy();
  });

  test('Add to Cart should update shopping cart count', async ({ page }) => {
    const productCard = page.locator('.product-card').filter({
      has: page.getByRole('heading', { name: 'Little Millet' })
    });

    await expect(productCard).toBeVisible();

    await productCard.locator('.add-button').click();

    await expect(
      page.locator('header.navbar .cart-count')
    ).toHaveText('1');
  });

});
