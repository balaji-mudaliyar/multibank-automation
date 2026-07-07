import { Page, expect } from '@playwright/test';
import { URLs } from '../constants/urls';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(URLs.inventory);
  }

  async expectProductsVisible() {
    await expect(this.page.locator('body')).toBeVisible();
  }
}
