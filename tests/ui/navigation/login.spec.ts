import { LoginPage } from '../../../src/pages/navigation/LoginPage';
import { test } from '../../../src/fixtures/baseFixture';

test.describe('Login Flows', () => {
  test('should render the login form', async ({ page, logger }) => {
    logger.info('Opening login page');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectLoginFormVisible();
  });

  test('should show an error for invalid credentials', async ({ page, logger, testData }) => {
    logger.info('Logging in with invalid credentials');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(testData.invalidUser1.email, testData.invalidUser1.password);
    await loginPage.clickLoginButton();
    await loginPage.expectLoginErrorVisible();
  });

  test('email and password are required', async ({ page, logger, testData }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(testData.invalidUser1.email, testData.invalidUser1.password);
    await loginPage.clearEmailAndPasswordFields();
    await loginPage.expectFieldRequiredErrors();
  });

  
  test('should reject unauthenticated guest user access', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectGuestUserNotAuthenticated();
  });

});
