// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): typeof login;
    register(
      name: string,
      email: string,
      work: string,
      phone: string,
      password: string,
      confirm: string
    ): typeof register;
  }
}
//
function login(email: string, password: string): void {
  cy.visit('/');
  cy.url().should('include', 'login');
  cy.contains('Login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button').click();
}

function register(
  name: string,
  email: string,
  work: string,
  phone: string,
  password: string,
  confirm: string
): void {
  cy.visit('/');
  cy.contains('Register').click();
  cy.url().should('include', 'register');
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="work"]').type(work);
  cy.get('input[name="phone"]').type(phone);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirm"]').type(confirm);
  cy.get('button').click();
}
//
// NOTE: You can use it like so:
Cypress.Commands.add('login', login);
Cypress.Commands.add('register', register);
//
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
