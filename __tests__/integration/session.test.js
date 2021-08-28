const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Autenticate', () => {
  beforeEach(async () => {
    await truncate();
  })
  
  it('should auth with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    }); 
    
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.status).toBe(200);  
  });

  it('should not auth with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123'
    }); 

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(401);  
  });

  it('should return jwt token when auth', async () => {
    const user = await factory.create('User', {
      password: '123456'
    }); 

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.body).toHaveProperty('token');
  })

  it('should be able to access privates routes when auth', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  })

  it('should not be able to access privates routes when not auth', async () => {
    const response = await request(app)
      .get('/dashboard');

    expect(response.status).toBe(401);
  })
});