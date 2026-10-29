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
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'Login to your account' is visible
    signupLoginPage.verifyLoginVisible();

    // 6. Enter incorrect email address and password
    signupLoginPage.fillLogin(invalidUser.email, invalidUser.password);

    // 7. Click 'login' button
    signupLoginPage.clickLogin();

    // 8. Verify error 'Your email or password is incorrect!' is visible
    signupLoginPage.verifyLoginErrorMessage('Your email or password is incorrect!');
  });
});

