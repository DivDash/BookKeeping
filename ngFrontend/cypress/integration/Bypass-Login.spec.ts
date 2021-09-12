describe('Login without UI', () => {
  it('should able to login', () => {
    // custom command
    cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
  });
});
