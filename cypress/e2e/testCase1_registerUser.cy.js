import {
  homePage,
  signupLoginPage,
  registerPage,
  accountPage
} from '../support/pages';

describe('Test Case 1: Register User', () => {
  let userData;
  let dynamicUser;

  before(() => {
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    const timestamp = Date.now();
    dynamicUser = {
      name: `UserTest_${timestamp}`,
      email: `test_${timestamp}@automationexercise.com`
    };
  });

  it('Deve registrar um novo usuário com sucesso e em seguida excluir a conta', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickSignupLogin();

    signupLoginPage.verifySignupVisible();
    signupLoginPage.fillSignup(dynamicUser.name, dynamicUser.email);
    signupLoginPage.clickSignup();

    registerPage.verifyAccountInfoVisible();
    registerPage.fillAccountInformation(userData);
    registerPage.selectNewsletter();
    registerPage.selectSpecialOffers();
    registerPage.fillAddressInformation(userData);
    registerPage.clickCreateAccount();

    accountPage.verifyAccountCreated();
    accountPage.clickContinue();

    homePage.verifyLoggedInAs(dynamicUser.name);

    accountPage.clickDeleteAccount();
    accountPage.verifyAccountDeleted();
    accountPage.clickContinue();
  });
});
