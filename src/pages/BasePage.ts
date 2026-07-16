import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../../constants/urls';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string) {
    await this.page.goto(`${URLs.base}${path}`, { waitUntil: 'domcontentloaded' });
  }

  async reload() {
    await this.page.reload();
  }

  async getTitle() {
    return this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async waitForUrl(url: string | RegExp) {
    await this.page.waitForURL(url);
  }

  async screenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async isVisible(locator: Locator) {
    return await locator.isVisible();
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

}
