import { app } from './src/app.js';
import { initializeDatabase } from './src/config/database.js';

const PORT = process.env.PORT || 3001;

await initializeDatabase();

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
