# Architecture & Patterns

## Project Architecture

ProductivityPlanner follows a **feature-based architecture** with clear separation of concerns:

### Core Module (`src/app/core/`)
- **Centralized user store** and state management
- **Authentication service** (Firebase adapter pattern)
- **User service** (Firebase adapter pattern)
- **Domain entities** and models
- **Application initializers** for session restoration
- **Port/adapter implementations** for dependency inversion

### Membership Feature (`src/app/membership/`)
- Dashboard, Planning, Profile, Settings, and Workday pages
- Task model and management
- Workday store for local task state
- Task UI components (read-only, field editors)

### Visitor Feature (`src/app/visitor/`)
- Public pages (Home, Login, Signup)
- No authentication required

### Environments (`src/environments/`)
- Development configuration
- Staging configuration
- Production configuration

## File Organization

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

## Design Patterns

### Port/Adapter Pattern
- **Ports** (`src/app/core/port/`) define service interfaces
- **Adapters** (`src/app/core/adapter/`) provide Firebase-specific implementations
- Enables dependency inversion and testability

Example:
- `AuthenticationService` (port) → `AuthenticationFirebaseService` (adapter)
- `UserService` (port) → `UserFirebaseService` (adapter)

### Standalone Components
- All components use `@Component({ standalone: true })`
- No shared NgModule required
- Dependency injection uses `inject()` function

### State Management with NgRx Signals
- **User store** (`src/app/core/store/user.store.ts`) manages app-wide user state
- **Workday store** (`src/app/membership/workday/workday.page.store.ts`) manages local task state
- Small component-level state handled directly in components

## Key Technologies

- **Framework**: Angular 20 with standalone components
- **Language**: TypeScript 5.8 (strict mode)
- **State Management**: NgRx Signals
- **Testing**: Jest with jest-preset-angular
- **Linting**: ESLint with Angular ESLint
- **Styling**: SCSS with Bootstrap 5
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Package Manager**: npm 9.0+
- **Build Tool**: Angular CLI 20

## Dependency Inversion

The project uses **port/adapter** pattern for dependency inversion:

1. Services define a **port** (interface) in `core/port/`
2. Firebase implementations provide an **adapter** in `core/adapter/`
3. Components inject the **port**, not the adapter
4. Easy to swap implementations for testing or other backends

**Benefits:**
- Core logic independent of Firebase
- Testable with mock implementations
- Easy to switch backends
- Clear contracts between modules
