const createError = require("http-errors");

function handleNotFound(req, res, next) {
  next(createError(404));
}

function handleDefaultError(err, req, res, _next) {
  const message = (req.app.get("env") === "development" || err.status !== 500)
    ? err.message
    : "internal server error";

  res.status(err.status || 500);
  res.json({ error: message });
}

module.exports = { handleNotFound, handleDefaultError };
