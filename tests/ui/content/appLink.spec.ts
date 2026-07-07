import { test, expect, Page } from '@playwright/test';

test.describe('Smart Download Link Redirection Tests', () => {

  const LANDING_PAGE = 'https://mb.io/en-AE';

  // Helper function to extract the href from your Mac UI landing page
  async function getDownloadHref(page: Page): Promise<string> {
    await page.goto(LANDING_PAGE);
    const downloadButton = page.locator('a[data-button-type="download"]');
    await expect(downloadButton).toBeVisible();
    const href = await downloadButton.getAttribute('href');
    if (!href) throw new Error("Could not find href on download button");
    return href;
  }

  test('should redirect to Apple App Store when user is on an iOS device', async ({ page, browser }) => {
    const downloadHref = await getDownloadHref(page);
    const iphoneContext = await browser.newContext({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/605.1.15'
    });
    const response = await iphoneContext.request.get(downloadHref, {
      maxRedirects: 0 // Stop immediately at the first redirect step to read the Location header
    });

    const redirectTarget = response.headers()['location'];
    expect(response.status()).toBe(302);
    console.log(redirectTarget, 'Redirect target for iOS device');
    expect(redirectTarget).toContain('apps.apple.com');
    
    await iphoneContext.close();
  });

  test('should redirect to Google Play Store when user is on an Android device', async ({ page, browser }) => {
    const downloadHref = await getDownloadHref(page);
    const androidContext = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36'
    });
    const response = await androidContext.request.get(downloadHref, {
      maxRedirects: 0 // Stop immediately to check the redirect destination
    });

    const redirectTarget = response.headers()['location'];

    expect(response.status()).toBe(302);
    console.log(redirectTarget, 'Redirect target for Android device');
    expect(redirectTarget).toContain('play.google.com');

    await androidContext.close();
  });

});