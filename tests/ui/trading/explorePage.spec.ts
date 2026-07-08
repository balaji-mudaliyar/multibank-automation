import { expect, test } from '@playwright/test';
import { ExplorePage } from '../../../src/pages/trading/ExplorePage';


test.describe('MB.io Explore Page - Trading Functionality', () => {
  let explorePage: ExplorePage;
  test.beforeEach(async ({ page }) => {
    explorePage = new ExplorePage(page);
    await explorePage.openExplorePage();
    await explorePage.waitForExplorePageToLoad();
  });

  test('shows spot trading section with at least one trading pair', async () => {
    await explorePage.expectSpotMarketVisible();
    await explorePage.expectTopCryptoPricesVisible();
    const rowCount = await explorePage.getTradingPairCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('shows category filters and activates selected category', async () => {
    await expect(explorePage.categoryButtons.Hot).toBeVisible();
    await expect(explorePage.categoryButtons.Gainers).toBeVisible();
    await expect(explorePage.categoryButtons.Losers).toBeVisible();
    await explorePage.clickCategory('Gainers');
    await explorePage.expectCategoryActive('Gainers');
  });

  test('shows expected fields for the first trading pair row', async () => {
    await explorePage.expectFirstPairEntryStructure();
  });
  
});