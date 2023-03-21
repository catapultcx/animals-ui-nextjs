/* eslint-disable */

import { Cat } from '../../../src/domain/cat';

describe('Create, Update, Filter, Delete Cat', () => {

  it('should navigate to cats from main menu, Register a new Cat, Filter and Delete', async () => {
    const cat: Cat = {
      id: '',
      name: Math.random().toString(36).substring(2),
      description: Math.random().toString(36).substring(2),
      group: ''
    }

    goToHome();

    goToManageCats();

    registerNewCat(cat);

    manageCats_checkCatExist(cat);
    manageCats_filterByNameAndCheckCatExist(cat);
    manageCats_filterByDescriptionAndCheckCatExist(cat);

    manageCats_clickOnCatAndCheckBasicData(cat);

    viewCat_fetchCatID();
    viewCat_editCatDetailsButClickCancel(cat);
    viewCat_editCatDetailsAndSave(cat);

    manageCats_checkCatBeenUpdated(cat);
    manageCat_selectCatToViewAndDelete(cat);

    manageCats_checkCatDoesNotExist(cat);

  })

  function goToHome () {
    cy.log('--- Home ---')

    cy.visit('http://localhost:3000/')
  }

  function goToManageCats () {
    cy.get('a.nav-link[href*="cats"]').click()

    cy.log('--- Manage Cats ---')

    cy.url().should('include', '/cats')
    cy.get('h1').contains('View your cats')
  }

  function registerNewCat (cat: { name: string; description: string }) {
    cy.get('a')
      .contains('Register a new Cat')
      .click()

    cy.log('--- Register a new Cat ---')

    cy.get('input[name="name"]').focus().clear().type(cat.name)
    cy.get('input[name="description"]').focus().clear().type(cat.description)

    cy.get('button')
      .contains('Save')
      .click()
  }

  function manageCats_checkCatExist (cat: Cat) {
    cy.log('--- Manage Cats ---')

    cy.url().should('include', '/cats')
    cy.get('h1').contains('View your cats')

    cy.get('td').contains(cat.name)
    cy.get('td').contains(cat.description)
  }

  function manageCats_checkCatDoesNotExist (cat: Cat) {
    cy.log('--- Manage Cats ---')

    cy.url().should('include', '/cats')
    cy.get('h1').contains('View your cats')

    !cy.get('td').contains(cat.name)
    !cy.get('td').contains(cat.description)
  }

  function manageCats_filterByNameAndCheckCatExist (cat: Cat) {
    cy.get('input[name="query"]').focus().clear().type(cat.name)
    cy.get('button')
      .contains('Search')
      .click()
    cy.get('td').contains(cat.name)
    cy.get('td').contains(cat.description)
  }

  function manageCats_filterByDescriptionAndCheckCatExist (cat: Cat) {
    cy.get('input[name="query"]').focus().clear().type(cat.description)
    cy.get('button')
      .contains('Search')
      .click()
    cy.get('td').contains(cat.name)
    cy.get('td').contains(cat.description)
  }

  function manageCats_clickOnCatAndCheckBasicData (cat: Cat) {
    cy.contains(cat.description)
      .parents('tr')
      .find('a')
      .click()

    cy.log('--- View Cat ---')

    cy.get('h1').contains('Your cat ' + cat.name)

    cy.get('td').contains(cat.name)
    cy.get('td').contains(cat.description)
    cy.get('td').contains('MAMMALS')
  }

  function viewCat_fetchCatID () {
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
  }

  function viewCat_editCatDetailsButClickCancel (cat: Cat) {
    cy.get('a')
      .contains('Edit Cat details')
      .click()

    cy.log('--- Edit Cat ---')

    cy.get('h1').contains('Edit Cat details')
    cy.get('input[name="name"]').should('have.value', cat.name)
    cy.get('input[name="description"]').should('have.value', cat.description)

    cy.get('@ID')
      .then(ID => {
        cy.url().should('include', `/cats/${ ID }/edit`)
      })

    cy.get('button')
      .contains('Cancel')
      .click()
  }

  function viewCat_editCatDetailsAndSave (cat: Cat) {
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
    cy.get('input[name="name"]').should('have.value', cat.name)
    cy.get('input[name="description"]').should('have.value', cat.description)

    cy.get('input[name="name"]').type(' - Name updated')
    cy.get('input[name="description"]').type(' - Description updated')

    cy.get('button')
      .contains('Save')
      .click()
  }

  function manageCats_checkCatBeenUpdated (cat: Cat) {
    cy.log('--- Manage Cats ---')

    cy.url().should('include', '/cats')
    cy.get('h1').contains('View your cats')

    cy.get('td').contains(cat.name + ' - Name updated')
    cy.get('td').contains(cat.description + ' - Description updated')
  }

  function manageCat_selectCatToViewAndDelete (cat: Cat) {
    cy.contains(cat.description + ' - Description updated')
      .parents('tr')
      .find('a')
      .click()

    cy.log('--- View Cat ---')

    cy.get('h1').contains('Your cat ' + cat.name)

    cy.get('td').contains(cat.name + ' - Name updated')
    cy.get('td').contains(cat.description + ' - Description updated')

    cy.get('button')
      .contains('Delete Cat')
      .click()

    cy.on('window:confirm', () => true);
  }

})

export {}
