// playwright.config.js
// This file controls how Playwright runs your tests.
// You can configure browsers, timeouts, base URLs, and reporting here.

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Directory where test files live
  testDir: './tests',

  // Run all tests in parallel for speed
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only() in a test file
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI (helps with flaky network/timing issues)
  retries: process.env.CI ? 1 : 0,

  // Limit parallel workers on CI to avoid resource issues
  workers: process.env.CI ? 2 : undefined,

  // Reporter: 'html' generates a visual test report you can open in a browser
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // Base URL for all tests — change this if you want to test a different site
    baseURL: 'https://demo.playwright.dev',

    // Capture a screenshot automatically when a test fails
    screenshot: 'only-on-failure',

    // Record a video on the first retry of a failed test
    video: 'on-first-retry',

    // Wait up to 10 seconds for actions like click() or fill() before failing
    actionTimeout: 10_000,
  },

  // Define which browsers to run tests in
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // Uncomment to also run in WebKit (Safari engine)
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
