import { test } from '../../../src/fixtures/baseFixture';
import { OtcDeskPage } from '../../../src/pages/content';

test.describe('OTC Desk Page', () => {
  let otcDeskPage: OtcDeskPage;

  test.beforeEach(async ({ page }) => {
    otcDeskPage = new OtcDeskPage(page);
    await otcDeskPage.open();
  });

  test('should display hero heading', async ({ logger }) => {
    logger.info('Verifying OTC Desk hero heading');
    await otcDeskPage.expectHeroVisible();
  });

  test('should display trade with #1 OTC Desk heading', async ({ logger }) => {
    logger.info('Verifying OTC Desk trade heading');
    await otcDeskPage.expectTradeHeadingVisible();
  });

  test('should display all feature sections', async ({ logger }) => {
    logger.info('Verifying OTC Desk features section');
    await otcDeskPage.expectAllFeaturesVisible();
  });

  test('should display How it works steps', async ({ logger }) => {
    logger.info('Verifying How it works section');
    await otcDeskPage.expectHowItWorksVisible();
  });

  test('should display Request a quote button', async ({ logger }) => {
    logger.info('Verifying Request a quote CTA');
    await otcDeskPage.expectRequestQuoteButtonVisible();
  });
});
