import { Router } from 'express';
import { getUsers } from '../controllers/debug.controller.js';

export const debugRouter = Router();
debugRouter.get('/users', getUsers);
