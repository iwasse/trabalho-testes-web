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
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'New User Signup!' is visible
    signupLoginPage.verifySignupVisible();

    // 6. Enter name and email address & 7. Click 'Signup' button
    signupLoginPage.fillSignup(dynamicUser.name, dynamicUser.email);
    signupLoginPage.clickSignup();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    registerPage.verifyAccountInfoVisible();

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    registerPage.fillAccountInformation(userData);

    // 10. Select checkbox 'Sign up for our newsletter!'
    registerPage.selectNewsletter();

    // 11. Select checkbox 'Receive special offers from our partners!'
    registerPage.selectSpecialOffers();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    registerPage.fillAddressInformation(userData);

    // 13. Click 'Create Account button'
    registerPage.clickCreateAccount();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    accountPage.verifyAccountCreated();

    // 15. Click 'Continue' button
    accountPage.clickContinue();

    // 16. Verify that 'Logged in as username' is visible
    homePage.verifyLoggedInAs(dynamicUser.name);

    // 17. Click 'Delete Account' button
    accountPage.clickDeleteAccount();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    accountPage.verifyAccountDeleted();
    accountPage.clickContinue();
  });
});

