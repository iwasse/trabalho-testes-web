class FooterPage {
  elements = {
    footerContainer: () => cy.get('#footer'),
    subscriptionHeading: () => cy.contains('h2', 'Subscription'),
    subscriptionEmailInput: () => cy.get('#susbscribe_email'),
    subscribeArrowButton: () => cy.get('#subscribe'),
    successAlertMessage: () => cy.get('#success-subscribe')
  };

  scrollToFooter() {
    this.elements.footerContainer().scrollIntoView();
    return this;
  }

  verifySubscriptionTextVisible() {
    this.elements.subscriptionHeading()
      .should('be.visible')
      .and('contain.text', 'Subscription');
    return this;
  }

  subscribeEmail(email) {
    this.elements.subscriptionEmailInput().clear().type(email);
    this.elements.subscribeArrowButton().click();
    return this;
  }

  verifySuccessMessage(expectedMessage = 'You have been successfully subscribed!') {
    this.elements.successAlertMessage()
      .should('be.visible')
      .and('contain.text', expectedMessage);
    return this;
  }
}

export default new FooterPage();

