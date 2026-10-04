import { createUser, findUserForLogin } from '../models/user.model.js';

export function registerUser({ email, password, displayName }) {
  // WORKSHOP: no input validation and password stored as plaintext.
  const result = createUser({ email, password, displayName });
  return { id: result.lastInsertRowid, email, displayName };
}

export function loginUser({ email, password }) {
  const user = findUserForLogin(email, password);
  if (!user) return null;

  return { user: { id: user.id, email: user.email, displayName: user.display_name } };
}
