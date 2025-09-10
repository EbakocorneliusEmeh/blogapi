import request from 'supertest';
import app from '../app.js';
import db from '../db/index.js';

let token = '';

describe('Auth Endpoints', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('id');
  });

  it('should login user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should get logged in user info', async () => {
    const res = await request(app).get('/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });
});

afterAll(async () => {
  await db.pool.end();
});
