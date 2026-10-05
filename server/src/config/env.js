function readPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

export const env = {
  port: readPositiveNumber(process.env.PORT, 3001),
  rateLimitWindowMs: readPositiveNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: readPositiveNumber(process.env.RATE_LIMIT_MAX, 5),
  sessionSecret: process.env.SESSION_SECRET || 'development-only-session-secret',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
};
