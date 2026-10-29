class SignupLoginPage {
  elements = {
    // Seção de Cadastro (Signup)
    signupTitle: () => cy.get('.signup-form h2'),
    nameInput: () => cy.get('input[data-qa="signup-name"]'),
    emailInput: () => cy.get('input[data-qa="signup-email"]'),
    signupButton: () => cy.get('button[data-qa="signup-button"]'),
    signupErrorMessage: () => cy.contains('p', 'Email Address already exist!'),

    // Seção de Login
    loginTitle: () => cy.get('.login-form h2'),
    loginEmailInput: () => cy.get('input[data-qa="login-email"]'),
    loginPasswordInput: () => cy.get('input[data-qa="login-password"]'),
    loginButton: () => cy.get('button[data-qa="login-button"]'),
    loginErrorMessage: () => cy.contains('Your email or password is incorrect!')
  };

  // Métodos de Cadastro
  verifySignupVisible() {
    this.elements.signupTitle().should('be.visible').and('have.text', 'New User Signup!');
    return this;
  }

  fillSignup(name, email) {
    this.elements.nameInput().type(name);
    this.elements.emailInput().type(email);
    return this;
  }

  clickSignup() {
    this.elements.signupButton().click();
  }

  verifySignupErrorMessage(expectedMessage = 'Email Address already exist!') {
    this.elements.signupErrorMessage()
      .should('be.visible')
      .and('contain.text', expectedMessage);
    return this;
  }

  // Métodos de Login
  verifyLoginVisible() {
    this.elements.loginTitle().should('be.visible').and('have.text', 'Login to your account');
    return this;
  }

  fillLogin(email, password) {
    this.elements.loginEmailInput().type(email);
    this.elements.loginPasswordInput().type(password);
    return this;
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  verifyLoginErrorMessage(expectedMessage = 'Your email or password is incorrect!') {
    this.elements.loginErrorMessage()
      .should('be.visible')
      .and('contain.text', expectedMessage);
    return this;
  }

  verifyOnLoginPage() {
    cy.url().should('include', '/login');
    this.verifyLoginVisible();
    return this;
  }
}

export default new SignupLoginPage();
