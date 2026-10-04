export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Dane formularza są nieprawidłowe.',
        fields: Object.fromEntries(error.inner.map(item => [item.path, item.message])),
      });
    }
  };
}
