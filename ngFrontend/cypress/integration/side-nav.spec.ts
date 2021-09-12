describe('SideNav toggle Test', () => {
  it('It should open and closes the side nav if the toggle button is clicked', () => {
    // cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.url().should('include', 'dashboard');
    cy.wait(1000);
    cy.get('mat-nav-list');
    cy.get('h2').should('have.text', 'APPLICATIONS');
    cy.get('button').should('be.visible').first().click();
    cy.pause();
    cy.get('button').should('be.visible').first().click();
    cy.get('h2').should('have.text', 'APPLICATIONS');
  });
});
