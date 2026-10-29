import {
  homePage,
  signupLoginPage,
  registerPage,
  accountPage,
  cartPage,
  checkoutPage,
  paymentPage
} from '../support/pages';

describe('Test Case 15: Place Order: Register before Checkout', () => {
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
      name: `UserOrder_${timestamp}`,
      email: `order_${timestamp}@automationexercise.com`
    };
  });

  it('Deve registrar usuário, adicionar produtos ao carrinho, finalizar pedido e deletar a conta', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickSignupLogin();

    signupLoginPage.fillSignup(dynamicUser.name, dynamicUser.email);
    signupLoginPage.clickSignup();
    registerPage.fillAccountInformation(userData);
    registerPage.selectNewsletter();
    registerPage.selectSpecialOffers();
    registerPage.fillAddressInformation(userData);
    registerPage.clickCreateAccount();

    accountPage.verifyAccountCreated();
    accountPage.clickContinue();

    homePage.verifyLoggedInAs(dynamicUser.name);

    homePage.addFirstProductToCart();
    homePage.clickModalContinueShopping();

    homePage.clickCart();

    cartPage.verifyCartPageVisible();
    cartPage.clickProceedToCheckout();

    checkoutPage.verifyCheckoutPageVisible();
    checkoutPage.verifyAddressDetailsVisible();
    checkoutPage.verifyReviewOrderVisible();

    checkoutPage.enterComment(userData.payment.orderComment);
    checkoutPage.clickPlaceOrder();

    paymentPage.verifyPaymentPageVisible();
    paymentPage.fillPaymentDetails(userData.payment);
    paymentPage.clickPayAndConfirmOrder();
    paymentPage.verifyOrderSuccessMessage();

    accountPage.clickDeleteAccount();
    accountPage.verifyAccountDeleted();
    accountPage.clickContinue();
  });
});
