import { Router } from 'express';
import { passport } from '../config/passport.js';
import { register } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate-body.middleware.js';
import { authRateLimit } from '../middleware/auth-rate-limit.middleware.js';
import { registerSchema } from '../validation/auth.schema.js';

export const authRouter = Router();
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
