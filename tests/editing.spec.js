// tests/editing.spec.js
//
// These tests cover the inline editing behaviour of the TodoMVC app.
// Editing is triggered by double-clicking a todo label, which reveals
// an editable text input. Changes are saved with Enter and cancelled with Escape.

const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../pages/TodoPage');

let todoPage;

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page);
  await todoPage.goto();
});

test.describe('Editing todos', () => {
  test('should update a todo item with new text', async () => {
    await todoPage.addTodo('Original text');
    await todoPage.editTodo('Original text', 'Updated text');

    // The item should now display the updated text
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Updated text');
  });

  test('should not show the old text after a successful edit', async () => {
    await todoPage.addTodo('Old task name');
    await todoPage.editTodo('Old task name', 'New task name');

    // The original text must be completely replaced
    await expect(todoPage.todoItems.first()).not.toContainText('Old task name');
  });

  test('should restore original text when edit is cancelled with Escape', async () => {
    await todoPage.addTodo('Do not change me');
    await todoPage.cancelEditTodo('Do not change me');

    // Escape cancels the edit — original text must be preserved
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Do not change me');
  });

  test('should be able to edit multiple different items', async () => {
    await todoPage.addMultipleTodos(['First item', 'Second item', 'Third item']);

    await todoPage.editTodo('First item', 'First item (edited)');
    await todoPage.editTodo('Third item', 'Third item (edited)');

    // First and third should be updated; second should be unchanged
    await expect(todoPage.todoItems).toHaveCount(3);
    await expect(todoPage.todoItems.nth(0)).toContainText('First item (edited)');
    await expect(todoPage.todoItems.nth(1)).toContainText('Second item');
    await expect(todoPage.todoItems.nth(2)).toContainText('Third item (edited)');
  });
});
