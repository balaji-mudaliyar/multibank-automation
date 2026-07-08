import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  async get(url: string) {
    const response = await this.request.get(url);
    return response;
  }

  async getUsers(url: string) {
    return this.get(url);
  }

  async getRefdataConfig(url: string) {
    return this.get(url);
  }
}
