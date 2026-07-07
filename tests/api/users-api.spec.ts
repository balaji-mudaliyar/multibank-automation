import { test, expect } from '../../fixtures/baseFixture';
import { URLs } from '../../constants/urls';

test.describe('Users API', () => {
  test('fetches users from the public API', async ({ apiHelper, logger }) => {
    logger.info('Calling users API');
    const response = await apiHelper.getUsers(URLs.apiUsers);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });
});
