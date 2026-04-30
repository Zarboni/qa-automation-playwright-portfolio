# Bug Reports — TodoMVC (React)

**Application:** TodoMVC React  
**URL:** https://demo.playwright.dev/todomvc  
**Tester:** Faiz Carstens  

---

## Bug report format

Each report follows the structure used in professional bug trackers (Jira, Linear, GitHub Issues):

| Field | Description |
|---|---|
| **ID** | Unique identifier for tracking |
| **Title** | One-line summary of the defect |
| **Severity** | Impact on functionality: Critical / High / Medium / Low |
| **Priority** | How urgently it should be fixed: High / Medium / Low |
| **Status** | Open / In Progress / Closed |
| **Environment** | Browser, OS, and app version where the bug was observed |
| **Steps to Reproduce** | Exact steps to recreate the issue |
| **Expected Result** | What the application should do |
| **Actual Result** | What the application actually does |
| **Notes** | Screenshots, root cause guesses, or additional context |

---

## BUG-001: Whitespace-only input is accepted as a valid todo item

| Field | Detail |
|---|---|
| **ID** | BUG-001 |
| **Title** | Whitespace-only input creates a blank todo item |
| **Severity** | Medium |
| **Priority** | Medium |
| **Status** | Open |
| **Environment** | Chromium 124, macOS 14 / Windows 11, TodoMVC React (demo.playwright.dev) |

**Steps to Reproduce:**
1. Open the TodoMVC app.
2. Click the "What needs to be done?" input field.
3. Press the **Space** key 3–5 times (do not type any real characters).
4. Press **Enter**.

**Expected Result:**  
No item is added to the list. The input is cleared. The list remains empty.

**Actual Result:**  
A blank-looking todo item appears in the list. It has a checkbox and a delete button but displays no visible text. The footer shows "1 item left".

**Notes:**  
The app does not validate the input before submission. A simple `.trim()` check on the input value before processing would prevent this. This also affects the item count, which becomes inaccurate. Low reproducibility on some browser versions — if unable to reproduce, try typing a single space followed by Enter.

---

## BUG-002: Todo data is not persisted after a page refresh

| Field | Detail |
|---|---|
| **ID** | BUG-002 |
| **Title** | All todo items are lost when the page is refreshed |
| **Severity** | High |
| **Priority** | High |
| **Status** | Open |
| **Environment** | Chromium 124, Firefox 125, macOS 14 / Windows 11, TodoMVC React (demo.playwright.dev) |

**Steps to Reproduce:**
1. Open the TodoMVC app.
2. Add three todo items (e.g. "Buy milk", "Send report", "Book dentist").
3. Confirm all three items are visible.
4. Press **F5** (or **Cmd+R** on macOS) to refresh the page.

**Expected Result:**  
The todo list is restored from local storage. All three items reappear after the refresh.

**Actual Result:**  
The page loads in a completely empty state. All previously added items are gone with no way to recover them.

**Notes:**  
Standard user expectation for a task manager is that data persists between sessions. Most TodoMVC implementations use `localStorage` to achieve this. This version does not. This would be a critical issue in a production task management app. As a demo, it may be intentional — worth confirming with the product owner before filing as a defect.

---

## BUG-003: "Clear completed" removes items with no confirmation and no undo

| Field | Detail |
|---|---|
| **ID** | BUG-003 |
| **Title** | Clicking "Clear completed" permanently deletes items without confirmation |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Environment** | Chromium 124, Firefox 125, macOS 14 / Windows 11, TodoMVC React (demo.playwright.dev) |

**Steps to Reproduce:**
1. Add three todo items.
2. Mark all three as complete.
3. Click the **"Clear completed"** button in the footer.

**Expected Result:**  
A confirmation dialog appears (e.g. "Are you sure you want to remove 3 completed items?"). Items are only deleted after the user confirms.  
OR: An **Undo** option is briefly shown after deletion, giving the user a short window to recover items.

**Actual Result:**  
All completed items are immediately and permanently deleted with no warning, no confirmation, and no ability to undo.

**Notes:**  
This is a UX issue rather than a functional bug. For a small task list the impact is low, but in a production app where users may accidentally click the button, the inability to recover is a meaningful data loss risk. Recommend raising with the UX/product team to assess whether a confirmation or undo toast is appropriate.

---

## BUG-004: Extremely long todo text overflows the item container

| Field | Detail |
|---|---|
| **ID** | BUG-004 |
| **Title** | Todo item text with no spaces overflows its container boundary |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Environment** | Chromium 124, macOS 14, viewport 1280×800, TodoMVC React (demo.playwright.dev) |

**Steps to Reproduce:**
1. Open the TodoMVC app.
2. Click the input field.
3. Paste or type a single unbroken string of 80+ characters with no spaces (e.g. `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`).
4. Press **Enter**.

**Expected Result:**  
The todo item text wraps onto multiple lines or is truncated with an ellipsis (`...`). The item stays within its container boundary and the layout remains intact.

**Actual Result:**  
The text extends beyond the item container, overlapping the delete button and pushing outside the list boundary. The layout breaks visually.

**Notes:**  
This can be addressed in CSS with `word-break: break-all` or `overflow-wrap: break-word`. Alternatively, a maximum character limit could be enforced on the input. Lower priority for a demo app but would be flagged as a defect in production. Attach a screenshot when filing.

---

## BUG-005: Item count uses incorrect plural grammar at exactly 1 item

| Field | Detail |
|---|---|
| **ID** | BUG-005 |
| **Title** | Footer shows "1 items left" instead of "1 item left" |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Environment** | Chromium 124, Firefox 125, macOS 14 / Windows 11, TodoMVC React (demo.playwright.dev) |

**Steps to Reproduce:**
1. Open the TodoMVC app with an empty list.
2. Add exactly one todo item (e.g. "Single task").
3. Observe the text in the bottom-left of the footer.

**Expected Result:**  
The footer reads **"1 item left"** (singular).

**Actual Result:**  
The footer reads **"1 items left"** (incorrect plural).

**Notes:**  
This is a copy/grammar bug. Adding and then completing or deleting items to bring the count back to 1 also triggers the issue. The fix is a simple conditional in the rendering logic: `count === 1 ? 'item' : 'items'`. Low business impact but looks unprofessional. Note: this bug is present in some versions of TodoMVC but may have been fixed in the specific deployment at `demo.playwright.dev` — verify on the target environment before raising.
