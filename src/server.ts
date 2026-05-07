import 'dotenv/config';
import { createApp } from './app';
import { config } from './config/env';
import { logger } from './shared/logger';

const app = createApp();

const server = app.listen(config.PORT, () => {
  logger.info({ port: config.PORT, env: config.NODE_ENV }, 'server started');
});

function gracefulShutdown(signal: string): void {
  logger.info({ signal }, 'shutdown signal received');
  server.close(() => {
    logger.info('server closed');
    process.exit(0);
  });
  setTimeout(() => {
    logger.error('forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'unhandled rejection');
  process.exit(1);
});
