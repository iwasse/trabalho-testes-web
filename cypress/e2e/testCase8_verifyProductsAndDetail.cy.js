import {
  homePage,
  productsPage,
  productDetailPage
} from '../support/pages';

describe('Test Case 8: Verify All Products and product detail page', () => {
  it('Deve navegar até a lista de produtos e verificar todos os detalhes do primeiro produto', () => {
    homePage.visit();
    homePage.verifyHomePageVisible();
    homePage.clickProducts();

    productsPage.verifyAllProductsPageVisible();
    productsPage.verifyProductsListVisible();
    productsPage.clickFirstProduct();

    productDetailPage.verifyProductDetailPageVisible();
    productDetailPage.verifyProductDetailsVisible();
  });
});
