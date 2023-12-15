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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('prepare', (email, password) => {
    cy.intercept("POST", "signin", { fixture: "signin" }).as("postLogin")
    cy.intercept("GET", "cards", { fixture: "cards" })
    cy.intercept("GET", "users/me", { fixture: "me" })
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid=email_input]').type(`${email}{enter}`)
    cy.get('[data-testid=password_input]').type(`${password}{enter}`)
    cy.wait("@postLogin").its("request.body").should("deep.equal", {
        email: '1@1.com',
        password: '123'
    })
})
