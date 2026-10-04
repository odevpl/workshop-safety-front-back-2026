import { createUser, findUserByEmail } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export async function registerUser({ email, password, displayName }) {
  const passwordHash = await bcrypt.hash(password, 12);
  const result = createUser({ email, password: passwordHash, displayName });
  return { id: result.lastInsertRowid, email, displayName };
}

export async function loginUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) return null;

  return { user: { id: user.id, email: user.email, displayName: user.display_name } };
}
