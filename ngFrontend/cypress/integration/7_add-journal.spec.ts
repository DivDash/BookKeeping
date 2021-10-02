describe('Add A Jounral Entry', () => {
  it('It should login if the form is Valid', () => {
    cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    // cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    // cy.url().should('include', 'dashboard');
    cy.wait(1000);
  });
  it('Test to Add an Account for reciever in journal', () => {
    cy.wait(1000);
    cy.get('[data-cy=account] > .mat-list-item-content').click();
    cy.url().should('include', 'dashboard/accounts');

    // custom command
    cy.add_receiver_acc(
      Cypress.env('testnamereceiver'),
      Cypress.env('testnamerec'),
      Cypress.env('balancerec')
    );
    // cy.get('[data-cy=journal] > .mat-list-item-content').click();
    // cy.url().should('include', 'dashboard/journal');
  });
  it('Test to Add Journal Entry', () => {
    cy.wait(1000);
    // custom command
    cy.get('[data-cy=journal] > .mat-list-item-content').click();
    cy.url().should('include', 'dashboard/journal');
    cy.add_journal(
      Cypress.env('testproject'),
      Cypress.env('testname'),
      Cypress.env('amount'),
      Cypress.env('dates'),
      Cypress.env('testnamereceiver'),
      Cypress.env('reason')
    );
  });
  it('Test to check (+) and (-) option while adding Journal Entry', () => {
    cy.wait(1000);
    cy.get('[data-cy=journal]').click();
    cy.url().should('include', 'dashboard/journal');
    cy.get('[data-cy=btnn2]').should('be.visible').click();
    cy.get('[data-cy=btnn2]').should('be.visible').click();

    cy.wait(1000);
    cy.get(
      ':nth-child(3) > .boxx > .mat-focus-indicator > .mat-button-wrapper > .mat-icon'
    )
      .should('be.visible')
      .click();
  });
});
