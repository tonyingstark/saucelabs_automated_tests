import { test, expect} from '@playwright/test'
import { LoginPageHelper } from '../helpers/loginHelper';


test.describe('Login - Happy Path Test Cases', async() => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
        await page.context().clearCookies();
        await page.context().clearPermissions();
        await page.reload();
    })

    test('Login with Valid Standard User Credentials', async({page}) => {
        const loginHelper = new LoginPageHelper(page);

        //Fill in the valid username and password then click the the Login button
        await loginHelper.fillUsernameField('standard_user')
        await loginHelper.fillPasswordField('secret_sauce')
        await loginHelper.clickLoginButton()

        //Ensure that the user is redirected to the /inventory.html page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('Check Page Title on Load', async({page}) => {
       //Verify that the page title in the browser tab should be "Swag Labs"
        await expect(page).toHaveTitle('Swag Labs')
    })


})

test.describe('Login - Negative Test Cases', async() => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
        await page.context().clearCookies();
        await page.context().clearPermissions();
        await page.reload();
    })

    test('Login with Invalid Password', async({page}) => {
        const loginHelper = new LoginPageHelper(page);

        //Enter standard_user in the username field
        await loginHelper.fillUsernameField('standard_user')
        //Enter wrong_password in the password field
        await loginHelper.fillPasswordField('wrong_password')
        //Click the Login button
        await loginHelper.clickLoginButton()

        // Verify that the error message: "Epic sadface: Username and password do not match any user in this service" is shown
        await loginHelper.verifyInvalidPassword()

    })

     test('Login with Blank Username and Password', async({page}) => {
        const loginHelper = new LoginPageHelper(page);

        //Leave both username and password fields empty then click the Login button
        await loginHelper.clickLoginButton()

        //Assert that error message: "Epic sadface: Username is required" is displayed
        await loginHelper.verifyUsernameRequiredAlert()
    })

    test('Login with Username Only', async({page}) => {
        const loginHelper = new LoginPageHelper(page);

        //Enter standard_user in the username field, and leave password field empty
        await loginHelper.fillUsernameField('standard_user')
        await loginHelper.clickLoginButton()//Click the Login button

        await loginHelper.verifyPasswordRequiredAlert()
    })

    test('Login with Password Only', async({page}) => {
        const loginHelper = new LoginPageHelper(page);

        //Leave username field empty and enter secret_sauce in the password field
        await loginHelper.fillPasswordField('secret_sauce')
        await loginHelper.clickLoginButton()//Click the Login button

        await loginHelper.verifyUsernameRequiredAlert()

    })

    test('Login with Locked Out User', async({page}) => {
        const loginHelper = new LoginPageHelper(page);

        //Leave username field empty and enter secret_sauce in the password field
        await loginHelper.fillUsernameField('locked_out_user')
        await loginHelper.fillPasswordField('secret_sauce')
        await loginHelper.clickLoginButton()//Click the Login button

        await loginHelper.validateLockedOutErrorAlert()
    })

})