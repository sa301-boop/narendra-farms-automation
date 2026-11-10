import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.getByRole('button', { name: 'Shopping cart' }).click();
    await expect(
      this.page.getByRole('heading', { name: 'Shopping Cart' })
    ).toBeVisible();
  }

  async verifyProductInCart(productName: string) {
    const cartItem = this.page.locator('.cart-item').filter({
      has: this.page.getByRole('heading', { name: productName })
    });

    await expect(cartItem).toBeVisible();
  }

  async increaseQuantity() {
    await this.page.getByRole('button', { name: 'Increase quantity' }).click();
  }

  async decreaseQuantity() {
    await this.page.getByRole('button', { name: 'Decrease quantity' }).click();
  }

  async removeProduct() {
    await this.page.getByRole('button', { name: 'Remove' }).click();
  }

  async verifyEmptyCart() {
    await expect(
      this.page.getByRole('heading', { name: 'Your Cart is Empty' })
    ).toBeVisible();
  }
}
