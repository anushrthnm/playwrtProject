const { test, expect }=require('../commonUtils/demoFixture');
const credentials = require('../testData/credentials.json');
const wording = require('../testData/wordings.json');
const user = require('../testData/userData.json');
// let browser;
// let context;
// let page;

// test.beforeAll(async () => {
//     browser = await chromium.launch();
//     context = await browser.newContext();
//     page = await context.newPage();
//     await page.goto('https://www.demoblaze.com/');
// });
// test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.demoblaze.com/');
// });

// test.afterAll(async ({ page }) => {
//     await page.close();
// });

test('Sign Up', async ({ page }) => {
    await page.locator('#signin2').click();
    await page.locator('#sign-username').fill(credentials.validuser);
    await page.locator('#sign-password').fill(credentials.validpassword);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForTimeout(2000); // Wait for the alert to appear
    await page.on('Sign up successful.', dialog => dialog.accept());
});

test('Sign Up and Close', async ({ page }) => {
    await page.locator('#signin2').click();
    await page.locator('#sign-username').fill(credentials.validuser);
    await page.locator('#sign-password').fill(credentials.validpassword);
    await page.getByRole('button', { name: 'Close' }).nth(1).click();
});

test('Login with valid credentials', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.validuser);
    await page.locator('#loginpassword').fill(credentials.validpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    await expect(page.locator('#nameofuser')).toContainText(credentials.validuser);
});

test('Login with invalid user and valid password', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.invaliduser);
    await page.locator('#loginpassword').fill(credentials.validpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    page.on('Invalid username', async dialog => {
        expect(dialog.message()).toContain(wording.invalidpass);
        await dialog.accept();
    });
});

test('Login with valid user and invalid password', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.validuser);
    await page.locator('#loginpassword').fill(credentials.invalidpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    page.on('Invalid password', async dialog => {
        expect(dialog.message()).toContain(wording.invalidpass);
        await dialog.accept();
    });
});

test('Login with invalid user and invalid password', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.invaliduser);
    await page.locator('#loginpassword').fill(credentials.invalidpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    page.on('Invalid username and password', async dialog => {
        expect(dialog.message()).toContain(wording.invalidpass);
        await dialog.accept();
    });
});

test('Login with valid credentials and Add to Cart', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.validuser);
    await page.locator('#loginpassword').fill(credentials.validpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    await expect(page.locator('#nameofuser')).toContainText(credentials.validuser);
    const productLink = page.getByRole('link', { name: wording.product1 });
    await productLink.scrollIntoViewIfNeeded();
    await productLink.click();
    await page.waitForTimeout(3000);
    page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain(wording.addtocart);
        await dialog.accept();
    });
});

test('Login with valid credentials,select product under phones and buy', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.validuser);
    await page.locator('#loginpassword').fill(credentials.validpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    await expect(page.locator('#nameofuser')).toContainText(credentials.validuser);
    await page.getByRole('link', { name:  wording.phoneCategory }).click();

    const productLink = page.getByRole('link', { name: wording.product1 });
    await productLink.scrollIntoViewIfNeeded();
    await productLink.click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain(wording.addtocart);
        await dialog.accept();
    });
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByRole('textbox', { name: 'Name:' }).fill(user.Name);
    await page.getByRole('textbox', { name: 'Country:' }).fill(user.Country);
    await page.getByRole('textbox', { name: 'City:' }).fill(user.City);
    await page.getByRole('textbox', { name: 'Credit card:' }).fill(user.Creditcard);
    await page.getByRole('textbox', { name: 'Month:' }).fill(user.Month);
    await page.getByRole('textbox', { name: 'Year:' }).fill(user.Year);
    await page.locator('div.modal-footer button[onclick="purchaseOrder()"]').click();
    await page.locator('div.sa-confirm-button-container button').click();
    await expect(page.getByRole('heading', {
        name: 'Thank you for your purchase!'})).toBeVisible();
});

test('Login with valid credentials,select product under monitors and buy', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.validuser);
    await page.locator('#loginpassword').fill(credentials.validpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    await expect(page.locator('#nameofuser')).toContainText(credentials.validuser);
    await page.getByRole('link', { name:  wording.monitorCategory }).click();

    const productLink = page.getByRole('link', { name: wording.product2 });
    await productLink.scrollIntoViewIfNeeded();
    await productLink.click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain(wording.addtocart);
        await dialog.accept();
    });
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByRole('textbox', { name: 'Name:' }).fill(user.Name);
    await page.getByRole('textbox', { name: 'Country:' }).fill(user.Country);
    await page.getByRole('textbox', { name: 'City:' }).fill(user.City);
    await page.getByRole('textbox', { name: 'Credit card:' }).fill(user.Creditcard);
    await page.getByRole('textbox', { name: 'Month:' }).fill(user.Month);
    await page.getByRole('textbox', { name: 'Year:' }).fill(user.Year);
    await page.locator('div.modal-footer button[onclick="purchaseOrder()"]').click();
    await page.locator('div.sa-confirm-button-container button').click();
    await expect(page.getByRole('heading', {
        name: 'Thank you for your purchase!'})).toBeVisible();
});

test('Login with valid credentials and logout', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(credentials.validuser);
    await page.locator('#loginpassword').fill(credentials.validpassword);
    const loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]')
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    await expect(page.locator('#nameofuser')).toContainText(credentials.validuser);
    await page.locator('#logout2').click();
    await expect(page.locator('#login2')).toBeVisible();
});