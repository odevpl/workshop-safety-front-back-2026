import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate-body.middleware.js';
import { authRateLimit } from '../middleware/auth-rate-limit.middleware.js';
import { registerSchema } from '../validation/auth.schema.js';

export const authRouter = Router();
authRouter.post('/register', validateBody(registerSchema), register);
authRouter.post('/login', authRateLimit, login);
