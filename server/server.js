import 'dotenv/config';
import { app } from './src/app.js';
import { initializeDatabase } from './src/config/database.js';
import { env } from './src/config/env.js';

const PORT = env.port;

await initializeDatabase();

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
