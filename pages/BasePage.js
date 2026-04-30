// pages/BasePage.js
//
// The BasePage holds common actions that every page shares.
// All other page objects extend this class so they don't repeat the same code.
// This is a core part of the Page Object Model (POM) pattern.

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright's page object,
   * which represents a single browser tab.
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the baseURL set in playwright.config.js
   * Example: navigate('/todomvc') goes to https://demo.playwright.dev/todomvc
   */
  async navigate(path) {
    await this.page.goto(path);
  }

  /**
   * Get the current page title (the <title> tag in the HTML)
   */
  async getTitle() {
    return this.page.title();
  }

  /**
   * Wait for the page to finish loading all network requests.
   * Useful after navigating or submitting forms.
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { BasePage };
