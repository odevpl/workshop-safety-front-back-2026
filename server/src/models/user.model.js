import { db } from '../config/database.js';

export function createUser({ email, password, displayName }) {
  // WORKSHOP: intentionally vulnerable SQL construction for the input-validation and SQL-injection exercises.
  return db.prepare(`INSERT INTO users (email, password, display_name) VALUES ('${email}', '${password}', '${displayName}')`)
    .run();
}

export function findUserForLogin(email, password) {
  // WORKSHOP: intentionally vulnerable SQL construction for the SQL-injection exercise.
  return db.prepare(`SELECT id, email, display_name FROM users WHERE email = '${email}' AND password = '${password}'`).get();
}

export function findAllUsers() {
  // WORKSHOP: exposes sensitive data; retained only as an audit exercise target.
  return db.prepare('SELECT id, email, password, display_name FROM users').all();
}
