const fs = require('fs');
const path = require('path');

class AILogger {
  constructor() {
    this.logDir = path.join(__dirname, '../logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getLogFileName() {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    return path.join(this.logDir, `ai-responses-${dateStr}.log`);
  }

  formatLogEntry(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data: data || null
    };
    return JSON.stringify(logEntry) + '\n';
  }

  log(level, message, data = null) {
    const logEntry = this.formatLogEntry(level, message, data);
    const logFile = this.getLogFileName();
    
    try {
      fs.appendFileSync(logFile, logEntry);
      console.log(`[${level.toUpperCase()}] ${message}`);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  info(message, data = null) {
    this.log('info', message, data);
  }

  error(message, data = null) {
    this.log('error', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  debug(message, data = null) {
    this.log('debug', message, data);
  }

  // Specific method for logging AI responses
  logAIResponse(request, response, processingTime = null, error = null) {
    const logData = {
      request: {
        endpoint: request.endpoint || 'unknown',
        method: request.method || 'POST',
        body: request.body || null,
        timestamp: request.timestamp || new Date().toISOString()
      },
      response: {
        success: !error,
        data: response || null,
        processingTime: processingTime ? `${processingTime}ms` : null,
        error: error ? {
          message: error.message,
          stack: error.stack
        } : null
      },
      metadata: {
        userAgent: request.userAgent || 'unknown',
        ip: request.ip || 'unknown',
        sessionId: request.sessionId || null
      }
    };

    if (error) {
      this.error('AI Response Error', logData);
    } else {
      this.info('AI Response Generated', logData);
    }
  }

  // Method to get recent logs for debugging
  getRecentLogs(limit = 50) {
    const logFile = this.getLogFileName();
    
    try {
      if (!fs.existsSync(logFile)) {
        return [];
      }

      const logContent = fs.readFileSync(logFile, 'utf8');
      const lines = logContent.trim().split('\n').filter(line => line.trim());
      
      return lines
        .slice(-limit)
        .map(line => {
          try {
            return JSON.parse(line);
          } catch (e) {
            return { raw: line };
          }
        });
    } catch (error) {
      console.error('Failed to read log file:', error);
      return [];
    }
  }

  // Method to search logs by keyword
  searchLogs(keyword, limit = 100) {
    const logFile = this.getLogFileName();
    
    try {
      if (!fs.existsSync(logFile)) {
        return [];
      }

      const logContent = fs.readFileSync(logFile, 'utf8');
      const lines = logContent.trim().split('\n').filter(line => line.trim());
      
      return lines
        .filter(line => line.toLowerCase().includes(keyword.toLowerCase()))
        .slice(-limit)
        .map(line => {
          try {
            return JSON.parse(line);
          } catch (e) {
            return { raw: line };
          }
        });
    } catch (error) {
      console.error('Failed to search log file:', error);
      return [];
    }
  }
}

// Create singleton instance
const aiLogger = new AILogger();

module.exports = aiLogger;
