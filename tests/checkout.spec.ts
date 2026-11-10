import { test, expect } from '@playwright/test';

const testAddress = {
  id: 'test-address-1',
  fullName: 'Test Customer',
  phone: '9876543210',
  address: 'Test Street, Test Area',
  city: 'Nellore',
  state: 'Andhra Pradesh',
  postalCode: '524001',
  isDefault: true,
};

test.describe('Narendra Farms - Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {

    // Set isolated test authentication and cart data
    await page.addInitScript(() => {
      localStorage.setItem('narendra-farms-token', 'playwright-test-token');

      localStorage.setItem(
        'narendra-farms-cart',
        JSON.stringify([
          {
            id: 'test-product-1',
            name: 'Little Millet',
            price: 60,
            imageUrl: '',
            quantity: 2,
          },
        ])
      );
    });

    // Mock authenticated user
    await page.route('**/api/auth/me', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'test-user-1',
            name: 'Test Customer',
            email: 'test@example.com',
            phone: '9876543210',
            role: 'CUSTOMER',
          },
        }),
      });
    });

    // Mock saved delivery address
    await page.route('**/api/addresses', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          addresses: [testAddress],
        }),
      });
    });

    await page.goto('/checkout');

    await expect(
      page.getByRole('heading', { name: 'Checkout' })
    ).toBeVisible();
  });

  test('Verify checkout page loads for authenticated user', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Checkout' })
    ).toBeVisible();
  });

  test('Verify default delivery address is selected', async ({ page }) => {
    const addressRadio = page.locator(
      'input[name="deliveryAddress"]'
    );

    await expect(addressRadio).toBeChecked();
    await expect(page.locator('.checkout-address')).toContainText(
      'Test Customer'
    );
    await expect(page.locator('.checkout-address')).toContainText(
      'Nellore'
    );
  });

  test('Verify Cash on Delivery payment method', async ({ page }) => {
    await expect(
      page.getByText('Cash on Delivery (COD)')
    ).toBeVisible();

    await expect(
      page.getByText('Pay when your order reaches your doorstep.')
    ).toBeVisible();
  });

  test('Verify checkout product and quantity', async ({ page }) => {
    const product = page.locator('.checkout-product');

    await expect(product).toContainText('Little Millet');
    await expect(product).toContainText('Quantity: 2');
    await expect(product).toContainText('₹120.00');
  });

  test('Verify order summary calculation', async ({ page }) => {
    const summary = page.locator('.checkout-summary');

    await expect(summary).toContainText('Total Items');
    await expect(summary).toContainText('2');
    await expect(summary).toContainText('Subtotal');
    await expect(summary).toContainText('₹120.00');
    await expect(summary).toContainText('FREE');
    await expect(summary).toContainText('Total Amount');
  });

  test('Verify Place Order button is enabled with an address', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Place Order' })
    ).toBeEnabled();
  });

});
