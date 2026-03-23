# Code Style & Formatting Guidelines

## TypeScript Conventions

- **Strict Mode**: Project uses TypeScript strict mode (configured in `tsconfig.json`)
- **Type Annotations**: Be explicit with type annotations, avoid implicit `any` types
- **Interfaces vs Types**: Use interfaces for public APIs, types for internal logic
- **Naming**:
  - PascalCase for classes, interfaces, and types
  - camelCase for properties, methods, and variables
  - UPPER_SNAKE_CASE for constants
- **Documentation**: Use JSDoc comments for public methods and complex logic

## Angular Patterns

- **Standalone Components**: Use standalone components and directives (configured via `@Component({ standalone: true })`)
- **Component Lifecycle**: Implement `OnInit` for initialization logic
- **Reactive Forms**: Use `FormBuilder` for form creation and validation
- **Dependency Injection**: Use the `inject()` function for service injection in components

## Import/Export Patterns

- Use barrel exports (`index.ts`) for feature modules when appropriate
- Absolute path aliases configured in `tsconfig.json`

## Linting Configuration

Configuration: `eslint.config.js`

### Run Linting Checks

```bash
# Run linting checks
npm run lint

# Fix linting issues (where auto-fixable)
npm run lint -- --fix
```

## Code Style Requirements

- **No console statements** in production code (allowed only in development/debug)
- **Proper error handling** in async operations
- **Consistent naming conventions** across the codebase
- **Meaningful variable and function names** (avoid abbreviations unless standard)
- **Comments**: Use JSDoc for public APIs, inline comments for complex logic

## SCSS & Styling

- Global styles in `src/styles.scss`
- Component-specific styles in component `.scss` files
- Using Bootstrap 5 for UI components and grid system
- Using Bootstrap Icons for icon library

## Example Patterns

### Good TypeScript
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

export class UserService {
  /**
   * Fetches a user by ID
   * @param userId - The user identifier
   * @returns Promise with user data
   */
  async getUser(userId: string): Promise<User> {
    // Implementation
  }
}
```

### Good Component
```typescript
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `...`,
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  private readonly userService = inject(UserService);
  
  ngOnInit() {
    // Initialization logic
  }
}
```
