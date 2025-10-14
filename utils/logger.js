const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = {
  info: (message, meta = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      meta,
    };
    console.log(JSON.stringify(logEntry));
    writeToFile('info.log', logEntry);
  },

  error: (message, meta = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      meta,
    };
    console.error(JSON.stringify(logEntry));
    writeToFile('error.log', logEntry);
  },

  warn: (message, meta = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message,
      meta,
    };
    console.warn(JSON.stringify(logEntry));
    writeToFile('warn.log', logEntry);
  },

  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        message,
        meta,
      };
      console.debug(JSON.stringify(logEntry));
      writeToFile('debug.log', logEntry);
    }
  },
};

const writeToFile = (filename, logEntry) => {
  const filePath = path.join(logsDir, filename);
  const logLine = JSON.stringify(logEntry) + '\n';

  fs.appendFile(filePath, logLine, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

module.exports = logger;
