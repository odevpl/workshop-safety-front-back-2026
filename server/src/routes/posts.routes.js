import { Router } from 'express';
import { create, getAll, search } from '../controllers/posts.controller.js';
import { requireAuthentication } from '../middleware/require-authentication.middleware.js';

export const postsRouter = Router();
postsRouter.get('/', getAll);
postsRouter.get('/search', search);
postsRouter.post('/', requireAuthentication, create);
