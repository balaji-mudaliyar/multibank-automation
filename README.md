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

## What’s included

- UI and API test suites under `tests/`
- Page Object Model classes under `src/pages/`
- Reusable fixtures under `src/fixtures/`
- Test data under `data/`
- HTML and Playwright reports under `reports/` (including `reports/html/`)

## Notes

- Docker and Docker Compose write test artifacts to host folders using mounted volumes:

  - `reports/`
  - `test-results/`
  - `reports/html/`
- If a test is marked with `test.only`, CI will fail because `forbidOnly` is enabled when `CI=true`.

## CI

A GitHub Actions workflow is included at [.github/workflows/ci.yml](.github/workflows/ci.yml) to run tests, cache dependencies, and upload test artifacts and reports.

## Reporting

- Playwright HTML report is generated under `reports/html/`.
- Allure results are placed in `reports/allure-results/` (CI uploads these as artifacts).

## Extra Commands

- Run a single UI test: `npx playwright test tests/ui/login/login.spec.ts -g "should log in"`
- Run API tests only: `npx playwright test tests/api --project=api`
