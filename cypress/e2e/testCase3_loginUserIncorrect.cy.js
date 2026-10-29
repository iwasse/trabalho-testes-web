import {
  homePage,
  signupLoginPage
} from '../support/pages';

describe('Test Case 3: Login User with incorrect email and password', () => {
  let invalidUser;

  before(() => {
    cy.fixture('userData').then((data) => {
      invalidUser = data.invalidUser;
    });
  });

  it('Deve exibir mensagem de erro ao tentar realizar login com credenciais incorretas', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickSignupLogin();

    signupLoginPage.verifyLoginVisible();
    signupLoginPage.fillLogin(invalidUser.email, invalidUser.password);
    signupLoginPage.clickLogin();

    signupLoginPage.verifyLoginErrorMessage('Your email or password is incorrect!');
  });
});
