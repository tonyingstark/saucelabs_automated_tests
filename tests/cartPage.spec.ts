import { test, expect} from '@playwright/test'
import { LoginPageHelper } from '../helpers/loginHelper'
import { InventoryPageHelper } from '../helpers/inventoryHelper'
import { CartPageHelper } from '../helpers/cartPageHelper'


test.describe('Cart Page - Happy Path Test Cases', async() => {
    test.beforeEach(async ({page}) => {
        const loginHelper = new LoginPageHelper(page);

        await page.goto('/')
        await page.context().clearCookies();
        await page.context().clearPermissions();
        await page.reload();
        await loginHelper.fillUsernameField('standard_user')
        await loginHelper.fillPasswordField('secret_sauce')
        await loginHelper.clickLoginButton()
    })

    test('Verify Navigation to Cart Page', async({page}) => {
        const cartHelper = new CartPageHelper(page)

        //Click the Cart icon in the top-right corner
        await cartHelper.navigateToCartPage()
        //Verify that the URL changes to /cart.html
        await expect(page).toHaveURL('/cart.html')
    })


    test('Verify Added Items Appear in Cart', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        const cartHelper = new CartPageHelper(page)

        //Add any product from Inventory page
        await inventoryHelper.clickBackpackATCButton()
        //Click Cart icon
        await cartHelper.navigateToCartPage()

        //Verify that the added product(s) are listed with correct name, quantity, and price
        const addedBackpackItem = {
            name: page.locator('[data-test="item-4-title-link"]'),
            description: page.locator('[data-test="inventory-item-desc"]'),
            price: page.locator('[data-test="inventory-item-price"]')
        }
        await expect(addedBackpackItem.name).toHaveText("Sauce Labs Backpack")
        await expect(addedBackpackItem.description).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")
        await expect(addedBackpackItem.price).toHaveText("$29.99")
    })

    test('Remove Item from Cart Page', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        const cartHelper = new CartPageHelper(page)

        //Add a product to cart
        await inventoryHelper.clickBackpackATCButton()
        //Go to cart page
        await cartHelper.navigateToCartPage()

        //Verify that the added product(s) are listed with correct name, quantity, and price
        const addedBackpackItem = {
            name: page.locator('[data-test="item-4-title-link"]'),
            description: page.locator('[data-test="inventory-item-desc"]'),
            price: page.locator('[data-test="inventory-item-price"]')
        }
        await expect(addedBackpackItem.name).toHaveText("Sauce Labs Backpack")
        await expect(addedBackpackItem.description).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")
        await expect(addedBackpackItem.price).toHaveText("$29.99")

        //Click “Remove” next to the item
        const itemRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]')
        await itemRemoveButton.click()

        //Ensure that the item is no longer displayed in the cart
        await expect(addedBackpackItem.name).not.toBeVisible()
        await expect(addedBackpackItem.description).not.toBeVisible()
        await expect(addedBackpackItem.price).not.toBeVisible()

    })

    test('Continue Shopping Button', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        const cartHelper = new CartPageHelper(page)
        await inventoryHelper.clickBackpackATCButton()
        
        //Go to cart page
        await cartHelper.navigateToCartPage()

        //Click "Continue Shopping"
        await cartHelper.clickContinueShoppingButton()

        //Assert that the user is redirected to /inventory.html
        await expect(page).toHaveURL('/inventory.html')
    })


    test('Proceed to Checkout', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        const cartHelper = new CartPageHelper(page)

        //Add a product to cart
        await inventoryHelper.clickBackpackATCButton()
        
        //Go to cart page
        await cartHelper.navigateToCartPage()

        //Click the “Checkout” button
        await cartHelper.clickCheckoutButton()

        //Assert that the user is redirected to /inventory.html
        await expect(page).toHaveURL('/checkout-step-one.html')
    })


    test('Verify Product Details (Name, Description, Price) in Cart', async ({ page }) => {
        const inventoryHelper = new InventoryPageHelper(page);
        const cartHelper = new CartPageHelper(page);

        // Get details of the product from the inventory page
        const inventoryFirstItem = {
            name: await page.locator('[data-test="item-4-title-link"]').innerText(),
            description: await page.getByText('carry.allTheThings() with the').innerText(),
            price: await page.getByText('$29.99').innerText()
        };

        // Add product to cart
        await inventoryHelper.clickBackpackATCButton();

        // Go to cart page
        await cartHelper.navigateToCartPage();

        // Get details of the product from the cart page
        const addedBackpackItem = {
            name: await page.locator('[data-test="item-4-title-link"]').innerText(),
            description: await page.locator('[data-test="inventory-item-desc"]').innerText(),
            price: await page.locator('[data-test="inventory-item-price"]').innerText()
        };

        // Assert that the product name, and price cart match what was shown on Inventory page
        await expect(addedBackpackItem.name).toBe(inventoryFirstItem.name);
        await expect(addedBackpackItem.description).toBe(inventoryFirstItem.description);
        await expect(addedBackpackItem.price).toBe(inventoryFirstItem.price);
    });



})


test.describe('Cart Page - Negative Test Cases', async() => {
    test('Cart Page with No Items', async({page}) => {
        const loginHelper = new LoginPageHelper(page);
        const cartHelper = new CartPageHelper(page)

        await page.goto('/')
        await page.context().clearCookies();
        await page.context().clearPermissions();
        await page.reload();
        await loginHelper.fillUsernameField('standard_user')
        await loginHelper.fillPasswordField('secret_sauce')
        await loginHelper.clickLoginButton()
        
        await cartHelper.navigateToCartPage()

        const inventoryItemOnCart = page.locator('[data-test="inventory-item"]')
        await expect(inventoryItemOnCart).not.toBeVisible()
    })

    test('Cart Should Not Be Accessible Without Login', async({page}) => {
        const loginHelper = new LoginPageHelper(page);

        
        await page.goto('/cart.html')

        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await loginHelper.validateCartAccessForLoggedInALert()

    })

})