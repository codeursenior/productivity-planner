export class InvalidCredentialError extends Error {
  constructor() {
    super(`Invalid credentials. Please check your email and password.`);
    this.name = 'InvalidCredentialError';
  }
}