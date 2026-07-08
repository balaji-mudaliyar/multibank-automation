import { HomePage } from '../../../src/pages/navigation/HomePage';
import { test, expect } from '../../../src/fixtures/baseFixture';

test.describe('Logout Flows', () => {
  test('should load the home page after logout navigation', async ({ page, logger }) => {
    logger.info('Opening home page');
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.expectMarketingBannersVisible();
  });
});
