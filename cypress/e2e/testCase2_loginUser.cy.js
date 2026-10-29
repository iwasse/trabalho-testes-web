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

    // Pré-requisito: Cria o usuário via API para garantir um teste limpo, independente e repetível
    cy.criarUsuarioViaApi(testUser);
  });

  it('Deve logar com credenciais corretas e em seguida deletar a conta', () => {
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

    // 9. Click 'Delete Account' button
    accountPage.clickDeleteAccount();

    // 10. Verify that 'ACCOUNT DELETED!' is visible
    accountPage.verifyAccountDeleted();
  });
});

