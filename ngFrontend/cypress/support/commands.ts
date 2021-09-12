// const testname = 'test';
// const balance = '1500';
// const dates = '2000-12-22';
// const testemail = 'tester@gmail.com';
// const testpassword = 'test';
// const testpasswordFake = 'test';

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): typeof login;
    bypass_login(testemail: string, testpassword: string): typeof bypass_login;
    register(
      name: string,
      email: string,
      work: string,
      phone: string,
      password: string,
      confirm: string
    ): typeof register;
    check_reports(testproject: string): typeof check_reports;
    add_account(testname: string, balance: string): typeof add_account;
    add_profit(
      testname: string,
      testproject: string,
      profitbalance: string
    ): typeof add_profit;
    add_nonprofit(
      testname: string,
      expense: string,
      remarks: string
    ): typeof add_nonprofit;
    add_receiver_acc(
      testnamereceiver: string,
      testnamerec: string,
      balancerec: string
    ): typeof add_receiver_acc;
    add_journal(
      testproject: string,
      testname: string,
      amount: string,
      dates: string,
      testnamereceiver: string,
      reason: String
    ): typeof add_journal;
  }
}
//
function login(email: string, password: string): void {
  cy.visit('/');
  cy.url().should('include', 'login');
  cy.contains('Login');
  cy.get('[data-cy=email]').should('be.visible').type(email);
  cy.get('[data-cy=password]').should('be.visible').type(password);
  cy.get('[type=submit]').should('be.visible').click();
}
function bypass_login(testemail: string, testpassword: string): void {
  cy.request({
    url: 'http://localhost:5000/signin',
    method: 'POST',
    body: {
      email: testemail,
      password: testpassword,
    },
  }).then((res) => cy.setCookie('Book', res.body.token));
  // cy.pause();
  cy.visit('/dashboard/');
  // cy.reload();
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
  cy.get('[data-cy=name]').should('be.visible').type(name);
  cy.get('[data-cy=email]').should('be.visible').type(email);
  cy.get('[data-cy=work]').should('be.visible').type(work);
  cy.get('[data-cy=phone]').should('be.visible').type(phone);
  cy.get('[data-cy=password]').should('be.visible').type(password);
  cy.get('[data-cy=confirm]').should('be.visible').type(confirm);
  cy.get('[type=submit]').should('be.visible').click();
}

function check_reports(testproject: string): void {
  cy.get('[data-cy=report').click();
  cy.url().should('include', 'dashboard/report');
  cy.get('.mat-form-field-infix')
    .should('be.visible')
    .first()
    .click()
    .get('mat-option')
    .contains(testproject)
    .click();
  cy.get('#testChart').should('be.visible');
}
function add_account(testname: string, balance: string): void {
  cy.get('[data-cy=account').click();
  cy.url().should('include', 'dashboard/accounts');
  cy.contains('Add An Account').click();
  cy.get('[data-cy=name]').eq(0).should('be.visible').type(testname);
  cy.get('[data-cy=bank]').should('be.visible').type(testname);
  cy.get('[data-cy=balance]').should('be.visible').type(balance);
  cy.get('[data-cy=remarks]').should('be.visible').type(testname);
  cy.get(':button').should('be.visible').contains('Create').click();
  // cy.get(':button').contains('No Thanks').click();
  cy.get('#toast-container > .ng-trigger')
    .should('be.visible')
    .contains('Account Added');
  cy.get('input[name="Search"]').should('be.visible').type(testname);
}
function add_profit(
  testname: string,
  testproject: string,
  profitbalance: string
): void {
  cy.get('[data-cy=costcenter').click();
  cy.url().should('include', 'dashboard/costcenter');
  cy.contains('Profit').should('be.visible');
  cy.wait(1000);
  cy.contains('Add').click();
  cy.get(
    '[data-cy=client] > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix'
  )
    .first()
    .click()
    .get('mat-option')
    .contains(testname)
    .click();
  cy.get('[data-cy=project]').should('be.visible').type(testproject);
  cy.get('[data-cy=receivable]').should('be.visible').type(profitbalance);
  cy.get('[data-cy=date]').should('be.visible').type(Cypress.env('dates'));
  cy.get('[data-cy=status]').should('be.visible').type(testname);
  cy.get(':button').should('be.visible').contains('Create').click();
  // cy.get(':button').contains('No Thanks').click();
  cy.get('#toast-container > .ng-trigger')
    .should('be.visible')
    .contains('Success!');
  cy.get('input[name="Search"]').should('be.visible').type(testname).click();
}
function add_nonprofit(
  testname: string,
  expense: string,
  remarks: string
): void {
  cy.get('[data-cy=costcenter').click();
  cy.url().should('include', 'dashboard/costcenter');
  cy.contains('Non-Profit').should('be.visible').click();
  cy.wait(1000);
  cy.contains('Add').click();
  cy.get('[data-cy=client]')
    .click()
    .get('mat-option')
    .contains(testname)
    .click();
  cy.get('[data-cy=expense]').should('be.visible').type(expense);
  cy.get('[data-cy=remarks]').should('be.visible').type(remarks);

  cy.get(':button').should('be.visible').contains('Create').click();
  // cy.get(':button').contains('No Thanks').click();
  cy.get('#toast-container > .ng-trigger')
    .should('be.visible')
    .contains('Entry Added');
  cy.get('input[name="Search"]').should('be.visible').type(testname).click();
}
function add_receiver_acc(
  testnamereceiver: string,
  testnamerec: string,
  balancerec: string
): void {
  cy.get('[data-cy=account').click();
  cy.url().should('include', 'dashboard/accounts');
  cy.contains('Add An Account').click();
  cy.get('[data-cy=name]').eq(0).should('be.visible').type(testnamereceiver);
  cy.get('[data-cy=bank]').should('be.visible').type(testnamerec);
  cy.get('[data-cy=balance]').should('be.visible').type(balancerec);
  cy.get('[data-cy=remarks]').should('be.visible').type(testnamerec);
  cy.get(':button').should('be.visible').contains('Create').click();
  // cy.get(':button').contains('No Thanks').click();
  cy.get('#toast-container > .ng-trigger')
    .should('be.visible')
    .contains('Account Added');
  cy.get('input[name="Search"]').should('be.visible').type(testnamerec);
  cy.wait(1000);
}
function add_journal(
  testproject: string,
  testname: string,
  amount: string,
  dates: string,
  testnamereceiver: string,
  reason: string
): void {
  cy.get('[data-cy=journal]').click();
  cy.url().should('include', 'dashboard/journal');
  cy.get('[data-cy=project]')
    .first()
    .click()
    .get('mat-option')
    .contains(testproject)
    .click();
  cy.get('[data-cy=client]')
    .first()
    .click()
    .get('mat-option')
    .contains(testname)
    .click();
  cy.get('.toast-message')
    .should('be.visible')
    .contains('Project With The Client Is Selected');
  cy.get('[data-cy=amount]').should('be.visible').type(amount);
  cy.get('[data-cy=date]').should('be.visible').type(dates);
  cy.get('[data-cy=btnn2]').should('be.visible').click();
  cy.get('[data-cy=receiver]')
    .first()
    .click()
    .get('mat-option')
    .contains(testnamereceiver)
    .click();
  cy.get('[data-cy=amountrec]')
    .should('be.visible')
    .type(Cypress.env('amountrec'));
  cy.get('[data-cy=reason]').should('be.visible').type(reason);
  cy.get('[data-cy=method]').should('be.visible').type(testname);
  cy.get('[data-cy=remarks]').should('be.visible').type(testname);
  cy.get(':button').should('be.visible').contains('Add Journal Entry').click();
  cy.get('.toast-message').should('be.visible').contains('Entries are added');
  cy.get('input[name="Search"]').should('be.visible').type(testname);
  cy.wait(1000);
}
//
// NOTE: You can use it like so:
Cypress.Commands.add('login', login);
Cypress.Commands.add('register', register);
Cypress.Commands.add('check_reports', check_reports);
Cypress.Commands.add('add_account', add_account);
Cypress.Commands.add('add_profit', add_profit);
Cypress.Commands.add('add_nonprofit', add_nonprofit);
Cypress.Commands.add('add_receiver_acc', add_receiver_acc);
Cypress.Commands.add('add_journal', add_journal);
Cypress.Commands.add('bypass_login', bypass_login);
