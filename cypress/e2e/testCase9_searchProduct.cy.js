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
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Products' button
    homePage.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    productsPage.verifyAllProductsPageVisible();

    // 6. Enter product name in search input and click search button
    productsPage.searchProduct(searchTerm);

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    productsPage.verifySearchedProductsVisible();

    // 8. Verify all the products related to search are visible
    productsPage.verifyRelatedProductsVisible();
  });
});

