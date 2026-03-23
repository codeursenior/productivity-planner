# Testing Guidelines

## Test Frameworks

- **Framework**: Jest with jest-preset-angular
- **Configuration**: `jest.config.ts` and `setup-jest.ts` at project root
- **Test files**: `*.spec.ts` colocated with component/service files

## Running Tests

### Run All Tests
```bash
npm test
```
Runs Jest test suite once and exits.

### Run Tests in Watch Mode
```bash
npm run test:watch
```
Runs only changed tests in watch mode with verbose output. Useful during feature development and debugging.

### Generate Coverage Report
```bash
npm run test:coverage
```
Generates a coverage report showing code coverage percentages. Output: `coverage/` directory.

### Run Specific Tests
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

## Testing Patterns

### TestBed Pattern
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
});
```

### Test Structure
- **Arrange**: Set up test data and mocks
- **Act**: Execute the code being tested
- **Assert**: Verify the results

```typescript
it("should update store on task completion", () => {
  // Arrange
  const mockTask = { id: "1", title: "Test" };

  // Act
  component.completeTask(mockTask);

  // Assert
  expect(component.store.tasks()).toContain(mockTask);
});
```

## Testing Conventions

- Use `describe()` blocks for grouping related tests
- Use `it()` for individual test cases
- **Component testing**: Test component logic, user interactions, and service integration
- **Service testing**: Test business logic and Firebase adapter calls
- **Firebase mocking**: Mock Firebase services using adapter pattern
- **State management**: Test store mutations with NgRx signals
- **Test scope**: Include both positive and negative test cases
- **Coverage target**: Aim for high coverage on critical business logic (authentication, task management, planning)

## Pre-commit Testing

Always run tests locally before pushing:
```bash
npm run lint:fix && npm test
```

Ensure all tests pass and no lint errors before creating a pull request.
