# Multibank Automation

<!-- Badges: replace OWNER/REPO with your GitHub repository -->
![CI](https://github.com/balaji-mudaliyar/multibank-automation/actions/workflows/ci.yml/badge.svg?branch=main)
![node](https://img.shields.io/badge/node-18%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

This repository contains automated UI and API tests for the MultiBank website, built with Playwright. It uses a Page Object Model (POM) structure, reusable fixtures, and built-in reporting.

Project structure at a glance

- `tests/` — UI and API test suites.
- `src/pages/` — Page Object classes.
- `src/fixtures/` — Playwright fixtures and test setup.
- `src/utils/` — Helpers (`apiHelper.ts`, `waitHelper.ts`, `logger.ts`).
- `data/` — JSON test data.
- `reports/` — HTML reports and artifacts.
- `reports/html/` — Playwright HTML report output.

## Why Playwright ? 

I selected Playwright as the automation framework because it provides modern, reliable browser automation with excellent cross-browser support and built-in features that help reduce test flakiness. It is well suited for modern web applications and integrates seamlessly into CI/CD pipelines.

Key benefits
- Reliable test execution with built-in auto-waiting and intelligent actionability checks.
- Fast execution through parallel test execution and efficient browser automation.
- Cross-browser testing with native support for Chromium, Firefox, and WebKit using a single API.
- Rich debugging capabilities, including Trace Viewer, screenshots, videos, and execution logs.
- Built-in API testing and network interception for end-to-end and integration testing.
- Seamless CI/CD integration with support for major CI platforms and detailed reporting.
- Multi-language support, including TypeScript, JavaScript, Python, Java, and .NET.

## Quick Start

### 1. Run with Docker

For easiest way to run with single command, I have used Docker and shell script.

1. Run all tests:

```bash
./scripts/tests.sh test
```

2. Run a single test file:

```bash
./scripts/tests.sh spec tests/ui/navigation/home.spec.ts
```

3. Pass additional Playwright flags when needed:

```bash
./scripts/tests.sh spec tests/ui/navigation/home.spec.ts -- --project=chromium -g "invalid route"
```

If you prefer running Docker commands directly:

```bash
docker compose up --build
docker build -t multibank-automation .
docker run --rm multibank-automation
```

### 2. Run without Docker

Prerequisites:

- Node.js 18+
- npm

1. Install dependencies:

```bash
npm ci
npx playwright install --with-deps
```

2. Run all tests:

```bash
npm test
```

3. Run a single test file:

```bash
npx playwright test tests/ui/navigation/home.spec.ts
```

4. Run headed tests:

```bash
npm run test:headed
```

5. Open the HTML report:

```bash
npm run test:report
```


## Notes

- If a test is marked with `test.only`, CI will fail because `forbidOnly` is enabled when `CI=true`.

## CI

A GitHub Actions workflow is included at [.github/workflows/ci.yml](.github/workflows/ci.yml) to run tests, cache dependencies, and upload test artifacts and reports.

## Reporting

- Playwright HTML report is generated under `reports/html/`.
- Allure result files are generated under `allure-results/`.
- Allure static HTML report is generated under `reports/allure-html/`.

Generate and open Allure report locally:

```bash
npm run allure:generate
npm run allure:open
```

Publish reports to GitHub Pages (`docs/`):

```bash
npm run pages:report
npm run pages:allure
```

Or publish both in one command:

```bash
npm run pages:reports
```

- Sample Report for browser-level execution can be viewed here : https://balaji-mudaliyar.github.io/multibank-automation/ 


## Sample Test Execution (Cross-Browser)

Command used:

```bash
npx playwright test login.spec.ts -g "should render the login form" --project=chromium --project=firefox --reporter=list
```

Sample output:

```text
Running 2 tests using 2 workers

  ✓  1 [firefox] › tests/ui/navigation/login.spec.ts:6:7 › Login Page › should render the login form (2.2s)
  ✓  2 [chromium] › tests/ui/navigation/login.spec.ts:6:7 › Login Page › should render the login form (1.8s)

  2 passed (3.3s)
```


## Extra Commands

- Run a single UI test: `npx playwright test login.spec.ts -g "should render the login form"`
- Run API tests only: `npx playwright test tests/api --project=api`