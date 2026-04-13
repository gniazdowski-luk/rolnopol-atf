import { expect, test } from '@playwright/test';

import { generateEmail } from '../../src/helpers/generateEmail';

const REGISTER_ENDPOINT = 'register';

function createRegistrationBody(
  overrides?: Partial<{
    email: string;
    password: string;
    displayedName: string;
  }>,
): { email: string; password: string; displayedName: string } {
  return {
    email: generateEmail(),
    password: 'validPass123',
    displayedName: 'TestUser',
    ...overrides,
  };
}

test.describe('Registration API', () => {
  test('@api @API-2 successful registration returns 201 and success flag', async ({
    request,
  }) => {
    // Arrange
    const body = createRegistrationBody();

    // Act
    const response = await request.post(REGISTER_ENDPOINT, { data: body });
    const json = await response.json();

    // Assert
    await expect
      .soft(response, 'registration response should be successful')
      .toBeOK();
    expect(json.success, 'response body should contain success: true').toBe(
      true,
    );
  });

  test('@api @API-3 registration without email returns 400', async ({
    request,
  }) => {
    // Arrange
    const { email: _email, ...body } = createRegistrationBody();

    // Act
    const response = await request.post(REGISTER_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(response, 'response should not be successful without email')
      .not.toBeOK();
    expect(
      response.status(),
      'missing email should return 400 Bad Request',
    ).toBe(400);
  });

  test('@api @API-4 registration without password returns 400', async ({
    request,
  }) => {
    // Arrange
    const { password: _password, ...body } = createRegistrationBody();

    // Act
    const response = await request.post(REGISTER_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(response, 'response should not be successful without password')
      .not.toBeOK();
    expect(
      response.status(),
      'missing password should return 400 Bad Request',
    ).toBe(400);
  });

  test('@api @API-5 registration with invalid email format returns 400', async ({
    request,
  }) => {
    // Arrange
    const body = createRegistrationBody({ email: 'not-an-email' });

    // Act
    const response = await request.post(REGISTER_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(response, 'response should not be successful with invalid email')
      .not.toBeOK();
    expect(
      response.status(),
      'invalid email format should return 400 Bad Request',
    ).toBe(400);
  });

  test('@api @API-6 registration with too short password returns 400', async ({
    request,
  }) => {
    // Arrange
    const body = createRegistrationBody({ password: 'ab' });

    // Act
    const response = await request.post(REGISTER_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(
        response,
        'response should not be successful with too short password',
      )
      .not.toBeOK();
    expect(
      response.status(),
      'password below minLength should return 400 Bad Request',
    ).toBe(400);
  });

  test('@api @API-7 registration with duplicate email returns 409', async ({
    request,
  }) => {
    // Arrange
    const body = createRegistrationBody();
    await request.post(REGISTER_ENDPOINT, { data: body });

    // Act
    const response = await request.post(REGISTER_ENDPOINT, { data: body });

    // Assert
    await expect
      .soft(response, 'response should not be successful for duplicate email')
      .not.toBeOK();
    expect(
      response.status(),
      'duplicate registration should return 409 Conflict',
    ).toBe(409);
  });
});
