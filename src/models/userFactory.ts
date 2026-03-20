export interface User {
  email: string;
  password: string;
  displayName?: string;
}

const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN;
const DEFAULT_EMAIL = process.env.DEFAULT_USER_EMAIL;
const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD;

export function createDefaultUser(overrides?: Partial<User>): User {
  return {
    email: DEFAULT_EMAIL!,
    password: DEFAULT_PASSWORD!,
    ...overrides,
  };
}
