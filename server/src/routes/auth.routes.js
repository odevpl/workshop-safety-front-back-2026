import { Router } from 'express';
import { env } from '../config/env.js';
import { isGoogleOAuthConfigured, passport } from '../config/passport.js';
import { register } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate-body.middleware.js';
import { authRateLimit } from '../middleware/auth-rate-limit.middleware.js';
import { registerSchema } from '../validation/auth.schema.js';

export const authRouter = Router();

function requireGoogleOAuthConfiguration(req, res, next) {
  if (isGoogleOAuthConfigured) return next();

  return res.status(503).json({
    error: 'Logowanie przez Google nie jest skonfigurowane. Uzupełnij GOOGLE_CLIENT_ID i GOOGLE_CLIENT_SECRET w server/.env.',
  });
}

authRouter.post('/register', validateBody(registerSchema), register);
authRouter.post('/login', authRateLimit, (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło.' });

    return req.logIn(user, (loginError) => {
      if (loginError) return next(loginError);
      return res.json({ user });
    });
  })(req, res, next);
});
authRouter.get('/me', (req, res) => {
  res.json({ user: req.user || null });
});
authRouter.get('/google', requireGoogleOAuthConfiguration, passport.authenticate('google', {
  scope: ['openid', 'email', 'profile'],
  state: true,
}));
authRouter.get('/google/callback', requireGoogleOAuthConfiguration, passport.authenticate('google', {
  failureRedirect: `${env.clientUrl}/#/access?oauth=failed`,
}), (req, res) => {
  res.redirect(`${env.clientUrl}/#/dashboard`);
});
