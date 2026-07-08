import { expect, test } from '@playwright/test';
import { ExplorePage } from '../../../src/pages/trading/ExplorePage';


test.describe('Explore Page', () => {
  let explorePage: ExplorePage;
  test.beforeEach(async ({ page }) => {
    explorePage = new ExplorePage(page);
    await explorePage.openExplorePage();
    await explorePage.waitForExplorePageToLoad();
  });

  test('should show spot trading section with at least one trading pair', async () => {
    await explorePage.expectSpotMarketVisible();
    await explorePage.expectTopCryptoPricesVisible();
    const rowCount = await explorePage.getTradingPairCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should show category filters and activate the selected category', async () => {
    await expect(explorePage.categoryButtons.Hot).toBeVisible();
    await expect(explorePage.categoryButtons.Gainers).toBeVisible();
    await expect(explorePage.categoryButtons.Losers).toBeVisible();
    await explorePage.clickCategory('Gainers');
    await explorePage.expectCategoryActive('Gainers');
  });

  test('should show expected fields for the first trading pair row', async () => {
    await explorePage.expectFirstPairEntryStructure();
  });
  
});