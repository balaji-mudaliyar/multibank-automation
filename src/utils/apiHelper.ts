import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  async getUsers(url: string) {
    const response = await this.request.get(url);
    return response;
  }
}
