import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  // GET Method
  async get(url: string) {
    const response = await this.request.get(url);
    return response;
  }

  // POST Method
  async post(url: string, body: Record<string, unknown>, headers?: Record<string, string>) {
    const response = await this.request.post(url, {
      data: body,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    return response;
  }

  // API's
  async getUsers(url: string) {
    return this.get(url);
  }

  async getRefdataConfig(url: string) {
    return this.get(url);
  }
}
