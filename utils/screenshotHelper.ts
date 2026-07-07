import { Page } from '@playwright/test';

export class ScreenshotHelper {
  constructor(private readonly page: Page) {}

  async capture(name: string) {
    await this.page.screenshot({ path: `reports/${name}.png`, fullPage: true });
  }
}
