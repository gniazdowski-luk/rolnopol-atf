import 'dotenv/config';

const requiredEnvVars = [
  'BASE_URL',
  'EMPTY_USER_EMAIL',
  'EMPTY_USER_PASSWORD',
  'EMPTY_USER_DISPLAY_NAME',
  'DEMO_USER_EMAIL',
  'DEMO_USER_PASSWORD',
  'DEMO_USER_DISPLAY_NAME',
] as const;

function validateEnv(vars: readonly string[]): void {
  for (const name of vars) {
    if (!process.env[name]) {
      throw new Error(`Environment variable '${name}' is not set or is empty`);
    }
  }
}

validateEnv(requiredEnvVars);

export const ENV = {
  BASE_URL: process.env.BASE_URL as string,
  EMPTY_USER_EMAIL: process.env.EMPTY_USER_EMAIL as string,
  EMPTY_USER_PASSWORD: process.env.EMPTY_USER_PASSWORD as string,
  EMPTY_USER_DISPLAY_NAME: process.env.EMPTY_USER_DISPLAY_NAME as string,
  DEMO_USER_EMAIL: process.env.DEMO_USER_EMAIL as string,
  DEMO_USER_PASSWORD: process.env.DEMO_USER_PASSWORD as string,
  DEMO_USER_DISPLAY_NAME: process.env.DEMO_USER_DISPLAY_NAME as string,
  TEST_USER_EMAIL: process.env.TEST_USER_EMAIL as string,
  TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD as string,
  TEST_USER_DISPLAY_NAME: process.env.TEST_USER_DISPLAY_NAME as string,
} as const;
