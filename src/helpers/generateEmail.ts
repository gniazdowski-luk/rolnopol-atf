const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN;

export function generateEmail(): string {
  return `testUser_${Date.now()}@${EMAIL_DOMAIN}`;
}
