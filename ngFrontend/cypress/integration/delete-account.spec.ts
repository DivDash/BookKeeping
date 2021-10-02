describe('Delete An Account linked with other Functions', () => {
  it('It should login if the form is Valid', () => {
    cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    // cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.url().should('include', 'dashboard');
    cy.wait(1000);
  });
  it('Test to Delete From A Journal Entry', () => {
    cy.wait(1000);
    cy.get('[data-cy=journal]').click();
    cy.url().should('include', 'dashboard/journal');
    cy.wait(1000);
    cy.get('[data-cy=project]')
      .click()
      .get('mat-option')
      .contains(Cypress.env('testproject'))
      .click();
    cy.get('[data-cy=project]')
      .first()
      .click()
      .get('mat-option')
      .contains(Cypress.env('testproject'))
      .click();
    cy.get('input[name="Search"]').type(Cypress.env('testnamereceiver'));
    cy.get('.btn').eq(0).click();
    // cy.get('button').contains('Yes, delete it!').click();
    cy.get('.swal2-confirm').should('be.visible').click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.wait(1000);
  });
  it('Test to Delete From an Account', () => {
    cy.wait(1000);
    cy.get('[data-cy=account]').click();
    cy.url().should('include', 'dashboard/accounts');
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testnamereceiver'));
    cy.get('.btn').eq(1).should('be.visible').click();
    cy.get('.swal2-confirm').should('be.visible').click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testnamereceiver'));
    cy.wait(1000);
  });
  it('Test to Delete From an Cost Center Profit', () => {
    cy.wait(1000);
    cy.get('[data-cy=costcenter]').click();
    cy.url().should('include', 'dashboard/costcenter');
    cy.contains('Profit').click();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testproject'));
    cy.get('.btn').eq(1).should('be.visible').click();
    cy.get('.swal2-confirm').should('be.visible').click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testname'));
    cy.wait(1000);
  });
  it('Test to Delete From an Cost Center Non-Profit', () => {
    cy.wait(1000);
    cy.get('[data-cy=costcenter]').click();
    cy.url().should('include', 'dashboard/costcenter');
    cy.contains('Non-Profit').click();
    cy.wait(1000);
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testname'));
    cy.get('.btn').eq(1).should('be.visible').click();
    cy.get('.swal2-confirm').should('be.visible').click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .type(Cypress.env('testname'));
    cy.wait(1000);
  });
  it('Test to Delete Reciever dummy Acc From an Account', () => {
    cy.wait(1000);
    cy.get('[data-cy=account]').click();
    cy.url().should('include', 'dashboard/accounts');
    cy.get('input[name="Search"]')
      .should('be.visible')
      .clear()
      .type('testreceiver');
    cy.get('.btn').eq(1).should('be.visible').click();
    cy.get('.swal2-confirm').should('be.visible').click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .clear()
      .type('testreceiver');
    cy.wait(1000);
  });
  it('Test to Delete From an Account', () => {
    cy.wait(1000);
    cy.get('[data-cy=account]').click();
    cy.url().should('include', 'dashboard/accounts');
    cy.get('input[name="Search"]')
      .should('be.visible')
      .clear()
      .type(Cypress.env('testname'));
    cy.get('input[name="Search"]').should('be.visible').clear().type('1500');
    cy.get('.btn').eq(1).should('be.visible').click();
    cy.get('.swal2-confirm').should('be.visible').click();
    cy.get('.swal2-confirm').should('contain', 'OK').click();
    cy.get('input[name="Search"]')
      .should('be.visible')
      .clear()
      .type(Cypress.env('testname'));
    cy.wait(1000);
  });
});
