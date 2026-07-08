# Multibank Automation

<!-- Badges: replace OWNER/REPO with your GitHub repository -->
![CI](https://github.com/balaji-mudaliyar/multibank-automation/actions/workflows/ci.yml/badge.svg?branch=main)
![node](https://img.shields.io/badge/node-18%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

This repository contains automated UI and API tests for the MultiBank website, built with Playwright. The framework uses the Page Object Model (POM), reusable fixtures, and integrated reporting.

Key folders

- `tests/` — UI and API test suites.
- `src/pages/` — Page Object classes.
- `src/fixtures/` — Playwright fixtures and test setup.
- `src/utils/` — Helpers (`apiHelper.ts`, `waitHelper.ts`, `logger.ts`).
- `data/` — JSON test data.
- `reports/` — HTML reports and artifacts.
- `playwright-report/` — Playwright HTML report output.

## Quick Start

### 1. Run with Docker

This is the easiest way to run the project locally and is the best option for an interviewer.

1. Run all tests:

```bash
./scripts/tests.sh test
```

2. Run a single test file:

```bash
./scripts/tests.sh spec tests/ui/navigation/home.spec.ts
```

3. Pass extra Playwright flags if needed:

```bash
./scripts/tests.sh spec tests/ui/navigation/home.spec.ts -- --project=chromium -g "invalid route"
```

4. Use Docker Compose instead of `docker run`:

```bash
./scripts/tests.sh test --compose
```

5. Override the base URL if needed:

```bash
BASE_URL=https://mb.io/en-AE ./scripts/tests.sh test
```

If you prefer Docker commands directly:

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

## What’s included

- UI and API test suites under `tests/`
- Page Object Model classes under `src/pages/`
- Reusable fixtures under `src/fixtures/`
- Test data under `data/`
- HTML and Playwright reports under `reports/` and `playwright-report/`

## Notes

- Docker and Docker Compose write artifacts to host folders via mounts:

  - `reports/`
  - `test-results/`
  - `playwright-report/`

- If a test is marked with `test.only`, CI runs fail because `forbidOnly` is enabled when `CI=true`.

## CI

A GitHub Actions workflow is included at [.github/workflows/ci.yml](.github/workflows/ci.yml) to run tests, cache dependencies, and upload test artifacts and reports.

## Reporting

- Playwright HTML report is generated under `playwright-report/`.
- Allure results are placed in `reports/allure-results/` (CI uploads these as artifacts).

## Extra Commands

- Run a single UI test: `npx playwright test tests/ui/login/login.spec.ts -g "should log in"`
- Run API tests only: `npx playwright test tests/api --project=api`
