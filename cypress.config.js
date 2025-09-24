const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Base URL
    baseUrl: 'https://www.saucedemo.com',
    
    // Screenshot settings
    screenshotOnRunFailure: false,
    
    // Viewport sizes
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Timeouts (ms)
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Test's retry count, we can set here.
    retries: {
      runMode: 2,
      openMode: 0
    },
  }
})