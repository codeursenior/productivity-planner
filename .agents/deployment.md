# Deployment & Build Configuration

## Build Commands

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

## Environment Configuration

Configuration files are located in `src/environments/`:
- `environment.ts` - Base configuration
- `environment.development.ts` - Development overrides
- `environment.staging.ts` - Staging overrides
- `environment.ts` - Production defaults

Firebase configuration is managed through environment files (no sensitive credentials in code).

## Firebase Deployment

### Production Deployment
```bash
npm run deploy:production
```

### Staging Deployment
```bash
npm run deploy:staging
```

### Development Deployment
```bash
npm run deploy:development
```

Each deployment command:
1. Builds the application with the appropriate configuration
2. Switches to the correct Firebase project (via `firebase-tools use`)
3. Deploys to Firebase Hosting and Firestore

## Firebase Configuration

- **Firebase projects**: Configured in `firebase.json`
- **Firestore security rules**: In `firestore.rules`
- **Firestore indexes**: Defined in `firestore.indexes.json`
- **Authentication**: Uses Firebase Authentication service with adapter pattern
- **Environment switching**: Use `npx firebase-tools use <project-name>` to switch between Firebase projects

## Watch Mode Build

```bash
npm run watch
```

Builds the application in watch mode with development configuration. Useful for continuous development without needing a separate dev server. Outputs to `dist/` directory.
