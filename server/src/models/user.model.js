import { db } from '../config/database.js';

export function createUser({ email, password, displayName }) {
  return db.prepare('INSERT INTO users (email, password, display_name) VALUES (?, ?, ?)')
    .run(email, password, displayName);
}

export function findUserForLogin(email, password) {
  return db.prepare('SELECT id, email, display_name FROM users WHERE email = ? AND password = ?')
    .get(email, password);
}

export function findAllUsers() {
  // WORKSHOP: exposes sensitive data; retained only as an audit exercise target.
  return db.prepare('SELECT id, email, password, display_name FROM users').all();
}
