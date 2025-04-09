export class UserEmailNotFoundError extends Error {
  constructor(readonly email: string) {
    super(`The email ${email} does not exist. Try another email address or create a new account.`);
    this.name = 'UserEmailNotFoundError';
	}
}