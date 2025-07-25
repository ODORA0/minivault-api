const express = require("express");
const bodyParser = require("body-parser");
const generateRoute = require("./routes/generate");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/generate", generateRoute);

app.get("/status", (req, res) => {
  const uptime = process.uptime();
  const memUsage = process.memoryUsage();
  res.json({
    status: "running",
    uptime: Math.floor(uptime) + "s",
    memory: Math.round(memUsage.heapUsed / 1024 / 1024) + "MB",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  // Only log startup message
});
