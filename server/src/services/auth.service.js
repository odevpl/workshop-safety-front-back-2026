import { createUser } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export async function registerUser({ email, password, displayName }) {
  const passwordHash = await bcrypt.hash(password, 12);
  const result = createUser({ email, password: passwordHash, displayName });
  return { id: result.lastInsertRowid, email, displayName };
}
