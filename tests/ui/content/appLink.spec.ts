import { test } from '@playwright/test';
import { AppLinkPage } from '../../../src/pages/content';

test.describe('App Link Redirection', () => {
  test('should redirect to Apple App Store when user is on an iOS device', async ({ page, browser }) => {
    const appLinkPage = new AppLinkPage(page);
    await appLinkPage.open();
    await appLinkPage.expectSmartRedirectTarget(
      browser,
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/605.1.15',
      'apps.apple.com'
    );
  });

  test('should redirect to Google Play Store when user is on an Android device', async ({ page, browser }) => {
    const appLinkPage = new AppLinkPage(page);
    await appLinkPage.open();
    await appLinkPage.expectSmartRedirectTarget(
      browser,
      'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
      'play.google.com'
    );
  });

});


