import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { test, expect } from '../../../fixtures/baseFixture';

test.describe('Login flows', () => {
  test('renders the login form', async ({ page, logger }) => {
    logger.info('Opening login page');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectLoginFormVisible();
  });

  test('logs in with a valid user', async ({ page, logger, testData }) => {
    logger.info('Logging in with valid credentials');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    const homePage = new HomePage(page);
    await homePage.expectWelcomeVisible();
  });
});
