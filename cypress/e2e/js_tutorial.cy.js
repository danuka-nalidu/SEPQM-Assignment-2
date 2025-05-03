describe('W3Schools – JavaScript Tutorial Nav', () => {
    beforeEach(() => {
      // 1. Visit the homepage
      cy.visit('https://www.w3schools.com/');
    });
  
    //Positive test case
    it('TC-003: Navigate to the JavaScript Tutorial (positive)', () => {
      // 2. Open the “Tutorials” dropdown
      cy.get('#navbtn_tutorials')
        .should('be.visible')
        .click();
  
      // 3. Click “Learn JavaScript”
      cy.contains('Learn JavaScript')
        .should('be.visible')
        .click();
  
      // 4. Assert URL includes the JS tutorial path
      cy.url().should('include', '/js/default.asp');
  
      // 5. Wait for the main heading to appear
      cy.get('h1').should('be.visible');
  
      // 6. Verify the page title is correct
      cy.get('h1').should('contain.text', 'JavaScript Tutorial');
    });
  
    //Negative test case
    it('TC-004: Does NOT show a typo’d “Learn Javasxript” link (negative)', () => {
      // 2. Open the “Tutorials” dropdown
      cy.get('#navbtn_tutorials')
        .should('be.visible')
        .click();
  
      // 3. Assert the misspelt link doesn’t exist
      cy.contains('Learn Javasxript').should('not.exist');
  
      // 4. Verify we stayed on the homepage
      cy.url().should('eq', 'https://www.w3schools.com/');
    });
  });