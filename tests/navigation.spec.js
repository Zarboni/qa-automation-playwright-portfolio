// tests/navigation.spec.js
//
// These tests verify basic page-level behavior: loading, title, and URL.
// Even simple checks like these matter in a QA role — they catch broken
// deployments, missing redirects, and misconfigured environments early.

const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../pages/TodoPage');

test.describe('Page navigation and load checks', () => {
  test('should load the TodoMVC app successfully', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    // Confirm the page loaded with the expected title
    const title = await todoPage.getTitle();
    expect(title).toContain('React');
  });

  test('should display the main heading', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    // The "todos" heading should be visible to the user
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  });

  test('should show the todo input field on load', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    // The input must be visible and ready for the user to type
    await expect(todoPage.newTodoInput).toBeVisible();
    await expect(todoPage.newTodoInput).toBeEnabled();
  });

  test('should have the correct URL', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    // Verify the URL contains the expected path
    await expect(page).toHaveURL(/.*todomvc/);
  });
});
