import { Page, expect } from '@playwright/test';
import { URLs } from '../../constants/urls';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(URLs.checkout);
  }

  async expectCheckoutFormVisible() {
    await expect(this.page.locator('body')).toBeVisible();
  }
}
