describe('Check Reports for Specific Project', () => {
  it('It should login if the form is Valid', () => {
    cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    // cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    // cy.url().should('include', 'dashboard');
    // cy.get('[data-cy=report] > .mat-list-item-content').click();
    // cy.url().should('include', 'dashboard/report');
    cy.wait(1000);
  });
  it('Test to Check the Report of Test Account', () => {
    cy.wait(1000);
    cy.get('[data-cy=report] > .mat-list-item-content').click();
    cy.url().should('include', 'dashboard/report');
    // custom command
    cy.check_reports(Cypress.env('testproject'));
  });
});
