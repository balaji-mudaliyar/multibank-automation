# Copilot Instructions — multibank-automation

## Project Overview
Playwright + TypeScript test automation framework for the MultiBank web application.
Covers both UI (Chromium, Firefox) and API tests with Allure + HTML reporting deployed to GitHub Pages.

## Tech Stack
- **Test runner**: `@playwright/test` v1.61.1
- **Language**: TypeScript (strict mode, ES2020, NodeNext module resolution)
- **Reporting**: Playwright HTML (`reports/html/`) + Allure (`reports/allure-html/`)
- **Schema validation**: AJV + ajv-formats (API contract tests)
- **CI**: GitHub Actions → publishes reports to `docs/` → GitHub Pages
- **Docker**: `mcr.microsoft.com/playwright:v1.61.1-noble` base image (for local use only; CI runs native Node)

## Repository Layout
```
src/
  pages/          # Page Object Model classes (extend BasePage)
    BasePage.ts   # Base class — wrap all shared page behaviour here
    content/      # AppLinkPage, CompanyPage
    navigation/   # HomePage, LoginPage
    trading/      # ExplorePage
  fixtures/
    baseFixture.ts  # Exports apiHelper, logger, testData
  utils/
    apiHelper.ts      # Wraps APIRequestContext (GET helpers)
    logger.ts         # Simple info/error logger
    screenshotHelper.ts
    waitHelper.ts
tests/
  api/            # *.api.spec.ts — no browser, runs in "api" project
  ui/             # *.spec.ts — runs in chromium + firefox projects
    content/
    navigation/
    trading/
constants/
  urls.ts         # All base URLs and API endpoints — never hardcode URLs in tests
data/
  users.json              # Test credentials (invalidUser1, invalidUser2)
  schema/                 # AJV JSON schemas for API contract tests
  responses/              # Expected API response fixtures
```

## Architecture Patterns

### Page Object Model
- Every page/component has its own class in `src/pages/`
- All page classes **extend `BasePage`**
- Locators are **private class properties** using semantic Playwright queries (`getByRole`, `getByPlaceholder`, `getByText`, `getByLabel`)
- Public methods are either:
  - **Action methods** — perform interactions (e.g. `login()`, `clickLoginButton()`)
  - **Assertion methods** — named `expect*()` (e.g. `expectLoginFormVisible()`)
- Never put raw `page.locator()` strings in test files

### Custom Fixtures
All tests import from `src/fixtures/baseFixture.ts`, not directly from `@playwright/test`.
Available fixture properties:
- `apiHelper` — `ApiHelper` instance for API calls
- `logger` — `Logger` instance (`logger.info()`, `logger.error()`)
- `testData` — parsed `data/users.json`

### API Tests
- Filename pattern: `*.api.spec.ts` (matched by the `api` Playwright project — no browser launched)
- Use `apiHelper` from fixture for HTTP calls
- Validate response schemas with AJV against schemas in `data/schema/`
- Handle DNS/network errors gracefully (mark as skipped or pending, not failed)

### Test Data
- Credentials and reusable values live in `data/*.json`
- API endpoint constants live in `constants/urls.ts`
- **Never hardcode URLs or credentials inline in test files**

## Coding Conventions
- Use `test.describe()` to group related tests
- Use `test.beforeEach()` / `test.afterEach()` for shared setup/teardown within a describe block
- Prefer `await expect(locator).toBeVisible()` over `page.waitForSelector()`
- Prefer role-based locators (`getByRole`, `getByLabel`) over CSS selectors
- Use `logger` (from fixture) for informational output instead of `console.log`
- TypeScript strict mode is on — avoid `any`, provide explicit types

## Test File Naming
| Type | Pattern | Example |
|------|---------|---------|
| UI spec | `*.spec.ts` | `login.spec.ts` |
| API spec | `*.api.spec.ts` | `users.api.spec.ts` |
| Page Object | `<PageName>Page.ts` | `LoginPage.ts` |

## CI / Reports
- CI runs on push to `main` and PRs to `main`
- On push to `main`: generates Allure report and copies both reports to `docs/` then commits
- Allure results: `allure-results/` → generate with `npm run allure:generate`
- HTML report: `reports/html/`
- Do **not** modify `docs/` manually — it is managed by CI

## Running Tests Locally
```bash
npm test                          # all tests, headless
npm run test:headed               # all tests, headed
npx playwright test tests/ui/     # UI tests only
npx playwright test tests/api/    # API tests only
npm run allure:generate && npm run allure:open   # view Allure report
```

## Docker (local only)
```bash
docker compose run --rm tests                    # full suite
docker compose run --rm tests npx playwright test tests/api/   # API only
```
