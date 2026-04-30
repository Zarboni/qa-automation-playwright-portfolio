# Manual Test Cases — TodoMVC (React)

**Application:** TodoMVC React  
**URL:** https://demo.playwright.dev/todomvc  
**Tester:** Faiz Carstens  
**Version:** 1.0  

---

## How to read this document

| Column | Description |
|---|---|
| TC ID | Unique test case identifier |
| Title | Short description of what is being tested |
| Precondition | State the app must be in before the test starts |
| Steps | Numbered actions to perform |
| Expected Result | What the app should do if it is working correctly |
| Priority | High / Medium / Low based on business impact |

---

## TC-001 — TC-005: Adding Todos

### TC-001: Add a single todo item

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | TodoMVC app is open. The todo list is empty. |
| **Steps** | 1. Click the input field labelled "What needs to be done?" <br> 2. Type "Buy groceries" <br> 3. Press **Enter** |
| **Expected Result** | "Buy groceries" appears as a new item in the list. The footer shows "1 item left". |

---

### TC-002: Add multiple todo items in sequence

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | TodoMVC app is open. The todo list is empty. |
| **Steps** | 1. Type "Task one" in the input and press **Enter** <br> 2. Type "Task two" in the input and press **Enter** <br> 3. Type "Task three" in the input and press **Enter** |
| **Expected Result** | All three items appear in the list in the order they were added. The footer shows "3 items left". |

---

### TC-003: Input field is cleared after adding a todo

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Precondition** | TodoMVC app is open. |
| **Steps** | 1. Type "Clean the desk" in the input <br> 2. Press **Enter** |
| **Expected Result** | The item is added to the list and the input field is empty and ready for the next entry. |

---

### TC-004: Empty input does not create a todo

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | TodoMVC app is open. The todo list is empty. |
| **Steps** | 1. Click the input field without typing anything <br> 2. Press **Enter** |
| **Expected Result** | No item is added to the list. The list remains empty. The footer does not appear. |

---

### TC-005: Whitespace-only input does not create a todo

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Precondition** | TodoMVC app is open. The todo list is empty. |
| **Steps** | 1. Click the input field <br> 2. Press the **Space** key three times <br> 3. Press **Enter** |
| **Expected Result** | No item is added. The list remains empty. |

---

## TC-006 — TC-009: Completing Todos

### TC-006: Mark a single todo as complete

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | One todo item exists in the list. |
| **Steps** | 1. Click the circular checkbox to the left of the todo item |
| **Expected Result** | The item text has a strikethrough style. The item has a visual "completed" state. The footer count decreases by 1. |

---

### TC-007: Unmark a completed todo as active

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | One todo item exists and is already marked as complete. |
| **Steps** | 1. Click the checkbox of the completed todo item to uncheck it |
| **Expected Result** | The strikethrough is removed. The item returns to its active state. The footer count increases by 1. |

---

### TC-008: Mark all todos as complete using the toggle-all control

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Precondition** | At least two active todo items exist in the list. |
| **Steps** | 1. Click the downward-pointing chevron / "Mark all as complete" control to the left of the input field |
| **Expected Result** | All items are marked as complete with strikethrough text. The footer shows "0 items left". |

---

### TC-009: Item count updates correctly after completing a todo

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Precondition** | Three active todo items exist. Footer shows "3 items left". |
| **Steps** | 1. Complete one todo by clicking its checkbox |
| **Expected Result** | The footer updates to show "2 items left". |

---

## TC-010 — TC-012: Deleting Todos

### TC-010: Delete a single todo item

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | Two todo items exist in the list. |
| **Steps** | 1. Hover the mouse cursor over the todo item to be deleted <br> 2. Click the **×** button that appears on the right side of the item |
| **Expected Result** | The item is removed from the list. The remaining item is still visible. |

---

### TC-011: Delete button only appears on hover

| Field | Detail |
|---|---|
| **Priority** | Low |
| **Precondition** | At least one todo item exists. |
| **Steps** | 1. Without hovering, observe the todo item <br> 2. Move the cursor over the todo item |
| **Expected Result** | The delete (**×**) button is not visible by default. It appears only when hovering over the item. |

---

### TC-012: Clear all completed todos at once

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | At least one todo is marked as complete. At least one todo is still active. |
| **Steps** | 1. Click the **"Clear completed"** button in the footer |
| **Expected Result** | All completed items are removed. Active items remain in the list. The "Clear completed" button disappears. |

---

## TC-013 — TC-015: Editing Todos

### TC-013: Edit a todo item inline

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | One todo item exists with the text "Original text". |
| **Steps** | 1. Double-click the todo item text <br> 2. Clear the existing text <br> 3. Type "Updated text" <br> 4. Press **Enter** |
| **Expected Result** | The item now displays "Updated text". The list still shows 1 item. |

---

### TC-014: Cancel editing with Escape key restores original text

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | One todo item exists with the text "Do not change me". |
| **Steps** | 1. Double-click the todo item text to enter edit mode <br> 2. Change the text to "Something else" <br> 3. Press **Escape** before pressing Enter |
| **Expected Result** | The edit is cancelled. The item still shows the original text "Do not change me". |

---

### TC-015: Edit mode is exited when clicking outside the item

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Precondition** | One todo item is currently in edit mode. |
| **Steps** | 1. While in edit mode, click anywhere outside the todo item (e.g. the page heading) |
| **Expected Result** | The edited text is saved and edit mode is exited. |

---

## TC-016 — TC-020: Filtering Todos

### TC-016: "Active" filter shows only incomplete todos

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | Two todos exist: one active ("Active task"), one completed ("Completed task"). |
| **Steps** | 1. Click the **"Active"** link in the footer |
| **Expected Result** | Only "Active task" is shown. "Completed task" is hidden. |

---

### TC-017: "Completed" filter shows only finished todos

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | Two todos exist: one active ("Active task"), one completed ("Completed task"). |
| **Steps** | 1. Click the **"Completed"** link in the footer |
| **Expected Result** | Only "Completed task" is shown. "Active task" is hidden. |

---

### TC-018: "All" filter restores the full list view

| Field | Detail |
|---|---|
| **Priority** | High |
| **Precondition** | The "Active" filter is currently selected. Two todos exist (one active, one completed). |
| **Steps** | 1. Click the **"All"** link in the footer |
| **Expected Result** | Both todos are visible. The "All" link is highlighted as the active filter. |

---

### TC-019: Active filter shows correct count even when filter is applied

| Field | Detail |
|---|---|
| **Priority** | Medium |
| **Precondition** | Three todos exist: two active, one completed. |
| **Steps** | 1. Click the **"Active"** filter |
| **Expected Result** | Two items are displayed. The footer still shows "2 items left" (the total active count, not the items on screen). |

---

### TC-020: Filter selection is highlighted in the footer

| Field | Detail |
|---|---|
| **Priority** | Low |
| **Precondition** | At least one todo exists. |
| **Steps** | 1. Click **"All"** and observe the footer <br> 2. Click **"Active"** and observe <br> 3. Click **"Completed"** and observe |
| **Expected Result** | The currently selected filter link has a visible border/highlight. The other two links have no highlight. |
