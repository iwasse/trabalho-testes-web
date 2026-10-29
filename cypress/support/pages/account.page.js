class AccountPage {
  elements = {
    accountCreatedHeading: () => cy.get('[data-qa="account-created"]'),
    accountDeletedHeading: () => cy.get('[data-qa="account-deleted"]'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
    deleteAccountLink: () => cy.get('a[href="/delete_account"]')
  };

  verifyAccountCreated() {
    this.elements.accountCreatedHeading().should('be.visible').and('contain.text', 'Account Created!');
    return this;
  }

  verifyAccountDeleted() {
    this.elements.accountDeletedHeading().should('be.visible').and('contain.text', 'Account Deleted!');
    return this;
  }

  clickContinue() {
    this.elements.continueButton().click();
    return this;
  }

  clickDeleteAccount() {
    this.elements.deleteAccountLink().click();
    return this;
  }
}

export default new AccountPage();

