const request = require('supertest');

const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Autenticate', () => {
  beforeEach(async () => {
    await truncate();
  })
  
  it('should auth with valid credentials', async () => {
    const user = await User.create({
      name: 'leo',
      email: 'leodrums11@gmail.com',
      password_hash: '1133'
    }); 

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1133'
      });

    expect(response.status).toBe(200);  
  });
});