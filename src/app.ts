import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { patientRoutes } from './modules/patient/patient.routes';
import { AppError } from './middleware/errorHandler';
import { logger } from './shared/logger';
import { nanoid } from 'nanoid';

export function createApp(): express.Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.use((req: Request, _res: Response, next: NextFunction) => {
    const requestId = nanoid(10);
    req.headers['x-request-id'] = requestId;
    logger.info({ method: req.method, path: req.path, requestId }, 'incoming request');
    next();
  });

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  app.use('/api/v1/patients', patientRoutes);

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError(404, 'ROUTE_NOT_FOUND', 'The requested endpoint does not exist'));
  });

  app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    const requestId = req.headers['x-request-id'] as string;

    if (error instanceof AppError) {
      logger.warn({ code: error.code, message: error.message, requestId }, 'client error');
      res.status(error.statusCode).json({
        success: false,
        error: { code: error.code, message: error.message, details: error.details },
      });
      return;
    }

    logger.error({ error: error.message, stack: error.stack, requestId }, 'unhandled error');
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
    });
  });

  return app;
}
