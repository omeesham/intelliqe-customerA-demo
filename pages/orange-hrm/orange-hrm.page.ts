import { BasePage } from '../base.page';
import { Locator, expect } from '@playwright/test';

export class OrangeHRMPage extends BasePage {
  readonly usernameInput: Locator = this.page.locator('input[name="username"]');
  readonly passwordInput: Locator = this.page.locator('input[name="password"]');
  readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

  async login(username: string, password: string): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginUrl = this.page.url();
    await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL((u) => u.toString() !== loginUrl, { timeout: 30000 });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}