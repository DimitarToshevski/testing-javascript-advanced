import paths from "../../src/paths";

describe("App routing", () => {
  it("should redirect to login if user is not logged in", () => {
    cy.newVisit(paths.products).urlShouldEqual(paths.login);
  });

  it("should redirect to products if user is logged in", () => {
    cy.loginUser();

    cy.visit(paths.login).urlShouldEqual(paths.products);
  });
});
