import { loginUser, registerUser } from '../services/auth.service.js';

export function register(req, res, next) {
  try {
    const user = registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export function login(req, res, next) {
  try {
    const result = loginUser(req.body);
    if (!result) return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło.' });
    res.json(result);
  } catch (error) {
    next(error);
  }
}
