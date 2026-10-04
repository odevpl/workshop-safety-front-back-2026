import { listDebugUsers } from '../services/debug.service.js';

export function getUsers(req, res, next) {
  try {
    res.json(listDebugUsers());
  } catch (error) {
    next(error);
  }
}
