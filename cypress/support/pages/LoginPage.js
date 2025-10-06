export class LoginPage {
    elements = {
        logo: () => cy.get('.login_logo'),
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
    }

    visit(){
        cy.visit('/')
    }

    verifyPageLoaded(){
        this.elements.logo().should('be.visible')
        this.elements.logo().should('contain.text','Swag Labs')
    }

    login(username, password){
        this.elements.usernameInput().type(username)
        this.elements.passwordInput().type(password)
        this.elements.loginButton().click()
    }
    verifyErrorMessage(message) {
    this.elements.errorMessage().should('be.visible')
    this.elements.errorMessage().should('contain.text', message)
  }
}