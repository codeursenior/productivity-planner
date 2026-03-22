# Setup & Installation

## Initial Setup

### System Requirements
- Node.js 18.x or higher
- npm 9.0.0 or higher
- Git

### Install Dependencies

```bash
# Install all dependencies
npm install

# Install production dependency
npm install <package-name>

# Install development dependency
npm install --save-dev <dev-package-name>
```

## Environment Configuration

Configuration files are located in `src/environments/`:

- `environment.ts` - Base configuration
- `environment.development.ts` - Development overrides
- `environment.staging.ts` - Staging overrides

Firebase configuration is managed through environment files. **No additional setup required** for local development if Firebase config is already in place.

### Environment File Structure

Each environment file exports an `environment` object containing:
- API endpoints
- Feature flags
- Firebase configuration
- Analytics configuration

## Development Server

### Start Development Server

```bash
npm start
```

This runs `ng serve`, which starts the Angular development server at `http://localhost:4200`.

**Key development features:**
- **Hot Module Replacement (HMR)**: Automatic reloading on file changes
- **Source Maps**: Full TypeScript debugging support in browser DevTools
- **Development Optimizations**: Unminified code for easier debugging
- Application automatically reloads when you modify source files

### Accessing the Application

1. Open browser to `http://localhost:4200`
2. The app will automatically reload when you save changes
3. Check browser console for compilation errors

## Project Initialization

The app uses an **auto-connect initializer** that:
1. Restores user session from Firebase on app startup
2. Populates the user store if a session exists
3. Allows users to resume their session without re-authenticating

Location: `src/app/core/initializer/auto-connect.initializer.ts`

## Troubleshooting Setup

If you encounter issues during setup:

1. **Node version mismatch**: Check Node version with `node --version`
2. **npm version**: Update with `npm install -g npm@latest`
3. **Clearing cache**: Run `npm cache clean --force && rm -rf node_modules` then `npm install`
4. **Port conflict**: Use `ng serve --port 4300` to use a different port
5. **Dependencies issues**: Try `npm ci` instead of `npm install` for exact versions

See [Debugging & Troubleshooting](.agents/debugging.md) for more help.
