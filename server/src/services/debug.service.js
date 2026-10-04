import { findAllUsers } from '../models/user.model.js';

export function listDebugUsers() {
  return findAllUsers();
}
