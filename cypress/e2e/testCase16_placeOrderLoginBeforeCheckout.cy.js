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
    
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickSignupLogin();

    signupLoginPage.fillLogin(testUser.email, testUser.password);
    signupLoginPage.clickLogin();

    homePage.verifyLoggedInAs(testUser.name);
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

