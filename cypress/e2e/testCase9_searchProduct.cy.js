import {
  homePage,
  productsPage
} from '../support/pages';

describe('Test Case 9: Search Product', () => {
  let searchTerm;

  before(() => {
    cy.fixture('userData').then((data) => {
      searchTerm = data.searchTerm || 'Dress';
    });
  });

  it('Deve buscar um produto por nome e validar os resultados retornados', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickProducts();

    productsPage.verifyAllProductsPageVisible();
    productsPage.searchProduct(searchTerm);
    productsPage.verifySearchedProductsVisible();
    productsPage.verifyRelatedProductsVisible();
  });
});
