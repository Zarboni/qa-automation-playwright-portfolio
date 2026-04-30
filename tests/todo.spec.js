// tests/todo.spec.js
//
// These tests cover the core functionality of the TodoMVC demo app.
// They are organized into logical groups using test.describe() blocks.
//
// What this demonstrates for a portfolio:
//  - Page Object Model usage
//  - Assertions with expect()
//  - Test grouping and isolation
//  - Realistic test scenarios a QA engineer would write

const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../pages/TodoPage');

// Use beforeEach so each test starts fresh on the todo page.
// Test isolation is a QA best practice — tests should not depend on each other.
let todoPage;

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page);
  await todoPage.goto();
});

// ─── Adding Todos ────────────────────────────────────────────────────────────

test.describe('Adding todos', () => {
  test('should add a single todo item', async () => {
    await todoPage.addTodo('Buy groceries');

    // Verify the item appears in the list
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Buy groceries');
  });

  test('should add multiple todo items', async () => {
    await todoPage.addMultipleTodos(['Task one', 'Task two', 'Task three']);

    // All three should appear
    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test('should show correct item count after adding todos', async () => {
    await todoPage.addMultipleTodos(['First item', 'Second item']);

    // The footer should show "2 items left"
    const countText = await todoPage.getItemsLeftText();
    expect(countText).toContain('2');
  });

  test('should not add an empty todo', async () => {
    // Press Enter without typing anything — no item should be added
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.todoItems).toHaveCount(0);
  });
});

// ─── Completing Todos ─────────────────────────────────────────────────────────

test.describe('Completing todos', () => {
  test('should mark a todo as complete', async () => {
    await todoPage.addTodo('Write tests');
    await todoPage.completeTodo('Write tests');

    // The item should have the 'completed' class applied
    const item = todoPage.todoItems.first();
    await expect(item).toHaveClass(/completed/);
  });

  test('should update item count when a todo is completed', async () => {
    await todoPage.addMultipleTodos(['Task A', 'Task B']);
    await todoPage.completeTodo('Task A');

    // One item is done, so count shows 1 remaining
    const countText = await todoPage.getItemsLeftText();
    expect(countText).toContain('1');
  });

  test('should mark all todos as complete with toggle-all', async () => {
    await todoPage.addMultipleTodos(['Item 1', 'Item 2', 'Item 3']);
    await todoPage.toggleAll();

    // Every item should now be completed
    const items = todoPage.todoItems;
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveClass(/completed/);
    }
  });
});

// ─── Deleting Todos ───────────────────────────────────────────────────────────

test.describe('Deleting todos', () => {
  test('should delete a todo item', async () => {
    await todoPage.addMultipleTodos(['Keep this', 'Delete this']);
    await todoPage.deleteTodo('Delete this');

    // Only one item should remain
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Keep this');
  });

  test('should clear all completed todos', async () => {
    await todoPage.addMultipleTodos(['Done item', 'Active item']);
    await todoPage.completeTodo('Done item');
    await todoPage.clearCompleted();

    // Only the active item should remain
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Active item');
  });
});

// ─── Filtering Todos ──────────────────────────────────────────────────────────

test.describe('Filtering todos', () => {
  test.beforeEach(async () => {
    // Set up a mix of active and completed items before each filter test
    await todoPage.addMultipleTodos(['Active task', 'Completed task']);
    await todoPage.completeTodo('Completed task');
  });

  test('should show only active todos when Active filter is selected', async () => {
    await todoPage.filterByActive();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Active task');
  });

  test('should show only completed todos when Completed filter is selected', async () => {
    await todoPage.filterByCompleted();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Completed task');
  });

  test('should show all todos when All filter is selected', async () => {
    await todoPage.filterByActive();    // go to a different filter first
    await todoPage.filterByAll();       // then return to All

    await expect(todoPage.todoItems).toHaveCount(2);
  });
});
