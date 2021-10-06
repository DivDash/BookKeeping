const dummyemail = 'tester@gmail.com';
const dummypassword = 'test';
const dummyname = 'testName';
const dummywork = 'test';
const dummyphone = '1234567';

describe('Register An Account', () => {
  it('It should not Register if the form is invalid or wrong', () => {
    cy.visit('/');
    cy.contains('Register').click();
    cy.url().should('include', 'register');
    cy.contains('Register');
    cy.get('[data-cy=name]').should('be.visible').type(dummyname);
    cy.get('[data-cy=email]').should('be.visible').type(dummyemail);
    cy.get('[data-cy=work]').should('be.visible').type(dummywork);
    cy.get('[data-cy=phone]').should('be.visible').type(dummyphone);
    cy.get('[data-cy=password]').should('be.visible').type(dummypassword);
    // cy.get('input[name="confirm"]').type(dummypassword);
    cy.get('button').should('be.visible').click();
    cy.url().should('not.include', 'login');
  });

  it('It should Register if the form is Valid', () => {
    // custom command
    cy.register(
      dummyname,
      dummyemail,
      dummywork,
      dummyphone,
      dummypassword,
      dummypassword
    );
    cy.get('#mat-error-0')
      .should('be.visible')
      .contains('Email Already Exist')
      .visit('/login');

    cy.url().should('include', 'login');
  });

  it('It should now Login with same registered account', () => {
    cy.visit('/login');
    cy.contains('Login');
    cy.url().should('include', 'login');
    // custom command
    cy.login(dummyemail, dummypassword);
    cy.wait(1000);
    cy.url().should('include', 'dashboard');
    cy.pause();
    cy.url().should('include', 'dashboard');
    cy.contains('Mr').click();
    cy.contains('Logout').click();
  });
});
