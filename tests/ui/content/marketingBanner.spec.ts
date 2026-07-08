import { test } from '@playwright/test';
import { LoginPage } from '../../../src/pages/navigation/LoginPage';

test('should render the marketing banner in the expected page region', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.open();
  await loginPage.expectMarketingBannerInRightPanel();
});