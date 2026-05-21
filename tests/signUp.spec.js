const { test, expect }=require('../commonUtils/demoFixture');
const credentials = require('../testData/credentials.json');
const { signupPage } = require('../pages/signupPage');

// test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.demoblaze.com/');
// });

test('Sign Up', async ({ page }) => 
{
    const signup = new signupPage(page);
    await signup.clickSignup();
    await signup.enterCred(credentials.validuser, credentials.validpassword);
    await page.on('Sign up successful.', dialog => dialog.accept()); 
    await signup.signupUser();   
});

test('Sign Up and Close', async ({ page }) => 
{
    const signup = new signupPage(page);
    await signup.clickSignup();
    await signup.enterCred(credentials.validuser, credentials.validpassword);
    await signup.signupAndClose();
});