import { Locator, Page, expect } from '@playwright/test';
import { URLs } from '../../../constants/urls';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginErrorText: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Email address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginErrorText = page.getByText(/Invalid captcha|Invalid email or password\. Please try again\./);
  }

  async open() {
    await this.page.goto(URLs.login, { waitUntil: 'domcontentloaded' });
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async expectLoginFormVisible() {
    await expect(this.page.locator('span.font-semibold', { hasText: 'Log In' })).toBeVisible();
    await expect(this.page.locator('input[name="email"]')).toBeVisible();
    await expect(this.page.locator('input[name="password"]')).toBeVisible();
  }

  async expectLoginErrorVisible() {
    await expect(this.loginErrorText).toBeVisible();
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
