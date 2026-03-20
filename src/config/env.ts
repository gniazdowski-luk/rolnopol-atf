import "dotenv/config";

const requiredEnvVars = [
  "BASE_URL",
  "DEFAULT_USER_EMAIL",
  "DEFAULT_USER_PASSWORD",
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
  DEFAULT_USER_EMAIL: process.env.DEFAULT_USER_EMAIL as string,
  DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD as string,
} as const;
