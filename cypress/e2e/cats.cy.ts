/* eslint-disable */

describe('Cats', () => {
    it('should naviage to cats from main menu', () => {
      cy.visit('http://localhost:3000/')

      cy.get('a.nav-link[href*="cats"]').click()

      cy.url().should('include', '/cats')
      cy.get('h1').contains('View your cats')
    })

    it("should create a new cat", () => {
        cy.visit("/cats/new")
        cy.get('input[name="name"]').type("Fluffy")
        cy.get('input[name="description"]').type("A cute cat")
        cy.get('button[type="submit"]').click()
        cy.contains('table tbody tr td', 'Fluffy').should('be.visible')
        cy.contains('table tbody tr td', 'A cute cat').should('be.visible')
    })

    it("should delete cat", () => {
        cy.visit("/cats/new")
        cy.get('input[name="name"]').type("TEST DELETE")
        cy.get('input[name="description"]').type("TEST DELETE RECORD")
        cy.get('button[type="submit"]').click()
        cy.contains('td', 'TEST DELETE').parent('tr').find('a:contains("View")').click();
        cy.get('[data-testid="delete-button"]').click()
        cy.url().should("include", "/cats")
    })

  })

  export {}
