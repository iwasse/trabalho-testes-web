class PaymentPage {
  elements = {
    paymentForm: () => cy.get('#payment-form'),
    nameOnCardInput: () => cy.get('input[data-qa="name-on-card"]'),
    cardNumberInput: () => cy.get('input[data-qa="card-number"]'),
    cvcInput: () => cy.get('input[data-qa="cvc"]'),
    expiryMonthInput: () => cy.get('input[data-qa="expiry-month"]'),
    expiryYearInput: () => cy.get('input[data-qa="expiry-year"]'),
    payAndConfirmBtn: () => cy.get('button[data-qa="pay-button"]'),
    orderPlacedHeading: () => cy.get('[data-qa="order-placed"]'),
    successAlertMessage: () => cy.contains(/Your order has been placed successfully!|Order Placed!/i)
  };

  verifyPaymentPageVisible() {
    cy.url().should('include', '/payment');
    return this;
  }

  fillPaymentDetails({
    nameOnCard = 'Alex Silva',
    cardNumber = '4111222233334444',
    cvc = '311',
    expiryMonth = '12',
    expiryYear = '2028'
  }) {
    this.elements.nameOnCardInput().clear().type(nameOnCard);
    this.elements.cardNumberInput().clear().type(cardNumber);
    this.elements.cvcInput().clear().type(cvc);
    this.elements.expiryMonthInput().clear().type(expiryMonth);
    this.elements.expiryYearInput().clear().type(expiryYear);
    return this;
  }

  clickPayAndConfirmOrder() {
    this.elements.payAndConfirmBtn().click();
  }

  verifyOrderSuccessMessage() {
    this.elements.successAlertMessage().should('be.visible');
    return this;
  }
}

export default new PaymentPage();

