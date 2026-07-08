import { test } from '@playwright/test';
import { HomePage } from '../../../src/pages/navigation/HomePage';

test.describe('Navigation End-to-End Flow', () => {

  test('should render all expected top navigation links and buttons on the features page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.setViewport(1440, 900);
    await homePage.openHomePage();
    await homePage.expectTopNavigationVisible();
    await homePage.expectAuthButtonsVisible();
  });

  test('should traverse header options and verify matching landing components', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.setViewport(1110, 922);
    await homePage.openHomePage('?original_ref=direct');
    await homePage.expectHomePageTitle();

    await homePage.openExploreFromHeader();
    await homePage.expectExploreLandingVisible();

    await homePage.openFeaturesFromHeader();
    await homePage.expectFeaturesLandingVisible();

    await homePage.openOtcDeskFromHeader();
    await homePage.expectOtcDeskLandingVisible();

    await homePage.openCompanyFromHeader();
    await homePage.expectCompanyLandingVisible();

    await homePage.openSupportFromHeader();
    await homePage.expectSupportLandingVisible();

    await homePage.openMbgFromHeader();
  });

  // Define standard desktop viewports to validate layout behavior
  const desktopViewports = [
    { name: 'Small Laptop / Tablet Landscape', width: 1024, height: 768 },
    { name: 'Standard Desktop', width: 1280, height: 800 },
    { name: 'Large Desktop Monitor', width: 1440, height: 900 }
  ];

  for (const viewport of desktopViewports) {
    test(`should display desktop navigation correctly at ${viewport.width}x${viewport.height} (${viewport.name})`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.setViewport(viewport.width, viewport.height);
      await homePage.openHomePage();
      await homePage.expectTopNavigationVisible();
      await homePage.expectAuthButtonsVisible();
    });
  }

});