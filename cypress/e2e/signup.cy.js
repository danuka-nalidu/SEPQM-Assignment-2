// cypress/e2e/signup.cy.js

describe('W3Schools Signup Page', () => {
    const signupUrl = 'https://profile.w3schools.com/signup';
  
    beforeEach(() => {
      cy.visit(signupUrl);
    });
  
    it('C-001: all form fields and the button are visible', () => {
      cy.get('input[placeholder="email"]').should('be.visible');
      cy.get('input[placeholder="password"]').should('be.visible');
      cy.get('input[placeholder="first name"]').should('be.visible');
      cy.get('input[placeholder="last name"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    it('C-002: shows HTML5 “required” validation when you submit empty', () => {
      // submit the (empty) form
      cy.get('form').submit();
  
      // at least the email field should be invalid
      cy.get('input[placeholder="email"]')
        .then($el => expect($el[0].checkValidity()).to.be.false);
    });
  
    it('C-003: rejects an invalid email format', () => {
      cy.get('input[placeholder="email"]')
        .type('not-an-email')
        .blur(); // trigger the browser’s built-in validation
  
      cy.get('input[placeholder="email"]')
        .then($el => expect($el[0].checkValidity()).to.be.false);
    });
  
    it('C-004: allows typing valid data into every field', () => {
      // email
      cy.get('input[placeholder="email"]')
        .type('qa+signup@example.com')
        .should('have.value', 'qa+signup@example.com');
  
      // password
      cy.get('input[placeholder="password"]')
        .type('P@ssw0rd!')
        .should('have.value', 'P@ssw0rd!');
  
      // first name
      cy.get('input[placeholder="first name"]')
        .type('Jane')
        .should('have.value', 'Jane');
  
      // last name
      cy.get('input[placeholder="last name"]')
        .type('Doe')
        .should('have.value', 'Doe');
  
      // now none of the inputs should be invalid
      cy.get('input').each($el => {
        expect($el[0].checkValidity()).to.be.true;
      });
    });
  });