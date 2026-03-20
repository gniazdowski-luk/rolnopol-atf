import { ENV } from "../config/env";

export interface User {
  email: string;
  password: string;
  displayName?: string;
}

export function createDefaultUser(overrides?: Partial<User>): User {
  return {
    email: ENV.DEFAULT_USER_EMAIL,
    password: ENV.DEFAULT_USER_PASSWORD,
    ...overrides,
  };
}
