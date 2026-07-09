import { LoginPage } from '../../../src/pages/navigation/LoginPage';
import { test } from '../../../src/fixtures/baseFixture';

test.describe('Login Page', () => {

  test('should render the login form', async ({ page, logger }) => {
    logger.info('Opening login page');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectPageLoaded();
  });

  test('should show an error for invalid credentials', async ({ page, logger, testData }) => {
    logger.info('Logging in with invalid credentials');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectInvalidCredentialsErrorFor(testData.invalidUser1.email, testData.invalidUser1.password);
  });

  test('should show a validation error for an invalid email address', async ({ page, logger, testData }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectInvalidEmailValidationFor(testData.invalidUser2.email, testData.invalidUser2.password);
  });

  test('should show required field errors when email and password are cleared', async ({ page, logger, testData }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectRequiredFieldErrorsAfterClearing(testData.invalidUser1.email, testData.invalidUser1.password);
  });


  test('should reject unauthenticated guest user access', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectGuestUserNotAuthenticated();
  });

  test('should render the marketing banner in the expected page region', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectMarketingBannerInRightPanel();
  });

});
