import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CompanyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('https://mb.io/en-AE/company', { waitUntil: 'domcontentloaded' });
  }

  async expectMainHeadingVisible() {
    await expect(this.page.getByRole('heading', { name: 'Why MultiBank Group?', exact: true })).toBeVisible();
  }

  async expectStatsVisible() {
    await expect(this.page.getByText('$2 trillion')).toBeVisible();
    await expect(this.page.getByText('Annual turnover')).toBeVisible();
    await expect(this.page.getByText('2,000,000+')).toBeVisible();
    await expect(this.page.getByText('Customers worldwide')).toBeVisible();
    await expect(this.page.getByText('25+')).toBeVisible();
    await expect(this.page.getByText('Offices globally')).toBeVisible();
  }

  async expectLeadershipSectionVisible() {
    await expect(this.page.getByRole('heading', { name: 'A tradition of global leadership', exact: true })).toBeVisible();
  }

  async expectInnovationSectionVisible() {
    await expect(this.page.getByRole('heading', { name: 'Innovation with purpose', exact: true })).toBeVisible();
  }

  async expectLeadershipDescriptionVisible() {
    await expect(this.page.getByText('Founded in 2005, MultiBank has grown into one of the largest financial groups')).toBeVisible();
  }
}
