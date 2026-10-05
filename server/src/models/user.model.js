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

export function findUserByGoogleId(googleId) {
  return db.prepare('SELECT id, email, display_name FROM users WHERE google_id = ?').get(googleId);
}

export function linkGoogleAccount(userId, googleId) {
  return db.prepare('UPDATE users SET google_id = ? WHERE id = ?').run(googleId, userId);
}

export function createGoogleUser({ email, password, displayName, googleId }) {
  return db.prepare(`
    INSERT INTO users (email, password, display_name, google_id)
    VALUES (?, ?, ?, ?)
  `).run(email, password, displayName, googleId);
}
