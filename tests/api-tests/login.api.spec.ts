import { expect, test } from "@playwright/test";
import { generateEmail } from "../../src/helpers/generateEmail";
import { createDemoUser } from "../../src/models/userFactory";

const LOGIN_ENDPOINT = "login";
const REGISTER_ENDPOINT = "register";

function createLoginBody(
  overrides?: Partial<{ email: string; password: string }>,
) {
  const user = createDemoUser();
  return { email: user.email, password: user.password, ...overrides };
}

test.describe("Login API", () => {
  test("@api @API-8 successful login returns 200 with token and user data", async ({
    request,
  }) => {
    // Arrange
    const user = createDemoUser();
    const body = createLoginBody();

    // Act
    const response = await request.post(LOGIN_ENDPOINT, { data: body });
    const json = await response.json();

    // Assert
    await expect.soft(response, "login response should be successful").toBeOK();
    expect
      .soft(json.success, "response body should contain success: true")
      .toBe(true);
    expect
      .soft(json.data, "response data should contain authentication token")
      .toHaveProperty("token");
    expect
      .soft(json.data.user, "user object should contain correct email")
      .toHaveProperty("email", user.email);
    expect(
      json.data.user,
      "user object should contain numeric id",
    ).toHaveProperty("id");
  });

  test("@api @API-9 login with wrong password returns 401", async ({
    request,
  }) => {
    // Arrange
    const body = createLoginBody({ password: "wrongPassword999" });

    // Act
    const response = await request.post(LOGIN_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(response, "response should not be successful with wrong password")
      .not.toBeOK();
    expect(
      response.status(),
      "wrong password should return 401 Unauthorized",
    ).toBe(401);
  });

  test("@api @API-10 login with non-existent email returns 401", async ({
    request,
  }) => {
    // Arrange
    const body = createLoginBody({ email: "nonexistent_user@nowhere.test" });

    // Act
    const response = await request.post(LOGIN_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(
        response,
        "response should not be successful with non-existent email",
      )
      .not.toBeOK();
    expect(
      response.status(),
      "non-existent email should return 401 Unauthorized",
    ).toBe(401);
  });

  test("@api @API-11 login without email returns 400", async ({ request }) => {
    // Arrange
    const { email, ...body } = createLoginBody();

    // Act
    const response = await request.post(LOGIN_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(response, "response should not be successful without email")
      .not.toBeOK();
    expect(
      response.status(),
      "missing email should return 400 Bad Request",
    ).toBe(400);
  });

  test("@api @API-12 login without password returns 400", async ({
    request,
  }) => {
    // Arrange
    const { password, ...body } = createLoginBody();

    // Act
    const response = await request.post(LOGIN_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(response, "response should not be successful without password")
      .not.toBeOK();
    expect(
      response.status(),
      "missing password should return 400 Bad Request",
    ).toBe(400);
  });

  test("@api @API-13 login with freshly registered user returns token", async ({
    request,
  }) => {
    // Arrange
    const email = generateEmail();
    const password = "freshPass123";
    await request.post(REGISTER_ENDPOINT, {
      data: { email, password, displayedName: "FreshUser" },
    });

    // Act
    const response = await request.post(LOGIN_ENDPOINT, {
      data: { email, password },
    });
    const json = await response.json();

    // Assert
    await expect
      .soft(response, "login after registration should be successful")
      .toBeOK();
    expect(
      json.data,
      "freshly registered user should receive an authentication token",
    ).toHaveProperty("token");
  });
});
