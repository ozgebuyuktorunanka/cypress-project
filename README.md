# Cypress E2E Test Automation Framework

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![Node version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust end-to-end testing framework built with Cypress for automated web application testing. This framework provides a scalable structure for UI automation testing with support for multiple environments, custom commands, and comprehensive reporting.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [CI/CD Integration](#-cicd-integration)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download & Install Node.js](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download & Install Git](https://git-scm.com/)

Verify installations:
```bash
node --version
npm --version
git --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/cypress-automation.git
cd cypress-automation
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

### 3. Verify Installation

Open Cypress Test Runner:
```bash
npm run cy:open
```

## 📁 Project Structure

```
cypress-automation/
├── .github/
│   └── workflows/           # GitHub Actions CI/CD workflows
├── cypress/
│   ├── e2e/                 # Test specifications
│   │   ├── smoke/           # Smoke test suite
│   │   ├── regression/      # Regression test suite
│   │   └── integration/     # Integration test suite
│   ├── fixtures/            # Test data files
│   ├── support/             # Support files and custom commands
│   │   ├── commands.js      # Custom Cypress commands
│   │   ├── e2e.js          # Global hooks and configuration
│   │   └── utils/          # Utility functions
│   ├── downloads/          # Downloaded files during tests
│   └── screenshots/        # Test failure screenshots
├── config/
│   ├── cypress.dev.json    # Development environment config
│   ├── cypress.staging.json # Staging environment config
│   └── cypress.prod.json   # Production environment config
├── reports/                # Test execution reports
├── .env.example           # Environment variables template
├── .gitignore
├── cypress.config.js      # Main Cypress configuration
├── package.json
└── README.md
```

## ⚙️ Configuration

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Update `.env` with your environment-specific values:
```env
BASE_URL=https://www.saucedemo.com
API_URL=https://api.example.com
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

### Cypress Configuration

The main configuration file `cypress.config.js` contains:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
})
```

## 🧪 Running Tests

### Interactive Mode (Cypress Test Runner)

```bash
# Open Cypress Test Runner
npm run cy:open

# Open with specific environment
npm run cy:open:dev
npm run cy:open:staging
```

### Headless Mode (Command Line)

```bash
# Run all tests in headless mode
npm run cy:run

# Run specific test suite
npm run cy:run:smoke
npm run cy:run:regression

# Run specific test file
npm run cy:run -- --spec "cypress/e2e/smoke/login.cy.js"

# Run tests in specific browser
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

### Environment-Specific Execution

```bash
# Development environment
npm run test:dev

# Staging environment
npm run test:staging

# Production environment (smoke tests only)
npm run test:prod
```

### Parallel Execution

```bash
# Run tests in parallel (requires Cypress Cloud)
npm run cy:run:parallel
```

### Custom Commands

Located in `cypress/support/commands.js`:

```javascript
// Login command
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
  })
})

// Usage in tests
cy.login('standard_user', 'secret_sauce')
```

### Using Fixtures

```javascript
describe('Data-Driven Tests', () => {
  it('should validate user data', () => {
    cy.fixture('users').then((users) => {
      cy.login(users.validUser.username, users.validUser.password)
    })
  })
})
```

## 🔄 CI/CD Integration

### GitHub Actions

The project includes GitHub Actions workflow for automatic test execution:

```yaml
name: Cypress Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          browser: chrome
          headed: false
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run cy:run'
            }
        }
    }
    post {
        always {
            publishHTML([
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'Cypress Test Report'
            ])
        }
    }
}
```

## 📊 Reporting

### Mochawesome Reports

Generate HTML reports after test execution:

```bash
# Run tests with reporting
npm run test:report

# Generate combined report
npm run report:generate
```

Reports are available in the `reports/` directory.

### Allure Reports

```bash
# Run tests with Allure
npm run cy:run:allure

# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open
```

## ✅ Best Practices

### 1. Test Organization
- Group related tests using `describe` blocks
- Use meaningful test descriptions
- Follow the AAA pattern (Arrange, Act, Assert)

### 2. Selectors Strategy
Priority order for element selection:
1. `data-test` attributes (recommended)
2. `data-cy` attributes
3. ID selectors
4. Class selectors (avoid when possible)

### 3. Test Independence
- Tests should not depend on each other
- Use `beforeEach` for setup
- Clean up after tests when necessary

### 4. Assertions
- Use explicit assertions
- Avoid hard-coded wait times
- Leverage Cypress's automatic retry mechanism

### 5. Custom Commands
- Create reusable commands for common actions
- Keep commands simple and focused
- Document custom commands properly

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Tests failing due to timeouts
```javascript
// Increase timeout for specific command
cy.get('.slow-element', { timeout: 15000 })

// Global timeout configuration
defaultCommandTimeout: 15000
```

#### 2. Element not found errors
```javascript
// Wait for element to be visible
cy.get('.element').should('be.visible')

// Use proper waiting strategies
cy.intercept('GET', '/api/data').as('getData')
cy.wait('@getData')
```

#### 3. Cross-origin errors
```javascript
// In cypress.config.js
experimentalSessionAndOrigin: true
chromeWebSecurity: false
```

### Debug Mode

```bash
# Run with debug logs
DEBUG=cypress:* npm run cy:run

# Run specific test with logs
npm run cy:open -- --config video=false
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow [JavaScript Standard Style](https://standardjs.com/)
- Use ESLint for code quality
- Maintain test coverage above 80%

### Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test updates
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app)
- [Cypress Discord Community](https://discord.gg/cypress)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **QA Lead**: [Özge Büyüktorun](mailto:ozgebuyuktorun@outlook.com)
- **Automation Engineers**: [Team Email](mailto:ozgebuyutorun@outlook.com)

## 📞 Support

For questions or support, please:
1. Check the [FAQ](docs/FAQ.md)
2. Search [existing issues](https://github.com/your-organization/cypress-automation/issues)
3. Create a [new issue](https://github.com/your-organization/cypress-automation/issues/new)

---
**Last Updated**: September 2025  
**Version**: 1.0.0  
**Status**: Active Development