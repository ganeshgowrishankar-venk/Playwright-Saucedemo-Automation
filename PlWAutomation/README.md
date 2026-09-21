# Sauce Demo Playwright POM Framework

Reusable JavaScript Playwright tests for https://www.saucedemo.com using a page object model.

## Setup

```powershell
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env` when you need environment-specific values. The framework reads `BASE_URL`, `HEADLESS`, and each user password from environment variables. User credentials live in `data/users.js`; checkout information lives in `data/checkoutData.js`; product selection lives in `data/products.js`.

## Run tests

```powershell
npm test
npm run test:headed
npm run test:ui
npm run report
```

## Structure

- `pages/`: reusable page objects and business actions
- `fixtures/`: Playwright fixtures that inject page objects into tests
- `data/`: configurable users, checkout details, and products
- `config/`: environment configuration
- `tests/`: readable scenario specifications

The supplied Sauce Demo variant accounts are covered according to the application's behavior: `locked_out_user` is expected to be rejected, while `problem_user`, `performance_glitch_user`, and `error_user` use valid credentials but exercise known variant behavior.
