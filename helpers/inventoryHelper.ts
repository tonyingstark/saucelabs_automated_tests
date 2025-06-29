import { Locator, Page, expect } from '@playwright/test';

export class InventoryPageHelper {
    private readonly page: Page;
    private readonly backpackAddToCartButton: Locator;
    private readonly backpackRemoveButton: Locator;
    private readonly cartIconBadge: Locator;
    private readonly bikeLightAddToCartButton: Locator;
    private readonly boltTshirtAddToCartButton: Locator;


    constructor(page: Page) {
        this.page = page,
        this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.cartIconBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.bikeLightAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.boltTshirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')

    }


    async assertFirstProductDisplay() {
        const productBackpack = {
        itemName:  this.page.locator('[data-test="item-4-title-link"]'),
        description: this.page.getByText('carry.allTheThings() with the'),
        price: this.page.getByText('$29.99'),
        addToCartButton: this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
       }
       await expect(productBackpack.itemName).toHaveText('Sauce Labs Backpack')
       await expect(productBackpack.description).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
       await expect(productBackpack.price).toHaveText('$29.99')
       await expect(productBackpack.addToCartButton).toBeVisible()
    }

    async assertSecondProductDisplay() {
        const productBikeLight = {
        itemName:  this.page.locator('[data-test="item-0-title-link"]'),
        description: this.page.getByText('A red light isn\'t the desired'),
        price: this.page.getByText('$9.99'),
        addToCartButton: this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
       }
       await expect(productBikeLight.itemName).toHaveText('Sauce Labs Bike Light')
       await expect(productBikeLight.description).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.")
       await expect(productBikeLight.price).toHaveText('$9.99')
       await expect(productBikeLight.addToCartButton).toBeVisible()
    }

    async assertThirdProductDisplay() {
        const productBoltTshirt = {
        itemName:  this.page.locator('[data-test="item-1-title-link"]'),
        description: this.page.getByText('Get your testing superhero on'),
        price: this.page.getByText('$15.99').first(),
        addToCartButton: this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
       }
       await expect(productBoltTshirt.itemName).toHaveText('Sauce Labs Bolt T-Shirt')
       await expect(productBoltTshirt.description).toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.")
       await expect(productBoltTshirt.price).toHaveText('$15.99')
       await expect(productBoltTshirt.addToCartButton).toBeVisible()

    }

    async assertFourthProductDisplay() {
        const productFleeceJacket = {
        itemName:  this.page.locator('[data-test="item-5-title-link"]'),
        description: this.page.getByText('It\'s not every day that you'),
        price: this.page.getByText('$49.99'),
        addToCartButton: this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
       }
       await expect(productFleeceJacket.itemName).toHaveText('Sauce Labs Fleece Jacket')
       await expect(productFleeceJacket.description).toHaveText("It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.")
       await expect(productFleeceJacket.price).toHaveText('$49.99')
       await expect(productFleeceJacket.addToCartButton).toBeVisible()

    }

    async assertFifthProductDisplay() {
        const productOnesie = {
        itemName:  this.page.locator('[data-test="item-2-title-link"]'),
        description: this.page.getByText('Rib snap infant onesie for'),
        price: this.page.getByText('$7.99'),
        addToCartButton: this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]')
       }
       await expect(productOnesie.itemName).toHaveText('Sauce Labs Onesie')
       await expect(productOnesie.description).toHaveText("Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.")
       await expect(productOnesie.price).toHaveText('$7.99')
       await expect(productOnesie.addToCartButton).toBeVisible()

    }

    async assertSixthProductDisplay() {
        const productRedTshirt = {
        itemName:  this.page.locator('[data-test="item-3-title-link"]'),
        description: this.page.getByText('This classic Sauce Labs t-'),
        price: this.page.getByText('$15.99').nth(1),
        addToCartButton: this.page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
       }
       await expect(productRedTshirt.itemName).toHaveText('Test.allTheThings() T-Shirt (Red)')
       await expect(productRedTshirt.description).toHaveText("This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.")
       await expect(productRedTshirt.price).toHaveText('$15.99')
       await expect(productRedTshirt.addToCartButton).toBeVisible()

    }

    async clickBackpackATCButton() {
        await this.backpackAddToCartButton.click()

    }

    async clickBikeLightATCButton() {
        await this.bikeLightAddToCartButton.click()
    }

    async clickBolTshirtATCButton() {
        await this.boltTshirtAddToCartButton.click()
    }


    async backpackAddToCartVisibility() {
        await expect(this.backpackAddToCartButton).toBeVisible()
    }

    async backPackRemoveButtonVisibility() {
        await expect(this.backpackRemoveButton).toBeVisible()
    }

    async clickBackpackRemoveButton () {
        await this.backpackRemoveButton.click()
    }

    async assertCartBadgeCount(count: number) {
        await expect(this.cartIconBadge).toHaveText(count.toString())
    }

    async validateCartBadgeIconNotDisplayed() {
        await expect(this.cartIconBadge).not.toBeVisible()
    }

}