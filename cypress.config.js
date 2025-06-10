import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'esvdj5',
  e2e: {
    baseUrl: 'http://localhost:4173',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 4000,
    requestTimeout: 4000,
    responseTimeout: 4000,
    pageLoadTimeout: 10000,
    watchForFileChanges: false,
    experimentalStudio: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      coverage: false
    }
  }
})

