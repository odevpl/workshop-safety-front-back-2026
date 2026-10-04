function readPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

export const env = {
  port: readPositiveNumber(process.env.PORT, 3001),
  rateLimitWindowMs: readPositiveNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: readPositiveNumber(process.env.RATE_LIMIT_MAX, 5),
  sessionSecret: process.env.SESSION_SECRET || 'development-only-session-secret',
};
