---
applyTo: "src/pages/**/*.ts"
---

# Writing Page Objects

## Class Structure
- All page classes **must extend `BasePage`**
- Place classes in `src/pages/` under the correct sub-folder: `navigation/`, `content/`, `trading/`
- File name: `<PageName>Page.ts` (e.g. `LoginPage.ts`)
- Export the class as the default and from the folder's `index.ts`

```ts
import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
```

## Locators
- Declare locators as **private `readonly` class properties** — never in methods
- Use semantic Playwright queries in this priority order:
  1. `getByRole()` — preferred for interactive elements
  2. `getByLabel()` — for form fields
  3. `getByPlaceholder()` — for inputs without labels
  4. `getByText()` — for static content
  5. `getByTestId()` — only if a `data-testid` exists
  6. `locator('css')` — last resort only

```ts
private readonly emailInput = this.page.getByLabel('Email');
private readonly passwordInput = this.page.getByPlaceholder('Password');
private readonly submitButton = this.page.getByRole('button', { name: 'Log in' });
private readonly errorMessage = this.page.getByText('Invalid credentials');
```

## Methods
- **Action methods**: perform user interactions, return `Promise<void>`
  ```ts
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  ```
- **Assertion methods**: named with `expect` prefix, use Playwright `expect()` internally
  ```ts
  async expectErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
  ```
- Never put `expect()` assertions in action methods
- Never put interaction logic in assertion methods

## Navigation
Use the inherited `open(path)` method from `BasePage` to navigate:
```ts
await loginPage.open('/login');
```

## Forbidden Patterns
- No `page.locator('...')` strings in test files — encapsulate all locators here
- No raw `page.$()` or `page.$$()` calls
- No assertions in action methods
- No page classes that don't extend `BasePage`
- No `any` types — TypeScript strict mode is enforced
