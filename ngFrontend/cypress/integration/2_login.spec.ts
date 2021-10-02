describe('Login', () => {
  it('It should not login if the form is invalid or wrong', () => {
    cy.visit('/');
    cy.url().should('include', 'login');
    cy.contains('Login');
    cy.get('[data-cy=email]')
      .should('be.visible')
      .type(Cypress.env('testemail'));
    cy.get('[data-cy=password]')
      .should('be.visible')
      .type(Cypress.env('testpasswordFake'));
    cy.get('button').should('be.visible').click();
    cy.url().should('not.include', 'dashboard');
  });

  it('It should login if the form is Valid', () => {
    // custom command
    cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.wait(1000);
    // cy.url().should('include', 'dashboard');
    // cy.wait(1000);
  });
  it('It should logout', () => {
    // cy.url().should('include', 'dashboard');
    cy.get('li > .mat-focus-indicator > .mat-button-wrapper').click();
    cy.get('.mat-menu-content > .mat-focus-indicator').click();
  });
});
