import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { LoginPage } from '../../support/pages/LoginPage'

const loginPage = new LoginPage()
const selectors = loginPage.elements

Given('I navigate to Saucedemo website', () => {
    loginPage.visit()
})

Then('I should see the Swag Labs logo', () => {
    loginPage.verifyLogoVisible()
})

Then('I should see username input field', () => {
    loginPage.seeUsername()
})

Then('I should see password input field', () => {
    loginPage.seePassword()
})

Then('I should see login button', () => {
    loginPage.seeLoginButton()
})

When('I enter username {string}', (username) => {
    loginPage.fillUsername(username)
})


When('I enter password {string}', (password) => {
    loginPage.fillPassword(password)
})


Then('I click on login button', () => {
    loginPage.clickLoginButton()
})


Then('I should be redirected to inventory page', () => {
    cy.url().should('include', '/inventory.html')
})


Then('I should see {string} title', (title) => {
    cy.get(selectors.productsTitle).should('contain.text', title)
})


Then('I should see error message {string}', (context) => {
    loginPage.verifyErrorMessage(context)
})


Then('I should see {string}', (text) => {
    cy.contains(text).should('be.visible')
})
