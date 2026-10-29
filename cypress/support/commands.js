// ***********************************************
// Custom Commands para o fluxo de Testes Web
// Modularização complementar via Cypress Commands
// ***********************************************

import {
  homePage,
  signupLoginPage,
  registerPage,
  accountPage,
  productsPage,
  footerPage,
  cartPage,
  checkoutPage,
  paymentPage
} from './pages';

/**
 * Comando customizado para iniciar o cadastro com nome e email
 */
Cypress.Commands.add('iniciarCadastro', (nome, email) => {
  signupLoginPage.fillSignup(nome, email);
  signupLoginPage.clickSignup();
});

/**
 * Comando customizado para preencher todo o formulário de cadastro
 */
Cypress.Commands.add('preencherFormularioCadastro', (dadosUsuario) => {
  registerPage.fillAccountInformation(dadosUsuario);
  registerPage.selectNewsletter();
  registerPage.selectSpecialOffers();
  registerPage.fillAddressInformation(dadosUsuario);
  registerPage.clickCreateAccount();
});

/**
 * Comando customizado para realizar login direto
 */
Cypress.Commands.add('fazerLogin', (email, password) => {
  signupLoginPage.fillLogin(email, password);
  signupLoginPage.clickLogin();
});

/**
 * Comando customizado para realizar logout
 */
Cypress.Commands.add('fazerLogout', () => {
  homePage.clickLogout();
});

/**
 * Comando customizado para deletar a conta ativa e confirmar
 */
Cypress.Commands.add('deletarContaEConfirmar', () => {
  accountPage.clickDeleteAccount();
  accountPage.verifyAccountDeleted();
  accountPage.clickContinue();
});

/**
 * Comando customizado para pesquisar um produto
 */
Cypress.Commands.add('buscarProduto', (nomeProduto) => {
  productsPage.searchProduct(nomeProduto);
});

/**
 * Comando customizado para assinar a newsletter no rodapé
 */
Cypress.Commands.add('inscreverNewsletter', (email) => {
  footerPage.scrollToFooter();
  footerPage.subscribeEmail(email);
  footerPage.verifySuccessMessage();
});

/**
 * Comando customizado para realizar pagamento e confirmação de pedido
 */
Cypress.Commands.add('realizarPagamento', (dadosPagamento) => {
  paymentPage.fillPaymentDetails(dadosPagamento);
  paymentPage.clickPayAndConfirmOrder();
  paymentPage.verifyOrderSuccessMessage();
});

/**
 * Cria um usuário previamente via API para garantir independência dos testes
 */
Cypress.Commands.add('criarUsuarioViaApi', (usuario) => {
  return cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
      title: usuario.title || 'Mr',
      birth_date: usuario.birthDay || '15',
      birth_month: usuario.birthMonth || 'May',
      birth_year: usuario.birthYear || '1995',
      firstname: usuario.firstName || 'Alex',
      lastname: usuario.lastName || 'Silva',
      company: usuario.company || 'Tech Corp',
      address1: usuario.address1 || 'Avenida Paulista, 1000',
      address2: usuario.address2 || 'Bloco B',
      country: usuario.country || 'United States',
      zipcode: usuario.zipcode || '90001',
      state: usuario.state || 'California',
      city: usuario.city || 'Los Angeles',
      mobile_number: usuario.mobileNumber || '+5511999998888'
    }
  });
});
