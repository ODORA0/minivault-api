const express = require("express");
const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const router = express.Router();

// different response options - can expand this later
const responses = [
  "I'm a local AI model, running offline!",
  "Hello! I'm running locally on your machine.",
  "Hi there - I'm your local AI assistant!",
];

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Need a prompt!" });
  }

  // randomly pick a response to make it feel more dynamic
  const response = responses[Math.floor(Math.random() * responses.length)];

  const logData = {
    timestamp: new Date().toISOString(),
    prompt: prompt.trim(),
    response,
    status: "success",
  };

  try {
    logger.writeLog(logData);
    res.json({ response });
  } catch (err) {
    // Log the error
    logger.logError("Request processing failed", {
      prompt: prompt.trim(),
      error: err.message,
      timestamp: new Date().toISOString(),
    });

    // still return response even if logging fails
    res.json({ response });
  }
});

module.exports = router;
