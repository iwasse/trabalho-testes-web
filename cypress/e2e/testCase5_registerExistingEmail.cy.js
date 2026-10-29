import {
  homePage,
  signupLoginPage
} from '../support/pages';

describe('Test Case 5: Register User with existing email', () => {
  let userData;
  let existingUser;

  before(() => {
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    const timestamp = Date.now();
    existingUser = {
      ...userData,
      name: `UserExistente_${timestamp}`,
      email: `existente_${timestamp}@automationexercise.com`
    };

    // Pré-requisito: Registra previamente o usuário via API para garantir que o e-mail já existe
    cy.criarUsuarioViaApi(existingUser);
  });

  it('Deve exibir mensagem de erro ao tentar cadastrar um usuário com e-mail já registrado', () => {
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'New User Signup!' is visible
    signupLoginPage.verifySignupVisible();

    // 6. Enter name and already registered email address
    signupLoginPage.fillSignup(existingUser.name, existingUser.email);

    // 7. Click 'Signup' button
    signupLoginPage.clickSignup();

    // 8. Verify error 'Email Address already exist!' is visible
    signupLoginPage.verifySignupErrorMessage('Email Address already exist!');
  });
});

