const { test, expect }=require('../commonUtils/demoFixture');
const credentials = require('../testData/credentials.json');
const wording = require('../testData/wordings.json');
const userInfo = require('../testData/userData.json');
const {loginPage} = require('../pages/loginPage');
const {placeOrderPage} = require('../pages/placeOrderPage');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
});

test('Login with valid credentials and Add to Cart', async ({ page }) => {
    const login = new loginPage(page);
    const placeOrder = new placeOrderPage(page, userInfo);
    await login.login(credentials.validuser, credentials.validpassword);
    await expect(login.userAssert()).toContainText(credentials.validuser);
    await placeOrder.addtoCart(wording.product1);
    await page.waitForTimeout(3000);
    page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain(wording.addtocart);
        await dialog.accept();
    });
});

test('Login with valid credentials,select product under phones and buy', async ({ page }) => {
    const login = new loginPage(page);
    const placeOrder = new placeOrderPage(page, userInfo);
    await login.login(credentials.validuser, credentials.validpassword);
     await expect(login.userAssert()).toContainText(credentials.validuser);
    await placeOrder.getRoleLink(wording.phoneCategory);
    await placeOrder.addtoCart(wording.product1);

    page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain(wording.addtocart);
        await dialog.accept();
    });
    await placeOrder.addressDetails();
    await expect(page.getByRole('heading', {
        name:wording.orderPlaced})).toBeVisible();
});

test('Login with valid credentials,select product under monitors and buy', async ({ page }) => {
    
    const login = new loginPage(page);
    const placeOrder = new placeOrderPage(page, userInfo);
    await login.login(credentials.validuser, credentials.validpassword);
    await expect(login.userAssert()).toContainText(credentials.validuser);

    await placeOrder.getRoleLink(wording.monitorCategory);

    await placeOrder.addtoCart(wording.product2);

    page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain(wording.addtocart);
        await dialog.accept();
    });
    await placeOrder.addressDetails();
    await expect(page.getByRole('heading', {
        name:wording.orderPlaced})).toBeVisible();
});