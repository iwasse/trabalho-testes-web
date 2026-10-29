import {
  homePage,
  signupLoginPage,
  accountPage
} from '../support/pages';

describe('Test Case 2: Login User with correct email and password', () => {
  let userData;
  let testUser;

  before(() => {
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    const timestamp = Date.now();
    testUser = {
      ...userData,
      name: `UserLogin_${timestamp}`,
      email: `login_${timestamp}@automationexercise.com`
    };

    cy.criarUsuarioViaApi(testUser);
  });

  it('Deve logar com credenciais corretas e em seguida deletar a conta', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickSignupLogin();

    signupLoginPage.verifyLoginVisible();
    signupLoginPage.fillLogin(testUser.email, testUser.password);
    signupLoginPage.clickLogin();

    homePage.verifyLoggedInAs(testUser.name);

    accountPage.clickDeleteAccount();
    accountPage.verifyAccountDeleted();
  });
});
