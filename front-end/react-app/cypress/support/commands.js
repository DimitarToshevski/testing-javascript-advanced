// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

import config from "../../src/config";

Cypress.Commands.add("resetDb", () => {
  cy.request({
    url: `${config.api}/products/reset`,
    method: "POST"
  });
});

Cypress.Commands.add("loginUser", (username = "test", password = "test") => {
  cy.request({
    url: `${config.api}/login`,
    method: "POST",
    body: { username, password }
  }).then(res => {
    if (res.body.data) {
      window.sessionStorage.setItem("token", res.body.data.token);
    }

    return res.body;
  });
});

Cypress.Commands.add("addProduct", (product, token) => {
  cy.request({
    url: `${config.api}/products`,
    method: "POST",
    body: { ...product },
    headers: {
      Authorization: token
    }
  });
});

Cypress.Commands.add("newVisit", url => {
  cy.visit(url, {
    onBeforeLoad: win => {
      win.sessionStorage.clear();
    }
  });
});

Cypress.Commands.add("urlShouldEqual", url => {
  cy.url().should("eq", `${Cypress.config().baseUrl}${url}`);
});
