# QA Automation Portfolio — Playwright + JavaScript

A beginner-friendly QA automation project built with [Playwright](https://playwright.dev/) and JavaScript. Created as a portfolio project for QA Engineer, Application Support, and Technical Support roles.

---

## What this project covers

| Concept | Where to find it |
|---|---|
| Page Object Model (POM) | `pages/` |
| UI test automation | `tests/` |
| Test grouping and isolation | `tests/todo.spec.js` |
| Assertions | `tests/*.spec.js` |
| Cross-browser testing | `playwright.config.js` |
| CI/CD pipeline | `.github/workflows/playwright.yml` |

---

## Project structure

```
qa-automation-playwright-portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml     # GitHub Actions CI pipeline
├── pages/
│   ├── BasePage.js            # Shared page methods (navigation, title)
│   └── TodoPage.js            # Page Object for the TodoMVC app
├── tests/
│   ├── todo.spec.js           # Tests: adding, completing, deleting, filtering
│   └── navigation.spec.js     # Tests: page load, title, URL, visibility
├── playwright.config.js       # Playwright configuration
├── package.json
└── README.md
```

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/qa-automation-playwright-portfolio.git
cd qa-automation-playwright-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Run the tests

```bash
# Run all tests (headless, in Chromium and Firefox)
npm test

# Run tests in headed mode (watch the browser)
npm run test:headed

# Open the interactive Playwright UI
npm run test:ui
```

### 5. View the HTML report

```bash
npm run test:report
```

---

## Test site

Tests run against **[TodoMVC (React)](https://demo.playwright.dev/todomvc)** — an official Playwright demo app. It is a simple to-do list application that exercises common UI patterns: forms, checkboxes, dynamic content, and filtering.

---

## CI/CD

Every push and pull request automatically triggers the GitHub Actions workflow at `.github/workflows/playwright.yml`. It:

1. Installs Node.js and dependencies
2. Installs Chromium and Firefox
3. Runs all tests
4. Uploads the HTML report as a downloadable artifact

---

## Key concepts explained

### Page Object Model (POM)

The POM pattern separates test logic from page interaction code. Instead of writing selectors directly in tests, you define them once in a Page Object class and call named methods in your tests.

**Without POM:**
```js
await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
await page.getByPlaceholder('What needs to be done?').press('Enter');
```

**With POM:**
```js
await todoPage.addTodo('Buy milk');
```

This makes tests easier to read and much easier to maintain when the UI changes.

### Test isolation

Each test starts fresh using `beforeEach`, so a failure in one test cannot affect others. This is a critical QA practice.

### Assertions

Playwright's `expect()` API is used to verify outcomes:

```js
await expect(todoPage.todoItems).toHaveCount(3);
await expect(item).toHaveClass(/completed/);
await expect(page).toHaveURL(/.*todomvc/);
```

---

## Skills demonstrated

- Playwright test automation (JavaScript)
- Page Object Model design pattern
- Cross-browser test execution (Chromium, Firefox)
- CI/CD with GitHub Actions
- Test organization, grouping, and isolation
- Reading and writing HTML test reports
