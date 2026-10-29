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
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Fill all details in Signup and create account
    signupLoginPage.fillSignup(dynamicUser.name, dynamicUser.email);
    signupLoginPage.clickSignup();
    registerPage.fillAccountInformation(userData);
    registerPage.selectNewsletter();
    registerPage.selectSpecialOffers();
    registerPage.fillAddressInformation(userData);
    registerPage.clickCreateAccount();

    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    accountPage.verifyAccountCreated();
    accountPage.clickContinue();

    // 7. Verify 'Logged in as username' at top
    homePage.verifyLoggedInAs(dynamicUser.name);

    // 8. Add products to cart
    homePage.addFirstProductToCart();
    homePage.clickModalContinueShopping();

    // 9. Click 'Cart' button
    homePage.clickCart();

    // 10. Verify that cart page is displayed
    cartPage.verifyCartPageVisible();

    // 11. Click Proceed To Checkout
    cartPage.clickProceedToCheckout();

    // 12. Verify Address Details and Review Your Order
    checkoutPage.verifyCheckoutPageVisible();
    checkoutPage.verifyAddressDetailsVisible();
    checkoutPage.verifyReviewOrderVisible();

    // 13. Enter description in comment text area and click 'Place Order'
    checkoutPage.enterComment(userData.payment.orderComment);
    checkoutPage.clickPlaceOrder();

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    paymentPage.verifyPaymentPageVisible();
    paymentPage.fillPaymentDetails(userData.payment);

    // 15. Click 'Pay and Confirm Order' button
    paymentPage.clickPayAndConfirmOrder();

    // 16. Verify success message 'Your order has been placed successfully!'
    paymentPage.verifyOrderSuccessMessage();

    // 17. Click 'Delete Account' button
    accountPage.clickDeleteAccount();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    accountPage.verifyAccountDeleted();
    accountPage.clickContinue();
  });
});

