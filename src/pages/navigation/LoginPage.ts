import { Locator, Page, expect } from '@playwright/test';
import { URLs } from '../../../constants/urls';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginErrorText: Locator;
  private readonly loginButton: Locator;
  private readonly fieldRequiredError: Locator;
  private readonly invalidEmailError: Locator;
  private readonly logoLink: Locator;
  private readonly logoImage: Locator;
  private readonly loginHeading: Locator;
  private readonly marketingBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Email address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.loginErrorText = page.getByText(/Invalid captcha|Invalid email or password\. Please try again\./);
    this.fieldRequiredError = page.getByText('This field is required');
    this.invalidEmailError = page.getByText('Please enter a valid email address!');
    this.logoLink = page.locator('a[href="https://mb.io/"]');
    this.logoImage = this.logoLink.locator('img[alt="Logo"]');
    this.loginHeading = page.locator('span.font-semibold', { hasText: 'Log In' });
    this.marketingBanner = page.getByText('This is crypto for everyone').locator('..');
  }

  async open() {
    await this.page.goto(URLs.login, { waitUntil: 'domcontentloaded' });
  }

  async fillCredentials(email: string, password: string) {
    await expect(this.loginButton).toBeDisabled();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.clickLoginButton();
  }

  async clearEmailAndPasswordFields() {
    await this.emailInput.fill('');
    await this.passwordInput.fill('');
  }

  async expectPageLoaded() {
    await this.expectMBLogoVisible();
    await this.expectLoginFormVisible();
  }

  async expectInvalidCredentialsErrorFor(email: string, password: string) {
    await this.login(email, password);
    await this.expectLoginErrorVisible();
  }

  async expectInvalidEmailValidationFor(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.expectInvalidEmailError();
  }

  async expectRequiredFieldErrorsAfterClearing(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.clearEmailAndPasswordFields();
    await this.expectFieldRequiredErrors();
  }

  async expectFieldRequiredErrors() {
    await expect(this.fieldRequiredError).toHaveCount(2);
    await expect(this.fieldRequiredError.first()).toBeVisible();
    await expect(this.fieldRequiredError.nth(1)).toBeVisible();
  }

  async expectInvalidEmailError() {
    await expect(this.invalidEmailError).toBeVisible();
  }

  async expectMBLogoVisible() {
    await expect(this.logoLink).toBeVisible();
    await expect(this.logoImage).toBeVisible();
    await expect(this.logoImage).toHaveAttribute('src', /mbio-logo/);
  }

  async expectLoginFormVisible() {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async expectLoginErrorVisible() {
    await expect(this.loginErrorText).toBeVisible();
  }

  async expectMarketingBannerInRightPanel() {
    await expect(this.marketingBanner).toBeVisible();

    const bannerBox = await this.marketingBanner.boundingBox();
    expect(bannerBox).not.toBeNull();

    const viewport = this.page.viewportSize();
    expect(viewport).not.toBeNull();

    if (bannerBox && viewport) {
      expect(bannerBox.x).toBeGreaterThan(viewport.width / 2 - 100);
      expect(bannerBox.width).toBeGreaterThan(200);
      expect(bannerBox.height).toBeGreaterThan(60);
    }
  }

  async expectGuestUserNotAuthenticated() {
    const currentUserResponsePromise = this.page.waitForResponse(
      response =>
        response.url().includes('/api/v1/users/current') &&
        response.request().method() === 'GET'
    );

    await this.open();

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
