class HomePage {
  elements = {
    homeLogo: () => cy.get('img[alt="Website for automation practice"]'),
    headerNav: () => cy.get('#header'),
    footer: () => cy.get('#footer'),
    signupLoginLink: () => cy.get('a[href="/login"]'),
    productsLink: () => cy.get('a[href="/products"]'),
    cartLink: () => cy.get('a[href="/view_cart"]').first(),
    loggedInAsText: () => cy.contains('Logged in as'),
    logoutLink: () => cy.get('a[href="/logout"]'),
    deleteAccountLink: () => cy.get('a[href="/delete_account"]'),

    // Elementos do Carrinho na Home e Modal
    addToCartFirstProductBtn: () => cy.get('.features_items .add-to-cart').first(),
    cartModal: () => cy.get('#cartModal'),
    modalContinueShoppingBtn: () => cy.get('#cartModal').contains('Continue Shopping'),
    modalViewCartLink: () => cy.get('#cartModal').contains('View Cart')
  };

  visit() {
    cy.visit('/');
    return this;
  }

  verifyHomePageVisible() {
    this.elements.homeLogo().should('be.visible');
    this.elements.headerNav().should('be.visible');
    return this;
  }

  clickSignupLogin() {
    this.elements.signupLoginLink().click();
  }

  clickProducts() {
    this.elements.productsLink().click();
  }

  clickCart() {
    this.elements.cartLink().click();
  }

  addFirstProductToCart() {
    this.elements.addToCartFirstProductBtn().click({ force: true });
    this.elements.cartModal().should('be.visible');
    return this;
  }

  clickModalContinueShopping() {
    this.elements.modalContinueShoppingBtn().click();
    return this;
  }

  clickModalViewCart() {
    this.elements.modalViewCartLink().click();
    return this;
  }

  verifyLoggedInAs(username) {
    this.elements.loggedInAsText().should('be.visible').and('contain.text', username);
    return this;
  }

  clickLogout() {
    this.elements.logoutLink().click();
  }

  clickDeleteAccount() {
    this.elements.deleteAccountLink().click();
  }

  scrollToFooter() {
    this.elements.footer().scrollIntoView();
    return this;
  }
}

export default new HomePage();
