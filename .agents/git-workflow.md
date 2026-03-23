# Git Workflow & Pull Requests

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

## Commit Message Conventions

- Use clear, descriptive commit messages
- Start with a verb: "Add", "Fix", "Refactor", "Remove", "Update"
- Reference issue numbers when applicable: "Fixes #123"
- Examples:
  - ✅ "Add task completion tracking"
  - ✅ "Fix authentication flow in signup"
  - ✅ "Refactor user service for better testability"
  - ❌ "fix bug" (too vague)
  - ❌ "changes" (no verb/context)

## Development Branch Strategy

- Create feature branches from `develop`: `feature/#<issue-number>`
- Use descriptive branch names: `feature/#1-task-completion`
- Delete feature branches after merging
- Keep feature branches up-to-date with `develop`
- Pull latest `develop` before starting new feature work

## Example Workflow

```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/#42-add-notifications

# 2. Make changes and commit
git add src/app/membership/notifications/
git commit -m "Add notification component for task reminders"

# 3. Push to remote
git push origin feature/#42-add-notifications

# 4. Create PR on GitHub
# Set base branch to: develop
# Add description and reference issue #42

# 5. After approval and merging
git checkout develop
git pull origin develop
git branch -d feature/#42-add-notifications
```
