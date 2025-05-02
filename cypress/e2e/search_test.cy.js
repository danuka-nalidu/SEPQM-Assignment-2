describe('W3Schools Site Search', () => {
    const performSearch = (query) => {
      cy.visit('https://www.w3schools.com');
  
      cy.get('input#search2', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true })
        .clear({ force: true })
        .type(`${query}{enter}`, { force: true });
    };
  
    it('TC-003: returns results for a valid query', () => {
      performSearch('html');
  
      // Validate redirect to the actual tutorial page
      cy.location('href', { timeout: 10000 }).should('include', '/html/');
      cy.get('h1').should('contain.text', 'HTML').and('be.visible');
    });
  
    it('TC-004: shows no results for gibberish query', () => {
      performSearch('asdlkjasd');
  
      // Check that no search results appear
      cy.get('.gsc-webResult', { timeout: 10000 }).should('have.length', 0);
  
      // Optional fallback: check for staying on homepage
      cy.location('pathname').should('eq', '/');
    });
  });