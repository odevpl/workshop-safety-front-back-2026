import {
  createGoogleUser,
  createUser,
  findUserByEmail,
  findUserByGoogleId,
  linkGoogleAccount,
} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';

export async function registerUser({ email, password, displayName }) {
  const passwordHash = await bcrypt.hash(password, 12);
  const result = createUser({ email, password: passwordHash, displayName });
  return { id: result.lastInsertRowid, email, displayName };
}

export async function findOrCreateGoogleUser(profile) {
  const googleId = profile.id;
  const email = profile.emails?.[0]?.value?.toLowerCase();
  const displayName = profile.displayName || email;

  if (!googleId || !email || profile._json?.email_verified !== true) {
    throw new Error('Google nie potwierdził adresu e-mail użytkownika.');
  }

  const googleUser = findUserByGoogleId(googleId);
  if (googleUser) return toPublicUser(googleUser);

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    linkGoogleAccount(existingUser.id, googleId);
    return toPublicUser(existingUser);
  }

  const generatedPassword = randomBytes(32).toString('hex');
  const passwordHash = await bcrypt.hash(generatedPassword, 12);
  const result = createGoogleUser({ email, password: passwordHash, displayName, googleId });

  return { id: Number(result.lastInsertRowid), email, displayName };
}

function toPublicUser(user) {
  return { id: user.id, email: user.email, displayName: user.display_name };
}
