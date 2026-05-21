
const { expect } = require("@playwright/test");

class loginPage {
    constructor(page) {
        this.page = page;
        this.loginMenu = page.locator('#login2')
        this.username = page.locator('#loginusername');
        this.password = page.locator('#loginpassword');
        this.signup = page.getByRole('button', { name: 'Sign up' });
        this.close = page.getByRole('button', { name: 'Close' }).nth(1);
        this.loginBtn = page.locator('div.modal-footer button[onclick="logIn()"]');
        this.userHeader = page.locator('#nameofuser');
    }

    async login(username, password) {
        await this.loginMenu.click();
        await this.username.fill(username);
        await this.password.fill(password);
        await expect(this.loginBtn).toBeVisible();
        await expect(this.loginBtn).toBeEnabled();
        await this.loginBtn.click();
        return this;
    }

    userAssert() {
        return this.userHeader;
    }

}
module.exports = { loginPage };