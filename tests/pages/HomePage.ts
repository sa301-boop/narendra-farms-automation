import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async verifyHomePageLoaded() {
    await expect(this.page.locator('body')).toBeVisible();
    await expect(this.page).toHaveURL(/localhost:5173\/$/);
  }

  async verifyBrandingAndNavigation() {
    await expect(this.page.locator('header.navbar a.brand')).toContainText('NARENDRA');
    await expect(this.page.locator('header.navbar a.brand')).toContainText('FARMS');

    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Categories' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Shop', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'About Us' })).toBeVisible();
  }

  async verifyHomepageContent() {
    await expect(
      this.page.getByRole('heading', { name: /Nature's Best/ })
    ).toBeVisible();

    await expect(
      this.page.getByRole('heading', { name: 'Shop by Category' })
    ).toBeVisible();

    await expect(
      this.page.getByRole('heading', { name: 'Fresh From Our Farms' })
    ).toBeVisible();
  }

  async verifySearchAndCart() {
    await expect(
      this.page.getByPlaceholder('Search products...')
    ).toBeVisible();

    await expect(
      this.page.getByRole('button', { name: 'Shopping cart' })
    ).toBeVisible();
  }
}
