import { NextFunction, Request, Response } from 'express';

import UsersService from '@services/users.service';
import { User } from '@interfaces/users.interface';

class UsersRequestController {
  public userService = new UsersService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.userService.getUsers(req.query);
      res.send({
        status: 'success',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.userService.getUserById(req.params.user_id);
      res.send({
        status: 'success',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  public saveUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.userService.insertUser(req.body as User);
      res.send({
        status: 'success',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.userService.updateUser(req.body as User, req.params.user_id);
      res.send({
        status: 'success',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  public removeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.userService.removeUser(req.params.user_id);
      res.send({
        status: 'success',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersRequestController;
