---
applyTo: "tests/**/*.spec.ts,tests/**/*.api.spec.ts"
---

# Writing Tests

## Imports
Always import `test` and `expect` from the custom fixture, never from `@playwright/test` directly:
```ts
import { test, expect } from '../../fixtures/baseFixture';
```

## Structure
- Wrap related tests in `test.describe('Feature name', () => { ... })`
- Use `test.beforeEach()` for page navigation and shared setup
- Each `test()` block should assert a single behaviour

## Available Fixtures
Destructure only what you need from the test function arguments:
```ts
test('example', async ({ page, logger, testData, apiHelper }) => { ... });
```
- `page` — Playwright page (UI tests only)
- `logger` — use `logger.info()` / `logger.error()` instead of `console.log`
- `testData` — parsed `data/users.json` (use for credentials, never hardcode)
- `apiHelper` — `ApiHelper` instance (API tests only)

## UI Tests
- Instantiate Page Object classes inside tests or `beforeEach`, passing `page`
- Call action methods on POM classes; never interact with `page` directly in test bodies
- Prefer `await expect(locator).toBeVisible()` over `page.waitForSelector()`
- Use `await expect(locator).toHaveURL(...)` and `await expect(locator).toContainText(...)` for assertions

```ts
test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open('/login');
  });

  test('shows validation error for invalid credentials', async ({ logger, testData }) => {
    logger.info('Testing invalid login');
    await loginPage.login(testData.invalidUser1.username, testData.invalidUser1.password);
    await loginPage.expectErrorVisible();
  });
});
```

## API Tests
- File must end in `.api.spec.ts`
- Use `apiHelper` for all HTTP calls — never use `fetch` or `axios` directly
- Validate response schemas with AJV against schemas in `data/schema/`
- Handle DNS/network errors gracefully: skip the test rather than failing

```ts
test('GET /users returns valid schema', async ({ apiHelper, logger }) => {
  let response: Response;
  try {
    response = await apiHelper.getUsers();
  } catch (e) {
    test.skip(true, 'Network unavailable');
    return;
  }
  expect(response.status()).toBe(200);
});
```

## Constants
- Import URLs from `constants/urls.ts` — never hardcode
- Import test data from the `testData` fixture — never hardcode credentials

## Forbidden Patterns
- `console.log()` — use `logger.info()` instead
- Hardcoded URLs or credentials in test files
- Raw `page.locator('css-selector')` strings in test files
- Importing from `@playwright/test` directly
