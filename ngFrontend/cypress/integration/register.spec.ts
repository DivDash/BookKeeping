let dummyemail = 'tester@gmail.com';
describe('Register', () => {
  it('It should not Register if the form is invalid or wrong', () => {
    cy.visit('/');
    cy.contains('Register').click();
    cy.url().should('include', 'register');
    cy.contains('Register');
    cy.get('input[name="name"]').type('test');
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="work"]').type('tester');
    cy.get('input[name="phone"]').type('123456');
    cy.get('input[name="password"]').type('test');
    //   cy.get('input[name="confirm"]').type('test');
    cy.get('button').click();
    cy.url().should('not.include', 'login');
  });

  it('It should Register if the form is Valid', () => {
    cy.register('test', dummyemail, 'tester', '1234', 'test', 'test');
    cy.url().should('include', 'login');
  });
  it('It should now Login with same registered account', () => {
    cy.contains('Login');
    cy.url().should('include', 'login');
    cy.get('input[name="email"]').type(dummyemail);
    cy.get('input[name="password"]').type('test');
    cy.get('button').click();
    cy.url().should('include', 'dashboard');
  });
});
