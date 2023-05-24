import { User } from '@interfaces/users.interface';
import { ForeDB } from '@services/forerunnerDB.service';
import { logger } from '@utils/logger';

class UsersService {
  public async getUsers(queryParams): Promise<Array<User>> {
    try {
      const { start = 0, limit = 10 } = queryParams;
      const dbCollection = ForeDB.collection(process.env.FORE_COLLECTION_NAME);
      const result = await dbCollection.find(
        {},
        {
          $page: start,
          $limit: limit,
        },
      );
      return result;
    } catch (e) {
      logger.error('UsersService -> getUsers() -> error ', e);
      throw new Error(e);
    }
  }
  public async getUserById(userId: string): Promise<User> {
    try {
      const dbCollection = ForeDB.collection(process.env.FORE_COLLECTION_NAME);
      const result = await dbCollection.find({
        _id: {
          $eeq: userId,
        },
      });
      return result.length ? result[0] : {};
    } catch (e) {
      logger.error('UsersService -> getUserById() -> error ', e);
      throw new Error(e);
    }
  }

  public async insertUser(body: User): Promise<User> {
    try {
      const dbCollection = ForeDB.collection(process.env.FORE_COLLECTION_NAME);
      const result = await dbCollection.insert(body);
      logger.info(`UsersService -> insertUser() -> user inserted successfully with body -> ${JSON.stringify(body)} `);
      return result?.inserted ? result?.inserted[0] : {};
    } catch (e) {
      logger.error('UsersService -> insertUser() -> error ', e);
      throw new Error(e);
    }
  }

  public async updateUser(body: User, userId: string): Promise<User> {
    try {
      const dbCollection = ForeDB.collection(process.env.FORE_COLLECTION_NAME);
      const result = await dbCollection.updateById(userId, body);
      logger.info(`UsersService -> updateUser() -> user updated successfully with body -> ${JSON.stringify(body)} `);
      return result;
    } catch (e) {
      logger.error('UsersService -> updateUser() -> error ', e);
      throw new Error(e);
    }
  }

  public async removeUser(userId: string): Promise<User> {
    try {
      const dbCollection = ForeDB.collection(process.env.FORE_COLLECTION_NAME);
      const result = await dbCollection.remove({
        _id: {
          $eeq: userId,
        },
      });
      logger.info(`UsersService -> removeUser() -> user deleted successfully with id -> ${userId} `);
      return result.length ? result[0] : {};
    } catch (e) {
      logger.error('UsersService -> removeUser() -> error ', e);
      throw new Error(e);
    }
  }
}

export default UsersService;
