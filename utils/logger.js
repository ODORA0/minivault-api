const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "..", "logs");
const logFile = path.join(logDir, "log.jsonl");
const errorLogFile = path.join(logDir, "error.jsonl");

// make sure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function writeLog(data) {
  try {
    const line = JSON.stringify(data) + "\n";
    fs.appendFileSync(logFile, line, "utf8");
  } catch (error) {
    // Silent fail for logging errors to avoid cascading issues
  }
}

function logError(message, details = {}) {
  try {
    const errorData = {
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      ...details,
    };
    const line = JSON.stringify(errorData) + "\n";
    fs.appendFileSync(errorLogFile, line, "utf8");
  } catch (error) {
    // Same here for the silent fail for error
  }
}

module.exports = {
  writeLog,
  logError,
};
