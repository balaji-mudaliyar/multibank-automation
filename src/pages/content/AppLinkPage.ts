import { APIRequestContext, Browser, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class AppLinkPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await super.open('/en-AE');
  }

  async getDownloadHref() {
    const downloadButton = this.page.locator('a[data-button-type="download"]');
    await expect(downloadButton).toBeVisible();
    const href = await downloadButton.getAttribute('href');
    if (!href) {
      throw new Error('Could not find href on download button');
    }
    return href;
  }

  async expectSmartRedirectTarget(browser: Browser, userAgent: string, expectedHost: string) {
    const downloadHref = await this.getDownloadHref();
    const deviceContext = await browser.newContext({ userAgent });

    try {
      const response = await this.fetchFirstRedirect(deviceContext.request, downloadHref);
      const redirectTarget = response.headers()['location'] ?? '';

      expect(response.status()).toBe(302);
      expect(redirectTarget).toContain(expectedHost);
    } finally {
      await deviceContext.close();
    }
  }

  private async fetchFirstRedirect(request: APIRequestContext, targetUrl: string) {
    return request.get(targetUrl, { maxRedirects: 0 });
  }
}