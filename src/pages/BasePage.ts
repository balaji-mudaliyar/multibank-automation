import { Page } from '@playwright/test';
import { URLs } from '../../constants/urls';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string) {
    await this.page.goto(`${URLs.base}${path}`, { waitUntil: 'domcontentloaded' });
  }
}
