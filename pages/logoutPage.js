class logoutPage
{
    constructor(page)
    {
        this.page = page;
        this.logout=page.locator('#logout2');
        this.loginMenu = page.locator('#login2');
    }

    async logoutClick()
    {
        await this.logout.click();
        return this;
    }

    logoutAssert()
    {
        return this.loginMenu;
    }
}
module.exports = {logoutPage};