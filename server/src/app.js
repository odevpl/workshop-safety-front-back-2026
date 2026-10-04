import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { postsRouter } from './routes/posts.routes.js';
import { errorHandler } from './middleware/error-handler.middleware.js';

const app = express();

// WORKSHOP: every origin is permitted; no Helmet headers are configured.
app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// WORKSHOP: technical internals are exposed to clients.
app.use(errorHandler);

export { app };
