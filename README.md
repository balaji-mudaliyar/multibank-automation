# Multibank Automation

This repo contains automation tests for multibank website flows and the tests use playwright framework

<!-- Badges: replace OWNER/REPO with your GitHub repository -->
![CI](https://github.com/balaji-mudaliyar/multibank-automation/actions/workflows/ci.yml/badge.svg?branch=main)
![node](https://img.shields.io/badge/node-18%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![license](https://img.shields.io/badge/license-ISC-blue)

Scalable Playwright automation framework used for UI and API tests. This repo is organized with a Page Object pattern, reusable fixtures, and reporting configured.

Key folders

- `tests/` — UI and API test suites.
- `pages/` — Page Object classes.
- `fixtures/` — Playwright fixtures and test setup.
- `utils/` — Helpers (`apiHelper.ts`, `waitHelper.ts`, `logger.ts`).
- `reports/` — Allure and HTML reports.
- `playwright-report/` — Playwright HTML report output.
- `test-data/` — JSON / markdown test data and seeds.

Prerequisites

- Node.js 18+ and npm
- Playwright browsers (install via `npx playwright install`)

Quick setup

```bash
npm ci
npx playwright install --with-deps
```

Run tests

- Run all tests: `npm test`
- Run headed (visual) tests: `npm run test:headed`
- Show HTML report (Playwright): `npm run test:report`

CI

A GitHub Actions workflow is included at [.github/workflows/ci.yml](.github/workflows/ci.yml) to run tests, cache dependencies, and upload test artifacts and reports.

Reporting

- Playwright HTML report is generated under `playwright-report/`.
- Allure results are placed in `reports/allure-results/` (CI uploads these as artifacts).

Other Commands

- Run a single UI test: `npx playwright test tests/ui/login/login.spec.ts -g "should log in"`
- Run API tests only: `npx playwright test tests/api --project=api`
