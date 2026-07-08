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
    await loginPage.login(testData.invalidUser1.username, testData.invalidUser1.password);
    await loginPage.expectLoginErrorVisible();
  });

  
  test('should reject unauthenticated guest user access', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectGuestUserNotAuthenticated();
  });

});
