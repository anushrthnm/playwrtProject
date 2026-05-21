const {test:base,expect } = require('@playwright/test');


exports.test=base.test.extend(
{
    page: async ({ page }, use) => 
      {
        await page.goto('https://www.demoblaze.com/');
        await use(page);
    }
});

exports.expect = expect;