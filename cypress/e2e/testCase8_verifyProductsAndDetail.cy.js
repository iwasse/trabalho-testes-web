import {
  homePage,
  productsPage,
  productDetailPage
} from '../support/pages';

describe('Test Case 8: Verify All Products and product detail page', () => {
  it('Deve navegar até a lista de produtos e verificar todos os detalhes do primeiro produto', () => {
    // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Products' button
    homePage.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    productsPage.verifyAllProductsPageVisible();

    // 6. The products list is visible
    productsPage.verifyProductsListVisible();

    // 7. Click on 'View Product' of first product
    productsPage.clickFirstProduct();

    // 8. User is landed to product detail page
    productDetailPage.verifyProductDetailPageVisible();

    // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
    productDetailPage.verifyProductDetailsVisible();
  });
});

