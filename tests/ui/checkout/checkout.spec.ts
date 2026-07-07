import { CheckoutPage } from '../../../src/pages/CheckoutPage';
import { ProductPage } from '../../../src/pages/ProductPage';
import { test, expect } from '../../../src/fixtures/baseFixture';

test.describe('Checkout flows', () => {
  test('opens the inventory page and checkout step', async ({ page, logger }) => {
    logger.info('Opening products and checkout');
    const productPage = new ProductPage(page);
    await productPage.open();
    await productPage.expectProductsVisible();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.open();
    await checkoutPage.expectCheckoutFormVisible();
  });
});
