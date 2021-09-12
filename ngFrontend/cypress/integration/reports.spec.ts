describe('Check Reports for Specific Project', () => {
  it('It should login if the form is Valid', () => {
    // cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.url().should('include', 'dashboard');
    cy.wait(1000);
  });
  it('Test to Check the Report of Test Account', () => {
    cy.wait(1000);
    // custom command
    cy.check_reports(Cypress.env('testproject'));
  });
});
