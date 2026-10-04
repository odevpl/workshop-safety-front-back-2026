export function requireAuthentication(req, res, next) {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: 'Zaloguj się, aby wykonać tę operację.' });
}
