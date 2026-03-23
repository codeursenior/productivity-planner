# Debugging & Troubleshooting

## Common Issues & Solutions

### Port Already in Use (Development Server)

```bash
# Change default port
ng serve --port 4300
```

### TypeScript Errors

1. Check `tsconfig.json` and `tsconfig.app.json`
2. Run type checking: `npx tsc --noEmit`
3. Clear Angular cache: `rm -rf .angular/cache`
4. Restart editor/language server

### Jest Test Failures

1. Check `jest.config.ts` and `setup-jest.ts`
2. Clear Jest cache: `npx jest --clearCache`
3. Run specific test: `npx jest src/path/to/test.spec.ts`
4. Check for mock issues in test setup

### Build Failures

1. Clear Angular cache: `rm -rf .angular/cache`
2. Delete `dist/` folder and rebuild: `rm -rf dist && npm run build`
3. Check for circular dependencies
4. Verify all imports are correct
5. Run type checking: `npx tsc --noEmit`

## Browser Debugging

Angular development server supports sourcemaps for debugging:

1. Open Chrome DevTools (F12)
2. Go to **Sources** tab
3. TypeScript files are available for debugging
4. Set breakpoints directly in TypeScript source

### Debug Console
- Use `console.log()` for debugging during development
- Firefox/Chrome console shows TypeScript source with sourcemaps

## Logging Patterns

- ✅ Use `console.log()` for debugging during development
- ✅ Use `console.error()` for error logging
- ✅ Use `console.warn()` for warnings
- ❌ Remove or use appropriate logging levels before committing
- Consider using a logging service for production logging

## Performance Analysis

### Monitor Bundle Size
```bash
# Check dist/ output
ls -lh dist/productivity-planner/

# Or use build analysis
npm run build:production
```

### Chrome DevTools Profiling
1. Open DevTools (F12)
2. Go to **Performance** tab
3. Record a session
4. Analyze frame rate and CPU usage

### Angular DevTools
- Install Angular DevTools extension in Chrome
- Inspect component hierarchy
- View component state and inputs/outputs
- Inspect dependency injection

## Performance Optimization

- Use **OnPush** change detection strategy for optimal performance
- **Lazy load** feature modules where applicable
- Monitor **Firestore read/write operations** for cost optimization
- Use **TreeShaking** in production builds
- Consider using **Angular DevTools** to identify performance bottlenecks

## Firestore Debugging

- Check Firestore Rules in Firebase Console
- Use Firebase Emulator for local development without hitting remote database
- Monitor Firestore usage: Firebase Console → Firestore → Usage
- Check security rules compliance in browser console

## Clear Cache Commands

```bash
# Clear Angular build cache
rm -rf .angular/cache

# Clear Jest cache
npx jest --clearCache

# Clear npm cache (if needed)
npm cache clean --force

# Full reset (nuclear option)
rm -rf node_modules dist .angular/cache coverage && npm install
```
