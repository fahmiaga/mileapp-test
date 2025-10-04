const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("../routes/auth");
const taskRoutes = require("../routes/tasks");
const errorHandler = require("../middleware/errorHandler");

const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "https://mileapp.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options(/.*/, cors());

app.use(bodyParser.json());

// favicon handler
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "MileApp API is running!",
    endpoints: [
      "POST /login",
      "GET /tasks",
      "POST /tasks",
      "PUT /tasks/:id",
      "DELETE /tasks/:id"
    ]
  });
});

// routes
app.use("/login", authRoutes);
app.use("/tasks", taskRoutes);

// error handler
app.use(errorHandler);

module.exports = app;
