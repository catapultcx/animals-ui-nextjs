/* eslint-disable */

describe('Cats', () => {
    it('should navigate to register cat page from main menu', () => {
      cy.visit('http://localhost:3000/')

      cy.get('a.nav-link[href="/cats/register"]').click()

      cy.url().should('include', '/cats/register')
      cy.get('h1').contains('Register new cat')
    })
  })

  export {}
