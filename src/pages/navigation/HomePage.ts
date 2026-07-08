import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HomePage extends BasePage {

  readonly mainRegion: Locator;
  readonly heroHeading: Locator;
  readonly fastTradeHeading: Locator;
  readonly platformFeaturesHeading: Locator;
  readonly nextTradeHeading: Locator;
  readonly downloadLink: Locator;
  readonly exploreLink: Locator;
  readonly featuresLink: Locator;
  readonly otcDeskLink: Locator;
  readonly companyLink: Locator;
  readonly supportLink: Locator;
  readonly mbgLink: Locator;
  readonly signInButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.mainRegion = page.locator('main').first();
    this.heroHeading = page.getByRole('heading', { name: 'Crypto for everyone' });
    this.fastTradeHeading = page.getByText('The fastest way to trade');
    this.platformFeaturesHeading = page.getByRole('heading', { name: 'Smarter ways to trade and grow' });
    this.nextTradeHeading = page.getByRole('heading', { name: 'Catch your next trade' });
    this.downloadLink = page.getByRole('link', { name: 'Download the app' });
    this.exploreLink = page.getByRole('link', { name: 'Explore', exact: true });
    this.featuresLink = page.getByRole('link', { name: 'Features', exact: true });
    this.otcDeskLink = page.getByRole('link', { name: 'OTC Desk', exact: true });
    this.companyLink = page.getByRole('link', { name: 'Company', exact: true });
    this.supportLink = page.getByRole('link', { name: 'Support', exact: true });
    this.mbgLink = page.getByRole('link', { name: '$MBG', exact: true });
    this.signInButton = page.getByRole('link', { name: 'Sign in', exact: true });
    this.signUpButton = page.getByRole('link', { name: 'Sign up', exact: true });
  }

  async setViewport(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async openHomePage(query = '') {
    await this.open(`/en-AE${query}`);
  }

  async expectHomePageTitle() {
    await expect(this.page).toHaveTitle('Trade Crypto Fast & Secure | Low Fees Exchange | mb.io');
  }

  async expectMarketingBannersVisible() {
    await expect(this.heroHeading).toBeVisible();
    await expect(this.fastTradeHeading).toBeVisible();
    await expect(this.platformFeaturesHeading).toBeVisible();
    await expect(this.nextTradeHeading).toBeVisible();
  }

  async expectTopNavigationVisible() {
    await expect(this.exploreLink).toBeVisible();
    await expect(this.featuresLink).toBeVisible();
    await expect(this.otcDeskLink).toBeVisible();
    await expect(this.companyLink).toBeVisible();
    await expect(this.supportLink).toBeVisible();
    await expect(this.mbgLink).toBeVisible();
  }

  async expectAuthButtonsVisible() {
    await expect(this.signInButton).toBeVisible();
    await expect(this.signInButton).toBeEnabled();
    await expect(this.signUpButton).toBeVisible();
    await expect(this.signUpButton).toBeEnabled();
  }

  async openExploreFromHeader() {
    await this.exploreLink.click();
  }

  async openFeaturesFromHeader() {
    await this.featuresLink.click();
  }

  async openOtcDeskFromHeader() {
    await this.otcDeskLink.click();
  }

  async openCompanyFromHeader() {
    await this.companyLink.click();
  }

  async openSupportFromHeader() {
    await this.supportLink.click();
  }

  async openMbgFromHeader() {
    await this.mbgLink.click();
  }

  async expectExploreLandingVisible() {
    await expect(this.page.getByRole('heading', { name: 'Markets at your fingertips', exact: true })).toBeVisible();
  }

  async expectFeaturesLandingVisible() {
    await expect(this.page.locator('section.relative')).toBeVisible();
  }

  async expectOtcDeskLandingVisible() {
    await expect(this.page.getByRole('heading', { name: 'Trade with the #1 OTC Desk in the UAE', exact: true })).toBeVisible();
    await expect(this.page.getByText('OTC DESK', { exact: true })).toBeVisible();
  }

  async expectCompanyLandingVisible() {
    await expect(this.page.locator('div.overflow-x-hidden > section')).toBeVisible();
  }

  async expectSupportLandingVisible() {
    await expect(this.page.getByRole('heading', { name: 'Quick actions', exact: true })).toBeVisible();
  }

}
