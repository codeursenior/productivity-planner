# Development Tips & Tricks

## Fast Feedback Loop

- Use `npm run test:watch` while developing features
- Watch mode re-runs only changed tests
- Helps catch issues immediately while coding

## Code Navigation

Use IDE features to understand the codebase:
- **Go to Definition** (⌘D on Mac, Ctrl+G on Windows): Jump to function/type definition
- **Find References** (⇧⌘F on Mac): See where a symbol is used
- **Open File** (⌘P on Mac): Quickly navigate to any file
- **Search** (⌘F on Mac): Find text in current file

## Module Dependencies

**Important**: Core module is shared across features
- Changes to `src/app/core/` affect the entire app
- Be careful with modifications to services and stores
- Test thoroughly after changing core services

## State Management

### Component-Level State
- Use component class properties for local state
- Use `@Input()` and `@Output()` for component communication
- Good for: UI state (form values, toggles, modals)

### App-Wide State
- Use **user store** (`src/app/core/store/user.store.ts`)
- Good for: User data, authentication status, preferences
- Accessed via dependency injection with `inject(UserStore)`

### Feature State
- Use **workday store** (`src/app/membership/workday/workday.page.store.ts`)
- Good for: Task list, selected task, workday data
- Scoped to workday feature

## Firebase Emulator

Consider using Firebase Emulator for local development:

```bash
# Start Firebase emulator
firebase emulators:start

# Run tests against emulator
npm run test
```

**Benefits:**
- No network calls to remote Firebase
- Faster development and testing
- Isolated data environment
- Lower Firebase costs

## Performance Monitoring

### Bundle Size Analysis
```bash
# View bundle stats
npm run build:production

# Check dist folder size
du -sh dist/
```

### Runtime Performance
- Avoid unnecessary re-renders with OnPush change detection
- Use Angular DevTools extension for profiling
- Monitor Firestore operations in Firebase Console

## Common Patterns to Copy

### Service with Firebase Adapter
Reference `src/app/core/adapter/user-firebase.service.ts` when:
- Creating new Firebase-backed services
- Implementing the port/adapter pattern
- Adding new data operations

### Component Testing
Reference existing `.spec.ts` files like:
- `src/app/membership/workday/workday.page.component.spec.ts`
- Use `TestBed` for setup
- Mock Firebase adapter services

### Form Handling
Reference `src/app/visitor/login/login.page.component.ts` for:
- `FormBuilder` usage
- Reactive form patterns
- Validation handling

## Useful npm Commands Recap

```bash
npm start                    # Start dev server at :4200
npm test                     # Run all tests once
npm run test:watch          # Run tests in watch mode
npm run lint                # Check linting errors
npm run lint -- --fix       # Auto-fix linting issues
npm run build:production    # Production build with optimization
npm run deploy:production   # Deploy to Firebase production
```

## Debug Tips

### Console Logging
```typescript
// Mark debug logs for easy finding
console.log('🔍 DEBUG: UserService loaded', currentUser);
console.error('❌ ERROR: Failed to save task', error);
console.warn('⚠️ WARNING: Firestore quota near limit');
```

### Browser DevTools
- Use **React DevTools** (or Angular DevTools)
- Set **breakpoints** in TypeScript source
- Use **console** for live testing
- Monitor **Network** tab for API calls

### RxJS Debugging
```typescript
// Use rxjs 'tap' operator for debugging
observable$.pipe(
  tap(value => console.log('Value:', value)),
  // rest of pipeline
).subscribe();
```

## Keyboard Shortcuts (VS Code)

| Action | Mac | Windows |
|--------|-----|---------|
| Go to Definition | ⌘D | Ctrl+D |
| Find References | ⇧⌘F | Shift+Ctrl+F |
| Go to Line | ⌘G | Ctrl+G |
| Open File | ⌘P | Ctrl+P |
| Search in File | ⌘F | Ctrl+F |
| Replace in File | ⌘H | Ctrl+H |
| Format Document | ⇧⌘X | Shift+Alt+F |
| Toggle Sidebar | ⌘B | Ctrl+B |

## Team Communication

See [Git Workflow](./git-workflow.md) for:
- PR title conventions
- Commit message standards
- Code review process
- Branch naming strategy
