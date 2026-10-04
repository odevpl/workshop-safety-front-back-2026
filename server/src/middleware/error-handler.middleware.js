export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ error: 'Konto z tym adresem e-mail już istnieje.' });
  }

  return res.status(500).json({ error: 'Wystąpił błąd serwera.' });
}
