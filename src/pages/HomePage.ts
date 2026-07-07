import { Locator, Page, expect } from '@playwright/test';
import { URLs } from '../../constants/urls';
import { BasePage } from '../../src/pages/BasePage';

export class HomePage extends BasePage {

  readonly mainRegion: Locator;
  readonly heroHeading: Locator;
  readonly fastTradeHeading: Locator;
  readonly platformFeaturesHeading: Locator;
  readonly nextTradeHeading: Locator;
  readonly downloadLink: Locator;

  constructor(page: Page) {
    super(page);
    this.mainRegion = page.locator('main').first();
    this.heroHeading = page.getByRole('heading', { name: 'Crypto for everyone' });
    this.fastTradeHeading = page.getByText('The fastest way to trade');
    this.platformFeaturesHeading = page.getByRole('heading', { name: 'Smarter ways to trade and grow' });
    this.nextTradeHeading = page.getByRole('heading', { name: 'Catch your next trade' });
    this.downloadLink = page.getByRole('link', { name: 'Download the app' });
  }

  async openHomePage() {
    await this.open('/en-AE');
  }

  async expectMarketingBannersVisible() {
    await expect(this.heroHeading).toBeVisible();
    await expect(this.fastTradeHeading).toBeVisible();
    await expect(this.platformFeaturesHeading).toBeVisible();
    await expect(this.nextTradeHeading).toBeVisible();
  }

}
