const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin} = require ('@badeball/cypress-cucumber-preprocessor/esbuild') 

module.exports = defineConfig({
  e2e: {
    // Base URL
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',

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

    // Look for all Gherkin feature files anywhere under the project

    // Setup code that runs in Node before the tests. This is required by the Cucumber preprocessor.
    async setupNodeEvents(on, config) {
      // Register the Cucumber (Gherkin) preprocessor so Cypress can understand .feature files
      await addCucumberPreprocessorPlugin(on, config)

      // Use esbuild to bundle spec files and enable the Cucumber plugin during preprocessing
      on(
        'file:preprocessor',
           createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )

      // Return the updated configuration so Cypress can use the plugin settings
      return config
    },
  },
})