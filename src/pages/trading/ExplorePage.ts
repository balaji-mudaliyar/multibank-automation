import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ExplorePage extends BasePage {
  
  readonly spotMarketHeading: Locator;
  readonly topCryptoPricesSection: Locator;
  readonly pairRows: Locator;
  readonly firstPairRow: Locator;
  readonly firstPairAssetIcon: Locator;
  readonly firstPairNameColumn: Locator;
  readonly firstPairTicker: Locator;
  readonly firstPairAssetName: Locator;
  readonly firstPairCurrentPrice: Locator;
  readonly firstPairPriceChange: Locator;
  readonly firstPairChartColumn: Locator;
  readonly firstPairChart: Locator;
  readonly categoryButtons: Record<'Hot' | 'Gainers' | 'Losers', Locator>;

  constructor(page: Page) {
    super(page);
    this.spotMarketHeading = page.getByRole('heading', { name: 'Spot market' });
    this.topCryptoPricesSection = page.locator("text=Today's top crypto prices");
    this.pairRows = page.locator('table tbody tr[data-index]');
    this.firstPairRow = this.pairRows.first();
    this.firstPairAssetIcon = this.firstPairRow.locator('td[id$="_displayName-td"] img');
    this.firstPairNameColumn = this.firstPairRow.locator('td[id$="_displayName-td"]');
    this.firstPairTicker = this.firstPairNameColumn.locator('span').first();
    this.firstPairAssetName = this.firstPairNameColumn.locator('span').nth(1);
    this.firstPairCurrentPrice = this.firstPairRow.locator('td[id$="_price-td"]');
    this.firstPairPriceChange = this.firstPairRow.locator('td[id$="_change-td"] span');
    this.firstPairChartColumn = this.firstPairRow.locator('td[id$="_week-chart-td"]');
    this.firstPairChart = this.firstPairChartColumn.locator('svg.recharts-surface');
    this.categoryButtons = {
      Hot: page.getByRole('button', { name: 'Hot' }),
      Gainers: page.getByRole('button', { name: 'Gainers' }),
      Losers: page.getByRole('button', { name: 'Losers' }),
    };
  }

  async openExplorePage() {
    await this.open('/en-AE/explore');
  }

  async waitForExplorePageToLoad() {
    await this.expectSpotMarketVisible();
    await this.expectTopCryptoPricesVisible();
    await this.waitForPairRows();
  }

  async expectSpotMarketVisible() {
    await expect(this.spotMarketHeading).toBeVisible();
  }

  async expectTopCryptoPricesVisible() {
    await expect(this.topCryptoPricesSection).toBeVisible();
  }

  async waitForPairRows() {
    await this.page.waitForSelector('table tbody tr[data-index]', { state: 'visible', timeout: 15000 });
  }

  async getTradingPairCount() {
    return this.pairRows.count();
  }

  async clickCategory(name: keyof ExplorePage['categoryButtons']) {
    await this.categoryButtons[name].click();
    await this.page.waitForTimeout(500);
  }

  async expectCategoryActive(name: keyof ExplorePage['categoryButtons']) {
    await expect(this.categoryButtons[name]).toHaveClass(/bg-lighter/);
    await expect(this.categoryButtons[name]).toHaveClass(/text-white/);
  }

  async expectFirstPairEntryStructure() {
    await expect(this.firstPairRow).toBeVisible();
    await expect(this.firstPairAssetIcon).toBeVisible();
    await expect(this.firstPairTicker).not.toBeEmpty();
    await expect(this.firstPairAssetName).not.toBeEmpty();
    await expect(this.firstPairCurrentPrice).toBeVisible();
    await expect(this.firstPairCurrentPrice).toContainText('$');
    await expect(this.firstPairPriceChange).toBeVisible();
    await expect(this.firstPairPriceChange).toHaveText(/[+-]?\d+(\.\d+)?%/);
    await expect(this.firstPairChartColumn).toBeVisible();
    await expect(this.firstPairChart).toBeVisible();
  }

}
