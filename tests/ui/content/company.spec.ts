import { test } from '@playwright/test';
import { CompanyPage } from '../../../src/pages/content';

test.describe('Company - Why MultiBank Page Verification', () => {

  test.beforeEach(async ({ page }) => {
    const companyPage = new CompanyPage(page);
    await companyPage.open();
  });

  test('should render main headings and core section texts correctly', async ({ page }) => {
    const companyPage = new CompanyPage(page);

    await companyPage.expectMainHeadingVisible();
    await companyPage.expectStatsVisible();
    await companyPage.expectLeadershipSectionVisible();
    await companyPage.expectInnovationSectionVisible();
    await companyPage.expectLeadershipDescriptionVisible();
  });
  
});