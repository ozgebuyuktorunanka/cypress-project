import { LoginPage } from "../support/pages/LoginPage"

describe('Saucedemo Tests', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visit('/') 
  })

  it('Control if the login page is loaded.', () => {
    loginPage.verifyPageLoaded()
    loginPage.elements.usernameInput().should('be.visible')
    loginPage.elements.passwordInput().should('be.visible')
    loginPage.elements.loginButton().should('be.visible')
  })

  it('Succesfully Login', () => {
    loginPage.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory.html')
  })

  it('Wrong Login Process', () => {
    loginPage.login('wrong_user', 'wrong_password')
    loginPage.verifyErrorMessage('Username and password do not match')
    })
})
