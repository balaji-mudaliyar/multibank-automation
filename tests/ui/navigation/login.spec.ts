import { LoginPage } from '../../../src/pages/navigation/LoginPage';
import { test } from '../../../src/fixtures/baseFixture';

/**
 * Tag strategy:
 *   @smoke      — critical path, run on every PR
 *   @regression — full coverage, run nightly or before release
 *   @visual     — snapshot tests (see login.visual.spec.ts)
 *
 * Filter examples:
 *   npx playwright test --grep @smoke
 *   npx playwright test --grep @regression
 *   npx playwright test --grep-invert @visual
 */

test.describe('Login Page', () => {

  test('should render the login form', { tag: '@smoke' }, async ({ page, logger }) => {
    logger.info('Opening login page');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectPageLoaded();
  });

  test('should show an error for invalid credentials', { tag: ['@smoke', '@regression'] }, async ({ page, logger, testData }) => {
    logger.info('Logging in with invalid credentials');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectInvalidCredentialsErrorFor(testData.invalidUser1.email, testData.invalidUser1.password);
  });

  test('should show a validation error for an invalid email address', { tag: '@regression' }, async ({ page, testData }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectInvalidEmailValidationFor(testData.invalidUser2.email, testData.invalidUser2.password);
  });

  test('should show required field errors when email and password are cleared', { tag: '@regression' }, async ({ page, testData }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectRequiredFieldErrorsAfterClearing(testData.invalidUser1.email, testData.invalidUser1.password);
  });

  test('should reject unauthenticated guest user access', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectGuestUserNotAuthenticated();
  });

  test('should render the marketing banner in the expected page region', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectMarketingBannerInRightPanel();
  });

});
