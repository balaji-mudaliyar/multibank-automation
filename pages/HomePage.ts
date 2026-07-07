import { Page, expect } from '@playwright/test';
import { URLs } from '../constants/urls';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(URLs.home);
  }

  async expectWelcomeVisible() {
    await expect(this.page.locator('body')).toBeVisible();
  }
}
