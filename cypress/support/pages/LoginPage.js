export class LoginPage {
    elements = {
        logo: () => cy.get(".login_logo"),
        usernameInput: () => cy.get('#user-name'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#login-button'),
        errorMessage: () => cy.get('div.error-message-container.error'),
        productsTitle: () => cy.get('span.title'),
    };
    visit() {
        cy.visit("/");
    }

    verifyLogoVisible() {
        this.elements.logo().should("be.visible");
        this.elements.logo().should("contain.text", "Swag Labs");
    }

    fillUsername(username) {
        this.elements.usernameInput().type(username);
    }

    seeUsername() {
        this.elements.usernameInput().should("be.visible");
    }

    fillPassword(password) {
        this.elements.passwordInput().type(password);
    }

    seePassword() {
        this.elements.passwordInput().should("be.visible");
    }

    seeLoginButton() {
        this.elements.loginButton().should("be.visible");
    }

    clickLoginButton() {
        this.elements.loginButton().click();
    }

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLoginButton();
        this.verifyNavigationToInventory();
    }
    verifyErrorMessage(message) {
        this.elements.errorMessage().should('be.visible')
        this.elements.errorMessage().should('contain.text', message)
    }

    verifyInventoryPage() {
        cy.url().should("include", "/inventory.html");
        this.elements.productsTitle().should("contain.text", "Products");
    }
}




/**
 * DIPNOTE FOR ME:
 * alternative login method with using API request tracking
 * We can catch API request with cy.intercept.
 * and then we can click the login button
 * We can wait until done all process.
 * after this, wait until page loaded. you can use interception...
 *
 */
