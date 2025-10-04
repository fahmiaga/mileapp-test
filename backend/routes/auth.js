const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email & password required" });
  }

  if (email === "test@mile.app" && password === "password") {
    return res.json({ token: "mock-token-123" });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
