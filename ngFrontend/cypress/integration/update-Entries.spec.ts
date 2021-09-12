describe('Delete An Account linked with other Functions', () => {
  it('It should login if the form is Valid', () => {
    // cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.url().should('include', 'dashboard');
    cy.wait(1000);
  });
  it('Test to Update Balance Value From An Account', () => {
    cy.wait(1000);
    cy.get('[data-cy=account]').click();
    cy.url().should('include', 'dashboard/accounts');
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testname'));
    cy.wait(100);
    cy.get('.btn').eq(0).should('be.visible').click();
    cy.get('#mat-dialog-title-0').contains('Edit Account');
    cy.get('[data-cy=balance]')
      .should('be.visible')
      .clear()
      .type(Cypress.env('Updatedbalance'));
    cy.get('.mat-dialog-actions > .mat-primary')
      .should('be.visible')
      .contains('Update')
      .click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]').clear();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testname'));
  });
  it('Test to Update From an Cost Center Profit', () => {
    cy.wait(1000);
    cy.get('[data-cy=costcenter]').click();
    cy.url().should('include', 'dashboard/costcenter');
    cy.contains('Profit').click();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testproject'));
    cy.get('.btn').eq(0).should('be.visible').click();
    cy.get('#mat-dialog-title-1').contains('Edit Profit Entry');
    cy.get('[data-cy=project]')
      .should('be.visible')
      .clear()
      .type(Cypress.env('UpdatedProject'));
    cy.get('.mat-dialog-actions > .mat-primary')
      .should('be.visible')
      .contains('Update')
      .click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]').clear();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('UpdatedProject'));
  });
  it('Test to Update From an Cost Center Non-Profit', () => {
    cy.wait(1000);
    cy.get('[data-cy=costcenter]').click();
    cy.url().should('include', 'dashboard/costcenter');
    cy.contains('Non-Profit').click();
    cy.wait(1000);
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testname'));
    cy.get('.btn').eq(0).should('be.visible').click();
    cy.get('#mat-dialog-title-2').contains('Edit Non-Profit Entry');
    cy.get('[data-cy=Expense]')
      .should('be.visible')
      .clear()
      .type(Cypress.env('Updatedexpense'));
    cy.get('.mat-dialog-actions > .mat-primary')
      .should('be.visible')
      .contains('Update')
      .click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]').clear();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testname'));
  });
  it('Test to Update From Journal Entry Page', () => {
    cy.wait(1000);
    cy.get('[data-cy=journal]').click();
    cy.url().should('include', 'dashboard/journal');
    cy.wait(1000);
    cy.get('[data-cy=project]')
      .click()
      .get('mat-option')
      .contains(Cypress.env('UpdatedProject'))
      .click();
    cy.get('[data-cy=project]')
      .first()
      .click()
      .get('mat-option')
      .contains(Cypress.env('UpdatedProject'))
      .click();
    cy.get('input[name="Search"]').type(Cypress.env('UpdatedProject'));
    cy.get('.btn').eq(0).should('be.visible').click();
    cy.get('#mat-dialog-title-3').contains('Edit Journal Entry');
    cy.get('[data-cy=amounts]')
      .should('be.visible')
      .clear()
      .type(Cypress.env('Updatedamount'));
    cy.get('.mat-dialog-actions > .mat-primary')
      .should('be.visible')
      .contains('Update')
      .click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]').clear();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('UpdatedProject'));
  });
});
