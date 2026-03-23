# Security Considerations

## Firebase Security

- **Firestore rules** enforce authentication and data ownership
- Use Firebase Authentication (built-in adapter in `src/app/core/adapter/authentication-firebase.service.ts`)
- Never commit sensitive credentials to version control
- Use environment files for configuration without secrets
- All sensitive data is handled by Firebase backend

## Code Security

- **Input validation**: Validate all form inputs
- **Sanitization**: Sanitize user-generated content before displaying
- **XSS protection**: Angular's built-in sanitization handles XSS automatically
- **CSRF protection**: Angular's HttpClient provides CSRF protection

## Authentication Pattern

The project implements a secure authentication pattern:

- Uses **Firebase Authentication** adapter in `core/adapter/authentication-firebase.service.ts`
- Implements **port/adapter pattern** for dependency inversion
- **Auto-connect initializer** (`core/initializer/auto-connect.initializer.ts`) handles session restoration on app startup
- Session tokens are managed by Firebase (no manual token handling)

## Best Practices

- ✅ Store auth state in NgRx signals, not localStorage
- ✅ Use Firebase security rules to enforce data ownership
- ✅ Validate sensitive operations on backend (Firestore rules)
- ✅ Use environment variables for non-sensitive config
- ❌ Don't hardcode API keys in code
- ❌ Don't log sensitive user data
- ❌ Don't bypass Angular's sanitization

## Data Ownership in Firestore

Security rules enforce that users can only access their own data:
```
request.auth.uid == resource.data.userId
```

This ensures data isolation between users at the database level.
