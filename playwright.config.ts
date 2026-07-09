import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['allure-playwright'], ['html', { outputFolder: 'reports/html', open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://mb.io/en-AE',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // 1. Dedicated API Project (Runs once, no browser launched)
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/, 
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /.*\.api\.spec\.ts/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: /.*\.api\.spec\.ts/,
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  outputDir: 'test-results/',
  snapshotPathTemplate: path.join('snapshots', '{testFilePath}', '{arg}{ext}'),
});
