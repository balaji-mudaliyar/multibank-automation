import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
  readonly header: Locator;
  readonly exploreLink: Locator;
  readonly signInLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('header').first();
    this.exploreLink = page.getByRole('link', { name: 'Explore' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
  }

  async openHomePage() {
    await this.open('/en-AE');
  }

  async assertNavigationItemsVisible() {
    await expect(this.header).toBeVisible();
    await expect(this.exploreLink).toBeVisible();
    await expect(this.signInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }

  async assertNavigationDestinations() {
    await expect(this.exploreLink).toHaveAttribute('href', '/en-AE/explore');
    await expect(this.signInLink).toHaveAttribute('href', 'https://trade.mb.io/login');
    await expect(this.signUpLink).toHaveAttribute('href', 'https://trade.mb.io/register');
  }
}
