class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  item(itemId) {
    return this.page.getByTestId(`remove-${itemId}`);
  }

  itemRow(itemId) {
    return this.page.locator(`[data-test="inventory-item"]:has([data-test="remove-${itemId}"])`);
  }

  itemPrice(itemId) {
    return this.itemRow(itemId).getByTestId('inventory-item-price');
  }

  async removeItem(itemId) {
    await this.item(itemId).click();
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async getItemPrices(itemIds) {
    const prices = [];
    for (const itemId of itemIds) {
      const priceText = await this.itemPrice(itemId).innerText();
      prices.push(Number(priceText.replace('$', '')));
    }
    return prices;
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
