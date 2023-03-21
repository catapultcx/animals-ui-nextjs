/* eslint-disable */

describe('Cats', () => {
    it('should navigate to cats from main menu', () => {
      cy.visit('http://localhost:3000/')

      cy.get('a.nav-link[href*="cats"]').click()

      cy.url().should('include', '/cats')
      cy.get('h1').contains('View your cats')
    })

    it('should navigate to register cat page from view your cats page', () => {
      cy.visit('http://localhost:3000/cats')

      cy.get('.btn-success').click()

      cy.url().should('eq', 'http://localhost:3000/cats/register')
      cy.get('h1').contains('Register cat')
    })
})

  export {}
