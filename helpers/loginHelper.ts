import { Page, expect } from '@playwright/test';

export class LoginPageHelper {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillUsernameField(username:string) {
        await this.page.locator('[data-test="username"]').fill(username)
    }

    async fillPasswordField(password:string) {
        await this.page.locator('[data-test="password"]').fill(password)
    }

    async clickLoginButton(){
        await this.page.locator('[data-test="login-button"]').click()
    }

    async verifyInvalidPassword() {
        const invalidPasswordAlert = this.page.locator('[data-test="error"]')
        await expect(invalidPasswordAlert).toHaveText('Epic sadface: Username and password do not match any user in this service')
    }

    async verifyUsernameRequiredAlert() {
        const usernameRequiredAlert = this.page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ })
        await expect(usernameRequiredAlert).toHaveText('Epic sadface: Username is required')
    }

    async verifyPasswordRequiredAlert() {
        const passwordRequiredAlert = this.page.locator('div').filter({ hasText: /^Epic sadface: Password is required$/ })
       await expect(passwordRequiredAlert).toHaveText('Epic sadface: Password is required')
    }

    async validateLockedOutErrorAlert() {
        const lockedOutErrorAlert = this.page.locator('div').filter({ hasText: /^Epic sadface: Sorry, this user has been locked out\.$/ })
        await expect(lockedOutErrorAlert).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    }

    async validateInventoryAccessForLoggedInALert() {
        const inventoryAccessForLoggedInAlert = this.page.locator('div').filter({ hasText: /^Epic sadface: You can only access '\/inventory\.html' when you are logged in\.$/ })
        await expect(inventoryAccessForLoggedInAlert).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.")
    }
}