import {
  homePage,
  signupLoginPage
} from '../support/pages';

describe('Test Case 4: Logout User', () => {
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
      name: `UserLogout_${timestamp}`,
      email: `logout_${timestamp}@automationexercise.com`
    };

    cy.criarUsuarioViaApi(testUser);
  });

  it('Deve logar o usuário com credenciais válidas e realizar o logout com sucesso', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickSignupLogin();

    signupLoginPage.verifyLoginVisible();
    signupLoginPage.fillLogin(testUser.email, testUser.password);
    signupLoginPage.clickLogin();

    homePage.verifyLoggedInAs(testUser.name);

    homePage.clickLogout();
    signupLoginPage.verifyOnLoginPage();
  });
});
