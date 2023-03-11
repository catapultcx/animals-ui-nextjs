/* eslint-disable */

describe('Cats', () => {
    it('should naviage to cats from main menu', () => {
      cy.visit('http://localhost:3000/')

      cy.get('a.nav-link[href*="cats"]').click()

      cy.url().should('include', '/cats')
      cy.get('h1').contains('View your cats')
    })

    it('should naviage to new cat page from cats page', () => {
      cy.visit('http://localhost:3000/cats')
      
      cy.get('h1').contains('View your cats');

      cy.get('a.btn-primary').first().click();
      cy.url().should('include', '/new');
      cy.get('h1').contains('Add a new cat')
    });

    it('should naviage to edit cat page from view cat page', () => {
      cy.visit('http://localhost:3000/cats')
      
      cy.get('h1').contains('View your cats');

      cy.get('a.btn-primary').eq(1).click();
      cy.get('h1').contains('Your cat');

      cy.get('a.btn-primary').first().click();
      cy.url().should('include', '/edit');
      cy.get('h1').contains('Edit');
    });
  })

  export {}
