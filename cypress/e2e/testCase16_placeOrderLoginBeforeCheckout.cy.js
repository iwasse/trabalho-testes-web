import {
  homePage,
  signupLoginPage,
  accountPage,
  cartPage,
  checkoutPage,
  paymentPage
} from '../support/pages';

describe('Test Case 16: Place Order: Login before Checkout', () => {
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
      name: `UserOrderLogin_${timestamp}`,
      email: `order_login_${timestamp}@automationexercise.com`
    };

    // Pré-requisito: Cria o usuário com endereço previamente via API para que o login e checkout funcionem
    cy.criarUsuarioViaApi(testUser);
  });

  it('Deve logar o usuário, adicionar produtos ao carrinho, finalizar pedido e deletar a conta', () => {
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Fill email, password and click 'Login' button
    signupLoginPage.fillLogin(testUser.email, testUser.password);
    signupLoginPage.clickLogin();

    // 6. Verify 'Logged in as username' at top
    homePage.verifyLoggedInAs(testUser.name);

    // 7. Add products to cart
    homePage.addFirstProductToCart();
    homePage.clickModalContinueShopping();

    // 8. Click 'Cart' button
    homePage.clickCart();

    // 9. Verify that cart page is displayed
    cartPage.verifyCartPageVisible();

    // 10. Click Proceed To Checkout
    cartPage.clickProceedToCheckout();

    // 11. Verify Address Details and Review Your Order
    checkoutPage.verifyCheckoutPageVisible();
    checkoutPage.verifyAddressDetailsVisible();
    checkoutPage.verifyReviewOrderVisible();

    // 12. Enter description in comment text area and click 'Place Order'
    checkoutPage.enterComment(userData.payment.orderComment);
    checkoutPage.clickPlaceOrder();

    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    paymentPage.verifyPaymentPageVisible();
    paymentPage.fillPaymentDetails(userData.payment);

    // 14. Click 'Pay and Confirm Order' button
    paymentPage.clickPayAndConfirmOrder();

    // 15. Verify success message 'Your order has been placed successfully!'
    paymentPage.verifyOrderSuccessMessage();

    // 16. Click 'Delete Account' button
    accountPage.clickDeleteAccount();

    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    accountPage.verifyAccountDeleted();
    accountPage.clickContinue();
  });
});

