class CartPage {
  elements = {
    cartContainer: () => cy.get('#cart_info'),
    cartTable: () => cy.get('#cart_info_table'),
    proceedToCheckoutBtn: () => cy.contains('a', 'Proceed To Checkout')
  };

  verifyCartPageVisible() {
    cy.url().should('include', '/view_cart');
    this.elements.cartContainer().should('be.visible');
    return this;
  }

  clickProceedToCheckout() {
    this.elements.proceedToCheckoutBtn().click();
  }
}

export default new CartPage();

