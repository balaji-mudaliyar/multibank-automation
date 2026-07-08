import { test, expect } from '../../src/fixtures/baseFixture';
import { URLs } from '../../constants/urls';

test.describe('Users API', () => {
  test('should return a non-empty users list', async ({ apiHelper, logger }) => {
    logger.info('Calling users API');
    const response = await apiHelper.getUsers(URLs.apiUsers);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });
});
