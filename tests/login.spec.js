const { test, expect }=require('../commonUtils/demoFixture');
const credentials = require('../testData/credentials.json');
const {loginPage} = require('../pages/loginPage');

// test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.demoblaze.com/');
// });

test('Login with valid credentials', async ({ page }) => {
    const login = new loginPage(page);
    await login.login(credentials.validuser, credentials.validpassword);
    await page.waitForTimeout(3000);
    await expect(login.userAssert()).toContainText(credentials.validuser);
});

test('Login with invalid user and valid password', async ({ page }) => {
    const login = new loginPage(page);
    await login.login(credentials.invaliduser, credentials.validpassword);
    page.on('Invalid password', async dialog => {
            expect(dialog.message()).toContain(invalidpass);
            await dialog.accept();
        });
});

test('Login with valid user and invalid password', async ({ page }) => {
    const login = new loginPage(page);
    await login.login(credentials.validuser, credentials.invalidpassword);
    page.on('Invalid password', async dialog => {
            expect(dialog.message()).toContain(invalidpass);
            await dialog.accept();
        });
});

test('Login with invalid user and invalid password', async ({ page }) => {
    const login = new loginPage(page);
    await login.login(credentials.invaliduser, credentials.invalidpassword);
    page.on('Invalid password', async dialog => {
            expect(dialog.message()).toContain(invalidpass);
            await dialog.accept();
        });
});

