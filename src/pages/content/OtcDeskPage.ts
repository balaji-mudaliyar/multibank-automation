import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class OtcDeskPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly heroHeading = this.page.getByRole('heading', {
    name: 'Large trades. Zero market impact. Full discretion.',
    exact: true,
  });

  private readonly tradeHeading = this.page.getByRole('heading', {
    name: 'Trade with the #1 OTC Desk in the UAE',
    exact: true,
  });

  private readonly bestPricingFeature = this.page.getByRole('heading', {
    name: 'Best available pricing',
    exact: true,
  });

  private readonly zeroMarketImpactFeature = this.page.getByRole('heading', {
    name: 'Zero market impact',
    exact: true,
  });

  private readonly regulatedCustodyFeature = this.page.getByRole('heading', {
    name: 'Regulated custody',
    exact: true,
  });

  private readonly fiatSettlementFeature = this.page.getByRole('heading', {
    name: 'Fiat settlement',
    exact: true,
  });

  private readonly dedicatedManagerFeature = this.page.getByRole('heading', {
    name: 'Dedicated relationship manager',
    exact: true,
  });

  private readonly sameDaySettlementFeature = this.page.getByRole('heading', {
    name: 'Same-day settlement',
    exact: true,
  });

  private readonly howItWorksHeading = this.page.getByRole('heading', {
    name: 'How it works',
    exact: true,
  });

  private readonly applyStep = this.page.getByRole('heading', { name: 'Apply', exact: true });
  private readonly verifyStep = this.page.getByRole('heading', { name: 'Verify', exact: true });
  private readonly connectStep = this.page.getByRole('heading', { name: 'Connect', exact: true });
  private readonly tradeStep = this.page.getByRole('heading', { name: 'Trade', exact: true });

  private readonly requestQuoteButton = this.page.getByRole('link', { name: 'Request a quote' }).first();

  async open(): Promise<void> {
    await super.open('/en-AE/features/otc-desk');
  }

  async expectHeroVisible(): Promise<void> {
    await expect(this.heroHeading).toBeVisible();
  }

  async expectTradeHeadingVisible(): Promise<void> {
    await expect(this.tradeHeading).toBeVisible();
  }

  async expectAllFeaturesVisible(): Promise<void> {
    await expect(this.bestPricingFeature).toBeVisible();
    await expect(this.zeroMarketImpactFeature).toBeVisible();
    await expect(this.regulatedCustodyFeature).toBeVisible();
    await expect(this.fiatSettlementFeature).toBeVisible();
    await expect(this.dedicatedManagerFeature).toBeVisible();
    await expect(this.sameDaySettlementFeature).toBeVisible();
  }

  async expectHowItWorksVisible(): Promise<void> {
    await expect(this.howItWorksHeading).toBeVisible();
    await expect(this.applyStep).toBeVisible();
    await expect(this.verifyStep).toBeVisible();
    await expect(this.connectStep).toBeVisible();
    await expect(this.tradeStep).toBeVisible();
  }

  async expectRequestQuoteButtonVisible(): Promise<void> {
    await expect(this.requestQuoteButton).toBeVisible();
  }
}
