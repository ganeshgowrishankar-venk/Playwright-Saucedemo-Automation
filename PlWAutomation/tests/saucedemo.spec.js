const { test, expect } = require('../fixtures/testFixtures');
const users = require('../data/users');
const { cartItems } = require('../data/products');
const checkoutData = require('../data/checkoutData');

test.describe('Sauce Demo login', () => {
  test('standard user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });

  test('locked out user cannot log in', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.loginAs(users.lockedOut);
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  for (const user of [users.problem, users.performanceGlitch, users.error]) {
    test(`${user.username} can authenticate for variant-user coverage`, async ({ loginPage, inventoryPage }) => {
      await loginPage.open();
      await loginPage.loginAs(user);
      await inventoryPage.expectLoaded();
      await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
  }
});

test.describe('Sauce Demo purchase workflow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectLoaded();
  });

  test('adds three items, removes one, and verifies the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItems(cartItems);
    await expect(inventoryPage.cartBadge).toHaveText('3');

    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(3);

    await cartPage.removeItem(cartItems[1]);
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.itemRow(cartItems[1])).toHaveCount(0);
  });

  test('checks out remaining items and validates totals and confirmation', async ({ inventoryPage, cartPage, checkoutPage }) => {
    const remainingItems = [cartItems[0], cartItems[2]];
    await inventoryPage.addItems(cartItems);
    await inventoryPage.openCart();
    await cartPage.removeItem(cartItems[1]);
    await expect(cartPage.cartItems).toHaveCount(2);

    const itemPrices = await cartPage.getItemPrices(remainingItems);
    const expectedSubtotal = itemPrices.reduce((sum, price) => sum + price, 0);
    await cartPage.checkout();
    await checkoutPage.fillCustomerDetails(checkoutData.customer);
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.shippingInformation).toHaveText(checkoutData.expectedShippingInformation);
    await expect(checkoutPage.summarySubtotal).toContainText(expectedSubtotal.toFixed(2));

    const actualSubtotal = await checkoutPage.getSubtotal();
    const actualTotal = await checkoutPage.getTotal();
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(actualTotal).toBeGreaterThan(actualSubtotal);

    await checkoutPage.finishOrder();
    await expect(checkoutPage.confirmationHeader).toHaveText(checkoutData.expectedConfirmation);
  });
});
