class signupPage {
    constructor(page) {
        this.page = page;
        this.signuplink= page.locator('#signin2');
        this.signup = page.getByRole('button', { name: 'Sign up' });
        this.close = page.getByRole('button', { name: 'Close' }).nth(1);
        this.signupUsername = page.locator('#sign-username');
        this.signupPassword = page.locator('#sign-password');
    }

    async clickSignup() {
        await this.signuplink.click();
        return this;
    }

    async enterCred(username, password)
    {
        await this.signupUsername.fill(username);
        await this.signupPassword.fill(password);
        return this;
    }

    async signupUser() {
        await this.signup.click();
        await this.page.waitForTimeout(2000);
        return this;
    }

    async signupAndClose() {
        await this.close.click();
        return this;
    }
}
module.exports = { signupPage };