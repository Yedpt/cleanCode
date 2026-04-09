import request from 'supertest';
import { app } from '../app';
import connectionDB from '../database/conectionDB';
import UserModel from '../models/userModel';

describe('News API', () => {
  let token: string | null = null;

  beforeAll(async () => {
    // La app al importarse sincroniza; aseguramos la conexión
    await connectionDB.sync({ force: true });
  });

  afterAll(async () => {
    await connectionDB.close();
  });

  it('should register and login a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const reg = await request(app).post('/api/users/register').send({ email, password, name: 'Test' });
    expect(reg.status).toBe(201);

    await UserModel.update({ rol: 'admin' } as any, { where: { email } });

    const login = await request(app).post('/api/users/login').send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
    token = login.body.token;
  });

  it('should create, read, update and delete a news item', async () => {
    if (!token) throw new Error('token missing');

    const create = await request(app)
      .post('/api/news')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Prueba', news: 'Contenido de prueba' });
    expect(create.status).toBe(201);
    const id = create.body.id || create.body.get?.('id');

    const getAll = await request(app).get('/api/news');
    expect(getAll.status).toBe(200);
    expect(Array.isArray(getAll.body)).toBe(true);

    const getOne = await request(app).get(`/api/news/${id}`);
    expect(getOne.status).toBe(200);

    const update = await request(app)
      .put(`/api/news/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Prueba actualizada' });
    expect(update.status).toBe(200);

    const del = await request(app).delete(`/api/news/${id}`).set('Authorization', `Bearer ${token}`);
    expect([200, 204]).toContain(del.status);
  });
});
