export class InvalidPasswordError extends Error {
  constructor() {
    super(`Invalid password. Please try another password.`);
    this.name = 'InvalidPasswordError';
  }
}