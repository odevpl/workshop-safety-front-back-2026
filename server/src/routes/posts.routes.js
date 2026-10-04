import { Router } from 'express';
import { create, getAll, search } from '../controllers/posts.controller.js';

export const postsRouter = Router();
postsRouter.get('/', getAll);
postsRouter.get('/search', search);
// WORKSHOP: creating a transfer instruction does not require authentication yet.
postsRouter.post('/', create);
