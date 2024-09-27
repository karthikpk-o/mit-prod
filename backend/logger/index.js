import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import morgan from 'morgan';
import moment from 'moment-timezone';

// Create subfolder paths for error and info logs
const logDirectory = path.join(process.cwd(), 'logger'); // Ensure this points to the correct directory
const errorLogDirectory = path.join(logDirectory, 'error');
const infoLogDirectory = path.join(logDirectory, 'info');

const localTimestamp = ()=>{
  return moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
}

// Create a logger instance with daily rotation for each log type
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({format: localTimestamp}),
    winston.format.printf(({ timestamp, level, message }) => 
      `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    // Info logs (all logs at or above info level)
    new winston.transports.DailyRotateFile({
      filename: path.join(infoLogDirectory, 'info-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info', // Logs of level 'info' and above will go here
    }),
    
    // Error logs (only error level logs)
    new winston.transports.DailyRotateFile({
      filename: path.join(errorLogDirectory, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '14d',
      level: 'error', // Only error logs will go here
    }),
  ],
});

// Create a Morgan stream that logs HTTP requests to the info log
logger.stream = {
  write(message) {
    // Use Winston logger to log HTTP requests
    logger.info(message.trim());
  },
};

// Morgan middleware setup
const morganMiddleware = morgan('combined', { stream: logger.stream });

export { logger, morganMiddleware };
