class ProductsPage {
  elements = {
    allProductsTitle: () => cy.get('.title.text-center'),
    productsList: () => cy.get('.features_items'),
    productCards: () => cy.get('.features_items .col-sm-4'),
    firstProductViewBtn: () => cy.get('.choose a').first(),

    // Elementos de Busca
    searchInput: () => cy.get('#search_product'),
    searchButton: () => cy.get('#submit_search'),
    searchedProductsTitle: () => cy.get('.title.text-center'),
    searchedProductItems: () => cy.get('.features_items .product-image-wrapper'),
    searchedProductNames: () => cy.get('.features_items .productinfo p')
  };

  verifyAllProductsPageVisible() {
    cy.url().should('include', '/products');
    this.elements.allProductsTitle().should('be.visible').and('contain.text', 'All Products');
    return this;
  }

  verifyProductsListVisible() {
    this.elements.productsList().should('be.visible');
    this.elements.productCards().should('have.length.greaterThan', 0);
    return this;
  }

  clickFirstProduct() {
    this.elements.firstProductViewBtn().click();
  }

  // Métodos de Busca
  searchProduct(productName) {
    this.elements.searchInput().clear().type(productName);
    this.elements.searchButton().click();
    return this;
  }

  verifySearchedProductsVisible() {
    this.elements.searchedProductsTitle()
      .should('be.visible')
      .and('contain.text', 'Searched Products');
    return this;
  }

  verifyRelatedProductsVisible() {
    this.elements.searchedProductItems()
      .should('be.visible')
      .and('have.length.greaterThan', 0);

    this.elements.searchedProductNames().each(($product) => {
      cy.wrap($product).should('be.visible');
    });

    return this;
  }
}

export default new ProductsPage();
