class CheckoutPage {
  elements = {
    deliveryAddress: () => cy.get('#address_delivery'),
    invoiceAddress: () => cy.get('#address_invoice'),
    reviewOrderSection: () => cy.get('#cart_info'),
    commentTextArea: () => cy.get('textarea[name="message"]'),
    placeOrderBtn: () => cy.get('a[href="/payment"]')
  };

  verifyCheckoutPageVisible() {
    cy.url().should('include', '/checkout');
    return this;
  }

  verifyAddressDetailsVisible() {
    this.elements.deliveryAddress().should('be.visible');
    this.elements.invoiceAddress().should('be.visible');
    return this;
  }

  verifyReviewOrderVisible() {
    this.elements.reviewOrderSection().should('be.visible');
    return this;
  }

  enterComment(comment) {
    if (comment) {
      this.elements.commentTextArea().clear().type(comment);
    }
    return this;
  }

  clickPlaceOrder() {
    this.elements.placeOrderBtn().click();
  }
}

export default new CheckoutPage();

