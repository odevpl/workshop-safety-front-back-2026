import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dataDirectory = join(__dirname, '../../data');
mkdirSync(dataDirectory, { recursive: true });

export const db = new Database(join(dataDirectory, 'workshop.db'));

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      display_name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      author_id INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  if (!db.prepare('SELECT id FROM users WHERE email = ?').get('alice@example.test')) {
    // WORKSHOP: plaintext password is intentionally insecure.
    db.prepare('INSERT INTO users (email, password, display_name) VALUES (?, ?, ?)')
      .run('alice@example.test', 'alice123', 'Alicja');
  }

  if (!db.prepare('SELECT id FROM posts LIMIT 1').get()) {
    db.prepare('INSERT INTO posts (title, body, author_id) VALUES (?, ?, ?)')
      .run('Witaj na warsztacie', 'To jest przykładowy wpis w celowo podatnej aplikacji.', 1);
  }
}
