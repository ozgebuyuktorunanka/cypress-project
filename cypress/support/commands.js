/**
 * THIS FILE IS INCLUDED REUSABLE CUSTOM COMMANDS
 */

// Login command
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-cy=username]').type(username)
    cy.get('[data-cy=password]').type(password)
    cy.get('[data-cy=submit]').click()
    cy.url().should('not.include', '/login')
  })
})

// Element selection with Data attribute
Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-cy=${selector}]`)
})

// File upload command
Cypress.Commands.add('uploadFile', (fileName, selector) => {
  cy.get(selector).selectFile(`tests/fixtures/${fileName}`)
})

// Take API Token
Cypress.Commands.add('getAuthToken', () => {
  cy.request('POST', '/api/auth/login', {
    username: Cypress.env('TEST_USER'),
    password: Cypress.env('TEST_PASSWORD')
  }).then((response) => {
    window.localStorage.setItem('authToken', response.body.token)
  })
})

// Control the table information
Cypress.Commands.add('validateTableData', (tableSelector, expectedData) => {
  cy.get(`${tableSelector} tbody tr`).should('have.length', expectedData.length)
  
  expectedData.forEach((row, index) => {
    cy.get(`${tableSelector} tbody tr`).eq(index).within(() => {
      Object.values(row).forEach((cellValue) => {
        cy.contains('td', cellValue).should('exist')
      })
    })
  })
})

// Waitfor element to be stable
Cypress.Commands.add('waitForAnimation', (selector) => {
  cy.get(selector).should('exist')
  cy.wait(300) // Kısa bekleme
  cy.get(selector).should('not.have.class', 'animating')
})

//Page Loading and Navigation Wait Process
Cypress.Commands.add('waitForPageChange',(expectedUrl)=>{
  cy.url().should('include',expectedUrl)
  cy.get('body').should('be.visible')
})