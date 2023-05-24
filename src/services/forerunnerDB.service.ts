import { logger } from '@utils/logger';

const ForerunnerDB = require('forerunnerdb');
const dbInstance = new ForerunnerDB();

export let ForeDB: any;

class ForeRunnerDBService {
  public connect(isDevelopment = true) {
    try {
      ForeDB = dbInstance.db(process.env.FORE_DB_NAME);

      logger.info(isDevelopment ? 'ForeRunner connected with development' : 'ForeRunner connected with production');
    } catch (error) {
      logger.error('ForeRunnerDB -> connect() -> error ', error);
      throw new Error(error);
    }
  }
}

export default ForeRunnerDBService;
