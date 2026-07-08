import { Locator, Page, expect } from '@playwright/test';
import { URLs } from '../../../constants/urls';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginErrorText: Locator;
  private readonly loginButton: Locator;
  private readonly fieldRequiredError: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Email address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.loginErrorText = page.getByText(/Invalid captcha|Invalid email or password\. Please try again\./);
    this.fieldRequiredError = page.getByText('This field is required');
  }

  async open() {
    await this.page.goto(URLs.login, { waitUntil: 'domcontentloaded' });
  }

  async login(email: string, password: string) {
    await expect(this.loginButton).toBeDisabled();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await expect(this.loginButton).toBeEnabled();
  }


  async clearEmailAndPasswordFields() {
    await this.emailInput.fill('');
    await this.passwordInput.fill('');
  }

  async expectFieldRequiredErrors() {
    await expect(this.fieldRequiredError).toHaveCount(2);
    await expect(this.fieldRequiredError.first()).toBeVisible();
    await expect(this.fieldRequiredError.nth(1)).toBeVisible();
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async expectLoginFormVisible() {
    await expect(this.page.locator('span.font-semibold', { hasText: 'Log In' })).toBeVisible();
    await expect(this.page.locator('input[name="email"]')).toBeVisible();
    await expect(this.page.locator('input[name="password"]')).toBeVisible();
  }

  async expectLoginErrorVisible() {
    await expect(this.loginErrorText).toBeVisible();
  }

  async expectMarketingBannerInRightPanel() {
    const banner = this.page.getByText('This is crypto for everyone').locator('..');
    await expect(banner).toBeVisible();

    const bannerBox = await banner.boundingBox();
    expect(bannerBox).not.toBeNull();

    const viewport = this.page.viewportSize();
    expect(viewport).not.toBeNull();

    if (bannerBox && viewport) {
      expect(bannerBox.x).toBeGreaterThan(viewport.width / 2 - 100);
      expect(bannerBox.width).toBeGreaterThan(200);
      expect(bannerBox.height).toBeGreaterThan(60);
    }
    await expect(
      this.page.getByTestId('marketing-banner-description')
    ).toHaveText('Trade with low fees on a platform you can trust.');
  }

  async expectGuestUserNotAuthenticated() {
    const currentUserResponsePromise = this.page.waitForResponse(
      response =>
        response.url().includes('/api/v1/users/current') &&
        response.request().method() === 'GET'
    );

    await this.page.goto(URLs.login, { waitUntil: 'domcontentloaded' });

    const response = await currentUserResponsePromise;
    expect(response.status()).toBe(403);

    const body = await response.json();
    expect(body).toMatchObject({
      status: 403,
      code: 10008,
      message: 'Not authenticated',
      translatedMessage: 'Not authenticated',
    });
    expect(body.traceId).toBeTruthy();
  }
}
