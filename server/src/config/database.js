import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dataDirectory = join(__dirname, '../../data');
mkdirSync(dataDirectory, { recursive: true });

export const db = new Database(join(dataDirectory, 'workshop.db'));

export async function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      display_name TEXT NOT NULL,
      google_id TEXT UNIQUE
    );
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      author_id INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const userColumns = db.prepare('PRAGMA table_info(users)').all();
  if (!userColumns.some((column) => column.name === 'google_id')) {
    db.exec('ALTER TABLE users ADD COLUMN google_id TEXT');
    db.exec('CREATE UNIQUE INDEX IF NOT EXISTS users_google_id_unique ON users(google_id)');
  }

  if (!db.prepare('SELECT id FROM users WHERE email = ?').get('alice@example.test')) {
    const passwordHash = await bcrypt.hash('alice123', 12);
    db.prepare('INSERT INTO users (email, password, display_name) VALUES (?, ?, ?)')
      .run('alice@example.test', passwordHash, 'Alicja');
  }

  const plaintextUsers = db.prepare("SELECT id, password FROM users WHERE password NOT LIKE '$2%'").all();
  const updatePassword = db.prepare('UPDATE users SET password = ? WHERE id = ?');
  for (const user of plaintextUsers) {
    updatePassword.run(await bcrypt.hash(user.password, 12), user.id);
  }

  if (!db.prepare('SELECT id FROM posts LIMIT 1').get()) {
    db.prepare('INSERT INTO posts (title, body, author_id) VALUES (?, ?, ?)')
      .run('Witaj na warsztacie', 'To jest przykładowy wpis w celowo podatnej aplikacji.', 1);
  }
}
