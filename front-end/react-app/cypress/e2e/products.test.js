describe("Products page", () => {
  const testProduct = { id: 2, name: "New Product", quantity: "2" };
  const testProductSelector = `product-${testProduct.id}`;
  const productNameFieldLabel = "Product Name";
  const quantityFieldLabel = "Quantity";

  let token;

  beforeEach(() => {
    cy.resetDb();

    cy.loginUser().then(res => {
      token = res.data.token;
    });
  });

  it("should add new product", () => {
    const productNameRegex = new RegExp(`${testProduct.name}`, "i");

    cy.visit("/")
      .findAllByText(productNameRegex)
      .should("not.exist")
      .findByLabelText(productNameFieldLabel)
      .type(testProduct.name)
      .findByLabelText(quantityFieldLabel)
      .type(testProduct.quantity)
      .findByTestId("productBtn")
      .click()
      .findByLabelText(productNameFieldLabel)
      .should("be.empty")
      .findByLabelText(quantityFieldLabel)
      .should("be.empty")
      .findAllByText(productNameRegex)
      .last()
      .contains(testProduct.quantity);
  });

  it("should delete product", () => {
    cy.addProduct(testProduct, token);

    cy.visit("/")
      .findByTestId(testProductSelector)
      .trigger("mouseover")
      .findByTestId(`${testProductSelector}-delete-btn`)
      .click()
      .should("not.exist");
  });

  it("should mark product as completed", () => {
    cy.addProduct(testProduct, token);

    cy.visit("/")
      .findByTestId(testProductSelector)
      .click()
      .find("span")
      .should("have.css", "text-decoration", "line-through solid rgb(0, 0, 0)")
      .click()
      .should("not.have.css", "text-decoration", "line-through");
  });

  it("should edit existing product", () => {
    const nameAddition = " Name";
    const editedProduct = {
      name: testProduct.name + nameAddition,
      quantity: "5"
    };
    const productButton = "productBtn";
    const editButton = `${testProductSelector}-edit-btn`;
    const deleteButton = `${testProductSelector}-delete-btn`;

    cy.addProduct(testProduct, token);

    cy.visit("/")
      .findByTestId(testProductSelector)
      .trigger("mouseover")
      .findByTestId(editButton)
      .click()
      .findByTestId(deleteButton)
      .should("be.disabled")
      .findByLabelText(productNameFieldLabel)
      .should("have.value", testProduct.name)
      .findByLabelText(quantityFieldLabel)
      .should("have.value", testProduct.quantity)
      .findByTestId(productButton)
      .should("have.text", "Save Changes")
      .findByLabelText(productNameFieldLabel)
      .type(nameAddition)
      .findByLabelText(quantityFieldLabel)
      .type(`{selectall}${editedProduct.quantity}`)
      .findByTestId(productButton)
      .click()
      .findByLabelText(productNameFieldLabel)
      .should("be.empty")
      .findByLabelText(quantityFieldLabel)
      .should("be.empty")
      .findByTestId(productButton)
      .should("have.text", "Add Product")
      .findByTestId(editButton)
      .should("not.exist")
      .findByTestId(deleteButton)
      .should("not.exist")
      .findByTestId(testProductSelector)
      .contains(editedProduct.name)
      .contains(editedProduct.quantity)
      .trigger("mouseover")
      .findByTestId(deleteButton)
      .should("be.enabled");
  });
});
