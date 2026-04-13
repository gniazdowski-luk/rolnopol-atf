import { ENV } from '../config/env';

export interface User {
  email: string;
  password: string;
  displayName?: string;
}

export function createEmptyUser(overrides?: Partial<User>): User {
  return {
    email: ENV.EMPTY_USER_EMAIL,
    password: ENV.EMPTY_USER_PASSWORD,
    displayName: ENV.EMPTY_USER_DISPLAY_NAME,
    ...overrides,
  };
}

export function createDemoUser(overrides?: Partial<User>): User {
  return {
    email: ENV.DEMO_USER_EMAIL,
    password: ENV.DEMO_USER_PASSWORD,
    displayName: ENV.DEMO_USER_DISPLAY_NAME,
    ...overrides,
  };
}

export function createTestUser(overrides?: Partial<User>): User {
  return {
    email: ENV.TEST_USER_EMAIL,
    password: ENV.TEST_USER_PASSWORD,
    displayName: ENV.TEST_USER_DISPLAY_NAME,
    ...overrides,
  };
}
