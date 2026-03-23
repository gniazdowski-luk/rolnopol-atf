import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./src/config/env";

export const DEMO_USER_AUTH_FILE = "playwright/.auth/user.json";

export default defineConfig({
  testDir: "./tests",
  timeout: 10_000,
  fullyParallel: true,
  reporter: process.env.CI
    ? [["github"], ["html"]]
    : [["html", { open: "never" }]],
  use: {
    baseURL: ENV.BASE_URL,
    trace: "on",
  },
  projects: [
    {
      name: "smoke-tests",
      testMatch: "**/tests/smoke-tests/*.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "demoUser-setup",
      testMatch: "**/tests/demoUser-setup/*.setup.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "demoUser-tests",
      testMatch: "**/tests/demoUser-tests/**/*.spec.ts",
      dependencies: ["demoUser-setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: DEMO_USER_AUTH_FILE,
      },
    },
  ],
});
