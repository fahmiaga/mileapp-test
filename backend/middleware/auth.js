module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== "Bearer mock-token-123") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};