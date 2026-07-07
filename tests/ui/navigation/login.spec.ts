import { LoginPage } from '../../../src/pages/navigation/LoginPage';
import { HomePage } from '../../../src/pages/navigation/HomePage';
import { test, expect } from '../../../src/fixtures/baseFixture';

test.describe('Login flows', () => {
  test('renders the login form', async ({ page, logger }) => {
    logger.info('Opening login page');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.expectLoginFormVisible();
  });

  test('logs in with invalid user', async ({ page, logger, testData }) => {
    logger.info('Logging in with valid credentials');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(testData.invalidUser1.username, testData.invalidUser1.password);
    await page.getByRole('alert', { name: 'Invalid email or password. Please try again.' })
  });
});
