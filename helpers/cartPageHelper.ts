import { Page, expect } from '@playwright/test';

export class CartPageHelper {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCartPage() {
        const cartIcon = this.page.locator('[data-test="shopping-cart-link"]')
        await cartIcon.click()
    }

    async clickContinueShoppingButton() {
        const continueShoppingButton = this.page.locator('[data-test="continue-shopping"]')
        await continueShoppingButton.click()
    }

    async clickCheckoutButton() {
        const checkoutButton = this.page.locator('[data-test="checkout"]')
        await checkoutButton.click()
    }
}