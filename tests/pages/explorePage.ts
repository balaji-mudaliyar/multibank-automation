import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ExplorePage extends BasePage {
  readonly spotMarketHeading: Locator;
  readonly pairRows: Locator;
  readonly categoryButtons: Record<'Hot' | 'Gainers' | 'Losers', Locator>;

  constructor(page: Page) {
    super(page);
    this.spotMarketHeading = page.getByRole('heading', { name: 'Spot market' });
    this.pairRows = page.locator('tr').filter({ has: page.locator('a[href^="/explore/"]') });
    this.categoryButtons = {
      Hot: page.getByRole('button', { name: 'Hot' }),
      Gainers: page.getByRole('button', { name: 'Gainers' }),
      Losers: page.getByRole('button', { name: 'Losers' }),
    };
  }

  async openExplorePage() {
    await this.open('/en-AE/explore');
  }

  async expectSpotMarketVisible() {
    await expect(this.spotMarketHeading).toBeVisible();
  }

  async waitForPairRows() {
    await this.page.waitForSelector('tr a[href^="/explore/"]', { state: 'visible', timeout: 15000 });
  }

  async getFirstPairText() {
    return (await this.pairRows.first().innerText()).trim();
  }

  async clickCategory(name: keyof ExplorePage['categoryButtons']) {
    await this.categoryButtons[name].click();
    await this.page.waitForTimeout(500);
  }
}
