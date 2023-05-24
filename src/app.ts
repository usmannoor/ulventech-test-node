import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { envObjects } from '@config';
import { logger, stream } from '@utils/logger';
import errorMiddleware from '@middlewares/error.middleware';
import { Routes } from '@interfaces/routes.interface';
import ForeRunnerDBService from '@services/forerunnerDB.service';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  private foreDB = new ForeRunnerDBService();

  constructor(routes: Routes[] = []) {
    this.app = express();
    this.env = envObjects.NODE_ENV || 'development';
    this.port = envObjects.PORT || 3600;

    this.initializeDBConnection();

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(envObjects.LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: '*', credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeDBConnection() {
    try {
      // initialize DB
      this.foreDB.connect(this.env === 'development');
    } catch (e) {
      throw new Error(e);
    }
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
