// pages/TodoPage.js
//
// This is a Page Object for the TodoMVC demo app at:
// https://demo.playwright.dev/todomvc
//
// Page Objects wrap all the UI interactions for a specific page into
// clean, reusable methods. Your test files call these methods instead
// of writing raw Playwright selectors directly in the tests.
// This makes tests easier to read and maintain.

const { BasePage } = require('./BasePage');

class TodoPage extends BasePage {
  constructor(page) {
    // Call the parent BasePage constructor so we get this.page
    super(page);

    // Define all the locators (selectors) for this page in one place.
    // If the app's HTML changes, you only update these — not every test.
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.toggleAllCheckbox = page.getByLabel('Mark all as complete');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.todoCount = page.getByTestId('todo-count');
    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
  }

  /**
   * Go to the TodoMVC app
   */
  async goto() {
    await this.navigate('/todomvc');
  }

  /**
   * Add a new todo item by typing into the input and pressing Enter
   * @param {string} text - The todo text to add
   */
  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Add multiple todos at once from an array of strings
   * @param {string[]} items - Array of todo texts to add
   */
  async addMultipleTodos(items) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  /**
   * Mark a specific todo item as complete by clicking its checkbox
   * @param {string} text - The exact text of the todo to complete
   */
  async completeTodo(text) {
    const item = this.page.getByTestId('todo-item').filter({ hasText: text });
    await item.getByRole('checkbox').check();
  }

  /**
   * Delete a todo by hovering over it to reveal the delete button, then clicking it
   * @param {string} text - The exact text of the todo to delete
   */
  async deleteTodo(text) {
    const item = this.page.getByTestId('todo-item').filter({ hasText: text });
    // The delete button only appears on hover, so we hover first
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
  }

  /**
   * Edit a todo item inline by double-clicking and typing new text
   * @param {string} originalText - The current text of the todo
   * @param {string} newText - The new text to replace it with
   */
  async editTodo(originalText, newText) {
    const item = this.page.getByTestId('todo-item').filter({ hasText: originalText });
    await item.getByRole('textbox', { name: 'Edit' }).dblclick();
    const editInput = this.page.getByRole('textbox', { name: 'Edit' });
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  /**
   * Get the number of todos currently in the list
   * @returns {Promise<number>}
   */
  async getTodoCount() {
    return this.todoItems.count();
  }

  /**
   * Get the text shown in the footer item count (e.g. "2 items left")
   * @returns {Promise<string>}
   */
  async getItemsLeftText() {
    return this.todoCount.textContent();
  }

  /**
   * Filter the list to show only Active todos
   */
  async filterByActive() {
    await this.filterActive.click();
  }

  /**
   * Filter the list to show only Completed todos
   */
  async filterByCompleted() {
    await this.filterCompleted.click();
  }

  /**
   * Filter the list to show All todos
   */
  async filterByAll() {
    await this.filterAll.click();
  }

  /**
   * Mark all todos as complete using the toggle-all checkbox
   */
  async toggleAll() {
    await this.toggleAllCheckbox.check();
  }

  /**
   * Click the "Clear completed" button to remove all completed todos
   */
  async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}

module.exports = { TodoPage };
