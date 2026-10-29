class RegisterPage {
  elements = {
    accountInfoHeading: () => cy.contains('b', 'Enter Account Information'),
    genderMrRadio: () => cy.get('#id_gender1'),
    genderMrsRadio: () => cy.get('#id_gender2'),
    passwordInput: () => cy.get('input[data-qa="password"]'),
    daysSelect: () => cy.get('select[data-qa="days"]'),
    monthsSelect: () => cy.get('select[data-qa="months"]'),
    yearsSelect: () => cy.get('select[data-qa="years"]'),
    newsletterCheckbox: () => cy.get('#newsletter'),
    specialOffersCheckbox: () => cy.get('#optin'),
    firstNameInput: () => cy.get('input[data-qa="first_name"]'),
    lastNameInput: () => cy.get('input[data-qa="last_name"]'),
    companyInput: () => cy.get('input[data-qa="company"]'),
    address1Input: () => cy.get('input[data-qa="address"]'),
    address2Input: () => cy.get('input[data-qa="address2"]'),
    countrySelect: () => cy.get('select[data-qa="country"]'),
    stateInput: () => cy.get('input[data-qa="state"]'),
    cityInput: () => cy.get('input[data-qa="city"]'),
    zipcodeInput: () => cy.get('input[data-qa="zipcode"]'),
    mobileNumberInput: () => cy.get('input[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('button[data-qa="create-account"]')
  };

  verifyAccountInfoVisible() {
    this.elements.accountInfoHeading().should('be.visible');
    return this;
  }

  fillAccountInformation({ title = 'Mr', password, birthDay, birthMonth, birthYear }) {
    if (title === 'Mrs') {
      this.elements.genderMrsRadio().check();
    } else {
      this.elements.genderMrRadio().check();
    }

    this.elements.passwordInput().type(password);

    if (birthDay) this.elements.daysSelect().select(birthDay);
    if (birthMonth) this.elements.monthsSelect().select(birthMonth);
    if (birthYear) this.elements.yearsSelect().select(birthYear);

    return this;
  }

  selectNewsletter() {
    this.elements.newsletterCheckbox().check();
    return this;
  }

  selectSpecialOffers() {
    this.elements.specialOffersCheckbox().check();
    return this;
  }

  fillAddressInformation({
    firstName,
    lastName,
    company,
    address1,
    address2,
    country,
    state,
    city,
    zipcode,
    mobileNumber
  }) {
    if (firstName) this.elements.firstNameInput().type(firstName);
    if (lastName) this.elements.lastNameInput().type(lastName);
    if (company) this.elements.companyInput().type(company);
    if (address1) this.elements.address1Input().type(address1);
    if (address2) this.elements.address2Input().type(address2);
    if (country) this.elements.countrySelect().select(country);
    if (state) this.elements.stateInput().type(state);
    if (city) this.elements.cityInput().type(city);
    if (zipcode) this.elements.zipcodeInput().type(zipcode);
    if (mobileNumber) this.elements.mobileNumberInput().type(mobileNumber);

    return this;
  }

  clickCreateAccount() {
    this.elements.createAccountButton().click();
  }
}

export default new RegisterPage();

