import request from 'supertest';
import { User } from '@interfaces/users.interface';
import UserRoute from '@routes/users.route';
import App from '@/app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Users API', () => {
  const route = new UserRoute();
  const app = new App([route]);
  let user: User;

  describe('[POST] /users', () => {
    it('response statusCode 201 /created', async () => {
      const userData: User = {
        firstName: 'Bob',
        lastName: 'Test',
        email: 'bob@gmail.com',
        password: 'bob123!@#',
      };

      const res = await request(app.getServer()).post(`${route.path}/users`).send(userData);
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('data');
      expect(res.body['data']['email']).toBe(userData.email);
      expect(res.body['data']['firstName']).toBe(userData.firstName);
      expect(res.body['data']['lastName']).toBe(userData.lastName);

      user = res.body['data'];
    });
  });

  describe('[GET] /users', () => {
    it('response statusCode 200 /findAll', async () => {
      const res = await request(app.getServer()).get(`${route.path}/users`);

      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('data');
      expect(res.body['data']).toBeInstanceOf(Array);
      expect(res.body['data']).toEqual(expect.arrayContaining([user]));
    });
  });

  describe('[GET] /users/:user_id', () => {
    it('response statusCode 200 /findOne', async () => {
      const res = await request(app.getServer()).get(`${route.path}/users/${user._id}`);

      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('data');
      expect(res.body['data']).toBeInstanceOf(Object);
      expect(res.body['data']).toEqual(expect.objectContaining(user));
    });
  });

  describe('[PUT] /users/:user_id', () => {
    it('response statusCode 200 /updated', async () => {
      const userData: User = {
        firstName: 'Updated Bob',
        lastName: 'Test2',
        password: '123456789',
      };

      const res = await request(app.getServer()).put(`${route.path}/users/${user._id}`).send(userData);

      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('data');
      expect(res.body['data']).toBeInstanceOf(Object);
      expect(res.body['data']).toEqual(expect.objectContaining({ ...user, ...userData }));
      user = { ...user, ...userData };
    });
  });

  describe('[DELETE] /users/:user_id', () => {
    it('response statusCode 200 /deleted', async () => {
      const res = await request(app.getServer()).delete(`${route.path}/users/${user._id}`);

      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('data');
      expect(res.body['data']).toBeInstanceOf(Object);
      expect(res.body['data']).toEqual(expect.objectContaining(user));
    });
  });

  describe('[POST] Return ERROR when request body is invalid', () => {
    it('should throw error when there is no email', async () => {
      const userData: User = {
        firstName: 'Bob',
        lastName: 'Test',
        password: 'bob123!@#',
      };

      const res = await request(app.getServer()).post(`${route.path}/users`).send(userData);
      expect(res.body.error).toBe('"email" is required');
      expect(res.status).toBe(400);
    });

    it('should throw error when password is less than 8 characters', async () => {
      const userData: User = {
        firstName: 'Bob',
        lastName: 'Test',
        email: 'test@gmail.com',
        password: 'bob123',
      };

      const res = await request(app.getServer()).post(`${route.path}/users`).send(userData);
      expect(res.body.error).toBe('"password" length must be at least 8 characters long');
      expect(res.status).toBe(400);
    });

    it('should throw error when firstName is not a string', async () => {
      const userData = {
        firstName: 1234,
        lastName: 'Test',
        email: 'test@gmail.com',
        password: 'bob123',
      };

      const res = await request(app.getServer()).post(`${route.path}/users`).send(userData);
      expect(res.body.error).toBe('"firstName" must be a string');
      expect(res.status).toBe(400);
    });
  });

  describe('[PUT] Return ERROR when request body is invalid', () => {
    it('should throw error when trying to update the email', async () => {
      const userId = '28f809b00f95241';
      const userData: User = {
        firstName: 'Bob',
        lastName: 'Test',
        email: 'test@gmail.com',
        password: 'bob123456',
      };

      const res = await request(app.getServer()).put(`${route.path}/users/${userId}`).send(userData);
      expect(res.body.error).toBe('"email" is not allowed');
      expect(res.status).toBe(400);
    });
  });
});
