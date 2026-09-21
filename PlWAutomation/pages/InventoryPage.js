class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  item(itemId) {
    return this.page.getByTestId(`add-to-cart-${itemId}`);
  }

  async expectLoaded() {
    await this.inventoryContainer.waitFor();
  }

  async addItem(itemId) {
    await this.item(itemId).click();
  }

  async addItems(itemIds) {
    for (const itemId of itemIds) {
      await this.addItem(itemId);
    }
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCartCount() {
    return Number(await this.cartBadge.innerText());
  }
}

module.exports = { InventoryPage };
