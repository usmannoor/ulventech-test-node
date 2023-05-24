import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import { middleware } from '@middlewares/joiValidation.middleware';
import { schemas } from '@middlewares/joiSchema.middleware';
import UsersRequestController from '@controllers/users.controller';

class UserRoute implements Routes {
  public path = `/api/v1`;
  public router = Router();

  public userController = new UsersRequestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .get(`${this.path}/users`, [middleware(schemas.usersLIST, 'query')], this.userController.getUsers)
      .get(`${this.path}/users/:user_id`, [middleware(schemas.userDETAIL, 'params')], this.userController.getUserById)
      .post(`${this.path}/users`, [middleware(schemas.users, 'body')], this.userController.saveUser)
      .put(
        `${this.path}/users/:user_id`,
        [middleware(schemas.userUPDATE, 'body'), middleware(schemas.userDETAIL, 'params')],
        this.userController.updateUser,
      )
      .delete(`${this.path}/users/:user_id`, [middleware(schemas.userDETAIL, 'params')], this.userController.removeUser);
  }
}

export default UserRoute;
