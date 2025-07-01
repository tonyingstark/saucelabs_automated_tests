import { test, expect} from '@playwright/test'
import { LoginPageHelper } from '../helpers/loginHelper';
import { InventoryPageHelper } from '../helpers/inventoryHelper';

test.describe('Inventory Page - Happy Path Test Cases', async() => {
    test.beforeEach(async ({page}) => {
        const loginHelper = new LoginPageHelper(page);

        await page.goto('/')
        await page.context().clearCookies();
        await page.context().clearPermissions();
        await page.reload();

        await loginHelper.fillUsernameField('standard_user')
        await loginHelper.fillPasswordField('secret_sauce')
        await loginHelper.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('Verify Successful Navigation to Inventory Page After Login', async({page}) => {
        //Ensure that the user is redirected to the /inventory.html page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        //Assert that the product list is visible
        const productListContainer = page.locator('[data-test="inventory-container"]')
        await expect(productListContainer).toBeVisible()
    })

    test('Verify All Product Items Are Displayed', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)

        //Ensure that the user is redirected to the /inventory.html page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        //Assert that there should be 6 product cards displayed. Each product shows name, description, price, and "Add to cart" button

        //Product 1
        await inventoryHelper.assertFirstProductDisplay()
       //Product 2
        await inventoryHelper.assertSecondProductDisplay()
       //Product 3
       await inventoryHelper.assertThirdProductDisplay()
       //Product 4
       await inventoryHelper.assertFourthProductDisplay()
       //Product 5
       await inventoryHelper.assertFifthProductDisplay()
       //Product 6
       await inventoryHelper.assertSixthProductDisplay()
    })

    
     test('Verify "Add to Cart" Button Functionality', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        
        //Click "Add to cart" button on any product
        await inventoryHelper.clickBackpackATCButton()

        //Ensure that the button changes to "Remove"
        await inventoryHelper.backPackRemoveButtonVisibility()

        //Verify that the cart icon badge increases to "1"
        await inventoryHelper.assertCartBadgeCount(1)

    })

     test('Remove Item from Cart on Inventory Page', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        
        //Click "Add to cart" button on any product
        await inventoryHelper.clickBackpackATCButton()

        //Ensure that the button changes to "Remove"
        await inventoryHelper.backPackRemoveButtonVisibility()

        //Verify that the cart icon badge increases to "1"
        await inventoryHelper.assertCartBadgeCount(1)


        await inventoryHelper.clickBackpackRemoveButton()
        await inventoryHelper.backpackAddToCartVisibility()
        await inventoryHelper.validateCartBadgeIconNotDisplayed()

    })

    test('Product Sorting Functionality', async({page}) => {
        // Select Z to A in the sort dropdown
        const sortDropdown = page.locator('[data-test="product-sort-container"]');
        await sortDropdown.selectOption('za');

        // Wait for the sorting to reflect in the DOM
        await page.waitForLoadState('networkidle');

        // Grab all product title elements in order
        const productTitles = page.locator('.inventory_item_name'); 

        const titles = await productTitles.allTextContents();

        // Create a sorted copy of the titles array from Z to A
        const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));

        // Assert the displayed order matches the sorted Z to A order
        expect(titles).toEqual(sortedTitles);

    })


     test('Cart Badge Updates Correctly', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        
        //Add 3 products to the cart
        await inventoryHelper.clickBackpackATCButton()
        await inventoryHelper.clickBikeLightATCButton()
        await inventoryHelper.clickBolTshirtATCButton()

        //Verify that the cart badge shows number "3"
        await inventoryHelper.assertCartBadgeCount(3)

    })

     test('Navigate to Product Details Page', async({page}) => {
        const inventoryHelper = new InventoryPageHelper(page)
        
        //Click on any product name
        const sauceLabsBackpackName = page.locator('[data-test="item-4-title-link"]')
        await sauceLabsBackpackName.click()

        //Verify that the user is redirected to inventory-item.html?id=X
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')

        //Return to the inventory page
        await page.goBack()

        //Click on any product image
        const sauceLabsBackpackImage = page.locator('[data-test="item-4-img-link"]')
        await sauceLabsBackpackImage.click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4')
    })
    

})

test.describe('Inventory Page - Negative Test Cases', async() => {
    test('Access Inventory Page Without Logging In', async({page}) => {
        const loginHelper = new LoginPageHelper(page);
        
        //Open https://www.saucedemo.com/inventory.html 
        await page.goto('https://www.saucedemo.com/inventory.html')

        //User is redirected back to the login page
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await loginHelper.validateInventoryAccessForLoggedInALert()
        
    })

    test('Verify all product images are visible and not broken', async ({ page }) => {
        const loginHelper = new LoginPageHelper(page);

        await page.goto('/');
        await loginHelper.fillUsernameField('standard_user');
        await loginHelper.fillPasswordField('secret_sauce');
        await loginHelper.clickLoginButton();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


        //Inspect each product item manually or via automation
        const imageLocators = page.locator('.inventory_item_img img'); // Selects all product <img> tags
        const imageCount = await imageLocators.count();

        for (let i = 0; i < imageCount; i++) {
            const img = imageLocators.nth(i);
            
            await expect(img, `Image ${i + 1} should be visible`).toBeVisible();

            const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
            
            expect(isLoaded, `Image ${i + 1} should be loaded correctly`).toBe(true);
        }
})


})
