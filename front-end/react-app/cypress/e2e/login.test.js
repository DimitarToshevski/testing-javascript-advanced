import paths from "../../src/paths";
import config from "../../src/config";

describe("Login page", () => {
  it("should login user", () => {
    cy.newVisit("/")
      .findByLabelText("Username")
      .type("test")
      .findByLabelText("Password")
      .type("test")
      .findByTestId("loginBtn")
      .click()
      .urlShouldEqual(paths.products)
      .window()
      .its(`sessionStorage.${config.tokenKey}`)
      .should("exist")
      .should("be.a", "string");
  });

  it("should logout user", () => {
    cy.loginUser();

    cy.visit("/")
      .findByText("Logout")
      .click()
      .urlShouldEqual(paths.login)
      .window()
      .its(`sessionStorage.${config.tokenKey}`)
      .should("not.exist");
  });

  it("should show error message if login is unsuccessful", () => {
    cy.newVisit("/")
      .findByLabelText("Username")
      .type("user")
      .findByLabelText("Password")
      .type("pass")
      .findByTestId("loginBtn")
      .click()
      .urlShouldEqual(paths.login)
      .findByText(/invalid credentials/i)
      .should("exist");
  });
});
