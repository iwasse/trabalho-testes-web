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

    cy.criarUsuarioViaApi(existingUser);
  });

  it('Deve exibir mensagem de erro ao tentar cadastrar um usuário com e-mail já registrado', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickSignupLogin();

    signupLoginPage.verifySignupVisible();
    signupLoginPage.fillSignup(existingUser.name, existingUser.email);
    signupLoginPage.clickSignup();

    signupLoginPage.verifySignupErrorMessage('Email Address already exist!');
  });
});
