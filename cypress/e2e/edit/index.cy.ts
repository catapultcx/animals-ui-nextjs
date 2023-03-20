/* eslint-disable */

describe('Edit Cat', () => {

  it('should navigate to cats from main menu, Edit Smelly cat data, and edit back to original', async () => {
    cy.visit('http://localhost:3000/')

    cy.log('--- Home ---')

    cy.get('a.nav-link[href*="cats"]').click()

    cy.log('--- Manage Cats ---')

    cy.url().should('include', '/cats')
    cy.get('h1').contains('View your cats')

    cy.get('td').contains('Smelly')
    cy.get('td').contains('Cat with friends')

    cy.contains('Cat with friends')
      .parents('tr')
      .find('a')
      .click()

    cy.log('--- View Cat ---')

    cy.get('h1').contains('Your cat Smelly')

    cy.get('td').contains('Smelly')
    cy.get('td').contains('Cat with friends')
    cy.get('td').contains('MAMMALS')

    cy.get('td').contains('ID')
      .parents('tr')
      .find('td:last-child')
      .then(element => {
        const ID = element.text()
        cy.wrap(ID).as('ID')
      })

    cy.get('@ID')
      .should('not.equal', '')

    cy.get('@ID')
      .then(ID => {
        cy.url().should('include', '/cats/' + ID)
      })

    cy.get('a')
      .contains('Edit Cat details')
      .click()

    cy.log('--- Edit Cat ---')

    cy.get('h1').contains('Edit Cat details')
    cy.get('input[name="name"]').should('have.value', 'Smelly')
    cy.get('input[name="description"]').should('have.value', 'Cat with friends')

    cy.get('@ID')
      .then(ID => {
        cy.url().should('include', `/cats/${ ID }/edit`)
      })

    cy.get('button')
      .contains('Cancel')
      .click()

    cy.log('--- View Cat ---')

    cy.get('@ID')
      .then(ID => {
        cy.url().should('include', '/cats/' + ID)
      })

    cy.get('a')
      .contains('Edit Cat details')
      .click()

    cy.log('--- Edit Cat ---')

    cy.get('h1').contains('Edit Cat details')
    cy.get('input[name="name"]').should('have.value', 'Smelly')
    cy.get('input[name="description"]').should('have.value', 'Cat with friends')

    cy.get('input[name="name"]').type(' - Name updated')
    cy.get('input[name="description"]').type(' - Description updated')

    cy.get('button')
      .contains('Save')
      .click()


    cy.log('--- Manage Cats ---')

    cy.url().should('include', '/cats')
    cy.get('h1').contains('View your cats')

    cy.get('td').contains('Smelly - Name updated')
    cy.get('td').contains('Cat with friends - Description updated')

    cy.contains('Cat with friends - Description updated')
      .parents('tr')
      .find('a')
      .click()

    cy.log('--- View Cat ---')

    cy.get('h1').contains('Your cat Smelly')

    cy.get('td').contains('Smelly - Name updated')
    cy.get('td').contains('Cat with friends - Description updated')

    cy.get('a')
      .contains('Edit Cat details')
      .click()

    cy.log('--- Edit Cat ---')

    cy.get('h1').contains('Edit Cat details')
    cy.get('input[name="name"]').should('have.value', 'Smelly - Name updated')
    cy.get('input[name="description"]').should('have.value', 'Cat with friends - Description updated')

    cy.get('input[name="name"]').focus().clear().type('Smelly')
    cy.get('input[name="description"]').focus().clear().type('Cat with friends')

    cy.get('button')
      .contains('Save')
      .click()

    cy.log('--- Manage Cats ---')

    cy.url().should('include', '/cats')
    cy.get('h1').contains('View your cats')

    cy.get('td').contains('Smelly')
    cy.get('td').contains('Cat with friends')

  })
})

export {}
