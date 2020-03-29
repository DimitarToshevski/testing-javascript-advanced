describe("Products page", () => {
  const testProduct = { name: "New Product", quantity: "2" };
  const productNameRegex = new RegExp(`${testProduct.name}`, "i");
  let token;

  beforeEach(() => {
    cy.resetDb();

    cy.loginUser().then(res => {
      token = res.data.token;
    });
  });

  it("should add new product", () => {
    cy.visit("/")
      .findByLabelText("Product Name")
      .type(testProduct.name)
      .findByLabelText("Quantity")
      .type(testProduct.quantity)
      .findByTestId("addProductBtn")
      .click()
      .findAllByText(productNameRegex)
      .last()
      .contains(testProduct.quantity);
  });

  it("should delete product", () => {
    cy.addProduct(testProduct, token);

    cy.visit('/')
    .findAllByText(productNameRegex)
    .last()
    .next("button")
    .click()
    .should("not.exist");
  });

  it("should mark product as completed", () => {
    cy.addProduct(testProduct, token);

    cy.visit("/")
      .findAllByText(productNameRegex)
      .last()
      .click()
      .should(
        "have.css",
        "text-decoration",
        "line-through solid rgb(0, 0, 0)"
      )
      .click()
      .should("not.have.css", "text-decoration", "line-through");
  });
});
