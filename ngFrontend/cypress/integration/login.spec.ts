let testname = 'test';
let balance = 1500;
const dates = '2000-12-22';
describe('Login', () => {
  xit('It should not login if the form is invalid or wrong', () => {
    cy.visit('/');
    cy.url().should('include', 'login');
    cy.contains('Login');
    cy.get('input[name="email"]').type('mubassheransari@gmail.com');
    cy.get('input[name="password"]').type('mubashir');
    cy.get('button').click();
    cy.url().should('not.include', 'dashboard');
  });

  it('It should login if the form is Valid', () => {
    cy.login('mubassheransari@gmail.com', '121');
    cy.url().should('include', 'dashboard');
    cy.wait(2000);
  });

  xit('It should logout', () => {
    cy.url().should('include', 'dashboard');
    cy.contains('Mr').click();
    cy.contains('Logout').click();
  });
  xit('Test to Add an Account', () => {
    cy.contains('ACCOUNTS').click();
    cy.url().should('include', 'dashboard/accounts');
    cy.contains('Add An Account').click();
    cy.get('#mat-input-1').type(testname);
    cy.get('#mat-input-2').type(testname);
    cy.get('#mat-input-3').type(balance);
    cy.get('#mat-input-4').type(testname);
    cy.get(':button').contains('Create').click();
    cy.get(':button').contains('No Thanks').click();
    cy.get('input[name="Search"]').type(testname);
  });
  xit('Test to Add A Profitable project in cost center', () => {
    cy.wait(1000);
    cy.contains('COST CENTRE').click();
    cy.url().should('include', 'dashboard/costcenter');
    cy.contains('Add').click();
    cy.get('mat-select[name]')
      .first()
      .click()
      .get('mat-option')
      .contains(testname)
      .click();
    cy.get('#mat-input-2').type(testname);
    cy.get('#mat-input-3').type(balance);
    cy.get('#mat-input-4').type(dates);
    cy.get('#mat-input-5').type(testname);
    // cy.get(':button').contains('Create').click();
    cy.get(':button').contains('No Thanks').click();
    cy.get('input[name="Search"]').type(testname).click();
  });
  it('Test to Add Journal Entry', () => {
    cy.contains('JOURNAL').click();
    cy.url().should('include', 'dashboard/journal');
    // cy.contains('Project').click();
    cy.get('mat-select[name=project]')
      .first()
      .click()
      .get('mat-option')
      .contains(testname)
      .click();
    cy.get('mat-select[name=client]')
      .first()
      .click()
      .get('mat-option')
      .contains(testname)
      .click();
    cy.get('input[name="total"]').type(balance);
    cy.get('input[name="date"]').type(dates);
    cy.get('.btnn2').click();
    cy.get('mat-select[name=receiver]')
      .first()
      .click()
      .get('mat-option')
      .contains(testname)
      .click();
    cy.get('input[name="amount"]').type(balance);
    cy.get('input[name="reason"]').type(testname);
    cy.get('input[name="method"]').type(testname);
    cy.get('input[name="remarks"]').type(testname);
    cy.get(':button').contains('Add Journal Entry').click();
    cy.wait(2000);
    cy.get('input[name="Search"]').type(testname);
  });
});
