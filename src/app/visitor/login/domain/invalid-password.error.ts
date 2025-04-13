export class InvalidPasswordError extends Error {
  constructor(readonly password: string) {
    super(`Invalid password. Please try another password.`);
    this.name = 'InvalidPasswordError';
  }
}