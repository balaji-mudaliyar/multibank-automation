import { expect, test } from '@playwright/test';
import { ExplorePage } from '../../../src/pages/trading/ExplorePage';


test.describe('MB.io Explore Page - Trading Functionality', () => {
  let explorePage: ExplorePage;
  test.beforeEach(async ({ page }) => {
    explorePage = new ExplorePage(page);
    await explorePage.openExplorePage();
    await explorePage.waitForExplorePageToLoad();
  });
  test('testcase 1 - Spot trading section renders and displays trading pairs', async () => {
    await explorePage.expectSpotMarketVisible();
    await explorePage.expectTopCryptoPricesVisible();
    const rowCount = await explorePage.getTradingPairCount();
    expect(rowCount).toBeGreaterThan(0);
  });
  test('testcase 2 - Trading pairs are correctly grouped into categories', async () => {
    await expect(explorePage.categoryButtons.Hot).toBeVisible();
    await expect(explorePage.categoryButtons.Gainers).toBeVisible();
    await expect(explorePage.categoryButtons.Losers).toBeVisible();
    await explorePage.clickCategory('Gainers');
    await explorePage.expectCategoryActive('Gainers');
  });
  test('testcase 3 - Trading pair entries contain the expected data fields', async () => {
    await explorePage.expectFirstPairEntryStructure();
  });
});