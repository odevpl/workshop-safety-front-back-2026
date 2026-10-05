import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { env } from './config/env.js';
import { passport } from './config/passport.js';
import { authRouter } from './routes/auth.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { postsRouter } from './routes/posts.routes.js';
import { errorHandler } from './middleware/error-handler.middleware.js';

const app = express();
const allowedOrigins = [env.clientUrl];

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// WORKSHOP: technical internals are exposed to clients.
app.use(errorHandler);

export { app };
