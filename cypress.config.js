const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://reqres.in',
    defaultCommandTimeout: 10000,
    video: false,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    screenshotOnRunFailure: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      if (process.env.REQRES_API_KEY) {
        config.env.API_KEY = process.env.REQRES_API_KEY
      }
      return config
    },
  },
})
