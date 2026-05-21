class placeOrderPage {
    constructor(page,data) {
        this.page = page;
        this.data = data;
        this.purchase=page.locator('div.modal-footer button[onclick="purchaseOrder()"]');
        this.orderConfirm= page.locator('div.sa-confirm-button-container button');
    }

    async getRoleLink(linkname)
    {
        await this.page.getByRole('link', { name: linkname }).click();
        return this;
    }

    async addtoCart(prodname) 
    {
        const productLink = this.page.getByRole('link', { name: prodname });
        await productLink.scrollIntoViewIfNeeded();
        await productLink.click();
        return this;
    }

    async addressDetails() 
    {
        await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
        await this.page.getByRole('button', { name: 'Place Order' }).click();
        await this.page.getByRole('textbox', { name: 'Name:' }).fill(this.data.Name);
        await this.page.getByRole('textbox', { name: 'Country:' }).fill(this.data.Country);
        await this.page.getByRole('textbox', { name: 'City:' }).fill(this.data.City);
        await this.page.getByRole('textbox', { name: 'Credit card:' }).fill(this.data.Creditcard);
        await this.page.getByRole('textbox', { name: 'Month:' }).fill(this.data.Month);
        await this.page.getByRole('textbox', { name: 'Year:' }).fill(this.data.Year);

        await this.purchase.click();
        await this.orderConfirm.click();
        return this;
    }
}
module.exports = { placeOrderPage };