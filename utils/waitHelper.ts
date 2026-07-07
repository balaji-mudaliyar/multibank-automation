import { Page } from '@playwright/test';

export class WaitHelper {
  constructor(private readonly page: Page) {}

  async waitForSelector(selector: string, timeout = 10_000) {
    await this.page.waitForSelector(selector, { timeout });
  }
}
