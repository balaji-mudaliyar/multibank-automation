import { HomePage } from '../../pages/HomePage';
import { test, expect } from '../../fixtures/baseFixture';

test.describe('Logout flows', () => {
  test('home page loads after logout navigation', async ({ page, logger }) => {
    logger.info('Opening home page');
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.expectWelcomeVisible();
  });
});
