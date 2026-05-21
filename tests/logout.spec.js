const { test, expect }=require('../commonUtils/demoFixture');
const credentials = require('../testData/credentials.json');
const {loginPage} = require('../pages/loginPage');
const {logoutPage} = require('../pages/logoutPage');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
});

test('Login with valid credentials and Add to Cart', async ({ page }) => {
    const login = new loginPage(page);
    const logout = new logoutPage(page);
    await login.login(credentials.validuser, credentials.validpassword);
    await logout.logoutClick();
    await expect(logout.logoutAssert()).toBeVisible();
});