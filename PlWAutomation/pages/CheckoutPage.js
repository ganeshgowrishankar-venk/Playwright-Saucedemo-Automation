class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.summarySubtotal = page.getByTestId('subtotal-label');
    this.summaryTotal = page.getByTestId('total-label');
    this.shippingInformation = page.locator('.summary_info').getByText(/Delivery/);
    this.confirmationHeader = page.getByTestId('complete-header');
  }

  async fillCustomerDetails(customer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async getSubtotal() {
    const text = await this.summarySubtotal.innerText();
    return Number(text.replace('Item total: $', ''));
  }

  async getTotal() {
    const text = await this.summaryTotal.innerText();
    return Number(text.replace('Total: $', ''));
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
