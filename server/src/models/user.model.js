import { db } from '../config/database.js';

export function createUser({ email, password, displayName }) {
  return db.prepare('INSERT INTO users (email, password, display_name) VALUES (?, ?, ?)')
    .run(email, password, displayName);
}

export function findUserByEmail(email) {
  return db.prepare('SELECT id, email, password, display_name FROM users WHERE email = ?').get(email);
}

export function findUserById(id) {
  return db.prepare('SELECT id, email, display_name FROM users WHERE id = ?').get(id);
}
