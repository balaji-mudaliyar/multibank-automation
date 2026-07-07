import { Page, expect } from '@playwright/test';
import { URLs } from '../constants/urls';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(URLs.login);
  }

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: ' Login' }).click();
  }

  async expectLoginFormVisible() {
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  }
}
