import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';

test.describe('Narendra Farms - Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.product-card').first()).toBeVisible();

    const product = page.locator('.product-card').filter({
      has: page.getByRole('heading', { name: 'Little Millet' })
    });

    await product.locator('.add-button').click();
  });

  test('Verify selected product in cart', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.openCart();
    await cart.verifyProductInCart('Little Millet');
  });

  test('Verify cart quantity increase', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.openCart();
    await cart.increaseQuantity();

    await expect(page.locator('.cart-item .quantity-controls span')).toHaveText('2');
    await expect(page.locator('.cart-summary')).toContainText('2');
  });

  test('Verify cart quantity decrease', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.openCart();
    await cart.increaseQuantity();
    await cart.decreaseQuantity();

    await expect(page.locator('.cart-item .quantity-controls span')).toHaveText('1');
  });

  test('Verify product removal and empty cart', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.openCart();
    await cart.removeProduct();
    await cart.verifyEmptyCart();
  });

});
