import { test as base } from '@playwright/test';
import { ApiHelper } from '../utils/apiHelper';
import { Logger } from '../utils/logger';
import * as usersData from '../../data/users.json';

export const test = base.extend<{ apiHelper: ApiHelper; logger: Logger; testData: typeof usersData }>({
  apiHelper: async ({ request }, use) => {
    await use(new ApiHelper(request));
  },
  logger: async ({}, use) => {
    await use(new Logger());
  },
  testData: async ({}, use) => {
    await use(usersData);
  },
});

export { expect } from '@playwright/test';
