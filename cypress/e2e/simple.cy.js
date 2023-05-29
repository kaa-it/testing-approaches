/* eslint-disable no-undef */

describe("Application", () => {
  beforeEach(() => {
    let email = "1@1.com";
    let password = "123";
    cy.intercept("POST", "signin", { fixture: "signin" }).as("postLogin");
    cy.intercept("GET", "cards", { fixture: "cards" });
    cy.intercept("GET", "users/me", { fixture: "me" });
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=email_input]").type(`${email}{enter}`);
    cy.get("[data-testid=password_input]").type(`${password}{enter}`);
  });

  it("should shoe VVV after click on 1st element", () => {
    cy.wait("@postLogin").its("request.body").should("deep.equal", {
      email: "1@1.com",
      password: "123",
    });
    cy.get("ul li:first").first().click();
    cy.get(".popup__caption").should("have.text", "VVV");
  });

  it("should go to login page after logout", () => {
    cy.get(".header__logout").click();
    cy.get(".auth-form").should("exist");
  });
});
