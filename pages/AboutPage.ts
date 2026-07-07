import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AboutPage extends BasePage {
  readonly whyMultiBankHeading: Locator;
  readonly leadershipHeading: Locator;
  readonly innovationHeading: Locator;
  readonly integrityHeading: Locator;
  readonly strengthHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.whyMultiBankHeading = page.getByRole('heading', { name: 'Why MultiBank Group?' });
    this.leadershipHeading = page.getByRole('heading', { name: 'A tradition of global leadership' });
    this.innovationHeading = page.getByRole('heading', { name: 'Innovation with purpose' });
    this.integrityHeading = page.getByRole('heading', { name: 'Integrity built into every decision' });
    this.strengthHeading = page.getByRole('heading', { name: 'The strength behind MultiBank Group' });
  }

  async openCompanyPage() {
    await this.open('/en-AE/company');
  }

  async expectCoreSectionsVisible() {
    await expect(this.whyMultiBankHeading).toBeVisible();
    await expect(this.leadershipHeading).toBeVisible();
    await expect(this.innovationHeading).toBeVisible();
    await expect(this.integrityHeading).toBeVisible();
    await expect(this.strengthHeading).toBeVisible();
  }
}
