# AGENTS.md

## Project Overview

**ProductivityPlanner** is a web application for personal productivity management built with the Pomodoro technique. The project is an Angular 20 application with TypeScript, NgRx signals for state management, Firebase backend integration, and SCSS styling.

This is a feature-based Single Page Application (SPA) with a clear separation between public pages (visitor feature) and authenticated pages (membership feature). The application uses a port/adapter pattern for dependency inversion and Firebase for backend services.

### Key Technologies

- **Framework**: Angular 20 with standalone components
- **Language**: TypeScript 5.8 (strict mode)
- **State Management**: NgRx Signals
- **Testing**: Jest with jest-preset-angular
- **Linting**: ESLint with Angular ESLint
- **Styling**: SCSS with Bootstrap 5
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Package Manager**: npm 9.0+
- **Build Tool**: Angular CLI 20

### Architecture Overview

The application follows a **feature-based architecture** with a clear separation of concerns:

- **Core Module** (`src/app/core/`)
  - Centralized user store and state management
  - Authentication service (Firebase adapter pattern)
  - User service (Firebase adapter pattern)
  - Domain entities and models
  - Application initializers for session restoration
  - Port/adapter implementations for dependency inversion

- **Membership Feature** (`src/app/membership/`)
  - Dashboard, Planning, Profile, Settings, and Workday pages
  - Task model and management
  - Workday store for local task state
  - Task UI components (read-only, field editors)

- **Visitor Feature** (`src/app/visitor/`)
  - Public pages (Home, Login, Signup)
  - No authentication required

- **Environments** (`src/environments/`)
  - Development configuration
  - Staging configuration
  - Production configuration

## Setup Instructions

### Installing New Dependencies

```bash
# Install production dependency
npm install <package-name>

# Install development dependency
npm install --save-dev <dev-package-name>
```

### Environment Setup

Configuration files are located in `src/environments/`:

- `environment.ts` - Base configuration
- `environment.development.ts` - Development overrides
- `environment.staging.ts` - Staging overrides
- `environment.ts` - Production defaults

Firebase configuration is managed through environment files. No additional setup required for local development.

## Development Workflow

### Start Development Server

```bash
npm start
```

This runs `ng serve`, which starts the Angular development server at `http://localhost:4200`. The application will automatically reload when you modify source files.

Key development features:

- **Hot Module Replacement (HMR)**: Automatic reloading on file changes
- **Source Maps**: Full TypeScript debugging support in browser DevTools
- **Development Optimizations**: Unminified code for easier debugging

### Watch Mode Build

```bash
npm run watch
```

Builds the application in watch mode with development configuration. Useful for continuous development without needing a separate dev server. Outputs to `dist/` directory.

## Code Style Guidelines

### TypeScript Conventions

- **Strict Mode**: Project uses TypeScript strict mode (configured in `tsconfig.json`)
- **Type Annotations**: Be explicit with type annotations, avoid implicit `any` types
- **Interfaces vs Types**: Use interfaces for public APIs, types for internal logic
- **Naming**:
  - PascalCase for classes, interfaces, and types
  - camelCase for properties, methods, and variables
  - UPPER_SNAKE_CASE for constants
- **Documentation**: Use JSDoc comments for public methods and complex logic

### Angular Patterns

- **Standalone Components**: Use standalone components and directives (configured via `@Component({ standalone: true })`)
- **Component Lifecycle**: Implement `OnInit` for initialization logic
- **Reactive Forms**: Use `FormBuilder` for form creation and validation
- **Dependency Injection**: Use the `inject()` function for service injection in components
- **Single Responsibility**: One component per file, focused functionality

### File Organization

```
src/app/
├── core/                          # Shared services and store
│   ├── adapter/                   # Firebase-specific implementations
│   ├── component/                 # Core UI components (navbar, etc.)
│   ├── domain/                    # Entity definitions
│   ├── entity/                    # Data models and interfaces
│   ├── initializer/               # App initialization logic
│   ├── port/                      # Service interfaces (ports)
│   └── store/                     # NgRx signals state management
├── membership/                     # Feature: authenticated pages
│   ├── core/                      # Feature-specific shell components
│   ├── dashboard/                 # Dashboard page
│   ├── planning/                  # Planning page
│   ├── profile/                   # Profile page
│   ├── settings/                  # Settings page
│   └── workday/                   # Workday (main task) page
├── visitor/                        # Feature: public pages
│   ├── home/                      # Landing page
│   ├── login/                     # Login page
│   └── signup/                    # Signup page
└── environments/                   # Environment configurations
```

### Linting and Formatting

```bash
# Run linting checks
npm run lint

# Fix linting issues (where auto-fixable)
npm run lint -- --fix
```

Configuration: `eslint.config.js`

**Code style requirements:**

- No console statements in production code (allowed only in development/debug)
- Proper error handling in async operations
- Consistent naming conventions across the codebase
- Meaningful variable and function names (avoid abbreviations unless standard)

### Import/Export Patterns

- Use barrel exports (`index.ts`) for feature modules when appropriate
- Absolute path aliases configured in `tsconfig.json`

## Testing Instructions

### Run All Tests

```bash
npm test
```

Runs Jest test suite once and exits.

### Run Tests in Watch Mode (During Development)

```bash
npm run test:watch
```

Runs only changed tests in watch mode with verbose output. Useful during feature development and debugging.

### Generate Coverage Report

```bash
npm run test:coverage
```

Generates a coverage report showing code coverage percentages. Coverage reports are generated in the `coverage/` directory.

### Test File Locations and Naming

- **Unit test files**: `*.spec.ts` colocated with component/service files
- **Test configuration**: `jest.config.ts` and `setup-jest.ts` at project root
- **Test patterns**: Use `describe()` blocks for grouping, `it()` for individual tests
- **Coverage directory**: `coverage/` (generated by coverage report)

### Testing Patterns and Conventions

- **TestBed**: Use `TestBed` for component and service testing
- **Fixtures**: Create test fixtures and mock services
- **Component Testing**: Test component logic, user interactions, and service integration
- **Firebase Mocking**: Mock Firebase services using adapter pattern
- **State Management**: Test store mutations with NgRx signals
- **Test Scope**: Include both positive and negative test cases
- **Coverage Target**: Aim for high coverage on critical business logic (authentication, task management, planning)

### Example Test Structure

```typescript
describe("ComponentName", () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      // provide mocks
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should update store on task completion", () => {
    // Arrange
    const mockTask = { id: "1", title: "Test" };

    // Act
    component.completeTask(mockTask);

    // Assert
    expect(component.store.tasks()).toContain(mockTask);
  });
});
```

### Running Focused Tests

Jest supports running specific tests using patterns:

```bash
# Run tests by pattern (test name)
npx jest --testNamePattern="pattern to match"

# Run tests in specific folder
npx jest src/app/membership/workday/

# Run tests in specific file
npx jest src/app/core/store/user.store.spec.ts

# Run and update snapshots
npx jest --updateSnapshot
```

### Pre-commit Testing

Always run tests locally before pushing:

```bash
npm run lint:fix && npm test
```

Ensure all tests pass and no lint errors before creating a pull request.

## Build and Deployment

### Build for Development

```bash
npm run build:development
```

Builds the application with development configuration.

### Build for Staging

```bash
npm run build:staging
```

Builds the application with staging configuration for pre-production testing.

### Build for Production

```bash
npm run build:production
```

Builds the application optimized for production with:

- Tree-shaking and minification
- AOT compilation
- Production environment configuration
- Bundle size monitoring (500kB initial warning, 1MB error limit)
- Component style size limits (2kB warning, 4kB error)

### Build Output

Built files are output to `dist/productivity-planner/`.

### Deployment to Firebase

**Production Deployment:**

```bash
npm run deploy:production
```

**Staging Deployment:**

```bash
npm run deploy:staging
```

**Development Deployment:**

```bash
npm run deploy:development
```

These commands:

1. Build the application with the appropriate configuration
2. Switch to the correct Firebase project (via `firebase-tools use`)
3. Deploy to Firebase Hosting and Firestore

### Firebase Configuration

- **Firebase projects**: Configured in `firebase.json`
- **Firestore security rules**: In `firestore.rules`
- **Firestore indexes**: Defined in `firestore.indexes.json`
- **Authentication**: Uses Firebase Authentication service with adapter pattern
- **Environment switching**: Use `npx firebase-tools use <project-name>` to switch between Firebase projects

## Pull Request Guidelines

### Title Format

```
[feature-name] Brief description of changes
```

Examples:

- `[workday] Add task completion tracking`
- `[auth] Fix password reset flow`
- `[core] Refactor user service`

### Required Checks Before Submission

Before creating or pushing to a PR, ensure:

```bash
# Run linting
npm run lint

# Run all tests
npm test

# Build the application
npm run build
```

All checks must pass before submitting a PR.

### Review Process

- At least one code reviewer is required for approval
- Feature branches should be created from `develop`
- All PR checks must pass (lint, tests, build)
- Requested changes must be addressed and re-reviewed
- Once approved, merge into `develop`

### Commit Message Conventions

- Use clear, descriptive commit messages
- Start with a verb: "Add", "Fix", "Refactor", "Remove", "Update"
- Reference issue numbers when applicable: "Fixes #123"
- Keep commits focused on a single logical change

### Development Branch Strategy

- Create feature branches from `develop`: `feature/#<issue-number>`
- Use descriptive branch names: `feature/#1-task-completion`
- Delete feature branches after merging
- Keep feature branches up-to-date with `develop`

## Security Considerations

### Firebase Security

- Firestore rules enforce authentication and data ownership
- Use Firebase Authentication (built-in adapter in core module)
- Never commit sensitive credentials to version control
- Use environment files for configuration without secrets

### Code Security

- Input validation on forms
- Sanitization of user-generated content
- XSS protection through Angular's built-in sanitization
- CSRF protection through Angular's HttpClient

### Authentication Pattern

- Uses Firebase Authentication adapter in `core/adapter/authentication-firebase.service.ts`
- Implements port/adapter pattern for dependency inversion
- Auto-connect initializer handles session restoration on app startup

## Debugging and Troubleshooting

### Common Issues

**Port already in use (development server)**

```bash
# Change default port
ng serve --port 4300
```

**TypeScript errors**

1. Check `tsconfig.json` and `tsconfig.app.json`
2. Run type checking: `npx tsc --noEmit`
3. Clear Angular cache: `rm -rf .angular/cache`

**Jest test failures**

1. Check `jest.config.ts` and `setup-jest.ts`
2. Clear Jest cache: `npx jest --clearCache`
3. Run specific test: `npx jest src/path/to/test.spec.ts`

**Build failures**

1. Clear Angular cache: `rm -rf .angular/cache`
2. Delete `dist/` folder and rebuild
3. Check for circular dependencies
4. Verify all imports are correct

### Logging Patterns

- Use `console.log()` for debugging during development
- Remove or use appropriate logging levels before committing
- Consider using a logging service for production logging

### Performance Considerations

- Monitor bundle size: Check `dist/` output or use `npm run build:production`
- Use OnPush change detection strategy for optimal performance
- Lazy load feature modules where applicable
- Profile using Chrome DevTools for performance bottlenecks
- Monitor Firestore read/write operations for cost optimization

### Debug Configuration

Angular development server supports sourcemaps for debugging in browser:

- Open Chrome DevTools (F12)
- Go to Sources tab
- TypeScript files are available for debugging
- Set breakpoints directly in TypeScript source

## Development Tips

- **Fast Feedback Loop**: Use `npm run test:watch` while developing features
- **Code Navigation**: Use IDE features (Go to Definition, Find References) to understand codebase
- **Module Dependencies**: Core module is shared across features - changes here affect the entire app
- **State Management**: Small state is managed in components, app-wide state uses user store
- **Firebase Emulator**: Consider using Firebase emulator for local development without hitting remote database

## Additional Notes

### Project Dependencies

- **NgRx Signals**: Used for reactive state management (beta version)
- **Bootstrap**: Provides UI components and grid system
- **Bootstrap Icons**: Icon library for UI
- **RxJS**: Reactive programming library for async operations

### File Structure Tips

- Tests are colocated with source files
- Environments configuration is separated from source code
- Public assets are in `public/` folder
- Styles are organized at app level (`styles.scss`) with component-specific overrides

### Common Gotchas

- Firebase projects must be properly initialized before deployment
- Environment switching requires `firebase-tools` CLI
- Feature branches should be short-lived to avoid merge conflicts
- Always pull latest `develop` before starting new feature work
