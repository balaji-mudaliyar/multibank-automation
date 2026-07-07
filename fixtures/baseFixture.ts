import { test as base } from '@playwright/test';
import { ApiHelper } from '../utils/apiHelper';
import { Logger } from '../utils/logger';
import * as usersData from '../test-data/users.json';
import * as configData from '../test-data/config.json';

export const test = base.extend<{ apiHelper: ApiHelper; logger: Logger; testData: typeof usersData & typeof configData }>({
  apiHelper: async ({ request }, use) => {
    await use(new ApiHelper(request));
  },
  logger: async ({}, use) => {
    await use(new Logger());
  },
  testData: async ({}, use) => {
    await use({ ...usersData, ...configData });
  },
});

export { expect } from '@playwright/test';
