# ProductivityPlanner — Agent Instructions

**ProductivityPlanner** is an Angular 20 web application for personal productivity management built with the Pomodoro technique. It uses TypeScript, NgRx signals for state management, Firebase backend, and SCSS styling.

- **Framework**: Angular 20 with standalone components
- **Language**: TypeScript 5.8 (strict mode)
- **State Management**: NgRx Signals
- **Testing**: Jest with jest-preset-angular
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Package Manager**: npm 9.0+

---

## Quick Start

```bash
npm install              # Install dependencies
npm start                # Start dev server at :4200
npm test                 # Run tests
npm run lint             # Check code style
npm run build:production # Production build
npm run deploy:production  # Deploy to Firebase
```

---

## Key Concepts

### Architecture
- **Feature-based** architecture with `core/`, `membership/`, and `visitor/` modules
- **Port/adapter pattern** for dependency inversion (Firebase adapters in `core/adapter/`)
- **Standalone components** throughout (no shared NgModule)
- See [Architecture](.agents/architecture.md)

### State Management
- **App-wide state**: `src/app/core/store/user.store.ts` (NgRx Signals)
- **Feature state**: `src/app/membership/workday/workday.page.store.ts`
- **Component state**: Local properties and `@Input()/@Output()`

### Authentication
- Firebase Authentication with adapter pattern
- Auto-connect initializer restores sessions on app startup
- Session tokens managed by Firebase (no manual handling)
- See [Security](.agents/security.md)

---

## Documentation by Topic

| Topic | Link |
|-------|------|
| **Setup & Installation** | [setup.md](.agents/setup.md) |
| **Architecture & Patterns** | [architecture.md](.agents/architecture.md) |
| **Code Style & Formatting** | [code-style.md](.agents/code-style.md) |
| **Testing Guidelines** | [testing.md](.agents/testing.md) |
| **Git Workflow & PRs** | [git-workflow.md](.agents/git-workflow.md) |
| **Build & Deployment** | [deployment.md](.agents/deployment.md) |
| **Security** | [security.md](.agents/security.md) |
| **Debugging & Troubleshooting** | [debugging.md](.agents/debugging.md) |
| **Development Tips** | [development-tips.md](.agents/development-tips.md) |

---

## Common Commands

```bash
# Development
npm start                    # Start dev server at :4200
npm run watch               # Watch mode build
npm run lint                # Check linting
npm run lint -- --fix       # Auto-fix linting issues

# Testing
npm test                    # Run all tests once
npm run test:watch          # Watch mode testing
npm run test:coverage       # Generate coverage report
npx jest --testNamePattern="pattern"  # Run specific tests

# Building
npm run build:development   # Build for dev
npm run build:staging       # Build for staging
npm run build:production    # Optimized production build

# Deployment
npm run deploy:production   # Deploy to Firebase production
npm run deploy:staging      # Deploy to Firebase staging
npm run deploy:development  # Deploy to Firebase development
```

---

## Project Structure

```
src/app/
├── core/                    # Shared services, store, auth adapters
│   ├── adapter/            # Firebase implementations
│   ├── port/               # Service interfaces
│   ├── store/              # User store (NgRx signals)
│   └── initializer/        # Session restoration logic
├── membership/             # Authenticated feature
│   ├── workday/            # Main task management page
│   ├── dashboard/          # Dashboard page
│   ├── planning/           # Planning page
│   ├── profile/            # User profile
│   └── settings/           # Settings page
└── visitor/                # Public feature (Home, Login, Signup)
```

---

## Essential Rules

✅ **DO:**
- Use `const x = inject(Service)` for dependency injection
- Use `@Component({ standalone: true })` for all components
- Keep components focused (one responsibility per file)
- Mock Firebase services in tests with adapter pattern
- Run `npm run lint:fix && npm test` before pushing
- Use TypeScript strict mode (no `any` types)
- Document public methods with JSDoc comments

❌ **DON'T:**
- Use deprecated `@NgModule` patterns
- Commit sensitive credentials or API keys
- Skip tests or linting before PR submission
- Use `console.log()` in production code
- Create circular dependencies between modules
- Bypass Angular's built-in security features

---

## Need More Details?

- **First time setup?** → [setup.md](.agents/setup.md)
- **How should I structure code?** → [architecture.md](.agents/architecture.md)
- **Code style questions?** → [code-style.md](.agents/code-style.md)
- **Testing best practices?** → [testing.md](.agents/testing.md)
- **Git workflow & PRs?** → [git-workflow.md](.agents/git-workflow.md)
- **Build or deploy?** → [deployment.md](.agents/deployment.md)
- **Something broken?** → [debugging.md](.agents/debugging.md)
- **Pro tips?** → [development-tips.md](.agents/development-tips.md)
