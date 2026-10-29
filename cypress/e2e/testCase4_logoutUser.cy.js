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

    // Pré-requisito: Cria o usuário via API para garantir independência e repetibilidade do teste
    cy.criarUsuarioViaApi(testUser);
  });

  it('Deve logar o usuário com credenciais válidas e realizar o logout com sucesso', () => {
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'Login to your account' is visible
    signupLoginPage.verifyLoginVisible();

    // 6. Enter correct email address and password
    signupLoginPage.fillLogin(testUser.email, testUser.password);

    // 7. Click 'login' button
    signupLoginPage.clickLogin();

    // 8. Verify that 'Logged in as username' is visible
    homePage.verifyLoggedInAs(testUser.name);

    // 9. Click 'Logout' button
    homePage.clickLogout();

    // 10. Verify that user is navigated to login page
    signupLoginPage.verifyOnLoginPage();
  });
});

