/* eslint-disable */

describe('Home page', () => {
    it('should start on the home page', () => {
      cy.visit('http://localhost:3000/')
      cy.get('h1').contains('Welcome, register your animals')
      cy.get('a[href*="cats"]')
    })
  })

  export {}
